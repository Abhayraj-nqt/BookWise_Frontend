import app from '../apiClient';

// GET users
export const getUserByMobile = async (mobile, token) => {
    return await app.get(`/api/user/${mobile}`, {
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

export const getAllUsers = async (token) => {
    return await app.get(`/api/users`, {
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
    return await app.put(`/api/user/${mobile}`, user, {
        headers: {
            Authorization: token,
        }
    })
}

// DELETE user
export const removeUser = async (mobile, token) => {
    return await app.delete(`/api/user/${mobile}`, {
        headers: {
            Authorization: token,
        }
    })
}