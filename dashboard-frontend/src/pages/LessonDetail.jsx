import { useParams } from "react-router-dom";

const LessonDetail = () => {
  const { id } = useParams();

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-2">Lesson #{id}</h2>
      {/* You can fetch lesson detail by ID here */}
      <p>More details coming soon...</p>
    </div>
  );
};

export default LessonDetail;
