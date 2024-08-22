import app from '../apiClient';

export const login = async (username, password) => {
    return await app.post(`/api/login`, {username, password});
}

export const getCurrentUser = async (token) => {
    return await app.get(`/api/current-user`, {
        headers: {
            Authorization: token,
        }
    })
}

export const logout = () => {
    window.localStorage.removeItem('authtoken');
}