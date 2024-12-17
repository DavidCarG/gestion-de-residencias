import api from './index';

export const registerRequest = async (user) => {
  const response = await api.post('/register', user);
  return response.data;
};

export const loginRequest = async (user) => {
  const response = await api.post('/login', user);
  return response.data;
};

export const logoutRequest = async () => {
  const response = await api.post('/logout');
  return response.data;
};

export const verifyTokenRequest = async () => {
  const response = await api.get('/profile');
  return response.data;
};
