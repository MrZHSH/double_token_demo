import axios  from 'axios';
import * as constants from '../config/constants';
import * as storage from '../config/storage';
import { addSubsequent, refreshToken } from "./refresh";

export const server = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    }
});

server.interceptors.request.use(config => {
    // 获取短token
    const accessToken = storage.getAccessToken() || '';
    config.headers[constants.AUTH] = accessToken;
    return config;
})

server.interceptors.response.use(async response => {
    let { config, data } = response;
    return new Promise((resolve) => {
        //  短token失效
        if (data.code === 401) {
            // 删除短token
            storage.removeAccessToken();
            //  把过期请求存起来
            addSubsequent(() => {server(config)})
            //  刷新token
            refreshToken();
        } else {
            resolve(response.data);
        }
    })

}, error => {
    return Promise.reject(error);
});