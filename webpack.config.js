const path = require('path');
module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: './src/index.js',
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolveLoader: {
        // alias: {
        //     "babel-loader": path.resolve(__dirname, 'loaders/babel-loader.js') // 方式一
        // },
        modules: [path.resolve(__dirname, 'loaders'), "node_modules"] // 方式二
    },
    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     use: ['babel-loader']
            // },
            {
                test: /\.js$/,
                use: ['loader1', 'loader2', 'loader3']
            }
        ]
    }
}