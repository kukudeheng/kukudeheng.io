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
        <van-button
          icon="search"
          round
          style="height:70%"
          @click="$router.push('/seach')"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>
    <!-- 导航条 -->
    <div class="navigate">
      <van-tabs class="tabs" v-model="currIndex">
        <van-tab :title="item.name" v-for="(item, index) in list" :key="index"
          ><listhome :id="item.id"></listhome
        ></van-tab>
      </van-tabs>
      <van-icon class="icon" name="wap-nav" @click="showedit"></van-icon>
    </div>
    <!-- 频道管理 -->
    <channgedit
      ref="edit"
      :list="list"
      @addlist="addlist"
      :currIndex="currIndex"
      @delList="delList"
      @setList="setList"
    ></channgedit>
  </div>
</template>

<script>
// 导入api
import { UserChannels, userchannelsPUT } from '@/api/home.js'
import listhome from '@/views/home/components/listhome.vue'
import channgedit from '@/views/home/components/channgedit.vue'
// 导入cookie,作用，接口存储
import { getcookie, setcookie } from '@/utils/cookie.js'

export default {
  data () {
    return {
      list: [],
      currIndex: 0
    }
  },
  //   获取用户数据并存储
  created () {
    const _list = getcookie('list')
    if (_list) {
      if (this.$store.state.token.token) {
        this.getData()
      } else {
        this.list = JSON.parse(_list)
      }
    } else {
      this.getData()
    }
  },
  methods: {
    async savelist () {
      setcookie('list', JSON.stringify(this.list))
      // 获取toke
      if (this.$store.state.token.token) {
        //  map方法:生成一个新数据，return什么那一项内容就是什么
        const _list = this.list.map((item, index) => {
          return {
            id: item.id,
            seq: index
          }
        })
        // console.log('_list', _list)
        await userchannelsPUT({ channels: _list })
      }
    },
    async getData () {
      const res = await UserChannels()
      this.list = res.data.data.channels
      this.savelist()
      // console.log('频道列表', res)
    },
    // 频道管理图标点击
    showedit () {
      this.$refs.edit.sheet = true
    },
    // list新增方法,父传子
    addlist (obj) {
      this.list.push(obj)
      this.savelist()
    },
    // list删除方法
    delList (index) {
      this.list.splice(index, 1)
    },
    // 修改
    setList (val) {
      this.currIndex = val
      this.savelist()
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
