from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
import crud.lesson as lesson_crud
import schemas.lesson as lesson_schema

router = APIRouter(prefix="/lesson", tags=["lesson"])

@router.post("/", response_model= lesson_schema.LessonResponse)
def create_lesson(lesson: lesson_schema.LessonCreate, db: Session = Depends(get_db)):
    return lesson_crud.create_lesson(db, lesson)

@router.get("/", response_model= list[lesson_schema.LessonResponse])
def read_lessons(db: Session = Depends(get_db)):
    return lesson_crud.get_all_lessons(db)