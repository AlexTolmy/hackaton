from pydantic import BaseModel
from datetime import datetime


class ExhausterRequest(BaseModel):
    number: str


class LinesRequest(BaseModel):
    start: datetime
    stop: datetime
    win: str = '1h'
