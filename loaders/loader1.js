function loader(source){
    return source + 'loader1'
}
loader.pitch = function(){
    console.log('pitch1');
}
module.exports = loader;