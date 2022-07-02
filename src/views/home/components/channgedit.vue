<template>
  <div>
    <van-action-sheet title="频道管理" v-model="sheet" @closed="isEdit = false">
      <div class="content">
        <div class="top">
          <span class="pindao">我的频道</span>
          <van-button
            plain
            type="danger"
            size="small"
            @click="isEdit = !isEdit"
            >{{ isEdit ? '取消' : '编辑' }}</van-button
          >
        </div>
        <van-grid>
          <van-grid-item v-for="(item, index) in list" :key="item.id">
            <div
              :class="{ active: currIndex === index }"
              @click="iconitem(index)"
            >
              {{ item.name }}
            </div>
            <van-icon
              v-if="isEdit && item.name !== '推荐'"
              name="cross"
              class="icon"
              @click="iconclick(index)"
            ></van-icon
          ></van-grid-item>
        </van-grid>
        <div class="bottom">
          <div class="kexuan">可选频道</div>
        </div>
        <van-grid>
          <van-grid-item
            v-for="item in newlist"
            :key="item.id"
            :text="item.name"
            @click="$emit('addlist', item)"
          ></van-grid-item>
        </van-grid>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
// 获取所有频道列表
import { Channels } from '@/api/home.js'
export default {
  name: 'VueXChanngedit',

  data () {
    return {
      sheet: false,
      alllist: [],
      isEdit: false
    }
  },
  props: {
    list: {
      type: Array,
      required: true
    },
    currIndex: {
      type: Number,
      required: true
    }
  },

  mounted () {},
  created () {
    this.getData()
  },
  methods: {
    async getData () {
      const res = await Channels()
      this.alllist = res.data.data.channels
      // console.log('所有频道列表', res)
    },
    // 删除我的频道
    iconclick (index) {
      this.$emit('delList', index)
      if (this.currIndex > index && this.currIndex > 0) {
        this.$emit('setList', this.currIndex - 1)
      }
    },
    // 我的频道点击事件
    iconitem (index) {
      // 修改下标
      this.$emit('setList', index)
      //   关闭弹窗
      this.sheet = false
    }
  },
  //   计算属性
  computed: {
    newlist () {
      //   计算alllist-list数据
      return this.alllist.filter(item => {
        // return item这一项是否在list中存在，存在就:return false  不存在就:retrun true
        // return item的id是否在list中每一项中是否存在
        // 查找 list中是否存在list.id
        // 返回值=数据.find(item=>{retrun boolean,true,返回值=item 所有项都是false，返回值undefind})
        const finditem = this.list.find(item2 => item.id === item2.id)
        return !finditem
      })
    }
  }
}
</script>

<style lang="less" scoped>
.content {
  padding: 15px;
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .pindao {
      padding-bottom: 5px;
    }
  }
  .kexuan {
    padding: 10px;
  }
  .active {
    color: red;
  }
  .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>
