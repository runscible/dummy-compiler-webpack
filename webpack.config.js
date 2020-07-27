const path = require('path')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const glob = require('glob')

function populateOptions() {
    const result = {}
    glob.sync('src/pages/*').map(val => result[val] = `./${val}/index.js` )
    populatePlugins()
    return result
}

function populatePlugins () {
    const result = []
    glob.sync('src/pages/*').map(val => result.push(new HtmlWebPackPlugin({
        template: "./src/index.html",
        filename: `${val}/index.html`,
        inlineSource: '.(js|css)$'
    })))
    return result
}
const configPHP = () => (
    {
        entry: {
            ...populateOptions()
        },
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: "[name]/index.js"
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
            ...populatePlugins(),
            new MiniCSSExtractPlugin({
                filename: "./src/**/*.scss"
            })
        ],
        mode: 'development'
    }
) 

const defaultConfig = () => (
    {
        entry: './src/index.js',
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
                filename: "./test/index.html",
                inlineSource: '.(js|css)$'
            }),
            new MiniCSSExtractPlugin({
                filename: "./src/**/*.scss"
            })
        ],
        mode: 'development'
    }
)
module.exports = function () {
    if (process.env.TYPE && process.env.TYPE === 'php') return configPHP();
    else return defaultConfig();
}
 