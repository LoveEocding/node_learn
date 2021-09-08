const fs=require('fs');

let ws=fs.createWriteStream('test.txt',{
    highWaterMark:3
})

 let flag=ws.write('1');
 
 //如果flag为false 并不是说明当前数据不能被执行写入
 console.log(flag);