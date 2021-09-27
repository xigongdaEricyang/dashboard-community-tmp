import path from 'path';
import merge from 'webpack-merge';
import htmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';

import { baseConifg } from './webpack.config.base';

const devConfig: any = {
  devtool: 'inline-source-map',
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, `../src/index.tsx`),
  ],
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './public'),
    publicPath: '/',
  },
  devServer: {
    static: {
      static: './public'
    }
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.join(__dirname, '../src/index.html'),
      title: 'Nebula Dashboard'
    }),
    new webpack.HotModuleReplacementPlugin(),
  ]
};

const finalConfig = merge(baseConifg, devConfig);

export default finalConfig;