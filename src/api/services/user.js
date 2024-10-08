import app from '../apiClient';

const API_USER = `/api/user`;

// GET users
export const getUserByMobile = async (mobile, token) => {
    return await app.get(`${API_USER}/${mobile}`, {
        headers: {
            Authorization: token,
        }
    })
}

export const getTotalUserCount = async (token) => {
    return await app.get(`/api/user-count`, {
        headers: {
            Authorization: token,
        }
    })
}

export const getActiveUserCount = async (token) => {
    return await app.get(`/api/users/active-count`, {
        headers: {
            Authorization: token,
        }
    });
}

export const getAllUsers = async (page, size, sortBy, sortDir, search, token) => {
    return await app.get(`/api/users`, {
        params: {
            page: page,
            size: size,
            sortBy: sortBy,
            sortDir: sortDir,
            search: search,
        },
        headers: {
            Authorization: token,
        }
    })
}


// CREATE user
export const registerUser = async (user, token) => {
    return await app.post(`/api/register`, user, {
        headers: {
            Authorization: token,
        }
    })
}

// UPDATE user
export const updateUser = async (mobile, user, token) => {
    return await app.put(`${API_USER}/${mobile}`, user, {
        headers: {
            Authorization: token,
        }
    })
}

// DELETE user
export const removeUser = async (mobile, token) => {
    return await app.delete(`${API_USER}/${mobile}`, {
        headers: {
            Authorization: token,
        }
    })
}


// USER History

// BOOK History
export const getUserHistory = async (mobile, page, size, sortBy, sortDir, search, token) => {
    return await app.get(`${API_USER}/history/${mobile}`, {
        params: {
            page: page,
            size: size,
            sortBy: sortBy,
            sortDir: sortDir,
            search: search,
        },
        headers: {
            Authorization: token,
        }
    })
}