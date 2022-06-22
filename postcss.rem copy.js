const path = require('path')
module.exports = ({ file }) => {
  const base = file.includes(path.join('node_modules', 'vant')) ? 37.5 : 124
  return {
    //插件配置
    plugins: {
      // postcss：他是转换css时使用一些规则，他是一个文件一个文件转换的
      // 识别是否在转换vant，转换的路径上一定有node_modules/vant
      // console.console.log(e.file)
      'postcss-pxtorem': {
        // rootValue：base：基准值：设计稿宽度/10
        rootValue: base,
        // rootValue: 37.5,
        // ui给我们的设计稿是1240px， vant：它的设计稿就是375px
        // 如果识别是vant的ui库用37.5，如果不是就是124
        propList: ['*'] 
        // 哪些class需要转换
        // -D表示插件只用于开发环境， 生产环境，打包后，只有html,css,js   
      }
    }
  }
}
