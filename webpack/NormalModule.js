const babylon = require('babylon');
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");
let types = require("babel-types");
let generator = require("babel-generator").default;
let traverse = require("babel-traverse").default;

class NormalModule{
    constructor({context, request, name}){
        this.context = context;
        this.request = request;
        this.name = name;
        this.dependencies = []; // 这里放的模块的依赖数组
        this.moduleId; // 模块id
        this._ast; // 本模块的抽象语法树
        this._source; // 源码
    }

    build(compilation){
        console.log('现在开始编译入口模块了');
        // 读取模块的内容
        let originalSource = compilation.inputFileSystem.readFileSync(this.request, 'utf8');
        const ast = babylon.parse(originalSource);

        let dependencies = []
        traverse(ast, {
            CallExpression: (nodePath)=>{
                if(nodePath.node.callee.name == 'require'){
                    // 获取当前节点对象
                    let node = nodePath.node;
                    node.callee.name = '__webpack_require__';
                    let moduleName = node.arguments[0].value; // ./title
                    let extName = moduleName.split(path.posix.seq).pop().indexOf('.') === -1 ? '.js' : ''
                    // 获取依赖模块title.js的绝对路径
                    let dependencyRequest = path.posix.join(path.posix.dirname(this.request), moduleName+extName);
                    // 获取依赖模块的模块id，也就是相对根目录的路径 -> ./src/title.js
                    let dependencyModuleId = './' + path.posix.relative(this.context, dependencyRequest);
                    dependencies.push({
                        name: this.name, //此模块所属代码块的名字
                        context:this.context,
                        request: dependencyRequest
                    });

                    // 把参数从 ./title.js 改为 ./src/title.js
                    node.arguments = [types.stringLiteral(dependencyModuleId)]
                }
            }
        });
        let {code} = generator(ast);
        console.log('code:', code);
        this._ast = ast;
        this._source = code;
    }
}

module.exports = NormalModule;