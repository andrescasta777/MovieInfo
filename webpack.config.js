const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    entry: {
        loginpage:'./src/app/components/loginpage/index.js',
        movieinfopage:'./src/app/components/movieinfopage/index.js'
    },
    output: {
        path: __dirname + '/src/public/js',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:{
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            { 
                test: /\.(jpg|png|woff|woff2|eot|}ttf|svg)$/, 
                use: [
                    { 
                        loader: 'url-loader', 
                        options: { limit: 100000 }
                    }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}