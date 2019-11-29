const EntryOptionPlugin = require("./plugins/EntryOptionPlugin");

class WebpackOptionsApply{
    process(option, compiler){
        compiler.hooks.afterPlugins.call(compiler);

        // 挂载入口点，监听make事件
        new EntryOptionPlugin().apply(compiler);
        // 触发entryOption 事件
        compiler.hooks.entryOption.call(option.context, option.entry);
    }
}

module.exports = WebpackOptionsApply