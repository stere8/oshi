from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
from crud import lesson as lesson_crud
from crud import stats as stats_crud
from schemas.lesson import LessonCreate

router = APIRouter(prefix="/lessons", tags=["lessons"])

@router.post("/")
def create_lesson(lesson: LessonCreate, db: Session = Depends(get_db)):
    return lesson_crud.create_lesson(db, lesson)

@router.get("/")
def get_lessons(db: Session = Depends(get_db)):
    return lesson_crud.get_all_lessons(db)

@router.get("/{lesson_id}")
def get_lesson(lesson_id: int, db: Session = Depends(get_db)):
    lesson = lesson_crud.get_lesson_by_id(db, lesson_id)
    if not lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return lesson

@router.put("/{lesson_id}")
def update_lesson(lesson_id: int, lesson_data: dict, db: Session = Depends(get_db)):
    updated_lesson = lesson_crud.update_lesson(db, lesson_id, lesson_data)
    if not updated_lesson:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return updated_lesson

@router.delete("/{lesson_id}")
def delete_lesson(lesson_id: int, db: Session = Depends(get_db)):
    success = lesson_crud.delete_lesson(db, lesson_id)
    if not success:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return {"message": "Lesson deleted successfully"}

@router.get("/stats/calendar")
def get_calendar_stats(db: Session = Depends(get_db)):
    return stats_crud.get_calendar_stats(db)