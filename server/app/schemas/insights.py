from datetime import datetime
from typing import Literal

from app.schemas.common import CamelModel


class InsightsResultOut(CamelModel):
    risk_overview: str
    suggestion: str
    generated_at: datetime
    input_hash: str


class NotApplicableOut(CamelModel):
    not_applicable: Literal[True] = True
