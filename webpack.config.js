const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let mode = "development";

if (process.env.NODE_ENV === "production") {
	mode = "production";
}

module.exports = {
	mode: mode,
	devtool: "eval-source-map",
	resolve: {
		extensions: [".ts", ".js"],
	},
	module: {
		rules: [
			{
				test: /\.s?css$/i,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"postcss-loader",
					"sass-loader",
				],
			},
			{
				test: /\.ts$/,
				exclude: /(node_modules)/,
				use: {
					loader: "ts-loader",
				},
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
		],
	},
	devServer: {
		contentBase: "./dist",
	},
	plugins: [new MiniCssExtractPlugin()],
};
