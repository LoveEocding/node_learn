const fs=require('fs');
const path=require('path');

//readFile
fs.readFile(path.resolve('../test.ts'),'utf-8',(err,data)=>{
    console.log(err);
    console.log(data);
})

fs.writeFile(path.resolve('../test.ts'),'utf-8',(res)=>{
    console.log(res);
});
fs.writeFile(path.resolve('../new.ts'),'utf-8',{
    mode:438,
    flag:'w+',
    encoding:'utf-8'
},(res)=>{
    console.log(res);
});
fs.appendFile(path.resolve('../test.ts'),'utf-8',(res)=>{
    console.log(res);
})

fs.watchFile(path.resolve('../new.ts'),{
    interval:100
},(a,b)=>{
    console.log(a);
    console.log(b);
    if(b.mtime!==a.mtime){
        console.log('文件被修改了');
    }
})