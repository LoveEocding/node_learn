/**
 *  需求：拉钩教育写入指定的文件
 *  01 一次性写入
 *  02 分批写入
 */

 let fs=require('fs');
 let ws=fs.createWriteStream('test.txt',{
     highWaterMark:3
 });
  
 ws.write('拉钩教育');


 //分批写入
 let source="拉钩教育".split('');
 let num=0
 let flag=true
 function executeWrite(){
      flag=true
      while(num!=4&&falg){
          flag= ws.write(source[num]);
          num++;
      }
 }

 executeWrite();

 ws.on('drain',()=>{
     //再次执行写入
     executeWrite();
 })