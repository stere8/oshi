from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class SubLessonCreate(BaseModel):
    title: str
    schedule_date: datetime
    notes: Optional[str]
    lesson_id:int

class SubLessonResponse(SubLessonCreate):
    id: int
    completed: bool

    class Config:
        orm_mode = True