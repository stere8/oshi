import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

export const api = {
  getLessons: () => axios.get(`${API_BASE_URL}/lessons/`),
  createLesson: (lesson) => axios.post(`${API_BASE_URL}/lesson/`, lesson),
  updateLesson: (id, lesson) => axios.put(`${API_BASE_URL}/lesson/${id}`, lesson),
  deleteLesson: (id) => axios.delete(`${API_BASE_URL}/lesson/${id}`),
  getSubLessons: (lessonId) => axios.get(`${API_BASE_URL}/sublesson/lesson/${lessonId}`),
  createSubLesson: (subLesson) => axios.post(`${API_BASE_URL}/sublesson/`, subLesson),
  getLessonDetail: (id) => axios.get(`${API_BASE_URL}/lesson/${id}`),
};