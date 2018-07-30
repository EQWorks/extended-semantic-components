// const path = require("path");
// const autoprefixer = require("autoprefixer");

// module.exports = (baseConfig, env, defaultConfig) => {
//   defaultConfig.module.rules.push({
//     test: /\.css$/,
//     exclude: [
//       path.resolve(__dirname, '../node_modules'),
//     ],
//     use: [
//       require.resolve('style-loader'),
//       {
//         loader: require.resolve('css-loader'),
//         options: {
//           importLoaders: 1,
//           modules: true,
//           localIdentName: "[name]__[local]___[hash:base64:5]",
//         },
//       },
//       {
//         loader: require.resolve('postcss-loader'),
//         options: {
//           // Necessary for external CSS imports to work
//           // https://github.com/facebookincubator/create-react-app/issues/2677
//           ident: 'postcss',
//           plugins: () => [
//             require('postcss-flexbugs-fixes'),
//             autoprefixer({
//               browsers: [
//                 '>1%',
//                 'last 4 versions',
//                 'Firefox ESR',
//                 'not ie < 9', // React doesn't support IE8 anyway
//               ],
//               flexbox: 'no-2009',
//             }),
//           ],
//         },
//       },
//     ],
//   });

//   return defaultConfig;
// };


// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add additional webpack configurations.
// For more information refer the docs: https://storybook.js.org/configurations/custom-webpack-config
const path = require('path');

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

module.exports = {
  plugins: [
    // your custom plugins
  ],
  module: {
    rules: [
      {
        exclude: [
          /\.html$/,
          /\.(js|jsx)$/,
          /\.ejs$/,
          /\.css$/,
          /\.json$/,
          /\.bmp$/,
          /\.gif$/,
          /\.jpe?g$/,
          /\.png$/,
        ],
        loader: require.resolve('file-loader'),
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      // "url" loader works like "file" loader except that it embeds assets
      // smaller than specified limit in bytes as data URLs to avoid requests.
      // A missing `test` is equivalent to a match.
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.css$/,
        exclude: [
          path.resolve(__dirname, '../node_modules'),
        ],
        loaders: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          }
        ],
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, '../node_modules'),
        ],
        loaders: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
            },
          }
        ],
      },
    ],
  },
};
