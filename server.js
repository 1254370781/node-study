const path = require('path');
const Koa = require('koa');
const Router = require('koa-router')();  // 路由  后面的括号  下面就不能new Router();
const render = require('koa-art-template');  // 处理请求体数据
const static = require('koa-static');   // 处理静态资源
// const bodyParser = require('koa-bodyparser');  //处理请求体post请求 ，包括表单提交的form内的数据，都能轻松获取 - ctx.request.body 获取form中的数据
const session = require('koa-session');  // 处理session
const favicon = require('koa-favicon');  // 处理 favicon.ico 404
const formidable = require('koa-formidable'); // 处理上传的图片文件
const compress = require('koa-compress');   // 数据压缩


let app = new Koa();
// let router = new Router();
// 处理请求体数据
render(app,{
    // 配置目录,后缀名,是否是调试模式(我们的机器一般都是true)
    // 调试模式: 不压缩代码,实时更新html的静态内容(每次都读文件)
    root: path.join(__dirname, 'view'),  // 匹配views文件夹
    extname: '.html',  // .匹配html结尾的
    debug: process.env.NODE_ENV !== 'production' // 是否开启调试模式
});
// 处理静态资源 可以配置多个目录
app.use(static(
    path.join( __dirname,  'public')
))

// 处理请求体数据
// app.use(bodyParser());
// 处理session
app.keys = ['some secret hurr'];
const CONFIG = {
    key: 'koa:session',   // cookie密钥 (默认为koa:sess)  session的名
    maxAge: 86400000,  // cookie的过期时间  最大值（ms 一秒等于1000ms）（默认值为1天）
    overwrite: true,  //是否可以覆盖    (默认default true)
    httpOnly: true, //cookie是否只有服务器端可以访问  是否httpOnly（默认为true）
   // {"user":{"username":"abac"},"_expire":1532529416883,"_maxAge":86400000}
    signed: true,   //签名默认true 数字签名，保证数据不被串改
    rolling: false,  //在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
    renew: false,  //（布尔值）会话快过期时续订会话,  过期后是否创建新的
 };
 app.use(session(CONFIG, app));

//  处理favicon.ico 404问题
 app.use(favicon(__dirname + '/public/favicon.ico')); 

// 处理上传的图片文件
app.use(formidable({
    uploadDir:path.join(__dirname,'public/upload'),   //文件上传或图片上传的绝对路径
    // uploadDir:config.uploadDir, //上传目录   config是导入进来的绝对路径
    keepExtensions:true // 保持原有后缀名
}));

// 数据压缩
app.use(compress({
    filter (content_type) {
        return /text/i.test(content_type)
    },
    threshold: 2048,
    gzip: {
      flush: require('zlib').Z_SYNC_FLUSH
    },
    deflate: {
      flush: require('zlib').Z_SYNC_FLUSH,
    },
    br: false // disable brotli
}))

Router.use(require('./routes/webRouter'));  // web 路由
Router.use('/admin',require('./routes/adminRouter'));  // admin 路由
// 启动路由
app.use(Router.routes());
// 状态码增强, 404 => 405 + 501  
// 405:url存在请求方式错误
// 501:copy之类的不常见的请求方式,服务器没有实现对其处理的
app.use(Router.allowedMethods());

// 错误处理
app.use(async (ctx, next) => {
    let adm = /^\/admin/.test(ctx.request.url);
    if(!adm) {
        // console.log('/');
        try {
            // 设定捕获的异常和返回信息
            if(ctx.response.status == '404')  throw `${ctx.response.status}:${ctx.response.message}`;  // 捕捉404错误
            await next();
        } catch (err) {
            // console.log(err); // 符合上面的404异常  这里就打印
            ctx.redirect('/');  // 前台错误返回前台首页
        }
    }else {
        // console.log('/admin');
        try {
            if(ctx.response.status == '404')  throw `${ctx.response.status}:${ctx.response.message}`;  // 捕捉404错误
            await next();
        } catch (err) {
            ctx.redirect('/admin'); // 后台错误返回后台首页
        }
    }
});

// 开启服务器
app.listen(6220,'127.0.0.1',()=> {
    console.log('端口启动在6220!');
})