import app from '../apiClient';

const API_BOOKS = `/api/books`
const API_BOOK = `/api/book`

// GET books
export const getAllBooks = async (page, size, sortBy, sortDir, search, token) => {
    return await app.get(API_BOOKS, {
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

export const getBookTitleCount = async (token) =>  {
    return await app.get(`${API_BOOKS}/title-count`, {
        headers: {
            Authorization: token,
        }
    });
}

export const getTotalBookCount = async (token) =>  {
    return await app.get(`${API_BOOKS}/total-count`, {
        headers: {
            Authorization: token,
        }
    });
}



export const getBookById = async (id, token) => {
    return await app.get(`${API_BOOK}/${id}`, {
        headers: {
            Authorization: token
        }
    });
}

export const getBookByTitle = async (title, token) => {
    return await app.get(`${API_BOOK}/title/${title}`, {
        headers: {
            Authorization: token
        }
    })
}

export const getBooksByCategoryId = async (categoryId) => {
    return await app.get(`${API_BOOKS}/categoryId/${categoryId}`);
}

export const getBooksByAuthor = async (author) => {
    return await app.get(`${API_BOOKS}/author/${author}`);
}


// CREATE book
export const createBook = async (book, token) => {
    return await app.post(API_BOOK, book, {
        headers: {
            Authorization: token,
        }
    })
}


// UPDATE book
export const updateBook = async (id, book, token) => {
    return await app.put(`/api/book/${id}`, book, {
        headers: {
            Authorization: token,
        }
    })
}


// DELETE book
export const removeBook = async (id, token) => {
    return await app.delete(`/api/book/${id}`, {
        headers: {
            Authorization: token,
        }
    })
}


// BOOK History
export const getBookHistory = async (id, page, size, sortBy, sortDir, search, token) => {
    return await app.get(`/api/book/history/${id}`, {
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
