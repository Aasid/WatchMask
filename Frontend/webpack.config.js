const path = require('path');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);

const PATHS = {
	dist: path.join(__dirname, './dist'),
};

module.exports = ({ mode, presets } = { mode: 'production', presets: [] }) => {
	return webpackMerge(
		{
			entry: ['babel-polyfill', './src/js/index.jsx'],
			output: {
				filename: 'bundle.js',
				path: path.resolve(__dirname, './dist'),
				publicPath: '/',
			},
			module: {
				rules: [
					{
						test: /\.css$/,
						use: [
							'style-loader',
							{
								loader: 'css-loader',
								options: {
									modules: true,
									camelCase: true,
								},
							},
						],
					},
					{
						test: /\.pug$/,
						use: [
							{
								loader: 'pug-loader',
								options: {
									pretty: true,
								},
							},
						],
					},
					{
						test: /\.(js|jsx)$/,
						exclude: /node_modules/,
						use: {
							loader: 'babel-loader',
						},
						resolve: { extensions: ['.js', '.jsx'] },
					},
					{
						test: /\.(jpe?g|png|gif|svg|ico)$/,
						exclude: /fonts/,
						loader: 'file-loader?name=images/[name].[ext]',
					},
					{
						test: /\.(eot|svg|ttf|woff|woff2)$/,
						exclude: /images/,
						use: [
							{
								loader: 'file-loader',
								options: {
									name: './fonts/[name].[ext]',
								},
							},
						],
					},
				],
			},
			devServer: {
				historyApiFallback: true,
			},
			plugins: [
				new HtmlWebpackPlugin({
					template: './src/templates/index.pug',
				}),
				new CleanWebpackPlugin(),
			],
		},
		modeConfig(mode)
	);
};
