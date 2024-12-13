import api from './index';

export const createProject = async (project) => {
    const response = await api.post('/projects', project);
    return response.data;
}

export const fetchProjectById = async (id) => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
}

export const fetchProjects = async () => {
    const response = await api.get('/projects');
    return response.data;
}

export const fetchProjectsReports = async (id) => {
    const response = await api.get(`/projects/${id}/reports`);
    return response.data;
}

export const updateProject = async (id, project) => {
    const response = await api.patch(`/projects/${id}`, project);
    return response.data;
}

export const deleteProject = async (id) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
}

