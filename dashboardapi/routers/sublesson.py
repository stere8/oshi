from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
import crud.sublesson as sublesson_crud
import schemas.sublesson as sublesson_schema

router = APIRouter(prefix="/sublesson", tags=["sublesson"])

@router.post("/", response_model= sublesson_schema.SubLessonResponse)
def create_lesson(sublesson: sublesson_schema.SubLessonCreate, db: Session = Depends(get_db)):
    return sublesson_crud.create_sublesson(db, sublesson)

@router.get("/", response_model= list[sublesson_schema.SubLessonResponse])
def read_lessons(db: Session = Depends(get_db)):
    return sublesson_crud.get_all_sublessons(db)

@router.get("/lesson/{lesson_id}")
def get_sublessons_by_lesson(lesson_id: int, db: Session = Depends(get_db)):
    sublessons = sublesson_crud.get_sublessons_of_lesson(db, lesson_id)
    if not sublessons:
        raise HTTPException(status_code=404, detail="No sublessons found for this lesson")
    return sublessons