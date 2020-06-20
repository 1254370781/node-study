let fs = require('fs');
let common = {
    // 获取模板目录
    getPage : function(url) {
        return new Promise(function(resolve,reject){
            fs.readdir(url,function(err,data){   // 读取view/web目录的文件和文件夹
                if(err){
                    reject(err);
                }
                resolve(data);
            })
        })
    },
}
module.exports = common;