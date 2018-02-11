var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
var cssnext = require('postcss-cssnext');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	context: __dirname,
	entry: {
		main: './frontend/src/index.tsx',
	},
	devtool: 'inline-source-map',
	output: {
		path: path.resolve('./frontend/static/bundles/'),
		filename: "[name]-[hash].js"
	},

	plugins: [
		new BundleTracker({filename: './webpack-stats.json'}),
		new webpack.LoaderOptionsPlugin({
			test: /\.scss$/,
			options: {
				postcss: {
					plugins: [cssnext],
				},
			},
		}),
		// jQuery support
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
			'root.jQuery': 'jquery',
		}),
		new ExtractTextPlugin({
			filename: "[name]-[hash].css",
		}),
	],

	module: {
	rules: [
		{
			test: /\.scss$/,
			use: ExtractTextPlugin.extract({
				use: [{
					loader: "css-loader"
				}, {
					loader: "sass-loader"
				}],
				// use style-loader in development
				fallback: "style-loader"
			}),
		},
		{
			test: /\.tsx?$/,
			include: path.join(__dirname, 'frontend/src'),
			use: 'ts-loader'
		},
		{
			test: /\.json$/,
			use: 'json-loader',
		},
		{
			test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
			loader: 'file-loader',
			options: {
				name: '[name]-[hash].[ext]',
				outputPath: 'images/',
				publicPath: 'frontend/static/bundles/'
			}
		},
		{
			test: /\.css$/, exclude: /node_modules/, include: path.join(__dirname, 'frontend/src'),
			use: ExtractTextPlugin.extract({
				fallback: "style-loader",
				use: "css-loader"
			})
		},
	],
	},
	resolve: {
		extensions: ['*', '.ts', '.tsx', '.json', '.', '.js', '.jsx'],  // the js extensions are necessary for webpack
	},
};
