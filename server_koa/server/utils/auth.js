const { secret } = require('./token')
const jwt = require('jsonwebtoken')

const whiteList = ['/login', '/refresh']
const isWhiteList = (url, whiteList) => {
    return whiteList.indexOf(url) !== -1
}

// 验证token
const verifyToken = async (ctx, next) => {
    if (isWhiteList(ctx.url, whiteList)) {
        return await next()
    }
    const token = ctx.request.header['authorization']
    if (token === undefined) {
        ctx.body = {
            code: 401,
            msg: '没有token'
        }
        return
    }
    await jwt.verify(token.split(' ')[0], secret, async (err, decode) => {
        if (err) {
            ctx.body = {
                code: 401,
                msg: 'token失效'
            }
            return
        } else {
            ctx.body = {
                code: 200,
                msg: 'token有效'
            }
            return await next()
        }
    })
}

module.exports = verifyToken