const {Tapable, SyncHook, AsyncParallelHook, AsyncSeriesHook} = require("tapable");
const path = require("path");
const normalModuleFactory = require("./NormalModuleFactory");
class Compilation extends Tapable{
    constructor(compiler){
        super();
        this.compiler = compiler;
        this.options = compiler.options;
        this.context = compiler.context;
        this.inputFileSystem = compiler.inputFileSystem;
        this.outputFileSystem = compiler.outputFileSystem;
        this.hooks = {
            addEntry: new SyncHook(['entry', 'name'])
        };
        this.entries = []; // 入口模块
        this.modules = [];
        this._modules = {}; // key 是模块的绝对路径， 值是模块实例
    }

    addEntry(context, entry, name, finallyCallback){
        console.log('addEntry enter...');
        this.hooks.addEntry.call(entry, name)
        this._addModuleChain(context, entry, name);
        finallyCallback();
    }

    _addModuleChain(context, entry, name){
        let module = normalModuleFactory.create({
            context: this.context, 
            request: path.posix.join(context, entry), // 此模块的绝对路径
            name // 模块名字
        });
        module.build(this);
        this.entries.push(module); // 把编译后的入口模块添加进入口数组 
    }
}

module.exports = Compilation;