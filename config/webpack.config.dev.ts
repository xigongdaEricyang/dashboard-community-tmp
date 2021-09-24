import path from 'path';
import merge from 'webpack-merge';
import { baseConifg } from './webpack.config.base';

const devConfig: any = {
  devtool: 'inline-source-map',
  entry: path.join(__dirname, `../src/index.tsx`),
  mode: 'development',
  output: {
    filename: '[name].js',
    publicPath: 'http://127.0.0.1:7777/',
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  devServer: {
    static: {
      directory: path.join(__dirname, '../public'),
    },
    compress: true,
    port: 7777,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
};

const finalConfig = merge(baseConifg, devConfig);

export default finalConfig;