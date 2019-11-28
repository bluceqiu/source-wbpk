(function(modules){
    let installedModules = {};
    let installChunks = {"main": 0}; // 0 表示已加载 

    function webpackJsonpCallback(data){
        let chunkIds = data[0];
        let moreModules = data[1];

        let resolves = [];
        for(let i=0; i<chunkIds.length; i++){
            let chunkId = chunkIds[i];
            resolves.push(installChunks[chunkId][0]);
            installChunks[chunkId] = 0;
        }

        for (let moduleId in moreModules) {
            modules[moduleId] = moreModules[moduleId]
        }

        while(resolves.length>0){
            resolves.shift()();
        }

        if(oldJsonpFunction) oldJsonpFunction(data) // ? 为什么要把data放进jsonArray, data is the real async module expected to be loaded.
    }

    function __webpack_require__(moduleId){
        if(installedModules[moduleId]){
            return installedModules[moduleId]
        }
        let module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        }
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__)
        module.l = true;
        return module.exports;
    }

    __webpack_require__.t = function(value, mode){ // 兼容作用， 保证是个对象，且一定有title属性 
        value = __webpack_require__(value);
        let ns = Object.create(null);
        Object.defineProperty(ns, '__esModule', {value: true});
        Object.defineProperty(ns, 'default', {value});
        return ns; 
    }

    __webpack_require__.e = function(chunkId){
        // let promises = [];
        let installChunkData = installChunks[chunkId];
        if(!installChunkData){ // not equeal 0
            let promise = new Promise((resolve, reject)=>{
                installChunkData = installChunks[chunkId] = [resolve, reject];
            });
            installChunkData[2] = promise;
            
            let script = document.createElement("script");
            script.src = chunkId + '.js';
            document.head.appendChild(script);
            return promise;
        }
    }

    // 通过jsonp实现异步加载
    let jsonArray = (window["webpackJsonp"] = window["webpackJsonp"] || [])
    let oldJsonpFunction = jsonArray.push.bind(jsonArray);
    jsonArray.push = webpackJsonpCallback;
    jsonArray = jsonArray.slice(); //拷贝
    for(let i=0; i<jsonArray.length; i++) webpackJsonpCallback(jsonArray[i])
    var parentJsonpFunction = oldJsonpFunction;

    __webpack_require__('./src/index.js');
})({
    './src/index.js': (function(module, exports, __webpack_require__){
        let button = document.createElement("button");
        button.innerHTML = 'click me'
        button.addEventListener("click", function(){
            __webpack_require__.e(/* import() | title */ 1).then(__webpack_require__.t.bind(null, "./src/title.js", 7)).then(res=>console.log(res.default));
        });
        document.body.appendChild(button);

    }),
    './src/title.js': (function(module, exports, __webpack_require__){
        module.exports = 'i am title'
    })
})