function loader(source){
    return source + 'loader2'
}
loader.pitch = function(){
    console.log('pitch2');
    return "loader2pitch"
}
module.exports = loader;