module.exports = {
  /*
  ** Headers of the page
  */
  router: {
    //base: '/ec/',
    scrollBehavior: function (to, from, savedPosition) {
      console.log(savedPosition);
      if (savedPosition) {
        // savedPosition is only available for popstate navigations.
        return savedPosition;
      }
      const position = {};
      // new navigation.
      // scroll to anchor by returning the selector
      if (to.hash) {
        position.selector = to.hash;
      }
      // check if any matched route config has meta that requires scrolling to top
      if (to.matched.some(m => m.meta.scrollToTop)) {
        // cords will be used if no selector is provided,
        // or if the selector didn't match any element.
        position.x = 0;
        position.y = 0;
      }
      // if the returned position is falsy or an empty object,
      // will retain current scroll position.
      return position;
    }
  },
  head: {
    meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'ec' },
        {name:"render",content:'webkit'},
        { name: 'applicable-device',content: 'pc,mobile' }
    ],
    link: [
        { rel:'icon', type: 'image/x-icon', href:'http://static.thelittlegym.com.cn/assert/img/logo.ico' },
        { rel:'stylesheet',type:'text/css',href:'http://static.thelittlegym.com.cn/assert/ui/semantic/semantic.min.css'}
    ],
    script: [
         
    ] 
  },
  //共用css
  css:[
       '~/assets/css/normalize.css',
       'element-ui/lib/theme-chalk/index.css'

  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  plugins: [  
    '~/plugins/vue-jsonp',  
    '~/plugins/element-ui',
    '~/plugins/global',
    '~/plugins/common'   
  ],  
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */  
    vendor:['vue-resource','element-ui','axios'],
    loaders:[
      {
         test:/\.(png|jp?g|jpg|gif|svg)$/,
         loader:"url-loader",
         query:{
            limit:10240,
            name:'img/[name].[hash].[ext]'
         }
      },
      {
        test: /\.scss|sass$/,
        loaders: ["style", "css", "sass"]

      }, 
      {
         test:/\.less$/,
         loader:'less-loader'
      }
    ],
    extend (config, ctx) {
      //不需要太严格
      // if (ctx.dev && ctx.isClient) {
      //   config.module.rules.push({
      //     enforce: 'pre',
      //     test: /\.(js|vue)$/,
      //     loader: 'eslint-loader',
      //     exclude: /(node_modules)/
      //   })
      //}
    }
  }
}
