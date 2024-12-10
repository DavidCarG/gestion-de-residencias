import api from './index';

export const fetchReports = async () => {
    const response = await api.get('/reports');
    return response.data;
};

export const createReports = async (report) => {
    const responde = await api.post('/reports', report);
    return responde.data;
}