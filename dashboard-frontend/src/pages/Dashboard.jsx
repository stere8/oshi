import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {api} from "../services/api"; // Adjust the import based on your project structure

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
    <div>
      <h2 className="text-2xl font-bold mb-4">Welcome Back!</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 shadow rounded">
          Total Lessons<br />
          <span className="text-xl font-bold">{lessons.length}</span>
        </div>
        <div className="bg-white p-4 shadow rounded">
          Completed<br />
          <span className="text-xl font-bold">{completed}</span>
        </div>
        <div className="bg-white p-4 shadow rounded">
          Average Progress<br />
          <span className="text-xl font-bold">{avgProgress}%</span>
        </div>
        <div className="bg-white p-4 shadow rounded">
          Pending<br />
          <span className="text-xl font-bold">{pending}</span>
        </div>
      </div>

      <div className="space-y-4">
      {lessons.map(lesson => (
  <div key={lesson.id} className="bg-white p-4 shadow rounded">
    <h3 className="font-semibold text-lg">
      <Link to={`/lesson/${lesson.id}`} className="text-blue-600 hover:underline">
        {lesson.title}
      </Link>
    </h3>
    <p className="text-gray-700 mb-2">{lesson.description}</p>
    <div className="h-2 bg-gray-200 rounded">
      <div
        className="h-2 rounded transition-all duration-300"
        style={{
          width: `${lesson.progress}%`,
          backgroundColor: lesson.progress >= 100 ? '#22c55e' : '#3b82f6'
        }}
      ></div>
    </div>
  </div>
))}

      </div>
    </div>
  );
};

export default Dashboard;
