<template>
  <div class="home">
    <van-nav-bar>
      <template #left>
        <img
          src="http://xpzll.gitee.io/hmtt-76/img/logo.4653c8be.png"
          alt=""
          style="height:80%"
        />
      </template>
      <template #right>
        <van-button icon="search" round style="height:70%">搜索</van-button>
      </template>
    </van-nav-bar>
    <!-- 导航条 -->
    <div class="navigate">
      <van-tabs class="tabs" v-model="currIndex">
        <van-tab :title="item.name" v-for="item in list" :key="item.id"
          ><listhome :id="item.id"></listhome
        ></van-tab>
      </van-tabs>
      <van-icon class="icon" name="wap-nav" @click="showedit"></van-icon>
    </div>
    <!-- 频道管理 -->
    <channgedit ref="edit" :list="list" @addlist="addlist" :currIndex="currIndex" @delList="delList" @setList='setList'></channgedit>
  </div>
</template>

<script>
// 导入api
import { UserChannels } from '@/api/home.js'
import listhome from '@/views/home/components/listhome.vue'
import channgedit from '@/views/home/components/channgedit.vue'

export default {
  data () {
    return {
      list: [],
      currIndex:0
    }
  },
  //   获取用户数据并存储
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      const res = await UserChannels()
      this.list = res.data.data.channels
      // console.log('频道列表', res)
    },
    // 频道管理图标点击
    showedit () {
      this.$refs.edit.sheet = true
    },
    // list新增方法,父传子
    addlist (obj) {
      this.list.push(obj)
    },
    // list删除方法
    delList(index){
      this.list.splice(index,1)
    },
    // 修改
    setList(val){
     this.currIndex=val
    }
  },
  components: {
    listhome,
    channgedit
  }
}
</script>

<style lang="less" scoped>
::v-deep .van-button--default {
  background-color: rgba(255, 255, 255, 0.3);
  border: 0;
}
.van-button__text {
  color: white;
}
.tabs {
  padding-right: 35px;
}
.navigate {
  position: relative;
  .icon {
    position: absolute;
    right: 0;
    top: 0;
    padding: 6px;
    font-size: 26px;
  }
}
</style>
