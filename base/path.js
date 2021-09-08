const path=require('path')

const log=(val)=>{
   console.log(val);
}

//获取文件全部名称
log(__filename);

/**
 * 01 返回接受路径的最后一部分
 * 02 第二个参数表示扩展名，如果没有就返回完整带后缀名，如果有，就会忽略后缀
 */
log(path.basename(__filename)) //path.js
log(path.basename(__filename,'.js')) //path
log(path.basename('/a/b/c')) //c
log(path.basename('/a/b/c/')) //c 有分隔符自动忽略掉


/**
 * 01:接受路径的目录名
 * 02:最后有分隔符会被忽略掉
 */
log(path.dirname(__filename)) //C:\Users\Yao.Nie\Desktop\mynode

/**
 * 01:返回接受路径的后缀
 * 02:规则获取最后一个点 后面的后缀
 */
log(path.extname(__filename)) //.js
log(path.extname('a/b/c')) //空

log(path.join('p/a/','../b')) //a\b

//解析路径
/**
 * {
  root: 'C:\\',
  dir: 'C:\\Users\\Yao.Nie\\Desktop\\mynode',
  base: 'path.js',
  ext: '.js',
  name: 'path'
}
 */
log(path.parse(__filename)); 

//绝对路径 第二个参数可以对路径操作
log(path.resolve(__filename,'../'));

//规范化 把一些不规范的路径，变成规范
log(path.normalize('///a///b//c')); // a/b/c

//根据对象格式化路径 序列化
log(path.format(path.parse(__filename)));

//是否是绝对路径
log(path.isAbsolute('a'))  //false