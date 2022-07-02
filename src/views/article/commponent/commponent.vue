<template>
  <div class="commponent">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getData"
    >
      <div class="item" v-for="(item, index) in list" :key="index">
        <img class="tu" :src="item.aut_photo" alt="" />
        <div class="middle">
          <div class="name">{{ item.aut_name }}</div>
          <div class="dasuan">{{ item.content }}</div>
          <div class="time">
            <span class="curr-time">{{ item.pubdate | formatData }}</span>
            <span @click="reclick(item)">回复{{ item.reply_count }}</span>
          </div>
        </div>
        <van-icon
          name="like-o"
          @click="likeclisk(item)"
          :class="{ add: item.is_liking }"
        />
      </div>
    </van-list>
    <div class="bottom">
      <van-field placeholder="请输入评论内容" v-model.trim="msg">
        <template #button>
          <van-button size="small" type="info" @click="submit">发布</van-button>
        </template>
      </van-field>
    </div>
    <!-- 回复评论 -->
    <recommponet
      ref="reCommponet"
      v-if="bol"
      @refrecommponet="refrecommponet"
    ></recommponet>
  </div>
</template>

<script>
// 导入获取评论的api,发表评论的api
import { Comments, Commentspost, commentlikings } from '@/api/article.js'
import recommponet from './recommponet.vue'
export default {
  name: 'VueXCommponent',
  components: {
    recommponet
  },

  data () {
    return {
      //   reitem: '',
      msg: '',
      list: [],
      loading: false,
      finished: false,
      offset: null,
      bol: true
    }
  },

  mounted () {},
  created () {
    // this.getData()
  },
  methods: {
    // 获取评论
    async getData () {
      const res = await Comments({
        type: 'a',
        source: this.$route.params.id,
        offset: this.offset,
        limit: 1
      })
      this.loading = false
      this.list.push(...res.data.data.results)
      this.offset = res.data.data.last_id
      if (res.data.data.last_id === res.data.data.end_id) {
        this.finished = true
      }
      //   console.log('获取评论', res)
    },
    // 发表评论
    async submit () {
      if (this.msg === '') {
        this.$toast.fail('请输入内容再评论')
        return
      }
      const res = await Commentspost({
        target: this.$route.params.id,
        content: this.msg
      })
      //  提示成功
      this.$toast.success('发表成功')
      //把发表的内容添加到第一行
      this.list.unshift(res.data.data.new_obj)
      // 清空输入框的内容
      this.msg = ''
      console.log('发表评论', res)
    },
    // 点击回复
    reclick (item) {
      this.$refs.reCommponet.show = true
      this.$refs.reCommponet.reitem = item
    },
    //  刷新recomment
    refrecommponet () {
      this.bol = false
      this.$nextTick(() => {
        this.bol = true
      })
    },
    // 小红心取消与确定
    async likeclisk (item) {
      await commentlikings(
        {
          target: item.com_id
        },
        item.is_liking
      )
      this.$toast.success(!item.is_liking ? '点赞成功' : '取消点赞成功')
      item.is_liking = !item.is_liking
    }
  }
}
</script>

<style lang="less" scoped>
.commponent {
  padding: 20px 20px 60px 20px;
  .item {
    display: flex;
    .tu {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 20px;
    }
    .middle {
      flex: 1;
    }
    .dasuan {
      padding: 10px 0;
    }
  }
}
.bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
}
.add {
  color: red;
}
</style>
