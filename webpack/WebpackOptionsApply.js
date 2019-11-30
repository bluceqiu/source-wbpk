const EntryOptionPlugin = require("./plugins/EntryOptionPlugin");

class WebpackOptionsApply{
    process(option, compiler){
        compiler.hooks.afterPlugins.call(compiler); //没有注册该事情，不知道为什么要触发事件

        // 挂载入口点，监听make事件，compiler.hooks.entryPoint.tap
        new EntryOptionPlugin().apply(compiler);
        // 触发entryOption 事件
        compiler.hooks.entryOption.call(option.context, option.entry);
    }
}

module.exports = WebpackOptionsApply