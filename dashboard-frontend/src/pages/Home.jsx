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
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Weekly Lessons</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lessons.map(lesson => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </div>
  );
}
