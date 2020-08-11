import axios from 'axios'


export default function request(config) {
    const instance = axios.create({
        timeout: 5000,
        baseURL: 'https://localhost:44364/api/',
        headers: { 'content-type': 'application/json' }
    })
    
     // 添加token值,请求拦截器
     instance.interceptors.request.use(config => {
        config.headers.Authorization = sessionStorage.getItem('token')
        return config
    })


    return instance(config)
}