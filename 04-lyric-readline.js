"use srict";

// 加载需要的模块
const fs = require("fs");
const path = require("path");
// 由于node不支持gbk,所以要用第三方库将gbk改为utf-8
const iconv = require("iconv-lite");
// 用流的方式读取文件,减少内存消耗
const readline = require("readline");

// 创建一个读取流,并且转为utf8的流
let readStream = fs.createReadStream(path.join(__dirname, "./lyric/致青春.lrc"))
                    .pipe(iconv.decodeStream("gbk"));

// 创建一个readline接口
const rl = readline.createInterface({
    input: readStream
});

let regex = /\[(\d{2})\:(\d{2})\.(\d{2})\](.+)/;

rl.on("line",(line) => {
    // 遍历歌词的每一行,如果不遵守正则直接输入,遵守只打印歌词
    // 将歌词与正则表达式匹配
    let matches = regex.exec(line);
    //console.log(matches);
    if(matches){
    // 表示这行是歌词
        // matches[0]是整行所有的内容
        // 由于拿到的时间是字符串,要转换成数字
        let min = parseInt(matches[1]);
        let s = parseInt(matches[2]);
        let ms = parseInt(matches[3]);
        let lyric = matches[4];
            
        setTimeout(() => {
            console.log(lyric);
        }, min * 60 * 1000 + s * 1000 + ms)
    } else {
        // 这行不是歌词
        console.log(line);
    }
});


