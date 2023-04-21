import axios from 'axios';

const request = axios.create({
    baseURL: 'http://82.157.249.75:6789',
    timeout: 2000  // 毫秒
});

request.interceptors.request.use(config => {        
        if(localStorage.getItem('token')){
            config.headers['Authorization']=localStorage.getItem('token');
        }
        return config;
})

export default request;