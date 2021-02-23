const path = require('path')

module.exports = {
    mode: 'production',
    devtool: 'none',
    entry: path.join(__dirname, './src/index.js'),
    output: {
        path: path.join(__dirname, './lib'),
        filename: 'index.js',
    },
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/, // 匹配js，ts
                use: ['babel-loader']
            }
        ]
    },
    plugins: [],
    resolve: {
        // 自动解析确定的扩展,import的时候可以不带后缀
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.d.ts'],
        // 别名
        alias: {}
    }
}
