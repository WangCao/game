const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { LibManifestPlugin } = require("webpack");
const path = require("path");

let mode = "development";
let outdir = "public";

let currentGame = null;
let language = "ts"

if (process.env.NODE_ENV === "production") {
	mode = "production";
	outdir = "dist";
}

if (process.env.CURRENT_GAME) {
	currentGame = process.env.CURRENT_GAME;
}

if (process.env.LANGUAGE) {
	language = process.env.LANGUAGE;
}

module.exports = {
	mode: mode,
	entry: `./${currentGame}/src/index.${language}`,
	output: {
		filename: "main.js",
		path: path.resolve(__dirname, outdir,`/${currentGame}`),
	},
	devtool: "eval-source-map",
	resolve: {
		extensions: [".ts", ".js"],
	},
	module: {
		rules: [
			{
				test: /\.(png|jpg|gif)$/i,
				use: [
					{
						loader: "url-loader",
						options: {
							limit: 8192,
						},
					},
				],
			},
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
		contentBase: `./${currentGame}/public`,
	},
	plugins: [
		new MiniCssExtractPlugin(),
		new HtmlWebpackPlugin({
			title: "game",
			filename: "index.html",
			template: `${currentGame}/public/index.html`,
		}),
	],
};
