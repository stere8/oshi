import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../services/api";
import SublessonCard from "../components/SublessonCard";

const LessonDetail = () => {
  const { id } = useParams();
  const [sublessons, setSublessons] = useState([]);
  const [lesson, setLesson] = useState(null);
  const [newSublesson, setNewSublesson] = useState({
    title: "",
    notes: "",
    schedule_date: "",
    lesson_id: id,
    completed: false
  });

  useEffect(() => {
    loadLessonAndSublessons();
  }, [id]);

  const loadLessonAndSublessons = async () => {
    try {
      // Load lesson details
      const lessonRes = await api.getSubLessons(id);
      setLesson(lessonRes.data);

      // Load sublessons
      const sublessonsRes = await api.getSubLessons(id);
      setSublessons(sublessonsRes.data);
    } catch (err) {
      console.error("Failed to load lesson details", err);
    }
  };

  const handleUpdateSublesson = async (id, updatedData) => {
    try {
      await api.updateSubLesson(id, updatedData);
      setSublessons((prev) =>
        prev.map(s => s.id === id ? { ...s, ...updatedData } : s)
      );
    } catch (err) {
      console.error("Failed to update sublesson", err);
    }
  };
  
  const handleDeleteSublesson = async (id) => {
    try {
      await api.deleteSubLesson(id);
      setSublessons((prev) => prev.filter(s => s.id !== id));
    } catch (err) {
      console.error("Failed to delete sublesson", err);
    }
  };

  const handleAddSublesson = async (e) => {
    e.preventDefault();
    try {
      const response = await api.createSubLesson(newSublesson);
      setSublessons([...sublessons, response.data]);
      setNewSublesson({
        title: "",
        notes: "",
        schedule_date: "",
        lesson_id: id,
        completed: false
      });
    } catch (err) {
      console.error("Failed to create sublesson", err);
    }
  };

  return (
<div className="max-w-3xl mx-auto p-6">
  <h2 className="text-3xl font-bold mb-6">📘 Lesson Details</h2>

  {/* Lesson Info */}
  {lesson && (
    <div className="bg-white p-6 rounded-xl shadow mb-8">
      <h3 className="text-2xl font-semibold text-gray-800">{lesson.title}</h3>
      <p className="text-gray-600 mt-2">{lesson.description}</p>
    </div>
  )}

  {/* Sublesson Form */}
  <div className="bg-white p-6 rounded-xl shadow mb-10">
    <h3 className="text-xl font-semibold mb-4">➕ Add New Sub-lesson</h3>
    <form onSubmit={handleAddSublesson} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={newSublesson.title}
          onChange={(e) => setNewSublesson({ ...newSublesson, title: e.target.value })}
          className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Schedule Date</label>
        <input
          type="datetime-local"
          value={newSublesson.schedule_date}
          onChange={(e) => setNewSublesson({ ...newSublesson, schedule_date: e.target.value })}
          className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Notes</label>
        <textarea
          value={newSublesson.notes}
          onChange={(e) => setNewSublesson({ ...newSublesson, notes: e.target.value })}
          className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Add Sub-lesson
      </button>
    </form>
  </div>

  {/* Sublessons */}
  <div className="bg-white p-6 rounded-xl shadow">
    <h3 className="text-xl font-semibold mb-4">📋 Sub-lessons</h3>
    {sublessons.length > 0 ? (
      <div className="space-y-4">
        {sublessons.map((sublesson) => (
          <SublessonCard
            key={sublesson.id}
            sublesson={sublesson}
            onDelete={handleDeleteSublesson}
            onUpdate={handleUpdateSublesson}
          />
        ))}
      </div>
    ) : (
      <p className="text-gray-500">No sub-lessons yet</p>
    )}
  </div>
</div>
  );
};

export default LessonDetail;