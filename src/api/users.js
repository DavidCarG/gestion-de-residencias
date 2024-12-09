import api from './index';

export const fetchUsers = async () => {
    const response = await api.get('/users');
    return response.data;
};

export const createUser = async (user) => {
    const response = await api.post('/users', user);
    return response.data;
}