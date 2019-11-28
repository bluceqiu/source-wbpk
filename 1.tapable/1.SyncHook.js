const {SyncHook} = require('./tapable');

let queue = new SyncHook(['a', "b"]);
queue.tap("1", (a, b)=>{
    console.log(a,b);
})
queue.tap("2", (a, b)=>{
    console.log(a,b);
})
queue.call('hello','world');