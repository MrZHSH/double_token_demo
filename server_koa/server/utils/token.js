const jwt = require('jsonwebtoken');

const secret = '2023F_Ycb/wp_sd'; // 密钥

expiresIn = 5 // 5秒过期

const accessTokenTime = 5 // 5秒过期
const refreshTokenTime = 10 // 10秒过期

// 生成accessToken
const generateAccessToken = (payload = {}) => { // payload 用户信息
  return jwt.sign(payload, secret, { expiresIn: accessTokenTime });
}

// 生成refreshToken
const generateRefreshToken = (payload = {}) => {
  return jwt.sign(payload, secret, { expiresIn: refreshTokenTime });
}

module.exports = {
    secret,
    generateAccessToken,
    generateRefreshToken
}