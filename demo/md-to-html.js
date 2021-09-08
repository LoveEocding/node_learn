const fs=require('fs');
const path=require('path');
const marked=require('marked');
const browserSync=require('browser-sync');


/**
 * 1、读取md和css内容
 * 2、将上述内容读取替换占位符,生成一个最终需要展开的html 字符串
 * 3、将上述html 字符写入指定 html 文件
 * 4、监听md 文档内容的变轻，然后更新html内容
 * 5、使用browser-sync 来实时显示html 内容
 */
let mdPath= path.join(__dirname,process.argv[2]);
let cssPath= path.resolve('github.css');
let htmlPath=mdPath.replace(path.extname(mdPath),'.html');

let temp="";

fs.watchFile(mdPath,(curr,perv)=>{
    if(curr.mtime!==perv.mtime){
        fs.readFile(mdPath,'utf-8',(err,data)=>{
            let htmlStr=marked(data);
            fs.readFile(cssPath,'utf-8',(err,data)=>{
                let retHtml=temp.replace('{{content}}',htmlStr).replace('{{style}}',data)
                fs.write(htmlPath,retHtml,()=>{
                    console.log('html 生成成功');
                })
            })
        })
    }
})

browserSync.init({
    files:htmlPath,
    watch:true
})

