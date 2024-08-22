import axios from 'axios'

const BASE_URL = `http://localhost:8080`

const app = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true,
});

export default app;