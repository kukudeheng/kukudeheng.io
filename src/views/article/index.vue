<template>
  <div class="article">
    <van-nav-bar
      title="文章详情"
      left-arrow
      fixed
      placeholder
      @click-left="$router.go(-1)"
    ></van-nav-bar>
    <div class="content">
      <h3 class="title">{{ info.title }}</h3>
      <div class="info">
        <img class="tu" :src="info.aut_photo" alt="" />
        <div class="add">
          <div class="name">{{ info.aut_name }}</div>
          <div class="san">{{ info.pubdate | formatData }}</div>
        </div>
        <van-button type="info" round size="small">+ 关注</van-button>
      </div>
      <div v-html="info.content" class="mian"></div>
    </div>
    <div class="bottom">
      <van-field placeholder="请输入评论内容">
        <template #button>
          <van-button size="small" type="info">发布</van-button>
        </template>
      </van-field>
    </div>
  </div>
</template>

<script>
import { articles } from '@/api/article.js'
export default {
  name: 'VueXIndex',

  data () {
    return {
      id: this.$route.params.id,
      info: ''
    }
  },

  mounted () {},
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      const res = await articles(this.id)
      this.info = res.data.data
      console.log('文章详情', res)
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  width: 100vw;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  .title {
    font-size: 20px;
    padding: 5px;
  }
  .info {
    display: flex;
    align-items: center;
    .tu {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 20px;
    }
    .add {
      flex: 1;
    }
  }
}
.bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
}
::v-deep pre {
  word-break: break-all;
  line-break: anywhere;
  background-color: black;
  color: white;
  width: 100%;
  display: inline-block;
  overflow-x: auto;
}
.mian {
  width: 100%;
  overflow: hidden;
  padding-bottom: 60px;
}
</style>
