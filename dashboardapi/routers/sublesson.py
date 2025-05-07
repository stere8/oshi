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