from typing import Optional, List

from pydantic import BaseModel
from datetime import datetime


class ExhausterRequest(BaseModel):
    number: str


class LinesRequest(BaseModel):
    start: datetime
    stop: datetime
    filter: Optional[List['str']]

    class Config:
        schema_extra = {
            'example': {
                'number': '7',
            }
        }
