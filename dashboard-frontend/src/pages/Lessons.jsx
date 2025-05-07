import { useEffect, useState } from "react";
import axios from "axios";

const Lessons = () => {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/lesson/")
      .then(res => setLessons(res.data))
      .catch(err => console.error("Failed to load lessons", err));
  }, []);

  return (
    <div>
      <h2 className="header">Your Lessons</h2>
      {lessons.length === 0 ? (
        <p>No lessons found.</p>
      ) : (
        lessons.map((lesson) => (
          <div className="card" key={lesson.id}>
            <h3>{lesson.title}</h3>
            <p>{lesson.description}</p>
            <div className="progress-bar">
              <div
                className="progress-bar-fill"
                style={{ width: `${lesson.progress}%` }}
              ></div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Lessons;
