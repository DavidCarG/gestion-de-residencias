import api from './index';

export const createReport = async (report) => {
  const response = await api.post('/reports', report);
  return response.data;
};

export const fetchReportById = async (id) => {
  const response = await api.get(`/reports/${id}`);
  return response.data;
};

export const fetchReports = async () => {
  const response = await api.get('/reports');
  return response.data;
};

export const updateReport = async (id, report) => {
  const response = await api.patch(`/reports/${id}`, report);
  return response.data;
};

export const deleteReport = async (id) => {
  const response = await api.delete(`/reports/${id}`);
  return response.data;
};
