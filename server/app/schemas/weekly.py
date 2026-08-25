from datetime import datetime
from typing import Literal

from app.schemas.common import CamelModel


class WeeklyTaskOut(CamelModel):
    id: str
    text: str


class WeeklyRecommendationOut(CamelModel):
    iso_year: int
    iso_week: int
    summary: str
    tasks: list[WeeklyTaskOut]
    generated_at: datetime


class NotLinkedOut(CamelModel):
    not_linked: Literal[True] = True
