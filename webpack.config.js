//ES6, Sass, Autoprefixer, CSSnext, React, CSS Modules
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cssnext = require('postcss-cssnext');
const appRoot = path.join(__dirname, './');

module.exports = {
	entry: './app.js',
	devtool: 'source-map',
	output:{
		filename: './build/js/bundle.js'
	},
	watch:true,
	module:{
		loaders:[
			{
				test:/\.js$/,
				exclude:/node_modules/,
				loader:'babel-loader',
				query:{
					presets:['react','es2015','stage-0'],
					plugins: ['react-html-attrs']
				}
			},
			{
				test: /\.svg$/,
				loader: 'url?limit=65000&mimetype=image/svg+xml&name=./build/fonts/[name].[ext]'
			},
			{
				test: /\.woff$/,
				loader: 'url?limit=65000&mimetype=application/font-woff&name=./build/fonts/[name].[ext]'
			},
			{
				test: /\.woff2$/,
				loader: 'url?limit=65000&mimetype=application/font-woff2&name=./build/fonts/[name].[ext]'
			},
			{
				test: /\.[ot]tf$/,
				loader: 'url?limit=65000&mimetype=application/octet-stream&name=./build/fonts/[name].[ext]'
			},
			{
				test: /\.eot$/,
				loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=./build/fonts/[name].[ext]'
			},
			{
				test: /\.(jpe?g|png|gif)$/,
				loader: "url?limit=8192&name=./build/images/[name].[ext]"
			},
		    {
		    	test: /\.css$/,
		    	loader: ExtractTextPlugin.extract('style', 'css?sourceMap&importLoaders=1!postcss?sourceMap')
		    },
			{
				test: /global\.scss/,
				loader: ExtractTextPlugin.extract('style', 'css?sourceMap&importLoaders=1!postcss!sass?sourceMap')
			},
			{
				test: /\.scss/,
				exclude:/global\.scss/,
				loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&camelCase=dashes&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?sourceMap')
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('./build/css/bundle.css')
	],
	resolve:{
		extensions:['', '.jsx', '.scss', '.js', '.json', '.css'],
		root: path.resolve('./')
	},
	postcss: [
		cssnext({
	      browsers: ['last 2 version', 'ie > 8', '> 1%']
	    })
    ]
};
