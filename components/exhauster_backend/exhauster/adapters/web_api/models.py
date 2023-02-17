from typing import Optional

from pydantic import BaseModel, Field


class TestRequest(BaseModel):
    text: str

    class Config:
        schema_extra = {
            'example': {
                'text': 'text example',
            }
        }


class TestResponse(BaseModel):
    text: str
    id: int

    class Config:
        schema_extra = {
            'example': {
                'text': 'text example',
                'id': 1,
            }
        }


class CustomerID(BaseModel):
    id: int

    class Config:
        schema_extra = {
            'example': {
                'id': 1,
            }
        }


class Customer(BaseModel):
    id: int
    email: Optional[str] = None

    class Config:
        schema_extra = {
            'example': {
                'id': 1,
            }
        }
