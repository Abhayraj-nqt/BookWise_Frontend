import app from '../apiClient';

// GET issuance
export const getIssuanceById = async (id, token) => {
    return await app.get(`/api/issuance/${id}`, {
        headers: {
            Authorization: token,
        }
    })
}


// CREATE issuance
export const createIssuance = async (issuance, token) => {
    return await app.post(`/api/issuance`, issuance, {
        headers: {
            Authorization: token,
        }
    })
}


// UPDATE issuance
export const updateIssuance = async (id, issuance, token) => {
    return await app.put(`/api/issuance/${id}`, issuance, {
        headers: {
            Authorization: token,
        }
    })
}

export const updateStatus = async (id, newStatus, token) => {
    return await app.put(`/api/issuance/status/${id}`, { newStatus }, {
        headers: {
            Authorization: token,
        }
    })
}


// DELETE issuance
export const deleteIssuance = async (id, token) => {
    return await app.delete(`/api/issuance/${id}`, {
        headers: {
            Authorization: token,
        }
    })
}


// ---------------------------- More GET endpoints -----------------------------------


export const getIssuancesByMobile = async (mobile, token) => {
    return await app.get(`/api/issuance/mobile/${mobile}`, {
        headers: {
            Authorization: token,
        }
    })
}

export const getIssuancesByIssueDateRange = async (startDate, endDate, token) => {
    return await app.get(`/api/issuance/issueDateRange/${startDate}/${endDate}`, {
        headers: {
            Authorization: token,
        }
    })
}