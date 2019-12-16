/*
 * @Author: xiaolong.qiu
 * @Date: 2019-12-16 10:34:19
 * @LastEditTime: 2019-12-16 11:04:37
 */
const path = require('path');
const MyPlugin = require("./plugins/MyPlugin");
module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: './src/index.js',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolveLoader: {
        // alias: {
        //     "babel-loader": path.resolve(__dirname, 'loaders/babel-loader.js') // 方式一
        // },
        modules: [path.resolve(__dirname, 'loaders'), "node_modules"] // 方式二
    },
    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     use: ['babel-loader']
            // },
            {
                test: /\.js$/,
                use: ['loader1', 'loader2', 'loader3']
            }
        ]
    },
    plugins:[
        new MyPlugin() // 调用自己的插件
    ]
}