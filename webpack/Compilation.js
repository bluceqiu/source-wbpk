const {Tapable, SyncHook, AsyncParallelHook, AsyncSeriesHook} = require("tapable");
const path = require("path");
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
        this.entries = [];
    }

    addEntry(context, entry, name, finallyCallback){
        console.log('addEntry enter...');

    }
}

module.exports = Compilation;