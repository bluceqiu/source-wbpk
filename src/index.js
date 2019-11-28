let button = document.createElement("button");
button.innerHTML = 'click me'
button.addEventListener("click", function(){
    import("./title.js").then(res=>console.log(res.default));
});
document.body.appendChild(button);
