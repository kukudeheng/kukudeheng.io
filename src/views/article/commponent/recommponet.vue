<template>
  <van-action-sheet v-model="show" title="发表回复" @closed="closedEvent">
    <div class="main">
      <div class="item">
        <img class="tu" :src="reitem.aut_photo" alt="" />
        <div class="middle">
          <div class="name">{{ reitem.aut_name }}</div>
          <div class="dasuan">{{ reitem.content }}</div>
          <div class="time">
            <span class="curr-time">{{ reitem.pubdate | formatData }}</span>
          </div>
        </div>
      </div>
    </div>
    <van-divider color: :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">回复列表</van-divider>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有了"
      @load="getData"
    >
      <div class="item" v-for="(item, index) in list" :key="index">
        <img class="tu" :src="item.aut_photo" alt="" />
        <div class="middle">
          <div class="name">{{ item.aut_name }}</div>
          <div class="dasuan">{{ item.content }}</div>
          <div class="time">
            <span class="curr-time">{{ item.pubdate | formatData }}</span>
          </div>
        </div>
      </div>
    </van-list>
    <div class="bottom">
      <van-field placeholder="请输入评论内容" v-model.trim="msg">
        <template #button>
          <van-button size="small" type="info" @click="submit">回复</van-button>
        </template>
      </van-field>
    </div>
  </van-action-sheet>
</template>

<script>
import { Comments, Commentspost } from '@/api/article.js'
export default {
  name: 'VueXRecommponet',

  data () {
    return {
      msg: '',
      show: false,
      reitem: '',
      offset: null,
      list: [],
      loading: false,
      finished: false
    }
  },

  mounted () {},

  methods: {
    async getData () {
      const res = await Comments({
        type: 'c',
        source: this.reitem.com_id,
        offset: this.offset,
        limit: 1
      })
      this.loading = false
      this.list.push(...res.data.data.results)
      this.offset = res.data.data.last_id
      if (res.data.data.last_id === res.data.data.end_id) {
        this.finished = true
      }
    },
    closedEvent () {
      this.$emit('refreComments')
    },
    async submit () {
      if (this.msg === '') {
        this.$toast.fail('请选输入内容后再评论')
        return
      }
      const res = await Commentspost({
        target: this.reitem.com_id,
        content: this.msg,
        art_id: this.$route.params.id
      })
      this.$toast.success('评论成功')
      this.list.unshift(res.data.data.new_obj)
      this.msg = ''
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  padding: 0 15px 40px;
  display: flex;
}
.item {
  display: flex;
  padding: 0 10px;
}
.tu {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 20px;
}
.middle {
  flex: 1;
  padding: 10px;
  .name {
    color: red;
  }
}
.dasuan {
  padding: 10px 0;
}
.bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
