from sqlalchemy.orm import Session
from models.lesson import Lesson
from schemas.lesson import LessonCreate

def create_lesson(db: Session, lesson: LessonCreate):
    db_lesson = Lesson(**lesson.dict())
    db.add(db_lesson)
    db.commit()
    db.refresh(db_lesson)
    return db_lesson

def get_all_lessons(db: Session):
    return db.query(Lesson).all()

# Add these new functions
def get_lesson_by_id(db: Session, lesson_id: int):
    return db.query(Lesson).filter(Lesson.id == lesson_id).first()

def update_lesson(db: Session, lesson_id: int, lesson_data: dict):
    db_lesson = get_lesson_by_id(db, lesson_id)
    if db_lesson:
        for key, value in lesson_data.items():
            setattr(db_lesson, key, value)
        db.commit()
        db.refresh(db_lesson)
    return db_lesson

def delete_lesson(db: Session, lesson_id: int):
    db_lesson = get_lesson_by_id(db, lesson_id)
    if db_lesson:
        db.delete(db_lesson)
        db.commit()
        return True
    return False