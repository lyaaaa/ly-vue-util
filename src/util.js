const path = require('path');
const fs = require('fs');
const stat = fs.stat;
const __root__ = process.cwd(); // 代码执行时的目录

module.exports = {
    __root__: __root__,
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
    },
    // 配置 vw 单位
    flexUtilVW: function (width, height) {
        var url = path.join(__root__, '/.postcssrc.js');
        var test = require(url);
        var plugins = test.plugins;
        var obj = {
            "postcss-px-to-viewport": {
                viewportWidth: width,
                viewportHeight: height,
                unitPrecision: 3,
                viewportUnit: 'vw',
                selectorBlackList: [],
                minPixelValue: 1,
                mediaQuery: false
            },
            "cssnano": {
                preset: "advanced",
                autoprefixer: false,
                "postcss-zindex": false
            }
        }
        plugins = Object.assign({}, plugins, obj)
        fs.writeFile(url, 'module.exports=' + JSON.stringify(test), 'utf8', (err) => {
            if (err) throw err;
            console.log('done');
        });
    }
}