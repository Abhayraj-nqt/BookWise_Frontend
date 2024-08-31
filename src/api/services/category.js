import app from '../apiClient';

// GET categories
// export const getAllCategories = async () => {
//     return await app.get(`/api/categories`);
// }

const API_CATEGORY = `/api/category`

export const getAllCategories = async (page, size, sortBy, sortDir, search) => {
    return await app.get(`/api/categories`, {
        params: {
            page: page,
            size: size,
            sortBy: sortBy,
            sortDir: sortDir,
            search: search,
        }
    });
}

export const getCategoryById = async (id) => {
    return await app.get(`${API_CATEGORY}/${id}`);
}

export const getCategoryCount = async () => {
    return await app.get(`/api/category-count`);
}


// CREATE category
export const createCategory = async (category, token) => {
    return await app.post(API_CATEGORY, category, {
        headers: {
            Authorization: token,
        }
    })
}


// UPDATE category
export const updateCategory = async (id, category, token) => {
    return await app.put(`${API_CATEGORY}/${id}`, category, {
        headers: {
            Authorization: token,
        }
    })
}


// DELETE category
export const removeCategory = async (id, token) => {
    return await app.delete(`${API_CATEGORY}/${id}`, {
        headers: {
            Authorization: token,
        }
    })
}