const fs=require('fs');
const path=require('path');


/**
 * 1 将来调用时需要接受类似 a/b/c 分割递归创建
 * 
 */

function makeDirSync(dirPath){
    let items=dirPath.splite(path.sep);
    for(let i=1;i<=items.length;i++){
        let dir=items.slice(0,i).join(path.sep);
        try{
           //判断是否有权限，目录是否存在
           fs.accessSync(dir);
        }catch(err){
           fs.mkdirSync(dir);
        }
    }
}