import path from 'path';
import { Configuration } from 'webpack';
import htmlWebpackPlugin from 'html-webpack-plugin';

const baseConifg: Configuration = {
  // entry: [path.join(__dirname, `../src/index.tsx`)],
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
          },
        ],
        include: path.join(__dirname, `../src`),
      },
      {
        test: /\.less/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                modifyVars: {
                  'primary-color': '#4372FF',
                },
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|ttf)(\?t=\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: "[path][name].[ext]",
              esModule: false,
            }
          }
        ],
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json', '.less']
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.join(__dirname, '../src/index.html'),
      title: 'Nebula Dashboard'
    })
  ]
};

export {
  baseConifg
};