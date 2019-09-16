import axios from 'axios';

// 创建axios实例
const instance = axios.create({
    // 根URL
    baseURL: 'http://192.168.2.250:7729/',
    // 超时时间
    timeout: 8000
});

export default instance;
