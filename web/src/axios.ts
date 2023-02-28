import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://cnd-app.onrender.com',
});
