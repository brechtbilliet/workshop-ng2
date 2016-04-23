var loaders = require('./loaders');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
var StringReplacePlugin = require("string-replace-webpack-plugin");
var API_KEY = process.env.npm_config_apikey;

module.exports = {
    entry: {
        app: './src/index.ts',
        vendor: [
            'jquery',
            'angular2/core',
            'angular2/platform/browser',
            'angular2/http',
            'angular2/common',
            'angular2/router',
            '@ngrx/store',
            'toastr',
            'toastr/build/toastr.css',
            'font-awesome/css/font-awesome.css',
            'bootstrap/dist/css/bootstrap.css',
            'bootstrap',
            'rxjs',
            'lodash'
        ]
    },
    output: {
        filename: './dev/[name].bundle.js',
        path: 'dev',
        publicPath: '/'
    },
    devServer: {
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    },
    resolve: {
        root: __dirname,
        extensions: ['', '.ts', '.js', '.json']
    },
    debug: true,
    // devtool: 'cheap-module-eval-source-map',
    plugins: [
        new StringReplacePlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body',
            hash: true
        }),
        new OpenBrowserPlugin({url: 'http://localhost:8080'}),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.jquery': 'jquery'
        }),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'dev/vendor.bundle.js')
    ],
    module: {
        loaders: loaders.concat([
            {
                test: /configuration.ts$/,
                loader: StringReplacePlugin.replace({
                    replacements: [
                        {
                            pattern: '%API_KEY%',
                            replacement: function () {
                                return API_KEY
                            }
                        }
                    ]
                })
            }
        ])
    }
};