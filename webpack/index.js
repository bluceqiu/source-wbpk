const NodeEnvironmentPlugin = require("./plugins/NodeEnvironmentPlugin");
const Compiler = require("./Compiler");
const WebpackOptionsApply = require("./WebpackOptionsApply");

const webpack = (options, callback) => {
    options.context = options.context || process.cwd();
    let compiler = new Compiler();

    new NodeEnvironmentPlugin().apply(compiler);

    if(options.plugins && Array.isArray(options.plugins)){
        options.plugins.forEach(plugin => plugin.apply(compiler));
    }
    compiler.hooks.environment.call();
    compiler.hooks.afterEnvironment.call();
    new WebpackOptionsApply().process(options, compiler);

    return compiler;

}


module.exports = webpack;