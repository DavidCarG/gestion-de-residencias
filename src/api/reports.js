import api from './index';

export const fetchUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const createReport = async (report) => {
  const response = await api.post('/reports', report);
  return response.data;
};
