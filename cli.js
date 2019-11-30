const webpack = require("./webpack");
const option = require("./webpack.config");

let compiler = webpack(option);

compiler.run((err, stat)=>{
    console.log("stat====:", stat);
    // console.log(stat.toJson({
    //     entries: true,
    //     chunks: true,
    //     modules: true,
    //     assets: true
    // }));
})