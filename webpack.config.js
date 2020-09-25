const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

module.exports = {
    entry: "./public/index.js",
    output: {
        path: `${__dirname}/public/dist`,
        filename: "bundle.js"
    },
    mode: "production",
    plugins: [
        new WebpackPwaManifest({
          name: 'Budget App',
          short_name: 'Budget App',
          background_color: '#ffffff',
          theme_color: "#ffffff",
          start_url: "/",
          display: "standalone",
          inject: false,
          fingerprints: false,
          icons: [
            {
              src: path.resolve('public/icons/icon-512x512.png'),
              sizes: [192, 512]
            }
          ]
        })
    ]
};