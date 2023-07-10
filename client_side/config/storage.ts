import * as constants from './constants';

// 存短期的 token
export const setAccessToken = (token: string) => {
  localStorage.setItem(constants.ACCESS_TOKEN, token);
}

// 取短期的 token
export const getAccessToken = () => {
  return localStorage.getItem(constants.ACCESS_TOKEN);
}

// 删除短期的 token
export const removeAccessToken = () => {
    localStorage.removeItem(constants.ACCESS_TOKEN);
}

// 存长期的 token
export const setRefreshToken = (token: string) => {
  localStorage.setItem(constants.REFRESH_TOKEN, token);
}

// 取长期的 token
export const getRefreshToken = () => {
  return localStorage.getItem(constants.REFRESH_TOKEN);
}
