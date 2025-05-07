from sqlalchemy.orm import Session
from models.sublesson import SubLesson
from schemas.sublesson import SubLessonCreate

def create_sublesson(db: Session, sublesson: SubLessonCreate):
    db_sublesson = SubLesson(**sublesson.dict())
    db.add(db_sublesson)
    db.commit()
    db.refresh(db_sublesson)
    return db_sublesson

def get_all_sublessons(db: Session):
    return db.query(SubLesson).all()

def get_sublessons_of_lesson(db: Session, lesson_id: int):
    return db.query(SubLesson).filter(SubLesson.lesson_id == lesson_id).all()