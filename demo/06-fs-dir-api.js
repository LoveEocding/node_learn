const fs=require('fs')

//判断是否有操作权限
fs.access('a.txt',(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log('有操作权限');
    }
})

// stat 目录信息
fs.stat('a.txt',(err,statObj)=>{
    console.log(statObj.size());
    console.log(statObj.isFile())
    console.log(statObj.isDirectory());
})

//递归创建目录
fs.mkdir('a/b/c',{recursive:true},(err)=>{

})

//删除目录 默认是删除baseName 可以使用递归
fs.rmdir('a/b/c',(err)=>{

})

//读取目录
fs.readdir('a',(err,files)=>{
    console.log(files);
    //这里可以递归读取
})


//删除文件
fs.unlink('a/a.txt',(err)=>{
    
})