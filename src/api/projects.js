import api from './index';

export const fetchProjects = async () => {
  const response = await api.get('/projects');
  return response.data;
};

export const createProject = async (project) => {
  const response = await api.post('/projects', project);
  return response.data;
};
