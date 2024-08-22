import app from '../apiClient';

// GET books
export const getBookById = async (id) => {
    return await app.get(`/api/book/${id}`);
}

export const getBookByTitle = async (title) => {
    return await app.get(`/api/book/title/${title}`)
}

export const getBooksByCategoryId = async (categoryId) => {
    return await app.get(`/api/books/categoryId/${categoryId}`);
}

export const getBooksByAuthor = async (author) => {
    return await app.get(`/api/books/author/${author}`);
}


// CREATE book
export const createBook = async (book, token) => {
    return await app.post(`/api/book`, book, {
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

