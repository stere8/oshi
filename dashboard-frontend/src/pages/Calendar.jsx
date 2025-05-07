import { useEffect, useState } from "react";
import { api } from "../services/api";

const Calendar = () => {
  const [lessons, setLessons] = useState([]);
  const [sublessons, setSublessons] = useState([]);
  const [newSublesson, setNewSublesson] = useState({
    title: "",
    schedule_date: "",
    notes: "",
    lesson_id: "",
    completed: false
  });

  useEffect(() => {
    // Load lessons for the dropdown
    api.getLessons()
      .then(res => setLessons(res.data))
      .catch(err => console.error("Failed to load lessons", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.createSubLesson(newSublesson);
      setSublessons([...sublessons, response.data]);
      // Reset form
      setNewSublesson({
        title: "",
        schedule_date: "",
        notes: "",
        lesson_id: "",
        completed: false
      });
    } catch (err) {
      console.error("Failed to create sublesson", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Calendar</h2>

      {/* Add Sublesson Form */}
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <h3 className="text-xl font-semibold mb-4">Add New Sub-lesson</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div>
            <label className="block text-sm font-medium text-gray-700">Lesson</label>
            <select
              value={newSublesson.lesson_id}
              onChange={(e) => setNewSublesson({...newSublesson, lesson_id: parseInt(e.target.value)})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              required
            >
              <option value="">Select a lesson</option>
              {lessons.map(lesson => (
                <option key={lesson.id} value={lesson.id}>
                  {lesson.title}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Add Sub-lesson
          </button>
        </form>
      </div>

      {/* Calendar View (to be implemented with a calendar library) */}
      <div className="bg-white p-6 rounded-xl shadow">
        <p className="text-gray-500">Calendar view will be implemented here</p>
      </div>
    </div>
  );
};

export default Calendar;