import app from '../apiClient';

// GET categories
// export const getAllCategories = async () => {
//     return await app.get(`/api/categories`);
// }

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
    return await app.get(`/api/category/${id}`);
}

export const getCategoryCount = async () => {
    return await app.get(`/api/category-count`);
}


// CREATE category
export const createCategory = async (category, token) => {
    return await app.post(`/api/category`, category, {
        headers: {
            Authorization: token,
        }
    })
}


// UPDATE category
export const updateCategory = async (id, category, token) => {
    return await app.put(`/api/category/${id}`, category, {
        headers: {
            Authorization: token,
        }
    })
}


// DELETE category
export const removeCategory = async (id, token) => {
    return await app.delete(`/api/category/${id}`, {
        headers: {
            Authorization: token,
        }
    })
}