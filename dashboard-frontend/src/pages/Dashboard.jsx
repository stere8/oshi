import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";

const Dashboard = () => {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    api.getLessons()
      .then(res => setLessons(res.data))
      .catch(err => console.error("Failed to load lessons", err));
  }, []);

  const completed = lessons.filter(l => l.progress === 100).length;
  const pending = lessons.filter(l => l.progress === 0).length;
  const avgProgress = Math.round(
    lessons.reduce((acc, cur) => acc + cur.progress, 0) / (lessons.length || 1)
  );

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Welcome Back!</h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <SummaryCard label="Total Lessons" value={lessons.length} />
        <SummaryCard label="Completed" value={completed} />
        <SummaryCard label="Average Progress" value={`${avgProgress}%`} />
        <SummaryCard label="Pending" value={pending} />
      </div>

      {/* Lesson Progress List */}
      <div className="space-y-5">
        {lessons.map(lesson => (
          <div key={lesson.id} className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-center mb-2">
              <Link to={`/lesson/${lesson.id}`} className="text-xl font-semibold text-blue-600 hover:underline">
                {lesson.title}
              </Link>
              <span className="text-sm text-gray-500">{lesson.progress}%</span>
            </div>
            <p className="text-gray-600 mb-3">{lesson.description}</p>
            <div className="w-full h-3 bg-gray-200 rounded-full">
              <div
                className="h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${lesson.progress}%`,
                  backgroundColor: lesson.progress >= 100 ? "#16a34a" : "#2563eb"
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Reusable summary card
const SummaryCard = ({ label, value }) => (
  <div className="bg-white p-4 rounded-lg shadow text-center">
    <div className="text-sm text-gray-500 mb-1">{label}</div>
    <div className="text-xl font-bold text-gray-800">{value}</div>
  </div>
);

export default Dashboard;