import { useState } from 'react';
import { Pencil1Icon, TrashIcon, CheckIcon, Cross2Icon } from '@radix-ui/react-icons';

const LessonCard = ({ lesson, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLesson, setEditedLesson] = useState({
    title: lesson.title,
    description: lesson.description
  });

  const handleSave = () => {
    onUpdate(lesson.id, editedLesson);
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
      {isEditing ? (
        <>
          <input
            value={editedLesson.title}
            onChange={(e) => setEditedLesson({ ...editedLesson, title: e.target.value })}
            className="w-full mb-3 border border-gray-300 rounded-md p-2 text-sm"
            placeholder="Title"
          />
          <textarea
            value={editedLesson.description}
            onChange={(e) => setEditedLesson({ ...editedLesson, description: e.target.value })}
            className="w-full mb-3 border border-gray-300 rounded-md p-2 text-sm"
            placeholder="Description"
            rows={3}
          />
        </>
      ) : (
        <>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{lesson.title}</h3>
          <p className="text-gray-600 text-sm mb-3">{lesson.description}</p>
        </>
      )}

      <p className="text-sm text-gray-500 mb-4">Progress: {lesson.progress}%</p>

      <div className="flex gap-3 justify-end">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="p-2 rounded-md bg-green-500 hover:bg-green-600 text-white focus:outline-none focus:ring-2 focus:ring-green-300"
              aria-label="Save"
            >
              <CheckIcon />
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="p-2 rounded-md bg-gray-400 hover:bg-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-gray-300"
              aria-label="Cancel"
            >
              <Cross2Icon />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 rounded-md bg-yellow-400 hover:bg-yellow-500 text-white focus:outline-none focus:ring-2 focus:ring-yellow-300"
              aria-label="Edit"
            >
              <Pencil1Icon />
            </button>
            <button
              onClick={() => onDelete(lesson.id)}
              className="p-2 rounded-md bg-red-500 hover:bg-red-600 text-white focus:outline-none focus:ring-2 focus:ring-red-300"
              aria-label="Delete"
            >
              <TrashIcon />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LessonCard;
