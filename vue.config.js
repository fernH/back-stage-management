// module.exports = {
//     outputDir: 'dist',
//     devServer: {
//         proxy: { // 设置代理
//             '/admin': {
//                 target: 'http://192.168.1.31:81',
//                 changeOrigin: true,
//                 pathRewrite: {
//                     '^/admin': '/admin'
//                 }
//             }
//         },
//         disableHostCheck: true
//     },
//     pluginOptions: {
//         // ...
//     }
// }