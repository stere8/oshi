import { useState } from 'react';
import { Pencil1Icon, TrashIcon, CheckIcon, Cross2Icon } from '@radix-ui/react-icons';

const LessonCard = ({ lesson, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLesson, setEditedLesson] = useState({ title: lesson.title, description: lesson.description });

  const handleSave = () => {
    onUpdate(lesson.id, editedLesson);
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-4 shadow rounded">
      {isEditing ? (
        <>
          <input
            value={editedLesson.title}
            onChange={(e) => setEditedLesson({ ...editedLesson, title: e.target.value })}
            className="w-full mb-2 border rounded p-2"
          />
          <textarea
            value={editedLesson.description}
            onChange={(e) => setEditedLesson({ ...editedLesson, description: e.target.value })}
            className="w-full mb-2 border rounded p-2"
          />
        </>
      ) : (
        <>
          <h3 className="font-semibold text-lg">{lesson.title}</h3>
          <p className="text-gray-700 mb-2">{lesson.description}</p>
        </>
      )}

      <div className="text-sm text-gray-600 mb-3">Progress: {lesson.progress}%</div>

      <div className="flex gap-2 justify-end">
        {isEditing ? (
          <>
            <button onClick={handleSave} className="p-2 bg-green-500 hover:bg-green-600 text-white rounded">
              <CheckIcon />
            </button>
            <button onClick={() => setIsEditing(false)} className="p-2 bg-gray-400 hover:bg-gray-500 text-white rounded">
              <Cross2Icon />
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)} className="p-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded">
              <Pencil1Icon />
            </button>
            <button onClick={() => onDelete(lesson.id)} className="p-2 bg-red-500 hover:bg-red-600 text-white rounded">
              <TrashIcon />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LessonCard;