from sqlalchemy import Column, Integer, String, Float
from database import Base

class Lesson(Base):
    __tablename__ = "lesson"

    id = Column(Integer, primary_key=True,index=True)
    title = Column(String,unique=True,nullable=False)
    description = Column(String, nullable=True)
    progress = Column(Float, default=0.0)  # auto-calculated later
