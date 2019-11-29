class MyPlugin{
    apply(compiler){
        console.log('myPlugin');
        compiler.hooks.environment.tap("myPlugin", ()=>{
            console.log('myPlugin tap...');
        })
    }
}

module.exports = MyPlugin;