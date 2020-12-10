const path = require("path");   // 加载path模块
const HtmlWebpackPlugin=require('html-webpack-plugin'); //加载html-webpack-plugin 模块
const miniCssExtractPlugin=require('mini-css-extract-plugin'); 
const {CleanWebpackPlugin}=require("clean-webpack-plugin")
module.exports = {
    // modul:"production",   
    entry: { //打包入口
        index: "./src/index.js",
    },
    output: { //打包出口
        path: path.resolve(__dirname, '../dist'),  //打包文件输出路径 绝对路径
        filename: "[name].[hash].js"  // 打包的文件名
    },
    devServer:{ // 开发本地服务器配置
        // 开启网页服务器的根路径 一般选 dist 默认首页 index.html
        contentBase: path.join(__dirname, "../dist"),  // 输出路径，开启网页服务器的根路径
        compress: true,  // 是否压缩
        port: 8080,  //端口号 开启的服务器的端口
        open: true  // 是否自动打开浏览器
    },
    module: {
        rules: [//解析规则
            {
                test: /\.css$/,  //正则：以css结尾的文件 文件解析，
                use: [
                    // { loader: 'style-loader' }, 把原来css的 style-loader 替换成 ↓，用miniCssExtractPlugin插件的loader处理css
                    { loader: miniCssExtractPlugin.loader },
                    { loader: 'css-loader' }
                ]
            },
            {
                test: /\.less$/,  //正则：以css结尾的文件 文件解析，
                use: [
                    // { loader: 'style-loader' }, 把原来css的 style-loader 替换成 ↓，用miniCssExtractPlugin插件的loader处理css
                    { loader: miniCssExtractPlugin.loader },  //把引入css写入style标签
                    { loader: 'css-loader' },  //把css文件引入并处理
                    { loader: 'less-loader' },  // 把css文件引入并处理
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {loader: miniCssExtractPlugin.loader},
                    {loader: 'css-loader'},
                    {loader: 'sass-loader'},
                ]
                
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/, 
                use: [
                  {loader: 'file-loader', }
                ]
            },
            // {
            //     test: /\.(png|jpg|gif|jpeg)$/,  // 匹配图片文件
            //     use: [
            //         {
            //             loader:'url-loader',
            //             options: {
            //                 limit:102400  //单位是byte  1024k *100 ,图片小于100k的时候转化为base24编码格式
            //             }
            //         }
            //     ]
            // },
            {
                test: /\.js$/, // 匹配js文件
                // babel转化的时候 排除node_modules 和 brower_components文件夹
                exclude: /(node_modules|boewr_components)/, 
                use: [
                    {
                        loader: 'babel-loader',  //用babel-loader处理
                        options: { // 选项参数
                            presets: ['env'],  //预设evn es6转es5
                        }
                    }
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({//构造函数传参
            title: "网页标题",
            template: "./src/templates/triangles.html",  //处理html模板路径
            inject: "body", // 自动写入js的位置
                // true 默认值，script标签位于html文件的body的底部，body：script标签位于html文件的body底部
                // head：script标签位于html文件的head中；false：不插入生成的js文件
            minify: { // html压缩规则
                removeComment: false,  // 是否移出注释
                removeAttributeQuotes: false, // 是否移出属性的引号
                collapseWhitespace:false // 是否移出空白
            },
            filename:"index.html" // 输出模板名称
        }),
        // 分离css插件
        new miniCssExtractPlugin({ // 初始化插件
            // 输出文件名称
            filename:'[name].[hash].css'
        }),

        // 创建清理插件
        new CleanWebpackPlugin()
    ]
}