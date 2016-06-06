module.exports = {
	entry: "./src/index.js",
	output: {
		filename: "./public/bundle.js"
	},
	module: {
		loaders: [
			{
				exclude: /node_modules/,
				loader: "babel",
				query: {
					presets: ["react", "es2015",  "stage-1"]
				}
			}
		]
	},
	resolve: {
    	extensions: ['', '.js', '.jsx']
    }
};