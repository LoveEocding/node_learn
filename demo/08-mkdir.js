const fs=require('fs');
const path=require('path');
const { promisify } =require('util');


//将access 与 mkdir 处理成 async 风格

const access=promisify(fs.access);
const mkdir=promisify(fs.mkdir);

async function myMkdir(dirPath,cb){
    let parts=dirPath.split('/');
    for(let index=1;index<=parts.length;index++){
        let current=parts.slice(0,index).join('/');
        try{
            await access(current);
        }catch(err){
            await mkdir(current);
        }
    }
    cb&&cb();
}
