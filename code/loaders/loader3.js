function loader(source){
    return source + 'loader3'
}

loader.pitch = function(){
    console.log('pitch3');
    // return "loader3pitch"
}

module.exports = loader;