class MyPlugin{
    apply(compiler){ // 每一个plugin 都有一个apply方法
        console.log('myPlugin enter');
        compiler.hooks.environment.tap("myPlugin", ()=>{ // 在plugin内绑定事件
            console.log('myPlugin tap...回调');
        })
    }
}

module.exports = MyPlugin;