const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env) => {

  return {

    entry: './src/index.tsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js',
      clean: true,
      publicPath: '/',
    },
    mode: 'development',
    resolve: {
      extensions: ['.jsx', '.tsx', '.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: { loader: 'babel-loader' }
        },
        {
          test: /\.html$/,
          use: { loader: 'html-loader' }
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/i,
          type: 'asset/resource',
          generator: {
              filename: 'public/[name].[hash][ext]'
          }
      },
      {
          test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
          type: 'asset/inline',
      }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/public/index.html',
        filename: './index.html',
        inject: 'body',
      }),
      new Dotenv({
        path: './.env'
      }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, '_redirects'),
            to: './',
          }
        ]
    }),
    ],
    devServer: {
      historyApiFallback: true,
      port: 3000
    }
  }
}
