import { PASS } from '../config/constants';
import { getRefreshToken, setAccessToken, setRefreshToken } from '../config/storage';
import {server} from "./server.ts";

let subsequent = [];
let flag = false;

// 把过期的请求都存起来，等刷新完token后再重新发出去
export const addSubsequent = (request: () => void) => {
    subsequent.push(request);
}

// 调用过期请求
export const invokeSubsequent = () => {
    subsequent.forEach(item => item());
    subsequent.length = 0;
}

// 短token过期，刷新token
export const refreshToken = () => {
    if (flag) return;
    flag = true;
    const refreshToken = getRefreshToken();
    if (refreshToken) {
        server.get('/refresh', Object.assign({}, {
            headers: {
                [PASS]: refreshToken
            }
        })).then(res => {
            const { accessToken, refreshToken } = res.data;
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
            invokeSubsequent();
            flag = false;
        })
    }
}