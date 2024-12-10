import api from './index';

export const fetchProjects = async () => {
    const response = await api.get('/projects');
    return response.data;
};

export const createProject = async (project) => {
    const responde = await api.post('/projects', project);
    return responde.data;
}