const path = require('path');
const fs = require('fs');
const stat = fs.stat;

module.exports = {
    __root__: process.cwd(),
    // 复制文件夹到指定目录下
    copyFile: function (src, dst) {
        // 读取目录中的所有文件/目录
        fs.readdir(src, function (err, paths) {
            if (err) {
                throw err;
            }
            paths.forEach(function (path) {
                var _src = src + '/' + path,
                    _dst = dst + '/' + path,
                    readable, writable;
                stat(_src, function (err, st) {
                    if (err) {
                        throw err;
                    }
                    // 判断是否为文件
                    if (st.isFile()) {
                        readable = fs.createReadStream(_src);
                        writable = fs.createWriteStream(_dst);
                        readable.pipe(writable);
                    }
                    // 如果是目录则递归调用自身
                    else if (st.isDirectory()) {
                        exists(_src, _dst, copyFile);
                    }
                });
            });
        });
    },
    // 判断文件夹是否存在，不存在需要先创建目录
    existsFile: function (src, dst, callback) {
        fs.exists(dst, function (exists) {
            if (exists) {
                callback(src, dst);
            } else {
                fs.mkdir(dst, function () {
                    callback(src, dst);
                });
            }
        });
    }
}