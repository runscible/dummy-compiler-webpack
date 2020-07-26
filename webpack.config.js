const path = require('path')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const glob = require('glob')

function populateOptions() {
    const result = {}
    glob.sync('src/pages/*').map(val => result[val] = `./${val}/index.js` )
    return result
}

module.exports = async function(mode, argv) {
    console.log('el valor de populate options es ', populateOptions())    
    return {
                entry: {
                    ...populateOptions()
                },
                output: {
                    path: path.resolve(__dirname, './dist'),
                    filename: "[name].js"
                },
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /(node_modules)/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env']
                            }
                        }
                    },
                    {
                        test: /\.(sa|sc|c)ss$/,
                        use: [
                            "style-loader",
                            "css-loader",
                            "sass-loader"
                        ]
                    },
                    {
                        test: /\.html$/,
                        use: [
                            {
                                loader: "html-loader"
                            }
                        ]
                    }
                ]
            },
                plugins: [
                    new HtmlWebPackPlugin({
                        template: "./src/index.html",
                        filename: "./index.html",
                        inlineSource: '.(js|css)$'
                    }),
                    new MiniCSSExtractPlugin({
                        filename: "./src/**/*.scss"
                    })
                ],
                mode: 'development'
            }


}

