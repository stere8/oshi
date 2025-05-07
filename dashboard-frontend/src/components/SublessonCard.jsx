import { useState } from 'react';
import { Pencil1Icon, TrashIcon, CheckIcon, Cross2Icon } from '@radix-ui/react-icons';

const SublessonCard = ({ sublesson, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedSublesson, setEditedSublesson] = useState({
    title: sublesson.title,
    notes: sublesson.notes,
    schedule_date: sublesson.schedule_date,
  });

  const handleSave = () => {
    onUpdate(sublesson.id, editedSublesson);
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-4 shadow rounded mb-4">
      {isEditing ? (
        <>
          <input
            value={editedSublesson.title}
            onChange={(e) => setEditedSublesson({ ...editedSublesson, title: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
          />
          <textarea
            value={editedSublesson.notes}
            onChange={(e) => setEditedSublesson({ ...editedSublesson, notes: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="datetime-local"
            value={editedSublesson.schedule_date}
            onChange={(e) => setEditedSublesson({ ...editedSublesson, schedule_date: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
          />
        </>
      ) : (
        <>
          <h4 className="font-semibold text-lg">{sublesson.title}</h4>
          <p className="text-gray-700">{sublesson.notes}</p>
          <p className="text-sm text-gray-500 mt-1">Scheduled: {new Date(sublesson.schedule_date).toLocaleString()}</p>
        </>
      )}

      <div className="flex gap-2 justify-end mt-3">
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
            <button onClick={() => onDelete(sublesson.id)} className="p-2 bg-red-500 hover:bg-red-600 text-white rounded">
              <TrashIcon />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SublessonCard;