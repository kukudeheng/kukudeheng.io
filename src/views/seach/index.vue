<template>
  <div class="seach">
    <van-nav-bar
      title="搜索中心"
      left-arrow
      @click-left="$router.push('/layout/home')"
    >
    </van-nav-bar>
    <van-search
      show-action
      placeholder="请输入搜索关键词"
      v-model.trim="inputval"
      @input="inputSenent"
      @search="onSearch"
    >
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    <van-cell-group v-if="inputval && optionlist.length">
      <van-cell
        v-for="(item, index) in optionlist"
        :key="index"
        @click="saveHistroy(item)"
      >
        <template #title><div v-html="item.html"></div></template>
      </van-cell>
    </van-cell-group>
    <van-cell-group v-else>
      <van-cell title="历史记录"></van-cell>
      <van-cell
        :title="item"
        v-for="(item, index) in histroulist"
        :key="index"
        @click="goReuelt(item)"
      ></van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { Suggestion } from '@/api/seach.js'
import { getcookie, setcookie } from '@/utils/cookie.js'
export default {
  name: 'VueXIndex',

  data () {
    return {
      inputval: '',
      optionlist: [],
      insever: '',
      //   初始值处理，获取内容，如果内容有就保存，没有就空，
      histroulist: JSON.parse(getcookie('histroulist') || '[]')
    }
  },

  mounted () {},

  methods: {
    inputSenent () {
      clearTimeout(this.insever)
      this.insever = setTimeout(() => {
        this.inputEvent()
      }, 500)
    },
    async inputEvent () {
      if (this.inputval === '') {
        return
      }
      const res = await Suggestion({ q: this.inputval })
      if (res.data.data.options[0] === null) {
        this.optionlist = []
      } else {
        this.optionlist = res.data.data.options.map(item => {
          // RegExp：正则判断
          const reg = new RegExp(this.inputval, 'gi')
          return {
            val: item,
            // replace：替换内容
            html: item.replace(
              reg,
              `<span style="color:red;">${this.inputval}</span>`
            )
          }
        })
      }
      console.log(res)
    },
    // 点击搜索方法
    onSearch () {
      //用户输入的值为空就rereturn，啥也不显示
      if (this.inputval === '') {
        return
      }
      //判断用户输入的不为空和用户一句输入过的不在历史记录里显示
      if (!this.histroulist.includes(this.inputval)) {
        //再历史记录里面添加没有输入过的信息
        this.histroulist.push(this.inputval)
        // 设置后存储在浏览器中，刷新页面还在
        setcookie('histroulist', JSON.stringify(this.histroulist))
      }
      this.goReuelt(this.inputval)
    },
    // 联想存储词
    saveHistroy (val) {
      if (!this.histroulist.includes(val.val)) {
        this.histroulist.push(val.val)
        // 设置后存储在浏览器中，刷新页面还在
        setcookie('histroulist', JSON.stringify(this.histroulist))
      }
      //   针对需要传递的值做加密处理
      this.goReuelt(val.val)
    },
    // 加密处理转换，让浏览器知道传入的内容解析
    goReuelt (key) {
      this.$router.push('/reuelt/' + encodeURIComponent(key))
    }
  }
}
</script>

<style lang="less" scoped></style>
