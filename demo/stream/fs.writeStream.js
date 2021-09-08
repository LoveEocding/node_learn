const fs=require('fs');

const ws=fs.createWriteStream('test.txt',{
    flags:'w',
    mode:438,
    fs:null,
    encoding:'utf-8',
    start:0,
    highWaterMark:4,
    autoClose:true
})

//写入数据 字符串｜buffer
ws.write('拉钩教育',()=>{
    //数据写完了
})

//打开文件 回调
ws.on('open',(fd)=>{
    //finish fd
})
//文件关闭数据全部完成后执行  只有当ws.end 才执行后
ws.on('close',()=>{
    //finish
})
//报错
ws.on('error',()=>{
    //出错
})
ws.on('finish',()=>{
    //finish
})