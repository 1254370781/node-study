// 页面控制器
let db = require('../../models/db');

let webPage = {
    // 路由中间件
    common : async (ctx,next)=> {
        let adm = /^\/admin/.test(ctx.request.url);
        // 判断url是不是以/admin开头的   不是就代表前台  执行前台的操作   如果不判断  url都是以/开头的  那么无论是前台url或者后台url   这里都会执行操作
        if(!adm) {
            // 判断是移动端还是pc端
            let deviceAgent = ctx.headers["user-agent"].toLowerCase();
            if( deviceAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)) {
                ctx.state.__WEB__ = 'm_web'
                // console.log("手机访问");
            }else{
                ctx.state.__WEB__ = 'web'
                // console.log("电脑访问");
            }

            // 配置全局变量，配合路径  (注：1级url静态资源可以不加全局变量{{__HOST__}}，但是二级url必须要加，要不然静态资源路径会有问题)
            ctx.state.__HOST__='http://' + ctx.request.header.host;  // 127.0.0.1:6220
            ctx.state.__URL__ = ctx.request.url;   // url  /joinIn

            // 查询站点信息
            let site = await db.q( 'select * from site',[]);
            ctx.state.__site__ = site[0];
            // console.log(ctx.state.__site__);

            // 查询所有主页面，导航栏
            let navcolumn = await db.q('select title,template from navcolumn');
            ctx.state.__navcolumn__ = navcolumn;
            // console.log(navcolumn);
        }
        await next();
    },
    // 首页
    index : async ctx=> {
        // let datapage = await db.q( 'select * from navcolumn');  // 查询表的所有内容
        // let titleUrl = await db.q('select title,template from navcolumn');  // 只查询表中的title和template两个字段的内容
        let data = await db.q( 'select * from navcolumn where id = ?',[1] );
        // 查询品牌介绍子栏目
        let sondata = await db.q( 'select title,Subtitle,pic from soncolumn where uid = ?',[6] );
        let url = `${ctx.state.__WEB__}/${data[0].template}`; // web/index
        // 查询幻灯片
        let slide = await db.q( 'select * from slide order by updatetime desc LIMIT 5',);    // 根据时间   查询最新的5条  LIMIT 5限制查询五条
        // console.log(slide);
        await ctx.render(url,{
            title:data[0].title,
            data,
            slide,
            // 品牌介绍子栏目
            louiseOdier: sondata[0],
            vicfine: sondata[1],
            riinaClare: sondata[2],
        });
    },
    // 招商加盟
    joinIn : async ctx=> {
        // 查询所有页面的内容
        let user = await db.q( 'select * from navcolumn' );
        let data = '';
        let page = `${ctx.request.url.slice(1)}`;   // 截取  查看模板文件
        for (let i = 0; i < user.length; i++) { 
            if(user[i].template == page) {  // 遍历获取模板文件的内容
                data = user[i];
            }
        }
        let url = `${ctx.state.__WEB__}/${data.template}`; // web/joinIn.html
        // console.log(Object.prototype.toString.call(data.content));
        await ctx.render(url,{
            title: data.title,
            data
        });
    },
    // 终端体验
    terminal : async ctx=> {
        let data = await db.q( 'select * from navcolumn where id = ?',[5]);
        // order by id desc  按照id的降叙来排列   默认是ASC  升序   并限制查询最多为4条
        let dataList = await db.q( 'select * from list where uid = ? order by id desc limit 4',[5]);
        let url = `${ctx.state.__WEB__}/${data[0].template}`; // web/terminal.html
        // console.log(dataList)
        await ctx.render(url,{
            title: data[0].title,
            // 页面信息
            data,
            // 列表信息
            dataList
        })
    },
    // 品牌介绍
    brand : async ctx=> {
        let data = await db.q( 'select * from navcolumn where id = ?',[6]);
        let sondata = await db.q( 'select title,Subtitle,pic from soncolumn where uid = ?',[data[0].id] );
        // console.log(sondata);
        let url = `${ctx.state.__WEB__}/${data[0].template}`; // web/brand.html
        await ctx.render(url,{
            title: data[0].title,
            data,
            louiseOdier: sondata[0],
            vicfine: sondata[1],
            riinaClare: sondata[2],
        })
    },
    // // 品牌介绍--louiseOdier子页面
    louiseOdier : async ctx=> {
        let pageId = await db.q( 'select id from soncolumn where title = ?',['louiseOdier'] );
        let data = await db.q( 'select * from soncolumn where id = ?', [pageId[0].id] );
        let url = `${ctx.state.__WEB__}/${data[0].template}`; // web/louiseOdier.html
        await ctx.render(url,{
            title: `品牌介绍--${data[0].title}`,
            data: data[0]
        })
    },
    // 品牌介绍--vicfine子页面
    vicfine : async ctx=> {
        let data = await db.q( 'select * from soncolumn where id = ?', [2] );
        let url = `${ctx.state.__WEB__}/${data[0].template}`; // web/vicfine.html
        await ctx.render(url,{
            title: `品牌介绍--${data[0].title}`,
            data: data[0]
        })
    },
    // 品牌介绍--riinaClare子页面
    riinaClare : async ctx=> {
        let data = await db.q( 'select * from soncolumn where id = ?', [3] );
        let url = `${ctx.state.__WEB__}/${data[0].template}`; // web/vicfine.html
        await ctx.render(url,{
            title: `品牌介绍--${data[0].title}`,
            data: data[0]
        })
    },
    // 新闻动态
    news : async ctx=> {
        // 主栏目信息
        let data = await db.q( 'select * from navcolumn where id = ?',[7] );
        // 分页
        // 第几页   默认为0
        let pagestart = 0;
        // 每页查询多少条记录
        let pagenum = 3;
        // 如果是手机端，每页显示4条
        if(ctx.state.__WEB__ == 'm_web') {
            pagenum = 4;
        }
        // 每次从第几条记录开始查起
        let pagelimit = pagestart * pagenum;
        // 查询列表所有信息
        let datapage = await db.q( 'select * from list where uid = ?', [7]);
        // 总共有多少页的数据
        let pagelength = [];
        // 因为客户端只能each数组，不能each length 所以要遍历  返回一个数组给客户端 
        for (let i = 0; i < datapage.length/pagenum; i++) {
            pagelength.push(i);
        }
        // console.log( pageLength );
        // 列表信息 milit 3,3   从第三条记录开始查   查三条
        let datalist = await db.q( `select * from list where uid = ? limit ${pagelimit},${pagenum} `,[7]); 
        let url = `${ctx.state.__WEB__}/${data[0].template}`; // web/news.html
        await ctx.render(url,{
            title: data[0].title,
            data: data[0],
            datalist,
            pagestart,
            pagelength,
            pagenum
        })
    },
    // 分页
    getPages : async ctx=>{
        let {titles, id, pagelength, pagestart, pagenum} = ctx.request.body;
        if (titles == '上一页') {
            // 上一页就减1
            pagestart--;
        }else if(titles == '下一页') {
            // 下一页就加1
            pagestart++;
        }else {
            pagestart = Number(titles);
        }
        // 从第几条开始查
        let pageLimit = pagestart * pagenum;
        let data = await db.q( `select * from list where uid = ? limit ${pageLimit},${pagenum}`,[id] );
        ctx.body = {
            code: '001',
            data,
            pagestart,
            pagelength,
            id,
            pagenum
        }
    },
    // 新闻动态详情
    detail : async ctx=> {
        let { id } = ctx.query; // 获取id
        // console.log(id);
        // 本条信息
        let data = await db.q( 'select * from list where id = ?',[id] );
        // 获取uid
        let uid = data[0].uid;
        // console.log(data,uid);
        // 上条信息
        let up = await db.q( 'select id,title from list where id=(select max(id) from list where id<?) and uid = ?',[id,uid]);
        // 如果没有上一条信息了   就查询最后一条信息
        if (up.length == 0) {
            up = await db.q( 'select id,title from list where uid = ? order by id desc limit 1',[uid]);
        }
        // 下条信息
        let down = await db.q( 'select id,title from list where id=(select min(id) from list where id>?) and uid = ?',[id,uid]);
        // 如果没有下一条信息了 就查询第一条信息
        if (down.length == 0) {
            down = await db.q( 'select id,title from list where uid = ? limit 1',[uid]);
        }
        await ctx.render(`${ctx.state.__WEB__}/detail`,{
            title: '新闻动态详情',
            data: data[0],
            up: up[0],
            down: down[0],
        })
    },
    // 会员天地
    member : async ctx=> {
        // 主栏目信息
        let data = await db.q( 'select * from navcolumn where id = ?',[8] );
        // 分页
        // 第几页   默认为0
        let pagestart = 0;
        // 每页查询多少条记录
        let pagenum = 4;
        // 每次从第几条记录开始查起
        let pagelimit = pagestart * pagenum;
        // 查询列表所有信息
        let datapage = await db.q( 'select * from list where uid = ?', [8]);
        // 总共有多少页的数据
        let pagelength = [];
        // 因为客户端只能each数组，不能each length 所以要遍历  返回一个数组给客户端 
        for (let i = 0; i < datapage.length/pagenum; i++) {
            pagelength.push(i);
        }
        // console.log( pageLength );
        // 列表信息 milit 3,3   从第三条记录开始查   查三条
        let datalist = await db.q( `select * from list where uid = ? limit ${pagelimit},${pagenum} `,[8]); 
        let url = `${ctx.state.__WEB__}/${data[0].template}`; // web/member.html
        await ctx.render(url,{
            title: data[0].title,
            data: data[0],
            datalist,
            pagestart,
            pagelength,
            pagenum
        })      
    },
    // 企业信息
    information : async ctx=> {
        // 主栏目
        let information = await db.q( 'select * from navcolumn where id = ?',[9]);
        // 子栏目
        let data = await db.q( 'select * from soncolumn where uid = ? order by sort',[information[0].id] );
        let url = `${ctx.state.__WEB__}/${information[0].template}`; // web/information.html
        await ctx.render(url,{
            title: information[0].title,
            // 企业介绍
            information: information[0],
            // 企业理念
            idea: data[0],
            // 品牌介绍
            brand: data[1],
            // 设计理念
            design: data[2],
            // 品牌定位
            location: data[3],
            // 品牌理念
            linian: data[4],
            // 运营策略
            strategy: data[5],
        })
    },
    // 联系我们
    contact : async ctx=> {
        let data = await db.q( 'select * from navcolumn where id = ?', [49] );
        let url = `${ctx.state.__WEB__}/${data[0].template}`; // web/contact.html
        await ctx.render(url,{
            title: data[0].title,
            data: data[0]
        })
    },
}

module.exports = webPage;


// exports.index = async ctx=> {
//     await ctx.render('index',{
//         description:'这是首页的description',
//         keywords:'这是首页的keywords'
//     });
// }