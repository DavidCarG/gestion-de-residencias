import api from './index';

export const createUser = async (user) => {
    const response = await api.post('/users', user);
    return response;
}

export const fetchUserById = async (id) => {
    const response = await api.get(`/users/${id}`);
    return response;
}

export const fetchUsers = async () => {
    const response = await api.get('/users');
    return response.data;
}

export const updateUser = async (id, user) => {
    const response = await api.patch(`/users/${id}`, user);
    return response;
}

export const deleteUser = async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response;
}