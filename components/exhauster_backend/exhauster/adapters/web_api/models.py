from typing import Optional

from pydantic import BaseModel, Field


class ExhausterRequest(BaseModel):
    number: str

    class Config:
        schema_extra = {
            'example': {
                'number': '7',
            }
        }
