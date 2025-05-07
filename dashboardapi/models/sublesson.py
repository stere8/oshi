from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey
from database import Base

class SubLesson(Base):
    __tablename__ = "sublesson"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    schedule_date = Column(DateTime)
    notes = Column(String)
    lesson_id = Column(Integer, ForeignKey("lesson.id"))
    completed = Column(Boolean, default=False)