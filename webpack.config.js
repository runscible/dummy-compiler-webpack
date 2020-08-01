const path = require('path')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const glob = require('glob')

function populateOptions() {
    const result = {}
    glob.sync('src/pages/*').map(val => result[val] = `./${val}/index.js` )
    return result
}

function populatePlugins () {
    const result = []
    glob.sync('src/pages/*').map(val => result.push(new HtmlWebPackPlugin({
        relativePathJS: val,
        filename: `${val}/index.twig`,
        inject: false,
        templateContent: ({ htmlWebpackPlugin }) => {
            return `<!DOCTYPE html>
                            <html lang="en">
                                <head>
                                    <meta charset="UTF-8">
                                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
                                </head>
                            <body>
                                <div id="root"></div>
                                <script type="text/javascript" src='${htmlWebpackPlugin.options.relativePathJS }'>
                                </script>
                            </body>
                            </html>`
        },
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
        optimization: {
            chunkIds: "named",
            splitChunks: {
                cacheGroups: {
                    commons: {
                        chunks: "initial",
                        minChunks: 2,
                        maxInitialRequests: 5, 
                        minSize: 5 
                    },
                    vendor: {
                        test: /node_modules/,
                        chunks: "initial",
                        name: "vendor",
                        priority: 10,
                        enforce: true
                    }
                }
            }
        },
        mode: 'production'
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
                filename: "index.html",
                inlineSource: '.(js|css)$',
            }),
            new MiniCSSExtractPlugin({
                filename: "./src/**/*.scss"
            })
        ],
        mode: 'production'
    }
)
module.exports = function () {
    if (process.env.TYPE && process.env.TYPE === 'php') return configPHP();
    else return defaultConfig();
}
 