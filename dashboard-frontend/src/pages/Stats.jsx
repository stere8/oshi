import { useEffect, useState } from "react";
import { api } from "../services/api";

const Stats = () => {
  const [stats, setStats] = useState({
    totalLessons: 0,
    completedLessons: 0,
    averageProgress: 0,
    subLessonsThisWeek: 0
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // Get calendar stats from backend
      const statsRes = await api.getCalendarStats();
      const calendarStats = statsRes.data;

      // Get all lessons for basic stats
      const lessonsRes = await api.getLessons();
      const lessons = lessonsRes.data;

      // Calculate lesson stats
      const totalLessons = lessons.length;
      const completedLessons = lessons.filter(l => l.progress === 100).length;
      const averageProgress = lessons.reduce((acc, l) => acc + l.progress, 0) / totalLessons || 0;

      setStats({
        totalLessons,
        completedLessons,
        averageProgress,
        subLessonsThisWeek: calendarStats.total_tasks || 0
      });
    } catch (err) {
      console.error("Failed to load stats", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Statistics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Total Lessons</h3>
          <p className="text-3xl font-bold">{stats.totalLessons}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Completed Lessons</h3>
          <p className="text-3xl font-bold">{stats.completedLessons}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Average Progress</h3>
          <p className="text-3xl font-bold">{stats.averageProgress.toFixed(1)}%</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">Sub-lessons This Week</h3>
          <p className="text-3xl font-bold">{stats.subLessonsThisWeek}</p>
        </div>
      </div>
    </div>
  );
};

export default Stats;