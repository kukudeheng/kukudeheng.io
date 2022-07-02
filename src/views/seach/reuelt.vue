<template>
  <div class="reuelt">
    <van-nav-bar
      :title="query.q + '的搜索结果'"
      left-arrow
      @click-left="$router.push('/seach/')"
    ></van-nav-bar>
    <div class="centent">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="load"
      >
        <van-cell-group>
          <van-cell
            @click="$router.push('/layout/@/views/article/' + item.art_id)"
            v-for="(item, index) in list"
            :key="index"
            :title="item.title"
          ></van-cell>
        </van-cell-group>
      </van-list>
    </div>
  </div>
</template>

<script>
import { Search } from '@/api/seach.js'
export default {
  name: 'VueXReuelt',

  data () {
    return {
      loading: false,
      finished: false,
      list: [],
      query: {
        page: 1,
        per_page: 1,
        q: decodeURIComponent(this.$route.params.key)
      }
    }
  },

  mounted () {},

  methods: {
    // 上拉刷新
    async load () {
      const res = await Search(this.query)
      this.loading = false
      this.query.page++
      //   累加内容
      this.list.push(...res.data.data.results)
      if (this.list.length >= res.data.data.total_count) {
        this.finished = true
      }
      //   console.log('搜索结果', res)
    }
  }
}
</script>

<style lang="less" scoped>
.centent {
  position: fixed;
  top: 46px;
  bottom: 0px;
  width: 100vw;
  overflow-y: auto;
}
</style>
