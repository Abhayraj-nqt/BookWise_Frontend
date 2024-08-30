import app from '../apiClient';

const API_ISSUANCE = `/api/issuance`;

// GET issuance
export const getAllIssuances = async (page, size, sortBy, sortDir, search, token) => {
    return await app.get(`/api/issuances`, {
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
    });
}

export const getIssuanceById = async (id, token) => {
    return await app.get(`${API_ISSUANCE}/${id}`, {
        headers: {
            Authorization: token,
        }
    })
}


// CREATE issuance
export const createIssuance = async (issuance, token) => {
    return await app.post(API_ISSUANCE, issuance, {
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
    return await app.put(`${API_ISSUANCE}/status/${id}`, { newStatus }, {
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
    return await app.get(`${API_ISSUANCE}/mobile/${mobile}`, {
        headers: {
            Authorization: token,
        }
    })
}

export const getIssuancesByIssueDateRange = async (startDate, endDate, token) => {
    return await app.get(`${API_ISSUANCE}/issueDateRange/${startDate}/${endDate}`, {
        headers: {
            Authorization: token,
        }
    })
}