<template>
  <!-- 位置处理 1：滚动过程记录滚动条位置 -->
  <div class="listhome" @scroll="scrolleven" ref="atticlist">
    <van-pull-refresh v-model="refreshLoading" @refresh="refresh">
      <van-list
        v-if="bol"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="load"
      >
        <div
          class="item"
          v-for="(item, index) in list"
          :key="index"
          @click="$router.push('@/views/article/' + item.art_id)"
        >
          <h3 class="tltle">{{ item.title }}</h3>
          <div class="img">
            <img
              v-for="(i, index2) in item.cover.images"
              :key="index2"
              :style="{ width: (1 / item.cover.images.length) * 100 + '%' }"
              :src="i"
              alt=""
            />
          </div>
          <div class="other">
            <span class="name">{{ item.aut_name }}</span>
            <span class="comment">{{ item.comm_count }}评论</span>
            <span class="time">{{ item.pubdate }}</span>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { Articles } from '@/api/home.js'
export default {
  name: 'VueXListhome',

  data () {
    return {
      bol: true,
      refreshLoading: false,
      loading: false,
      finished: false,
      list: [],
      timestamp: Date.now(),
      scrolltop: 0
    }
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },

  mounted () {},
  created () {},
  methods: {
    refresh () {
      this.refreshLoading = false
      this.loading = false
      this.finished = false
      this.list = []
      this.timestamp = Date.now()
      this.bol = false
      this.$nextTick(() => {
        this.bol = true
      })
    },
    async getData () {
      const res = await Articles({
        channel_id: this.id,
        timestamp: this.timestamp
      })
      // 加载完成，将v-model的值变为false
      this.loading = false
      // 数据要累加
      this.list.push(...res.data.data.results)
      // 修改下一页加载的条件
      this.timestamp = res.data.data.pre_timestamp
      // 判断是否记载完成，如果完成，finished=true
      if (!this.timestamp) {
        this.finished = true
      }
      // console.log('文章列表', res)
    },
    async load () {
      await this.getData()
    },
    // 滚动过程记录滚动条位置
    scrolleven (e) {
      this.scrolltop = e.target.scrollTop
      // console.log(this.scrolltop)
    }
  },
  activated () {
    this.$refs.atticlist.scrollTop = this.scrolltop
  }
}
</script>

<style lang="less" scoped>
.listhome {
  position: fixed;
  top: 90px;
  bottom: 40px;
  overflow-y: auto;
  .item {
    padding: 15px;
    width: 100vw;
    box-sizing: border-box;
    .title {
      padding-bottom: 5px;
    }
    .img {
      display: flex;
      img {
        flex: 1;
      }
    }
    .other {
      color: black;
      display: flex;
      padding-top: 10px;
      .tltle {
        flex: 1;
      }
      .comment {
        padding: 0 10px;
      }
    }
  }
}
</style>
