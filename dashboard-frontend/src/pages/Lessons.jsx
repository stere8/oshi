import { useEffect, useState } from "react";
import { api } from "../services/api";
import LessonCard from "../components/LessonCard";

const Lessons = () => {
  const [lessons, setLessons] = useState([]);
  const [newLesson, setNewLesson] = useState({ title: "", description: "" });

  useEffect(() => {
    loadLessons();
  }, []);

  const loadLessons = async () => {
    try {
      const res = await api.getLessons();
      setLessons(res.data);
    } catch (err) {
      console.error("Failed to load lessons", err);
    }
  };

  const handleCreateLesson = async (e) => {
    e.preventDefault();
    try {
      await api.createLesson(newLesson);
      setNewLesson({ title: "", description: "" });
      loadLessons();
    } catch (err) {
      console.error("Failed to create lesson", err);
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    try {
      await api.deleteLesson(lessonId);
      loadLessons();
    } catch (err) {
      console.error("Failed to delete lesson", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Your Lessons</h2>
      
      {/* Add Lesson Form */}
      <form onSubmit={handleCreateLesson} className="mb-8 space-y-4">
        <input
          type="text"
          value={newLesson.title}
          onChange={(e) => setNewLesson({...newLesson, title: e.target.value})}
          placeholder="Lesson Title"
          className="w-full p-2 border rounded"
        />
        <textarea
          value={newLesson.description}
          onChange={(e) => setNewLesson({...newLesson, description: e.target.value})}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />
        <button 
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Lesson
        </button>
      </form>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.length === 0 ? (
          <p className="text-gray-500">No lessons found.</p>
        ) : (
          lessons.map((lesson) => (
            <LessonCard 
              key={lesson.id} 
              lesson={lesson} 
              onDelete={handleDeleteLesson}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Lessons;