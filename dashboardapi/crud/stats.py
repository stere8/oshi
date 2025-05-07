from sqlalchemy.orm import Session
from models.sublesson import SubLesson
from datetime import datetime, timedelta
from sqlalchemy import func

def get_calendar_stats(db: Session):
    # Get today's date
    today = datetime.now().date()
    
    # Get week range
    start_of_week = today - timedelta(days=today.weekday())
    end_of_week = start_of_week + timedelta(days=6)

    # Get tasks for this week
    weekly_tasks = db.query(SubLesson).filter(
        func.date(SubLesson.schedule_date) >= start_of_week,
        func.date(SubLesson.schedule_date) <= end_of_week
    ).all()

    # Calculate stats
    total_tasks = len(weekly_tasks)
    completed_tasks = len([task for task in weekly_tasks if task.completed])
    completion_rate = (completed_tasks / total_tasks * 100) if total_tasks > 0 else 0

    return {
        "total_tasks": total_tasks,
        "completed_tasks": completed_tasks,
        "completion_rate": round(completion_rate, 2),
        "week_start": start_of_week.isoformat(),
        "week_end": end_of_week.isoformat()
    }