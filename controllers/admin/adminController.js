let path = require('path');
let fs = require('fs');
let db = require('../../models/db');
let common = require('./commonController');

let adminPage = {
    // 默认首页
    index : async ctx=> {
        await ctx.render('admin/index',{
            title: '桌面'
        })
    },
    // 添加栏目页面
    addNavColumn : async ctx=> {
        // 获取页面分类---已有主页面
        let page = await db.q(" select title from navcolumn where page = ?",['主页面']);
        // 获取模板目录
        let data = await common.getPage('view/web');  // 必须要加await   因为是一个异步Promise
        let newData = [];  // 删除了common文件夹  剩下的是模板页面
        for (let i = 0; i < data.length; i++) {
            if(data[i] == 'common') {  // 遍历删除掉common文件夹
                continue;
            }
            newData.push(data[i].substring(0,data[i].length-5));
        }
        await ctx.render('admin/addNavColumn', {
            title: '添加导航栏目',
            data: newData,  // 模板网站数据
            page
        })
    },
    // 提交添加栏目页面
    doAddNavColumn : async ctx=> {
        let { title, Subtitle,page, templateType, template, sort, keyWord, jianjie, author, source, content } = ctx.request.body;  // 获取从页面传过来的数据
        let banner = '';
        let pic = '';
        if(ctx.request.files.banner){
            banner = 'upload/' + path.parse(ctx.request.files.banner.path).base; // banner图片路径
        }
        if(ctx.request.files.pic) {
            pic = 'upload/' + path.parse(ctx.request.files.pic.path).base;    // 图片路径
        }
        let updatetime = new Date().toLocaleString('chinese',{hour12:false});  //时间和日期
        // console.log(title, Subtitle,page, banner, pic, templateType, template, sort, keyWord, jianjie, author, source, content,updatetime);

        // 如果是主页面
        if(page == '主页面') {
            // 存入数据库的数组
            let arr = [title, Subtitle,page, banner, pic, templateType, template, sort, keyWord, jianjie, author, source, content,updatetime];
            await db.q('insert into navcolumn (title, Subtitle,page, banner, pic, templateType, template, sort, keyWord, jianjie, author, source, content,updatetime) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',arr);
            if(templateType == '产品新闻页面') {
                let navId = await db.q( 'select id from navcolumn where title=?',[title] );
                let navArr = [title, navId[0].id, updatetime];
                await db.q( 'insert into navlist (title, uid, updatetime) values (?,?,?)',navArr );
            }
        }else {  // 子页面
            let sonTitle = await db.q( 'select id from navcolumn where title = ?', [page] );
            let sonArr = [title, Subtitle,page, banner, pic, templateType, template, sort, keyWord, jianjie, author, source,sonTitle[0].id, content,updatetime];
            await db.q('insert into soncolumn (title, Subtitle,page, banner, pic, templateType, template, sort, keyWord, jianjie, author, source, uid, content, updatetime) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',sonArr);
            if(templateType == '产品新闻页面') {
                let navId = await db.q( 'select id from soncolumn where title=?',[title] );
                let navArr = [title, navId[0].id, updatetime];
                await db.q( 'insert into navlist (title, uid, updatetime) values (?,?,?)',navArr );
            }
        }
        ctx.body = {
            code:'001',
            msg:'添加成功！'
        }
    },
    // 查看和修改栏目内容
    editNavColumn : async ctx=> {
        // 获取传过来的id
        let { id,sonId } = ctx.query;
        // console.log(id,sonId);
        let data = '';
        if (id != undefined) {
            // 如果存过来的是id   则证明是主页面  根据id查询主页面内容
            data = await db.q(' select * from navcolumn where id = ?', [id]);
        }else {
            // 如果存过来的是sonId   则证明是子页面  根据id查询子页面内容
            data = await db.q(' select * from soncolumn where id = ?', [sonId]);
        }
        // console.log(data);
        // 如果没有查询到内容  就手动点击返回首页!
        if(data.length == 0) {
            ctx.body = `<div>没有找到栏目信息,<a href="/admin">点击返回首页!</a> </div>`
            return;
        }

        // 获取模板目录
        let datas = await common.getPage('view/web');  // 必须要加await   因为是一个异步Promise
        let newData = [];  // 删除了common文件夹  剩下的是模板页面
        for (let i = 0; i < datas.length; i++) {
            if(datas[i] == 'common') {  // 遍历删除掉common文件夹
                continue;
            }
            newData.push(datas[i].substring(0,datas[i].length-5));
        }

        // 获取页面分类---已有主页面
        let page = await db.q(" select title from navcolumn where page = ?",['主页面']);
        await ctx.render('admin/editNavColumn',{
            title: data[0].title,
            // 返回页面的信息
            data: data[0],
            // 模板
            pageData: newData,
            page
        })
    },
    // 提交修改栏目内容
    doEditNavColumn : async ctx=> {
        let { id, title, Subtitle,page, templateType, template, sort, keyWord, jianjie, author, source, uid, content, banner, pic } = ctx.request.body;  // 获取从页面传过来的数据
        if (!banner) {
            banner = 'upload/' + path.parse(ctx.request.files.banner.path).base; // banner图片路径
        }else if(banner == 'undefined') {
            banner = '' }
        if (!pic) {
            pic = 'upload/' + path.parse(ctx.request.files.pic.path).base;    // 图片路径
        }else if(pic == 'undefined') { pic = '' }
        let updatetime = new Date().toLocaleString('chinese',{hour12:false});  //时间和日期

        // 数据表
        let dataSheet = '';
        // 如果uid为空，则证明是主页面 如果不为空，则证明是子页面
        if (uid == '') {
            dataSheet = 'navcolumn'
        }else {
            dataSheet = 'soncolumn'
        }
        let user = await db.q( `select * from ${dataSheet} where id = ?`,[id] );  // 查看数据表中是否有这个id的内容信息
        // console.log(user);
        if (!user) {  // 如果没有此栏目信息   则返回信息回客户端 并return
            return ctx.body =  {
                code:'002',
                msg:'没有此栏目信息，返回首页!'
            }
        }
        // 查询出的数据  也并成一个数组
        let userArr = [user[0].title, user[0].Subtitle, user[0].page, user[0].templateType, user[0].template, user[0].sort, user[0].keyWord, user[0].jianjie, user[0].author, user[0].source, user[0].content, user[0].banner, user[0].pic]
        // 传过来的数据，并成一个数组储存
        let arr = [title, Subtitle,page, templateType, template, sort, keyWord, jianjie, author, source, content, banner, pic];
        // 修改的内容数据数组
        let updateData = [...arr, updatetime, id];
        // 判断修改传过来的数据是否和数据库的一样  如果一样 只修改时间
        if(arr.sort().toString() === userArr.sort().toString()){
            // 如果数据是一样的,则没有修改任何内容   则只修改时间就可以
            await db.q(`update ${dataSheet} set updatetime = ? where id = ?`,[updatetime, id]);
            // 返回到客户端的回馈
            return ctx.body = {
                code:'001',
                msg:'修改成功'
            };
        }
        // 如果上传的和查的page是不一样的  则证明修改了
        if(user[0].page != page) {
            // 如果上传的page是主页面 则证明是子页面转主页面
            if(page == '主页面') {
                let arr = [title, Subtitle,page, banner, pic, templateType, template, sort, keyWord, jianjie, author, source, content,updatetime];
                // 添加到主页面栏目表
                await db.q('insert into navcolumn (title, Subtitle,page, banner, pic, templateType, template, sort, keyWord, jianjie, author, source, content,updatetime) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)',arr);
                // 并删除子栏目的内容
                await db.q('delete from soncolumn where id = ?',[id]);
                // 修改产品新闻页面对应的uid
                if(user[0].templateType == templateType) {
                    if(templateType == '产品新闻页面') {
                        let sonlms = await db.q( 'select id,title from navcolumn where title = ?',[title] );
                        // console.log(sonlms);
                        await db.q('update navlist set uid=?,updatetime=? where uid = ?',[sonlms[0].id,updatetime,id]);
                    }
                }
            // 主页面转子页面
            }else {
                // 查询想要转的主页面的id  用作子页面的uid
                let sonTitle = await db.q( 'select id,title from navcolumn where title = ?', [page] );
                // console.log(sonTitle);
                if( sonTitle[0].id == id ) {
                    return ctx.body = {
                        code:'002',
                        msg:'修改错误，已是主页，不能成为自己的子页！'
                    };
                }else {
                    let sonArr = [title, Subtitle,page, banner, pic, templateType, template, sort, keyWord, jianjie, author, source,sonTitle[0].id, content,updatetime];
                    // 储存到子栏目表
                    await db.q('insert into soncolumn (title, Subtitle,page, banner, pic, templateType, template, sort, keyWord, jianjie, author, source, uid, content, updatetime) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',sonArr);
                    // 删除主栏目的内容
                    await db.q('delete from navcolumn where id = ?',[id]);
                }
                // 修改产品新闻页面对应的uid
                if(user[0].templateType == templateType) {
                    if(templateType == '产品新闻页面') {
                        let sonlm = await db.q( 'select id,title from soncolumn where uid = ?',[sonTitle[0].id] );
                        // console.log(sonlm,id);
                        await db.q('update navlist set uid=?,updatetime=? where uid = ?',[sonlm[0].id,updatetime,id]);
                    }
                }
            }
        }
        if(user[0].templateType != templateType) {
            // 单页面修改成产品新闻页面
            if(templateType == '产品新闻页面') {
                if(user[0].page != page) {
                    // 子页面变主页面
                    if(page == '主页面') {
                        console.log('子页面变主页面')
                        let temt = await db.q('select id,title from navcolumn where title = ?',[title])
                        console.log(temt);
                        // 修改数据
                        let navArr = [title, temt[0].id, updatetime];
                        await db.q( 'insert into navlist (title, uid, updatetime) values (?,?,?)',navArr );
                    // 主页面变子页面
                    }else {
                        console.log('主页面变子页面');
                        let temts = await db.q('select id,title from soncolumn where title = ?',[title])
                        console.log(temts);
                        // 修改数据
                        let navArrs = [title, temts[0].id, updatetime];
                        await db.q( 'insert into navlist (title, uid, updatetime) values (?,?,?)',navArrs );
                    }
                }else {
                    let navArrx = [title, id, updatetime];
                    await db.q( 'insert into navlist (title, uid, updatetime) values (?,?,?)',navArrx );
                }
            // 产品新闻页面修改成单页面
            }else {
                // id 不一样
                // 修改数据
                await db.q('delete from navlist where uid = ?',[id]);
            }
        }
        // 修改数据
        await db.q( `update ${dataSheet} set title=?,Subtitle=?,page=?,templateType=?,template=?,sort=?,keyWord=?,jianjie=?,author=?,source=?,content=?,banner=?,pic=?,updatetime=? where id=?`,updateData );
        // 返回到客户端的回馈
        ctx.body = {
            code:'001',
            msg:'修改成功'
        };
    },
    // 删除栏目
    deleteNavColumn : async ctx=> {
        let {id, uid} = ctx.request.body;
        // console.log(id,uid);
        // 如果uid为空,证明是主栏目 反之则是子栏目
        if (uid == '') {
            let navUser = await db.q( 'select templateType from navcolumn where id = ?',[id] );
            if(navUser.length != 0) {
                await db.q('delete from navcolumn where id = ?',[id]);
                // 如果是产品新闻页面，还要删除navlist表的内容
                if(navUser[0].templateType == '产品新闻页面') {
                    await db.q('delete from navlist where uid = ?',[id]);
                }
                // 查询有没有子栏目,父栏目删除了,子栏目也要一并删除
                let sonUser = await db.q( 'select id,templateType from soncolumn where uid = ?',[id] );
                // 如果有,则删除
                if(sonUser.length !=0) {
                    // 遍历子栏目
                    for (let i = 0; i < sonUser.length; i++) {
                        // console.log(sonUser[i]);
                        // 如果是产品新闻页面，就删除
                        if (sonUser[i].templateType == '产品新闻页面') {
                            await db.q('delete from navlist where uid = ?',[sonUser[i].id]);
                        }
                    }
                    await db.q('delete from soncolumn where uid = ?',[id]);
                }
            }
        }else {
            let son = await db.q( 'select templateType from soncolumn where id = ?',[id] );
            if(son.length !=0) {
                await db.q('delete from soncolumn where id = ?',[id]);
                // 查询是不是新闻产品页面， 如果是，还要删除navlist的栏目
                if(son[0].templateType == '产品新闻页面') {
                    await db.q('delete from navlist where uid = ?',[id]);
                }
            }
        }
        ctx.body = {
            code:'001',
            msg:'删除成功'
        }
    },
    // 产品新闻列表页面
    navList : async ctx=> {
        // 获取传过来的id
        let id = ctx.query.id;
        // order by id desc  按照id的降叙来排列   默认是ASC  升序
        let data = await db.q( 'select * from list where uid = ? order by id',[id] ); 
        if( data.length == 0 ) {
            data = '';
        }
        await ctx.render('admin/navList',{
            title: '产品新闻列表',
            id,
            datas: data,
        })
    },
    // 添加新闻产品
    addNavList : async ctx=> {
        let { uid } = ctx.params;
        await ctx.render('admin/addNavList',{
            title: '添加产品新闻',
            uid,
        })
    },
    // 提交新闻产品类型内容
    doAddNavList : async ctx=> {
        let { uid, title, sort, fabu, jianjie, content } = ctx.request.body;
        let img = '';
        if(ctx.request.files.img){
            img = 'upload/' + path.parse(ctx.request.files.img.path).base; // banner图片路径
        }
        // 时间
        let updatetime = new Date().toLocaleString('chinese',{hour12:false});
        let dataArr = [title, img, sort, fabu, jianjie, content, uid, updatetime];
        // 储存
        await db.q('insert into list (title, img, sort, fabu, jianjie, content, uid, updatetime) values (?,?,?,?,?,?,?,?)',dataArr); 
        ctx.body = {
            code:'001',
            msg:'添加成功!'
        }
        // console.log(dataArr);
    },
    // 新闻产品列表页发布
    navListRelease : async ctx=> {
        // 获取id
        let { id,title } = ctx.request.body;
        // 查询数据库是否有这个id的内容
        let user = await db.q( 'select id,fabu from list where id=?',[id] );
        // 如果没有
        if(user.length == 0) {
            return ctx.body = {
                code:'002',
                msg:'没有此id信息,刷新页面!'
            }
        }
        // 根据title  来修改发布
        let fabu = '';
        // 回馈客户端信息
        let msg = '';     
        if(title == '未发布') {
            fabu = '是';
            msg = '已发布'
        }else if(title == '已发布') {
            fabu = '否';
            msg = '未发布'
        }
        // console.log(user,title,fabu);
        await db.q( 'update list set fabu = ? where id = ?',[fabu,id] );
        ctx.body = {
            code:'001',
            msg
        }
    },
    // 修改新闻产品列表内容页面
    editNavList : async ctx=> {
        // 获取传过来的id
        let { id } = ctx.query;
        // 查询数据库是否有此id的内容
        let user = await db.q( 'select * from list where id = ?',[id] );
        if(user.length == 0) {
            return ctx.body = {
                code: '002',
                msg: '没有此id的信息!'
            }
        }
        await ctx.render('admin/editNavList',{
            title: `${user[0].title}-修改`,
            data: user[0]
        })
    },
    // 提交修改新闻产品列表内容
    doEditNavList : async ctx=>{
        let { id, title, img, sort, fabu, jianjie, content, uid } = ctx.request.body;
        // 图片
        if( !img ) {
            img = 'upload/' + path.parse(ctx.request.files.img.path).base; // banner图片路径
        }else if(img == 'undefined') { img = '' }
        // 时间
        let updatetime = new Date().toLocaleString('chinese',{hour12:false});
        // 查看数据表中是否有这个id的内容信息
        let user = await db.q( 'select * from list where id = ?',[id] );
        // console.log(user);
        if (!user) {  // 如果没有此栏目信息   则返回信息回客户端 并return
            return ctx.body =  {
                code:'001',
                msg:'没有此栏目信息，返回列表页!'
            }
        }
        // 上传数组整合成一个数组
        let postArr = [title, img, sort, fabu, jianjie, content, uid, updatetime, id];
        await db.q( 'update list set title=?,img=?,sort=?,fabu=?,jianjie=?,content=?,uid=?,updatetime=? where id=?',postArr);
        // // 返回到客户端的回馈
        ctx.body = {
            code:'001',
            msg:'修改成功'
        };
        // console.log(id, title, img, sort, fabu, jianjie, content, uid, updatetime);
    },
    // 删除新闻产品列表内容
    deleteNavList : async ctx=>{
        // 客户端传过来的id
        let { id, uid } = ctx.request.body;
        let user = await db.q( 'select id from list where id=?',[id] );
        // console.log(user);
        if (user.length == 0) {
            return ctx.body = {
                code:'002',
                msg:'没有此栏目信息，请刷新!'
            }
        }
        // 删除
        await db.q('delete from list where id = ?',[id]);
        // 再次查询数据返回客户端，更新页面列表
        let data = await db.q( 'select * from list where uid = ?',[uid] )
        ctx.body = {
            code:'001',
            msg:'删除成功!',
            data
        }
    },
    // 新闻产品列表搜索
    NavListSearch : async ctx=> {
        let { id, title } = ctx.request.body;
        let data = await db.q( 'select * from list where uid=? and title like ?',[id, `%${title}%`] );  //查询指定uid的内容   title like ? `%${title}%`    查询标题  只要有要查的文字   都可以查出来
        if (data.length == 0) {
            return ctx.body = {
                code:'002',
                msg:'没查询到内容！'
            }
        }
        ctx.body = {
            code:'001',
            msg:'查询成功!',
            data,
        }
        // console.log(data);
    },
    // 新闻产品批量删除
    batchDelete : async ctx=> {
        let { id, arrx } = ctx.request.body;
        // 因为不确定删除的是几个，所以要遍历看需要多少个?
        let wh = ``;
        for (let i = 0; i < arrx.length; i++) {
            wh +='?,'
        }
        // 删除字符串最后一个字符
        wh = wh.substring(0,wh.length-1)
        // 查询
        let user = await db.q( `select id from list where id in(${wh})`, [...arrx] );
        // 如果符合
        if (user.length!=0 && user.length == arrx.length) {
            // 删除
            await db.q(`delete from list where id in(${wh})`,[...arrx]);
            // 重新查询数据返回客户端
            let data = await db.q( 'select * from list where uid = ?',[id] )
            ctx.body = {
                code:'001',
                msg:'删除成功!',
                data
            }
        }else {
            return ctx.body = {
                code:'002',
                msg:'没有要删除栏目信息，请刷新!',
                data
            }
        }
    },
    // 幻灯片列表页
    slide : async ctx=> {
        let data = await db.q( 'select * from slide' );
        await ctx.render('admin/slide',{
            title: '幻灯片列表页',
            data
        })
    },
    // 添加幻灯片
    addSlide : async ctx=> {
        await ctx.render('admin/addSlide',{
            title: '幻灯片添加'
        })
    },
    // 提交添加幻灯片
    doAddSlide : async ctx=> {
        let { title, sort, fabu, jianjie, content } = ctx.request.body;
        let img = '';
        if(ctx.request.files.img){
            img = 'upload/' + path.parse(ctx.request.files.img.path).base; // banner图片路径
        }else if(img == 'undefined') { img = '' }
        // 时间
        let updatetime = new Date().toLocaleString('chinese',{hour12:false});
        let dataArr = [title, img, sort, fabu, jianjie, content, updatetime];
        // 储存
        await db.q('insert into slide (title, img, sort, fabu, jianjie, content, updatetime) values (?,?,?,?,?,?,?)',dataArr); 
        ctx.body = {
            code:'001',
            msg:'添加成功!'
        }
        // console.log(dataArr);
    },
    // 幻灯片列表页发布
    slideRelease : async ctx=> {
        // 获取id
        let { id,title } = ctx.request.body;
        // 查询数据库是否有这个id的内容
        let user = await db.q( 'select id,fabu from slide where id=?',[id] );
        // 如果没有
        if(user.length == 0) {
            return ctx.body = {
                code:'002',
                msg:'没有此id信息,刷新页面!'
            }
        }
        // 根据title  来修改发布
        let fabu = '';
        // 回馈客户端信息
        let msg = '';     
        if(title == '未发布') {
            fabu = '是';
            msg = '已发布'
        }else if(title == '已发布') {
            fabu = '否';
            msg = '未发布'
        }
        // console.log(user,title,fabu);
        await db.q( 'update slide set fabu = ? where id = ?',[fabu,id] );
        ctx.body = {
            code:'001',
            msg
        }
    },
    // 修改幻灯片内容
    editSlide : async ctx=> {
        // 获取传过来的id
        let { id } = ctx.query;
        // 查询数据库是否有此id的内容
        let user = await db.q( 'select * from slide where id = ?',[id] );
        if(user.length == 0) {
            return ctx.body = {
                code: '002',
                msg: '没有此id的信息!'
            }
        }
        await ctx.render('admin/editSlide',{
            title: `${user[0].title}-修改`,
            data: user[0]
        })
    },
    // 提交修改幻灯片内容
    doEditSlide : async ctx=>{
        let { id, title, img, sort, fabu, jianjie, content } = ctx.request.body;
        // 图片
        if( !img ) {
            img = 'upload/' + path.parse(ctx.request.files.img.path).base; // banner图片路径
        }else if(img == 'undefined') { img = '' }
        // 时间
        let updatetime = new Date().toLocaleString('chinese',{hour12:false});
        // 查看数据表中是否有这个id的内容信息
        let user = await db.q( 'select * from slide where id = ?',[id] );
        // console.log(user);
        if (!user) {  // 如果没有此栏目信息   则返回信息回客户端 并return
            return ctx.body =  {
                code:'001',
                msg:'没有此栏目信息，返回列表页!'
            }
        }
        // 上传数组整合成一个数组
        let postArr = [title, img, sort, fabu, jianjie, content, updatetime, id];
        await db.q( 'update slide set title=?,img=?,sort=?,fabu=?,jianjie=?,content=?,updatetime=? where id=?',postArr);
        // // 返回到客户端的回馈
        ctx.body = {
            code:'001',
            msg:'修改成功'
        };
        // console.log(id, title, img, sort, fabu, jianjie, content, uid, updatetime);
    },
    // 删除幻灯片
    deleteSlide : async ctx=>{
        // 客户端传过来的id
        let { id } = ctx.request.body;
        let user = await db.q( 'select id from slide where id=?',[id] );
        // console.log(user);
        if (user.length == 0) {
            return ctx.body = {
                code:'002',
                msg:'没有此栏目信息，请刷新!'
            }
        }
        // 删除
        await db.q('delete from slide where id = ?',[id]);
        // 再次查询数据返回客户端，更新页面列表
        let data = await db.q( 'select * from slide' )
        ctx.body = {
            code:'001',
            msg:'删除成功!',
            data
        }
    },
    // 搜索幻灯片
    slideSearch : async ctx=> {
        let { title } = ctx.request.body;
        let data = await db.q( 'select * from slide where title like ?',[`%${title}%`] );  //查询指定uid的内容   title like ? `%${title}%`    查询标题  只要有要查的文字   都可以查出来
        if (data.length == 0) {
            return ctx.body = {
                code:'002',
                msg:'没查询到内容！'
            }
        }
        ctx.body = {
            code:'001',
            msg:'查询成功!',
            data,
        }
        // console.log(data);
    },
    // 幻灯片批量删除
    slideBatchDelete : async ctx=> {
        let { arrx } = ctx.request.body;
        // 因为不确定删除的是几个，所以要遍历看需要多少个?
        let wh = ``;
        for (let i = 0; i < arrx.length; i++) {
            wh +='?,'
        }
        // 删除字符串最后一个字符
        wh = wh.substring(0,wh.length-1)
        // 查询
        let user = await db.q( `select id from slide where id in(${wh})`, [...arrx] );
        // 如果符合
        if (user.length!=0 && user.length == arrx.length) {
            // 删除
            await db.q(`delete from slide where id in(${wh})`,[...arrx]);
            // 重新查询数据返回客户端
            let data = await db.q( 'select * from slide' )
            ctx.body = {
                code:'001',
                msg:'删除成功!',
                data
            }
        }else {
            return ctx.body = {
                code:'002',
                msg:'没有要删除栏目信息，请刷新!',
                data
            }
        }
    },
    // 站点信息
    site : async ctx=> {
        let data = await db.q( 'select * from site where id = ?',[1]);
        await ctx.render('admin/site',{
            title: '站点信息',
            data: data[0]
        })
    },
    // 提交站点信息
    doSite : async ctx=> {
        let {title, logo, domain, keyWord, description, phone, address, recordNo, content } = ctx.request.body;
        // 图片
        if( !logo ) {
            logo = 'upload/' + path.parse(ctx.request.files.logo.path).base; // banner图片路径
        }else if(logo == 'undefined') { logo = '' }
        // 时间
        let updatetime = new Date().toLocaleString('chinese',{hour12:false});
        // 上传数组整合成一个数组
        let postArr = [ title, logo, domain, keyWord, description, phone, address, recordNo, content, updatetime, 1 ];
        await db.q( 'update site set title=?,logo=?,domain=?,keyWord=?,description=?,phone=?,address=?,recordNo=?,content=?,updatetime=?',postArr);
        // // 返回到客户端的回馈
        ctx.body = {
            code:'001',
            msg:'提交成功'
        };
    },
}

module.exports = adminPage