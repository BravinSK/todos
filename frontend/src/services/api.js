import axios from 'axios';

const API_URL = 'http://localhost:8081';

const api = axios.create({
  baseURL: API_URL
});

// Add userId header to all requests if logged in
api.interceptors.request.use((config) => {
  const userId = localStorage.getItem('userId');
  if (userId) {
    config.headers['X-User-Id'] = userId;
  }
  return config;
});

export const auth = {
  signUp: (name, email, password) =>
    api.post('/auth/signup', { name, email, password }),
  signIn: (email, password) =>
    api.post('/auth/signin', { email, password }),
  signOut: () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('userName');
    return Promise.resolve();
  }
};

export const todos = {
  getAll: () => api.get('/todos'),
  create: (todo) => api.post('/todos', todo),
  update: (id, todo) => api.put(`/todos/${id}`, todo),
  delete: (id) => api.delete(`/todos/${id}`),
};
