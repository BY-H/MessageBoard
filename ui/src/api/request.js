import axios from 'axios';
const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 5000,
});
// 请求拦截
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
// 响应拦截 ————关键点要加 as any，否则会导致类型不收敛
instance.interceptors.response.use((res) => res.data, (err) => {
    if (err.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }
    return Promise.reject(err);
});
export default instance;
