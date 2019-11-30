// 异步加载
// let button = document.createElement("button");
// button.innerHTML = 'click me'
// button.addEventListener("click", function(){
//     import("./title.js").then(res=>console.log(res.default));
// });
// document.body.appendChild(button);




// loader 测试
const title = require('./title');
console.log(title);
console.log('index');
