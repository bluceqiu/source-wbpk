// inline normal pre post
// eslint 语法检测loader一般用于pre规则

const path = require("path");
// 正常情况下module的查找路径
let nodeModules = path.resolve(__dirname, 'node_modules');

let request = "-!inline-loader1!inline-loader1!./src/style.css"

let rules = [
    {test: /\.css$/, enforce: 'pre', use:['pre-loader1', 'pre-loader2']},
    {test: /\.css$/, use:['normal-loader1', 'normal-loader2']},
    {test: /\.css$/, enforce: 'post', use:['post-loader1', 'post-loader2']}
]
let resolveLoader = loader => path.resolve(nodeModules, loader+'.js');

const noPreAutoLoaders = request.startsWith("-!");
const noAutoLoaders = noPreAutoLoaders || request.startsWith("!");
const noPreAutoPostLoaders = request.startsWith("!!");
let inlineLoaders = request.replace(/^-?!+/, "").replace(/!!+/g, "!").split("!");

let resource = inlineLoaders.pop();
// inlineLoaders = inlineLoaders.map(resolveLoader); // 通过这个映射，将loader名字转换成绝对路径

// 分组规则
let preLoaders = [];
let normalLoaders = [];
let postLoaders = [];

for(let i=0; i < rules.length; i++){
    let rule = rules[i];
    if(rule.test.test(resource)){
        if(rule.enforce == 'pre'){
            preLoaders.push(rule.use);
        }else if(rule.enforce == 'normal'){
            normalLoaders.push(rule.use);
        }else{
            postLoaders.push(rule.use);
        }
    }
}

let loaders;
if(noPreAutoPostLoaders){
    loaders = [...inlineLoaders];
}else if(noPreAutoLoaders){
    loaders = [...inlineLoaders, ...postLoaders]
}else if(noAutoLoaders){
    loaders = [...inlineLoaders, ...preLoaders, ...postLoaders]
}else{
    loaders = [...postLoaders, ...inlineLoaders, ...normalLoaders, ...preLoaders];
}

loaders.map(resolveLoader);
console.log(loaders);