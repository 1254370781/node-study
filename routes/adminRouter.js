const router = require('koa-router')();
let userController = require('../controllers/admin/userController');
let adminController = require('../controllers/admin/adminController');
let url = require('url');
let db = require('../models/db');

router.use( async (ctx,next)=> {  // 判断有没有session   如果没有就登录 （注：use监听中间件要写在最上面，写在最下面可能监听不到）
        var pathname = url.parse(ctx.request.url).pathname;  // 获取url
        let adm = /^\/admin/.test(ctx.request.url);
        // console.log(adm,pathname);
        if (adm) {

            // 查询页面导航栏目信息  并赋值给全局 (注：写在下面无效)
            let titleUrl = await db.q('select id,title from navcolumn'); // 只查询id和title
            // 遍历 查询子类
            for (let i = 0; i < titleUrl.length; i++) {
                let sonData = await db.q( 'select id,title from soncolumn where uid = ? order by sort', [titleUrl[i].id] );
                titleUrl[i].soncolumn = sonData;
            }
            ctx.state.__titleUrl__ = titleUrl;  // 配置给全局变量
            // console.log(titleUrl[3].soncolumn);

            // admin  缓存的username 显示到页面
            ctx.state.__USERNAME__ = ctx.session.username; 

            // 查询新闻产品类型导航栏目信息  并赋值给全局 (注：写在下面无效)
            let navList = await db.q('select * from navlist');
            ctx.state.__navList__ = navList;  // 配置给全局变量
            
            // 查看是否有缓存username   判断是否登录或者登录过期
            if (!ctx.session.username) {  
                // 因为登录和注册的验证码都会发一个url请求   所以最好获取的页面url是'/admin/loginCode'和'/admin/registerCode' 所以判断也要加这连个url 要不然无限循环
                // '/admin/doLogin' 和 '/admin/doRegister' 这 两个url是因为 提交登录和注册如果不加   提交的时候先执行这里监听  如果没有这两个url   就会跳到/admin/login  就会导致无法完成提交
                if(pathname=='/admin/login' || pathname=='/admin/loginCode' || pathname=='/admin/doLogin' || pathname=='/admin/register' || pathname=='/admin/registerCode' || pathname=='/admin/doRegister'){
                    await next();
                }else{   
                    ctx.redirect('/admin/login');
                }
            }else {
                await next();  // 必须要有
            }

        }else {
            await next();
        }

    })
    .get('/',adminController.index)  // 默认首页
    .get('/login',userController.login)    // 登录
    .get('/loginCode',userController.loginCode) // 登录验证码
    .post('/doLogin',userController.doLogin)  // 提交登录请求
    .get('/register',userController.register)  // 注册
    .get('/registerCode',userController.registerCode)  // 注册验证码
    .post('/doRegister',userController.doRegister) // 提交注册请求
    .get('/outLogin',userController.outLogin)  // 退出/切换账号
    .get('/addNavColumn',adminController.addNavColumn) // 添加导航
    .post('/doAddNavColumn',adminController.doAddNavColumn) //提交添加栏目
    .get('/editNavColumn',adminController.editNavColumn) // 查看和修改栏目内容
    .post('/doEditNavColumn',adminController.doEditNavColumn)  // 提交修改栏目信息
    .post('/deleteNavColumn',adminController.deleteNavColumn)   // 删除栏目
    .get('/navList',adminController.navList)  // 新闻产品列表页
    .get('/addNavList/:uid',adminController.addNavList) // 添加新闻产品
    .post('/doAddNavList',adminController.doAddNavList) // 提交新闻产品类型内容
    .post('/navListRelease',adminController.navListRelease) // 新闻产品列表页发布
    .get('/editNavList',adminController.editNavList) // 修改新闻产品列表内容页面
    .post('/doEditNavList',adminController.doEditNavList) // 提交修改新闻产品列表内容
    .post('/deleteNavList',adminController.deleteNavList)  // 删除新闻产品列表内容
    .post('/NavListSearch',adminController.NavListSearch)   // 新闻产品列表搜索
    .post('/batchDelete',adminController.batchDelete) // 新闻产品批量删除
    .get('/slide',adminController.slide)    // 幻灯片列表页
    .get('/addSlide',adminController.addSlide)  // 添加幻灯片
    .post('/doAddSlide',adminController.doAddSlide) // 提交添加幻灯片
    .post('/slideRelease',adminController.slideRelease) // 幻灯片列表页发布
    .get('/editSlide',adminController.editSlide)    // 修改幻灯片内容
    .post('/doEditSlide',adminController.doEditSlide)   // 提交修改幻灯片内容
    .post('/deleteSlide',adminController.deleteSlide)   // 删除幻灯片
    .post('/slideSearch',adminController.slideSearch)   // 搜索幻灯片
    .post('/slideBatchDelete',adminController.slideBatchDelete) // 幻灯片批量删除
    .get('/site',adminController.site)  // 站点信息
    .post('/doSite',adminController.doSite) // 提交站点信息
 
module.exports = router.routes();