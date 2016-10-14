"use strict";

const fs = require("fs");
const path = require("path");

// 创建输入流
var readStream = fs.createReadStream(path.join(__dirname,"./../WebStorm-2016.1.1.exe"));
// 创建输出流
var writeStream = fs.createWriteStream(path.join(__dirname,"./../WebStorm.exe"));

fs.stat(path.join(__dirname,"./../WebStorm-2016.1.1.exe"),(err, stats) => {
    var totalData = 0;
    readStream.on("data",(chunk) => {
        //console.log(`读入了 ${(totalData += chunk.length)/stats.size * 100} %`);
        writeStream.write(chunk,(err) => {
            console.log(`已经拷贝完成了 ${(totalData += chunk.length)/stats.size * 100} %`);
        });
    });
});