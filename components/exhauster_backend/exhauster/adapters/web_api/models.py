from datetime import datetime

from pydantic import BaseModel


class ExhausterRequest(BaseModel):
    number: str


class LinesRequest(BaseModel):
    start: datetime
    stop: datetime
    win: str = '1h'


class RotorUpdateRequest(BaseModel):
    installed_at: datetime
    exhauster_number: int
