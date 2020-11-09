const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const resolve = (...args) => path.join(__dirname, '..', ...args)

module.exports = {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: resolve('src/index.js'),
    output: {
        path: resolve('dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    }
                ],
                include: [resolve('src'), resolve('../packages/tma/src'), resolve('../packages/tmv/src')]
            },
            {
                test: /\.(tsx|ts)$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    },
                    'ts-loader'
                ],
                include: [resolve('src'), resolve('../packages/tma/src'), resolve('../packages/tmv/src')]
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            loaders: {
                                js: [{ loader: 'babel-loader' }]
                            }
                        }
                    }
                ],
                include: [resolve('src'), resolve('../packages/tma/src'), resolve('../packages/tmv/src')]
            },
            {
                test: /\.css$/,
                use: ['vue-style-loader', 'style-loader', 'css-loader', 'postcss-loader'],
                include: [
                    resolve('src'),
                    resolve('../packages/video-player/src'),
                    resolve('../packages/audio-player/src')
                ]
            },
            {
                test: /\.less$/,
                use: ['vue-style-loader', 'style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
                include: [resolve('src'), resolve('../packages/tma/src'), resolve('../packages/tmv/src')]
            },
            {
                test: /\.(jpe?g|png|ico|gif|woff|woff2|eot|ttf|otf|svg|swf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            limit: 4000,
                            name: 'images/[name][hash:8].[ext]'
                        }
                    }
                ],
                include: [resolve('src'), resolve('../packages/tma/src'), resolve('../packages/tmv/src')]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
        alias: {
            vue: 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        // webpack热更新组件
        new webpack.HotModuleReplacementPlugin(),

        new VueLoaderPlugin(),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: resolve('src/index.html'), // 模板路径
            inject: true, // js插入位置
            chunksSortMode: 'none',
            chunks: ['manifest', 'vendor', path.join(__dirname, '../src/index.js')],
            hash: true
        })
    ],

    devServer: {
        contentBase: path.resolve(__dirname, 'dist')
    }
}
