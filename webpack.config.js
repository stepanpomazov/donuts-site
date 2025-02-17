const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    entry: './src/js/carousel.js',  // Точка входа (главный файл проекта)
    output: {
        filename: 'bundle.js',  // Выходной файл для JS
        path: path.resolve(__dirname, 'dist'),  // Папка для выходных файлов
    },
    module: {
        rules: [
            {
                test: /\.js$/,  // Транспиляция JS
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            {
                test: /\.scss$/,  // Преобразование Sass в CSS
                use: [
                    MiniCssExtractPlugin.loader,  // Используем плагин для извлечения CSS
                    'css-loader',                  // Обрабатываем CSS
                    'sass-loader',                 // Компилируем Sass в CSS
                ],
            },
            {
                test: /\.css$/,  // Преобразование обычного CSS
                use: [
                    MiniCssExtractPlugin.loader,  // Используем плагин для извлечения CSS
                    'css-loader',                 // Обрабатываем CSS
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/generalList.html',  // Шаблон для генерации HTML
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.css',  // Название файла для сгенерированного CSS
        }),
    ],
    optimization: {
        minimize: true,  // Включаем минимизацию
        minimizer: [
            new CssMinimizerPlugin(),  // Плагин для минимизации CSS
        ],
    },
    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
    },
};
