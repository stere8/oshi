import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000'; // Update if needed

export const api = {
    getLessons: () => axios.get(`${API_URL}/lessons`),
    createLesson: (lesson) => axios.post(`${API_URL}/lessons`, lesson),
    updateLesson: (id, lesson) => axios.put(`${API_URL}/lessons/${id}`, lesson),
    deleteLesson: (id) => axios.delete(`${API_URL}/lessons/${id}`),
    getCalendarStats: () => axios.get(`${API_URL}/lessons/stats/calendar`),
  };