const path = require('path');
module.exports = () => ({
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		index: 'index.html',
		port: 9000,
	},
	output: {
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.s(a|c)ss$/,
				exclude: /\.module.(s(a|c)ss)$/,
				loader: [
					'style-loader',
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							sourceMap: true,
						},
					},
				],
			},
		],
	},
});
