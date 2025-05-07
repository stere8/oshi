import { useState, useEffect } from "react";
import { api } from "../services/api";
import SublessonCard from "../components/SublessonCard";

const Calendar = () => {
  const [lessons, setLessons] = useState([]);
  const [sublessons, setSublessons] = useState([]);
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [newSublesson, setNewSublesson] = useState({
    title: "",
    schedule_date: "",
    notes: "",
    lesson_id: "",
    completed: false,
  });

  useEffect(() => {
    api.getLessons()
      .then(res => setLessons(res.data))
      .catch(err => console.error("Failed to load lessons", err));

    api.getAllSubLessons()
      .then(res => setSublessons(res.data))
      .catch(err => console.error("Failed to load sublessons", err));
  }, []);

  const handleCreateSublesson = async (e) => {
    e.preventDefault();
    try {
      const response = await api.createSubLesson(newSublesson);
      setSublessons(prev => [...prev, response.data]);
      setNewSublesson({
        title: "",
        schedule_date: "",
        notes: "",
        lesson_id: "",
        completed: false,
      });
    } catch (err) {
      console.error("Failed to create sublesson", err);
    }
  };

  const handleUpdateSublesson = async (id, updatedData) => {
    try {
      await api.updateSubLesson(id, updatedData);
      setSublessons(prev => prev.map(s => s.id === id ? { ...s, ...updatedData } : s));
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleDeleteSublesson = async (id) => {
    try {
      await api.deleteSubLesson(id);
      setSublessons(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const filtered = sublessons.filter(s =>
    s.schedule_date.startsWith(selectedDate)
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Calendar</h2>

      {/* Date Selector */}
      <div className="mb-6">
        <label className="block mb-1 font-medium">Select a Date</label>
        <input
          type="date"
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
          className="border rounded px-3 py-2"
        />
      </div>

      {/* Sublesson Form */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">Add Sublesson</h3>
        <form onSubmit={handleCreateSublesson} className="grid gap-4">
          <input
            type="text"
            value={newSublesson.title}
            onChange={e => setNewSublesson({ ...newSublesson, title: e.target.value })}
            placeholder="Title"
            required
            className="border p-2 rounded"
          />
          <input
            type="datetime-local"
            value={newSublesson.schedule_date}
            onChange={e => setNewSublesson({ ...newSublesson, schedule_date: e.target.value })}
            required
            className="border p-2 rounded"
          />
          <textarea
            value={newSublesson.notes}
            onChange={e => setNewSublesson({ ...newSublesson, notes: e.target.value })}
            placeholder="Notes"
            className="border p-2 rounded"
          />
          <select
            value={newSublesson.lesson_id}
            onChange={e => setNewSublesson({ ...newSublesson, lesson_id: parseInt(e.target.value) })}
            required
            className="border p-2 rounded"
          >
            <option value="">Select a Lesson</option>
            {lessons.map(lesson => (
              <option key={lesson.id} value={lesson.id}>{lesson.title}</option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </form>
      </div>

      {/* Sublessons for Selected Date */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-2">Scheduled on {selectedDate}:</h3>
        {filtered.length === 0 ? (
          <p className="text-gray-500">No sublessons scheduled.</p>
        ) : (
          filtered.map(s => (
            <SublessonCard
              key={s.id}
              sublesson={s}
              onUpdate={handleUpdateSublesson}
              onDelete={handleDeleteSublesson}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Calendar;