import axios from 'axios';
import { logout } from '../ducks/auth';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_ROOT,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  }
});

export default {
  setDispatch(dispatch) {
    instance.interceptors.response.use(function (response) {
        return response;
      }, function (error) {
        if (error.response.status === 401) {
          dispatch(logout());
        } else {
          throw error;
        }
      });
  },
  setAuthToken: token => {
    instance.defaults.headers['Authorization'] = `Bearer ${token}`;
  },
  clearAuthToken: () => {
    delete instance.defaults.headers['Authorization'];
  },
  sessions: {
    create: data => instance.post('/sessions', data),
    delete: () => instance.delete('/sessions')
  },
  registrations: {
    create: data => instance.post('/registrations', data)
  },
  jogs: {
    fetch: userId => instance.get(`/users/${userId}/jogs`),
    create: (userId, data) => instance.post(`/users/${userId}/jogs`, data),
    update: (userId, data) => instance.put(`/users/${userId}/jogs/${data.id}`, data),
    destroy: (userId, jogId) => instance.delete(`/users/${userId}/jogs/${jogId}`),
    getAverages: (userId) => instance.get(`/users/${userId}/jogs/averages`),
  },
  users: {
    fetch: () => instance.get('/users'),
    update: user => instance.put(`/users/${user.id}`, user),
    updateRoles: (id, roles) => instance.put(`/users/${id}/roles`, { roles }),
    create: data => instance.post('/users', data),
    destroy: (userId) => instance.delete(`/users/${userId}`)
  }
};
