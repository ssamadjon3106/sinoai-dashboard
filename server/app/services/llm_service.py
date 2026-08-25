"""OpenAI-backed risk overview/suggestion + weekly recommendation. Plain
httpx calls (no SDK) — same style/intent as the Node backend's llm.ts, ported
1:1 so prompts and behavior don't drift.
"""

import json
from typing import Any, Literal

import httpx

from app.config import settings

Language = Literal["uz", "ru", "en"]

LANGUAGE_NAME: dict[Language, str] = {
    "uz": "Uzbek (Latin script)",
    "ru": "Russian",
    "en": "English",
}


class LlmNotConfiguredError(Exception):
    pass


class LlmResponseError(Exception):
    pass


def _build_insights_prompt(
    full_name: str,
    job: str,
    description: str,
    age: int,
    sex: str,
    domains: list[dict[str, Any]],
    language: Language,
) -> str:
    domain_lines = "\n".join(f"- {d['label']}: {d['percent']}% ({d['band']} risk)" for d in domains)
    return f"""You are advising an HR/occupational-health team at a company that uses SinoAI, a workplace health-screening product. You are given one employee's real screening-signal results (not diagnoses) and their job. Write in {LANGUAGE_NAME[language]}.

Employee: {full_name}, age {age}, {sex}
Job title: {job}
Job description: {description}

Screening-signal results (NOT a diagnosis — these are risk-screening percentages):
{domain_lines}

Respond with ONLY a JSON object, no markdown fences, no extra text, in this exact shape:
{{"riskOverview": "...", "suggestion": "..."}}

"riskOverview": 2-4 sentences summarizing the plausible operational/business impact on the company if this specific employee's condition worsens and they cannot work (relate it concretely to their job duties, e.g. coverage gaps, safety-sensitive tasks, handoff risk). Do not state any of this as certain — frame it as a risk to plan for, not a prediction. If any domain is high risk, be explicit that this employee may need rest or reduced duties soon.
"suggestion": 2-4 sentences of concrete, humane suggestions for the company (e.g. workload adjustment, referral, monitoring cadence, cross-training a backup, granting rest) — never suggest discrimination, demotion, or any action that would penalize the employee for their health status."""


async def _chat_completion(prompt: str, temperature: float) -> str:
    if not settings.OPENAI_API_KEY:
        raise LlmNotConfiguredError("OPENAI_API_KEY is not set on the server")

    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await client.post(
            "https://api.openai.com/v1/chat/completions",
            headers={
                "content-type": "application/json",
                "authorization": f"Bearer {settings.OPENAI_API_KEY}",
            },
            json={
                "model": settings.OPENAI_MODEL,
                "temperature": temperature,
                "response_format": {"type": "json_object"},
                "messages": [{"role": "user", "content": prompt}],
            },
        )

    if response.status_code >= 400:
        raise LlmResponseError(f"OpenAI API error {response.status_code}: {response.text[:300]}")

    data = response.json()
    text = (data.get("choices") or [{}])[0].get("message", {}).get("content")
    if not text:
        raise LlmResponseError("OpenAI response had no message content")
    return text


async def generate_insights(
    *,
    full_name: str,
    job: str,
    description: str,
    age: int,
    sex: str,
    domains: list[dict[str, Any]],
    language: Language,
) -> dict[str, str]:
    prompt = _build_insights_prompt(full_name, job, description, age, sex, domains, language)
    text = await _chat_completion(prompt, temperature=0.4)

    try:
        parsed = json.loads(text)
    except json.JSONDecodeError:
        raise LlmResponseError("OpenAI did not return valid JSON")

    risk_overview = parsed.get("riskOverview")
    suggestion = parsed.get("suggestion")
    if not risk_overview or not suggestion:
        raise LlmResponseError("OpenAI JSON was missing riskOverview/suggestion")
    return {"riskOverview": risk_overview, "suggestion": suggestion}


def _build_weekly_prompt(full_name: str, job: str, description: str, language: Language, source_data: Any) -> str:
    return f"""You are a workplace health assistant for SinoAI. Using the worker's recent health/fitness data below, write ONE short, actionable weekly recommendation for them — the kind of nudge a wellness coach would send at the start of the week. Write in {LANGUAGE_NAME[language]}.

Employee: {full_name}
Job title: {job}
Job description: {description}

Recent SinoAI health/fitness data (JSON):
{json.dumps(source_data)}

Respond with ONLY a JSON object, no markdown fences, no extra text, in this exact shape:
{{"summary": "...", "tasks": ["...", "..."]}}

"summary": 1-2 sentences, this week's overall recommendation.
"tasks": 2-4 short, concrete action items for this specific week (e.g. "Take a 10-minute walk after lunch on 3 days", "Log blood pressure every morning"). Never diagnose; frame everything as wellness guidance, not medical advice."""


async def generate_weekly_recommendation(
    *,
    full_name: str,
    job: str,
    description: str,
    language: Language,
    source_data: Any,
) -> dict[str, Any]:
    prompt = _build_weekly_prompt(full_name, job, description, language, source_data)
    text = await _chat_completion(prompt, temperature=0.5)

    try:
        parsed = json.loads(text)
    except json.JSONDecodeError:
        raise LlmResponseError("OpenAI did not return valid JSON")

    summary = parsed.get("summary")
    tasks = parsed.get("tasks")
    if not summary or not isinstance(tasks, list):
        raise LlmResponseError("OpenAI JSON was missing summary/tasks")
    return {"summary": summary, "tasks": tasks}
