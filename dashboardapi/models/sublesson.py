from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import mapped_column, Mapped

from database import Base

class SubLesson(Base):
    __tablename__ = "sublesson"

    id = Column(Integer, primary_key=True,index=True)
    lesson_id = Column(Integer, ForeignKey('lesson.id'))
    title: Mapped[str] = mapped_column(String, nullable=False)
    schedule_date = Column(DateTime)
    notes = Column(String, nullable=True)
    completed = Column(Boolean)