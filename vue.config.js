const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: true,
  publicPath: process.env.NODE_ENV === 'production'
    ? '/web-kvgrav/'
    : '/',
  pwa: {
    name: 'KVGrav'
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = "KVGrav — 2D эмулятор гравитации";
        return args;
      })
  }
});
