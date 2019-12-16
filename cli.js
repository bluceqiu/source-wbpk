/*
 * @Author: xiaolong.qiu
 * @Date: 2019-12-16 10:34:19
 * @LastEditTime: 2019-12-16 11:12:01
 */
// 执行webpack命令的时候

const webpack = require("./webpack");
const option = require("./webpack.config");
let compiler = webpack(option);

compiler.run((err, stat)=>{
    console.log("stat====:", stat);
    // console.log(stat.toJson({
    //     entries: true,
    //     chunks: true,
    //     modules: true,
    //     assets: true
    // }));
})