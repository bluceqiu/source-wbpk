class SingleEntryPlugin{
    constructor(context, entry, name){
        this.context = context;
        this.entry = entry;
        this.name = name;
    }
    apply(compiler){
        compiler.hooks.make.tapAsync("SingleEntryPlugin",(compilation, cb)=>{ // compilation 代表一次编译
            let {context, entry, name} = this;
            compilation.addEntry(context, entry, name, cb)
        })
    }
}