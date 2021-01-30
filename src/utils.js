import axios from 'axios';


export const Axios = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
});

Axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    error => {
        Promise.reject(error);
    }
)

Axios.interceptors.response.use((response) => {
    return response
 }, function (error) {
    const originalRequest = error.config;
 
    if (error.response.status === 401 && originalRequest.url === '/token/'){
        return Promise.reject(error);
    }
 
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem('refresh_token');
        if(!refreshToken){
            return Promise.reject(error)
        }
        return axios.post('http://localhost:8000/api/token/refresh/',
            {
                refresh: refreshToken
            })
            .then(res => {
                if (res.status === 201) {
                    localStorage.setItem('access_token', res.data.access);
                    localStorage.setItem('refresh_token', res.data.refresh);
                    axios.defaults.headers['Authorization'] = "JWT " + res.data.access;
                    return Axios(originalRequest);
                }
            })
    }
    return Promise.reject(error);
 });
