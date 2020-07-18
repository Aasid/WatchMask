const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = () => ({
	output: {
		filename: '[name].[hash].js',
	},
	module: {
		rules: [
			{
				test: /\.s(a|c)ss$/,
				exclude: /\.module.(s(a|c)ss)$/,
				loader: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							sourceMap: false,
						},
					},
				],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[hash].css',
			chunkFilename: '[id].[hash].css',
		}),
	],
});
