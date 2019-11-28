const babel = require("@babel/core");

function loader(source, sourceMap){
    console.log('执行自己的loader');
    let options = {
        presets: ['@babel/preset-env'],
        inputSourceMap: sourceMap,
        sourceMaps: true,
        filename: this.request.split('!').pop()
    }

    let {code, map, ast} = babel.transform(source, options);

    return this.callback(null, code, map, ast)
}

module.exports = loader;