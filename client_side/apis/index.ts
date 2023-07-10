import {server} from '../utils/server';

export const login = () => {
    return server({
        url: '/login',
        method: 'get',
    });
}

export const getData = () => {
    return server({
        url: '/getTestData',
        method: 'get',
    });
}
