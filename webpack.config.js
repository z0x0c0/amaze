'use strict';

var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var options = {
	release: false
};

module.exports = {
    entry: {
        app: 'game'
    },

    output: {
        path: './build',
        filename: 'game.js'
    },

    debug: !options.release,
    devtool: options.release ? false : 'source-map',
    plugins: options.release ? [
        new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'}),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new ExtractTextPlugin("game.css")
    ] : [
        new webpack.DefinePlugin({ DEBUG: true }),
        new ExtractTextPlugin("game.css")
    ],

    resolve: {
        modulesDirectories: ['./scripts', './node_modules'],
        extensions: ['', '.js', '.ts', '.css']
    },

    module: {
        loaders: [
            {
                test: /\.ts?$/,
                exclude: /node_modules/,
                loader: 'ts?transpileOnly=true'
            },
            {
                test: /\.css$/,
                //loader: 'style!css'
                loader: ExtractTextPlugin.extract("style", "css")
            },
            {
                test: /\.(gif|png|jpg)/,
                loader: 'url?limit=10000'
            }
        ]
    }
};
