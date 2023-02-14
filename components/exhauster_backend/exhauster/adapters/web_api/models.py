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