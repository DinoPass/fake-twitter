let path = require('path');

    module.exports = {
        entry: path.join(__dirname, 'src', 'index.js'),
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'bundle.js'
        },
        mode: 'development',
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                }
            ]
        }
    }