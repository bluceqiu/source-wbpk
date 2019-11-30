const {Tapable, SyncHook, AsyncParallelHook, AsyncSeriesHook} = require("tapable");
const Compilation = require("./Compilation");
class Compiler extends Tapable{
    constructor(context){
        super();
        this.hooks = {
            environment: new SyncHook([]),
            afterEnvironment: new SyncHook([]),
            afterPlugins: new SyncHook([]),
            entryOption: new SyncHook(["context", "entry"]),
            make: new AsyncParallelHook(["compilation"]),
            beforeRun: new AsyncSeriesHook(["compiler"]),
            run: new AsyncSeriesHook(["compiler"]),
            beforeCompile: new AsyncSeriesHook(["params"]),
            compile: new SyncHook(["params"]),
            afterCompile: new AsyncSeriesHook(["compilation"]),
            thisCompilation: new SyncHook(["compilation", "params"]),// 启动本次编译
            compilation: new SyncHook(["compilation", "params"]), 
            done: new AsyncSeriesHook(["stats"]) // 所有执行完之后触发这个钩子

        }
        this.options = {};
        this.context = context;
    }
    run(cb){
        console.log('compiler.run...enter');
        const onCompiled = (err, compilation)=>{
            // 编译完成后的回调
            console.log('编译完成后的回调, onCompiled');
        }
        this.hooks.beforeRun.callAsync(this, err=>{
            this.hooks.run.callAsync(this, err=>{
                this.compile(onCompiled);
            })
        })
    }

    newCompilation(params){
        let compilation =  new Compilation(this);
        this.hooks.thisCompilation.call(compilation, params)
        this.hooks.compilation.call(compilation, params);
        return compilation;
    }

    compile(onCompiled){ // start to compile
        this.hooks.beforeCompile.callAsync({}, err=>{
            this.hooks.compile.call();
            let compilation = this.newCompilation();
            this.hooks.make.callAsync(compilation, err=>{
                console.log('make finish');
                onCompiled();
            });
        })
    }
}

module.exports = Compiler;