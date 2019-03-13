const path = require('path')
const IS_PROD = ['production'].includes(process.env.NODE_ENV)
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const mockIndexData = require('./src/mock/index.json')

function resolve (dir) {
  return path.join(__dirname, './', dir)
}

const externals = {
  'vue':'Vue',
  'vue-router':'VueRouter',
  'axios':'axios',
  'element-ui':'ELEMENT',
  'js-cookie':'Cookies',
  'nprogress':'NProgress',
}

const cdn = {
  dev:{
    css:[
      'https://unpkg.com/element-ui/lib/theme-chalk/index.css',
      'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css'
    ],
    js:[]
  },
  build:{
    css:[ 
      'https://unpkg.com/element-ui/lib/theme-chalk/index.css',
      'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css'],
    js:[
      'https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.min.js',
      'https://cdn.jsdelivr.net/npm/vue-router@3.0.1/dist/vue-router.min.js',
      'https://cdn.jsdelivr.net/npm/vuex@3.0.1/dist/vuex.min.js',
      'https://cdn.jsdelivr.net/npm/axios@0.18.0/dist/axios.min.js',
      'https://unpkg.com/element-ui/lib/index.js',
      'https://cdn.bootcss.com/js-cookie/2.2.0/js.cookie.min.js',
      'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.js'
    ]
  }


}
const cdnDomian = 'http://pm3ag2m29.bkt.clouddn.com' //静态文件cdn


module.exports = {
  // baseUrl: IS_PROD ? process.env.VUE_APP_SRC || '/' : './', // 默认'/'，部署应用包时的基本 URL
  // baseUrl: IS_PROD ? process.env.VUE_APP_SRC || '' : cdnDomian, // 默认'/'，部署应用包时的基本 URL
  publicPath: IS_PROD ? cdnDomian : '/',
  outputDir: 'dist',
  assetsDir: '', // 相对于outputDir的静态资源(js、css、img、fonts)目录
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: false, // 生产环境的 source map

  configureWebpack: config => {
    require('vux-loader').merge(config, {
      options: {},
      plugins: ['vux-ui']
  })

    // const myConfig = {}
    // if(process.env.NODE_ENV === 'production'){
    //   myConfig.externals  = externals
    // }
    // if(process.env.NODE_ENV === 'development'){
    //   myConfig.devServer = {
    //     disableHostCheck: true
    //   }
    // }
    // return myConfig
  },

  chainWebpack: config => {
    // config.plugin('html').tap(args=>{
    //   if (process.env.NODE_ENV === 'production') {
    //     args[0].cdn = cdn.build
    //   }
    //   if (process.env.NODE_ENV === 'development') {
    //     args[0].cdn = cdn.dev
    //   }
    //   return args
    // })
    // 测试
      console.log('执行了');
      
  //   var externals = {
  //     vue: 'Vue',
  //     axios: 'axios',
  //     'element-ui': 'ELEMENT',
  //     'vue-router': 'VueRouter',
  //     vuex: 'Vuex'
  //   }
  //   config.externals(externals)
  // const cdn = {
  //     css: [
  //       'https://unpkg.com/element-ui/lib/theme-chalk/index.css',
  //       'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css'
  //     ],
  //     js: [
  //       'https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.min.js',
  //     'https://cdn.jsdelivr.net/npm/vue-router@3.0.1/dist/vue-router.min.js',
  //     'https://cdn.jsdelivr.net/npm/vuex@3.0.1/dist/vuex.min.js',
  //     'https://cdn.jsdelivr.net/npm/axios@0.18.0/dist/axios.min.js',
  //     'https://unpkg.com/element-ui/lib/index.js',
  //     'https://cdn.bootcss.com/js-cookie/2.2.0/js.cookie.min.js',
  //     'https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.js'
  //     ]
  //   }
  //   config.plugin('html')
  //     .tap(args => {
  //       args[0].cdn = cdn
  //       return args
  //     })
      
    // 测试

    // 打包分析
    if (process.env.IS_ANALYZ) {
      config.plugin('webpack-report').use(BundleAnalyzerPlugin, [
        {
          analyzerMode: 'static'
        }
      ])
    }
    // svg loader
    const svgRule = config.module.rule('svg') // 找到svg-loader
    svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在此loader之后
    svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
    svgRule // 添加svg新的loader处理
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })

    // 修改images loader 添加svg处理
    const imagesRule = config.module.rule('images')
    imagesRule.exclude.add(resolve('src/icons'))
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
  },
  // devServer: {
  //   open: true, // 自动启动浏览器
  //   host: '0.0.0.0', // localhost
  //   port: 8080, // 端口号
  //   https: false,
  //   hotOnly: false,
  //   proxy: {
  //     '/api': {
  //       target: process.env.VUE_APP_BASE_API,
  //       ws: true, // 是否使用websockets代理
  //       changeOrigin: true
  //     },
  //   }
  // },

  devServer: {
    port: 8080,
    before(app) {
      app.get('/api/index', (req, res) => {
        res.json(mockIndexData)
      })
    }
  }
}
