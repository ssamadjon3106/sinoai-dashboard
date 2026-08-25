"""Tortoise ORM config — same shape as sinoai-chatbot's app/db.py, plus one
Vercel/Neon-specific fix: `_normalize_db_url()`.

Why it's needed: Tortoise's asyncpg backend forwards any URL query param it
doesn't recognize straight through as a kwarg to `asyncpg.create_pool()`.
asyncpg's own API takes `ssl=True|False|<ssl.SSLContext>`, not libpq's
`sslmode=require` — but `sslmode=require` is exactly what Neon's dashboard
puts in the connection string it hands you by default. Left as-is, that
would fail at connection time with
`TypeError: create_pool() got an unexpected keyword argument 'sslmode'`
instead of a clear config error. We rewrite `sslmode=<anything but disable>`
to the `ssl=true` query param Tortoise's asyncpg backend actually
understands, and leave every other param (including an explicit
`min_size`/`max_size` an operator sets for pool tuning against Neon's
PgBouncer pooler) untouched.
"""

from urllib.parse import parse_qsl, urlencode, urlsplit, urlunsplit

from app.config import settings


def _normalize_db_url(raw_url: str) -> str:
    parts = urlsplit(raw_url)
    query = dict(parse_qsl(parts.query, keep_blank_values=True))

    if "sslmode" in query and "ssl" not in query:
        sslmode = query.pop("sslmode")
        if sslmode != "disable":
            # Tortoise casts `ssl` with Python's bool(), so any non-empty
            # string (even "false") reads as True — there's no way to
            # represent "off" except omitting the key entirely, which is
            # exactly what the sslmode == "disable" branch does below.
            query["ssl"] = "true"
    else:
        query.pop("sslmode", None)

    new_query = urlencode(query)
    return urlunsplit((parts.scheme, parts.netloc, parts.path, new_query, parts.fragment))


DATABASE_URL = _normalize_db_url(settings.DATABASE_URL)

TORTOISE_ORM = {
    "connections": {"default": DATABASE_URL},
    "apps": {
        "models": {
            "models": ["app.models.database", "aerich.models"],
            "default_connection": "default",
        },
    },
    "timezone": "UTC",
}
