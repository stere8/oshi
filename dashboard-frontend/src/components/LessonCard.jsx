import { Link } from "react-router-dom";

export default function LessonCard({ lesson, onDelete }) {
  const handleDelete = (e) => {
    e.preventDefault(); // Prevent link navigation
    onDelete(lesson.id);
  };

  return (
    <Link to={`/lesson/${lesson.id}`}>
      <div className="p-4 bg-white rounded-xl shadow hover:shadow-md transition">
        <h2 className="text-xl font-semibold text-gray-800">{lesson.title}</h2>
        <p className="text-sm text-gray-500">{lesson.description}</p>
        <div className="mt-2 text-sm text-green-700 font-medium">
          Progress: {lesson.progress}%
        </div>
        <button 
          onClick={handleDelete}
          className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </Link>
  );
}