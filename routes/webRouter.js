const router = require('koa-router')();
let webController = require('../controllers/web/webController');

router.use(webController.common)  // 路由中间件
    .get('/',webController.index)  // 首页
    .get('/joinIn',webController.joinIn)  // 招商加盟   注: .get前面不能用空格  可以用tab
    .get('/terminal',webController.terminal)  // 终端体验
    .get('/brand',webController.brand)   // 品牌介绍
    .get('/brand/louiseOdier',webController.louiseOdier)   // 品牌介绍--louiseOdier子页面
    .get('/brand/vicfine',webController.vicfine)   // 品牌介绍--vicfine子页面
    .get('/brand/riinaClare',webController.riinaClare)   // 品牌介绍--riinaClare子页面
    .get('/news',webController.news)    // 新闻动态
    .get('/detail',webController.detail)    // 新闻动态详情
    .get('/member',webController.member)  // 会员天地
    .get('/information',webController.information) // 企业信息
    .get('/contact',webController.contact) // 联系我们
    .post('/getPages',webController.getPages)   // 分页

module.exports=router.routes();