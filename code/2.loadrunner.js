
const path = require('path');
const fs = require("fs");


function createLoaderObject(loader){
    let loaderObj = {data:{}}
    loaderObj.request = loader;
    loaderObj.normal = require(loader);
    loaderObj.pitch = loaderObj.normal.pitch;
    return loaderObj;
}
function loadrunner(options, callback){
    let loaderContext = {};
    let resource = options.resource;
    let loaders = options.loaders;
    loaders = loaders.map(createLoaderObject);

    loaderContext.index = 0;
    loaderContext.readResource = fs;
    loaderContext.resource = resource;
    loaderContext.loaders = loaders;

    // start...
    iteratePitchingLoaders(loaderContext, callback);

    function iterateNormalLoaders(loaderContext, args, callback){
        if(loaderContext.index < 0){
            return callback(null, args);
        }

        let currentLoaderObject = loaderContext.loaders[loaderContext.index];
        let normalFn = currentLoaderObject.normal;
        let result = normalFn.call(loaderContext, args);
        loaderContext.index--;
        iterateNormalLoaders(loaderContext, result, callback);
    }

    function processResource(loaderContext, callback){
        let buffer = loaderContext.readResource.readFileSync(loaderContext.resource, "utf-8");
        iterateNormalLoaders(loaderContext, buffer, callback);
    }

    function iteratePitchingLoaders(loaderContext, callback){
        if(loaderContext.index >= loaderContext.loaders.length){
            loaderContext.index--;
            // iterateNormalLoaders(loaderContext);
            return processResource(loaderContext, callback);
        }
        let currentLoaderObject = loaderContext.loaders[loaderContext.index];
        let pitchFn = currentLoaderObject.pitch;
        if(!pitchFn){
            loaderContext.index++;
            return iteratePitchingLoaders(loaderContext, callback);
        }
        let result = pitchFn.apply(loaderContext);
        if(result){
            loaderContext.index--;
            iterateNormalLoaders(loaderContext, result, callback);
        }else{
            loaderContext.index++;
            iteratePitchingLoaders(loaderContext, callback);
        }
    }
}

let entry = "./index.js";
let options = {
    resource: path.resolve(__dirname, entry),
    loaders: [
        path.resolve(__dirname, "loaders/loader1.js"),
        path.resolve(__dirname, "loaders/loader2.js"),
        path.resolve(__dirname, "loaders/loader3.js"),
    ]
}
loadrunner(options, (err, result) => {
    console.log(result);
})


// 我们在用webpack构建项目的时候，有两种配置打包文件的方式：

// import或者require ：a-loader!b-loader!.././static/dog.png（打包某一个文件）
// 配置webpack.config.js文件的module.rules（打包某一类的文件）

// 对单文件打包的方式的loader被称为行内（inline）loader；
// 于rules中的loader，webpack还定义了一个属性 enforce，可取值有 pre（为pre loader）、post（为post loader），如果没有值则为（normal loader）。所以loader在webpack中有4种:normal，inline，pre，post。

// Pitching阶段： post，inline，normal，pre
// Normal阶段：pre，normal，inline，post

// It's like the two phases of event bubbling...

// a!b!c!resource

// pitch a
// 　　pitch b
// 　　　　pitch c
// 　　　　　　read file resource (adds resource to dependencies)
// 　　　　run c
// 　　run b
// run a
// When a loader return something in the pitch phase the process continues with the normal phase of the next loader... Example:

// pitch a
// 　　pitch b (returns something)
// run a



// 那么问题来了，如果我们采用了两种解析loader的方式，他们的执行是什么样的呢？答案是inline loader优先级高于config配置文件中的loader：源码

// 　　webpack使用了neo-async库（用来提供js异步编程的工具库）来解析loader模块，解析inline loader的源码，

// 解析config loader的源码

// 　　webpack官方文档推荐不适用inline loader，最好用在配置文件中使用loader（注意：loader处理的代码中是含有inline loader的）。另外，在特殊情况下我我们可以在inline loader间接改变loader的执行顺序（禁止某些另外3种loader），比如在我们的自己公司某个同事的不是很规范的js库在引入的时候需要禁止掉eslint-loader对其进行处理

// 加入 !   前缀禁用配置文件中的普通loader，比如：require("!raw!./script.coffee")
// 加入 !!  前缀禁用配置文件中所有的loader，比如：require("!!raw!./script.coffee")
// 加入 -!  前缀禁用配置文件中的pre loader和普通loader，但是不包括post loader，比如：require("!!raw!./script.coffee")
// 　　关于loader的禁用，webpack官方的建议是：除非从另一个loader处理生成的，一般不建议主动使用

// pre loader 配置：图片压缩
// 普通loader 配置：coffee-script转换
// inline loader 配置：bundle loader
// post loader 配置： 代码覆盖率工具