const path = require( 'path' );

const webpack = require( 'webpack' );
const CleanWebpackPlugin = require( 'clean-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const UglifyJsPlugin = require( 'uglifyjs-webpack-plugin' );
const ManifestPlugin = require('webpack-manifest-plugin');

const DEV = process.env.NODE_ENV !== 'production';

const appPath = __dirname;

// Entry
const pluginPath = '/assets';
const pluginFullPath = `${appPath}${pluginPath}`;
const pluginEntry = `${pluginFullPath}/dev/application.js`;
const pluginPublicPath = `${pluginFullPath}/build`;

// Outputs
const outputJs = 'scripts/[name]-[hash].js';
const outputCss = 'styles/[name]-[hash].css';

const allModules = {
	rules: [
		{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			use: 'babel-loader'
		},
		{
			test: /\.json$/,
			use: 'json-loader'
		},
		{
			test: /\.scss$/,
			exclude: /node_modules/,
			use: [
				MiniCssExtractPlugin.loader,
				'css-loader', 'sass-loader'
			]
		}
	]
};

const allPlugins = [
	new CleanWebpackPlugin([ pluginPublicPath ]),
	new MiniCssExtractPlugin(
		{
			filename: outputCss
		}
	),
	new webpack.ProvidePlugin(
		{
			$: 'jquery',
			jQuery: 'jquery'
		}
	),
	new webpack.DefinePlugin(
		{
			'process.env': {
				NODE_ENV: JSON.stringify( process.env.NODE_ENV || 'development' )
			}
		}
	),
	new ManifestPlugin()
];

const allOptimizations = {
	runtimeChunk: false,
	splitChunks: {
		cacheGroups: {
			commons: {
				test: /[\\/]node_modules[\\/]/,
				name: 'vendors',
				chunks: 'all'
			}
		}
	}
};

// Use only for production build
if ( ! DEV ) {
	allOptimizations.minimizer = [
		new UglifyJsPlugin(
			{
				cache: true,
				parallel: true,
				sourceMap: true,
				uglifyOptions: {
					output: {
						comments: false
					},
					compress: {
						warnings: false,
						drop_console: true // eslint-disable-line camelcase
					}
				}
			}
		)
	];
}

module.exports = [
	{
		context: path.join( appPath ),

		entry: {
			themeSniffer: [ pluginEntry ]
		},

		output: {
			path: pluginPublicPath,
			publicPath: '',
			filename: outputJs
		},

		externals: {
			jquery: 'jQuery'
		},

		optimization: allOptimizations,

		module: allModules,

		plugins: allPlugins
	}
];