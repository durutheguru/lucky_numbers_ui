module.exports = {
    devServer: {
        port: 8083,
        proxy: {
            "/api/v1": {
                target: "http://localhost:9011",
                secure: false
            }
        }
    },

    productionSourceMap: false,

    configureWebpack: {
        devtool: "source-map",
        module: {
            rules: [
                {
                    test: /.html$/,
                    loader: "vue-template-loader",
                    exclude: /index.html/
                }
            ]
        }
    }
};


