const router = require('koa-router')()
const jwt = require('jsonwebtoken');
const { secret, generateAccessToken, generateRefreshToken } = require('../utils/token.js');

/**
 * 登录接口
 */
router.get('/login', async (ctx, next) => {
  let code, msg, data = null;
  msg = '登录成功，获取token';
  code = 200;
  data = {
    accessToken: generateAccessToken({ username: 'admin' }),
    refreshToken: generateRefreshToken({username: 'admin'})
  }
  ctx.body = {
    code,
    msg,
    data
  }
})

/**
 * 用于测试的获取数据的接口
 */
router.get('/getTestData', async (ctx, next) => {
  let code, msg, data = null;
  msg = '获取数据成功';
  code = 200;
  ctx.body = {
    code,
    msg
  }
})

/*验证长token是否有效，刷新短token
  这里要注意，在刷新短token的时候回也返回新的长token，延续长token，
  这样活跃用户在持续操作过程中不会被迫退出登录。长时间无操作的非活跃用户长token过期重新登录
*/
router.get('/refresh', async (ctx, next) => {
  let code, msg, data = null;
  // 获取请求头中的携带的长token
  const r_token = ctx.request.headers['pass'];
  jwt.verify(r_token, secret, (err, decode) => {
    if (err) {
      msg = '长token过期，请重新登录';
      code = 401;
      ctx.body = {
        code,
        msg
      }
    } else {
      msg = '长token有效，返回新的token';
      code = 200;
      data = {
        accessToken: generateAccessToken(),
        refreshToken: generateRefreshToken()
      }
      ctx.body = {
        code,
        msg,
        data
      }
    }
  })
})

module.exports = router
