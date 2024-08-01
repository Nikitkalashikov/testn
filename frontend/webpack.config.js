const path = require("path")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyPlugin = require("copy-webpack-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")

module.exports = {
	output: {
		filename: "js/app.bundle.js",
		path: path.resolve(__dirname, "dist"),
	},
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							sourceMap: true,
							url: false,
						},
					},
					{
						loader: "sass-loader",
						options: {
							sassOptions: {
								indentWidth: 4,
							},
							sourceMap: true,
						},
					},
				],
			},
			{
				test: /\.svg$/,
				use: ["svg-sprite-loader", "svgo-loader"],
			},
		],
	},
	optimization: {
		minimize: true,
		minimizer: [
			new CssMinimizerPlugin({
				parallel: true,
			}),
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "css/style.css",
		}),
		new CopyPlugin({
			patterns: [
				{ from: "img/**/*", context: "src" },
				{ from: "fonts/**/*", context: "src" },
			],
		}),
	],
}
