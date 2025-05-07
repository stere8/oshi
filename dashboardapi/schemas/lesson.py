from pydantic import BaseModel
from typing import Optional

class LessonBase(BaseModel):
    title: str
    description: Optional[str] = None

class LessonCreate(LessonBase):
    pass

class LessonResponse(LessonBase):
    id:int
    progress: float

    class Config:
        orm_mode = True