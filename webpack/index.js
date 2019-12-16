/*
 * @Author: xiaolong.qiu
 * @Date: 2019-12-16 10:34:19
 * @LastEditTime: 2019-12-16 10:53:57
 */
const NodeEnvironmentPlugin = require("./plugins/NodeEnvironmentPlugin"); // 绑定node环境下的文件读写方式
const Compiler = require("./Compiler"); // tapable的一个实例，里面包含了tapable一些列的实例
const WebpackOptionsApply = require("./WebpackOptionsApply"); // 开始解析config文件，里面包含了对入口文件的解析等操作

const webpack = (options, callback) => {
    console.log(`当前工作目录是: ${process.cwd()}`);
    options.context = options.context || process.cwd();
    let compiler = new Compiler(options.context);

    new NodeEnvironmentPlugin().apply(compiler); // 给compiler添加在node环境下的input，output的能力或者说方法

    if(options.plugins && Array.isArray(options.plugins)){
        options.plugins.forEach(plugin => plugin.apply(compiler)); //为所有plugins添加environment tap事件
    }
    compiler.hooks.environment.call(); // 调用environment钩子
    compiler.hooks.afterEnvironment.call(); // 没有添加事件，不知道为什么要触发
    new WebpackOptionsApply().process(options, compiler);

    return compiler;

}


module.exports = webpack;