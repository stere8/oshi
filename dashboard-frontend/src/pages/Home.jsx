import { useEffect, useState } from "react";
import api from "../services/api";
import LessonCard from "../components/LessonCard";

export default function Home() {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    api.get("/lessons/", { withCredentials: false })
      .then(res => setLessons(res.data))
      .catch(err => {
        console.error("API Fetch Failed:", err.message);
        alert("Could not fetch lessons. See console for details.");
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        📘 Weekly Lessons
      </h1>
      <div className="bg-red-500 text-white p-4">
  If you see a red box, Tailwind is working!
</div>


      {lessons.length === 0 ? (
        <p className="text-center text-gray-500">No lessons found yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lessons.map(lesson => (
            <LessonCard key={lesson.id} lesson={lesson} />
            
          ))}
          <div className="bg-red-500 text-white p-4">
  If you see a red box, Tailwind is working!
</div>

        </div>
      )}
    </div>
  );
}
