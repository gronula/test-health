const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

// Main const
const PATHS = {
  src: path.join(__dirname, `../src`),
  dist: path.join(__dirname, `../public`),
  assets: `assets`
};

// Pages const for HtmlWebpackPlugin
const PAGES_DIR = `${PATHS.src}/pug/pages/`;
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith(`.pug`));

module.exports = {
  externals: {
    paths: PATHS
  },
  entry: {
    index: `${PATHS.src}/js/pages/index`,
  },
  output: {
    filename: `${PATHS.assets}/js/[name].[contenthash].js`,
    path: PATHS.dist,
    publicPath: `/`
  },
  optimization: {
    moduleIds: `hashed`,
    runtimeChunk: `single`,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/].*\.js$/,
          name: `vendors`,
          chunks: `all`,
          priority: 20
        },
        common: {
          name: `common`,
          minChunks: fs.readdirSync(`${PATHS.src}/js/pages`).length,
          chunks: `all`,
          priority: 10,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [{
      test: /\.pug$/i,
      use: [`cache-loader`, `pug-loader`],
    }, {
      test: /\.js$/i,
      exclude: `/node_modules/`,
      use: [
        `cache-loader`,
        {
          loader: `babel-loader`,
          options: { cacheDirectory: true }
        }
      ],
    }, {
      test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/i,
      use: [
        `cache-loader`,
        {
          loader: `file-loader`,
          options: { name: `[name].[ext]` }
        }
      ],
    }, {
      test: /\.(jpe?g|png|gif)$/i,
      use: [
        `cache-loader`,
        {
          loader: `file-loader`,
          options: { name: `[name].[ext]` }
        }
      ],
    }, {
      test: /\.svg$/i,
      loader: `svg-sprite-loader`,
      options: {
        extract: true,
        spriteFilename: `${PATHS.assets}/img/sprite.svg`,
      }
    }, {
      test: /\.scss$/i,
      use: [
        `style-loader`,
        MiniCssExtractPlugin.loader,
        `cache-loader`,
        {
          loader: `css-loader`,
          options: { sourceMap: true, url: false }
        }, {
          loader: `postcss-loader`,
          options: { sourceMap: true, config: { path: `./postcss.config.js` } }
        }, {
          loader: `sass-loader`,
          options: { sourceMap: true }
        }
      ]
    }, {
      test: /\.css$/i,
      use: [
        `style-loader`,
        MiniCssExtractPlugin.loader,
        `cache-loader`,
        {
          loader: `css-loader`,
          options: { sourceMap: true }
        }, {
          loader: `postcss-loader`,
          options: { sourceMap: true, config: { path: `./postcss.config.js` } }
        }
      ]
    }]
  },
  resolve: {
    alias: {
      [`~`]: PATHS.src,
    }
  },
  plugins: [
    new SpriteLoaderPlugin({
      plainSprite: true
    }),
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}/css/style.[contenthash].css`,
    }),
    new CopyWebpackPlugin([
      { from: `${PATHS.src}/static`, to: `` },
      { from: `${PATHS.src}/${PATHS.assets}/img`, to: `${PATHS.assets}/img` },
      { from: `${PATHS.src}/${PATHS.assets}/fonts`, to: `${PATHS.assets}/fonts` },
    ]),

    // Automatic creation any html pages (Don`t forget to RERUN dev server)
    ...PAGES.map(page => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename: `./${page.replace(/\.pug$/i,`.html`)}`,
      chunks: [`${page.replace(/\.pug/,``)}`, `common`, `vendors`, `runtime`],
      title: `${page.replace(/\.pug/,``)}`,
    }))
  ],
};
