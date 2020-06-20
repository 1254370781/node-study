let svgCaptcha = require('svg-captcha');   // 验证码模块
let captchapng = require('captchapng2');   //验证码模块
let md5 = require('md5-node');  // 编码加密
let db = require('../../models/db');

// 后台控制器
let userPage = {
    // 登录
    login : async ctx=> {
        await ctx.render('admin/login')
    },
    // 登录验证码
    loginCode : async ctx=> {
        let rand = parseInt(Math.random() * 9000 + 1000);   //验证码的数字
        let png = new captchapng(80, 30, rand); // width,height, numeric captcha   //验证码的底色  色块
    
        // 保存结果到用户的session中
        ctx.session.loginCode = rand;
        console.log(rand);

        ctx.response.set('Content-Type','image/png');
        ctx.body = png.getBuffer();
    },
    // 处理登录请求
    doLogin : async ctx=> {
        let { username,password,code } = ctx.request.body;

        // 验证验证码是否正确
        if (code != ctx.session.loginCode) {  // 缓存的登录验证码
            return ctx.body = {
                code: '002',
                msg: '验证码错误！'
            }
        }
        // 验证账号是否存在
        let user = await db.q('select * from users where username = ?',[username]);
        if (user.length == 0) {
            return ctx.body = {
                code: '002',
                msg: '账号错误!'
            }
        }
        // 验证密码是否正确
        if(user[0].password != md5(password)) {
            return ctx.body = {
                code: '002',
                msg: '密码错误!'
            }
        }
        // 如果上面的验证都正确,则可以登录  登录缓存登录信息
        ctx.session.username = username;  // session 缓存
        ctx.body = {
            code: '001',
            msg: '登录成功!'
        }
    },
    // 注册
    register : async ctx=> {
        await ctx.render('admin/register')
    },
    // 注册验证码
    registerCode : async ctx=> {
        //加法的验证码
        var captcha = svgCaptcha.createMathExpr({
           size:4,
           fontSize: 50,
           width: 100,
           height:40,
           background:"#cc9966"
        });
        // 数字的验证码
        // var captcha = svgCaptcha.create({
        //     size:4,
        //     fontSize: 50,
        //     width: 120,
        //     height:34,
        //     background:"#cc9966"
        // });

        //保存生成的验证码
        ctx.session.registerCode=captcha.text;
        console.log(captcha.text);
        //设置响应头
        ctx.response.type = 'image/svg+xml';
        ctx.body=captcha.data;
    },
    // 提交注册请求
    doRegister : async ctx=> {
        let { username,password,code } = ctx.request.body;
        console.log(username,password,code);
        // 验证缓存的code验证码
        if ( code != ctx.session.registerCode ) {
            return ctx.body = {
                code: '002',
                msg: '验证码错误！'
            }
        }
        // 验证用户名是否已经被注册
        let user = await db.q('select * from users where username = ?',[username]);
        if(user.length > 0) {
            return ctx.body = {
                code: '002',
                msg: '用户已被注册!'
            }
        }
        // 提交注册
        let dateTime = new Date().toLocaleString('chinese',{hour12:false});  //时间和日期
        let result = await db.q('insert into users (username,password,time) values (?,?,?)',[username,md5(password),dateTime]);
        ctx.body = {
            code: '001',
            msg: '注册成功!'
        }
        // console.log(user);
    },
    // 退出/切换账号
    outLogin : async ctx=> {
        ctx.session.username = null;
        ctx.redirect('/admin');
    }
}

module.exports = userPage;