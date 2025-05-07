import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../services/api";

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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Lesson Details</h2>
      
      {/* Lesson Details */}
      {lesson && (
        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <h3 className="text-xl font-semibold">{lesson.title}</h3>
          <p className="text-gray-600 mt-2">{lesson.description}</p>
        </div>
      )}

      {/* Add Sublesson Form */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h3 className="text-lg font-semibold mb-4">Add New Sub-lesson</h3>
        <form onSubmit={handleAddSublesson} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={newSublesson.title}
              onChange={(e) => setNewSublesson({...newSublesson, title: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Schedule Date</label>
            <input
              type="datetime-local"
              value={newSublesson.schedule_date}
              onChange={(e) => setNewSublesson({...newSublesson, schedule_date: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              value={newSublesson.notes}
              onChange={(e) => setNewSublesson({...newSublesson, notes: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Sub-lesson
          </button>
        </form>
      </div>

      {/* Sublessons List */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold mb-4">Sub-lessons</h3>
        {sublessons.length > 0 ? (
          <div className="space-y-4">
            {sublessons.map((sublesson) => (
              <div key={sublesson.id} className="border p-4 rounded-lg">
                <h4 className="font-medium">{sublesson.title}</h4>
                <p className="text-sm text-gray-600">{sublesson.notes}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Scheduled for: {new Date(sublesson.schedule_date).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500">
                  Status: {sublesson.completed ? "Completed" : "Pending"}
                </p>
              </div>
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