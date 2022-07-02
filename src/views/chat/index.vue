- 模板如下 ```Vue
<template>
  <div class="container">
    <van-nav-bar
      fixed
      left-arrow
      @click-left="$router.back()"
      title="小智同学"
    ></van-nav-bar>
    <div class="chat-list" ref="chat">
      <div v-for="(item, index) in list" :key="index">
        <!-- 左侧是机器人小智 -->
        <div class="chat-item left" v-if="!item.isme">
          <van-image
            fit="cover"
            round
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
          <div class="chat-pao">{{ item.msg }}</div>
        </div>

        <!-- 右侧是当前用户 -->
        <div class="chat-item right" v-else>
          <div class="chat-pao my">{{ item.msg }}</div>
          <van-image
            fit="cover"
            round
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
        </div>
      </div>
    </div>
    <div class="reply-container van-hairline--top">
      <van-field placeholder="说点什么..." v-model.trim="msg">
        <template #button>
          <span @click="send" style="font-size:12px;color:#999">
            提交
          </span>
        </template>
      </van-field>
    </div>
  </div>
</template>

<script>
import { io } from 'socket.io-client'
export default {
  name: 'UserChat',
  data () {
    return {
      msg: '',
      ws: '',
      list: []
    }
  },
  methods: {
    // 发送内容
    send () {
      // 判断输入内容不能为空
      if (this.msg === '') {
        return
      }
      //   添加内容
      this.ws.emit('message', {
        msg: this.msg
      })
      this.list.push({
        msg: this.msg,
        isme: true
      })
      //   发完消息，输入框内容为空
      this.msg = ''
    },
    setScrollTop () {
      this.$fefs.chat.scrollTop = 99999
    }
  },
  created () {
    this.ws = io('http://toutiao.itheima.net', {
      query: {
        token: this.$store.state.token.token
      },
      transports: ['websocket']
    })
    this.ws.on('connect', () => {
      this.list.push({
        msg: '哈喽',
        isme: false
      })
      this.setScrollTop()
    })
    this.ws.on('message', e => {
      this.list.push({
        isme: false,
        msg: e.msg
      })
      this.setScrollTop()

      console.log(e)
    })
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  background: #fafafa;
  padding: 46px 0 50px 0;
  .chat-list {
    height: 100%;
    overflow-y: scroll;
    .chat-item {
      padding: 10px;
      .van-image {
        vertical-align: top;
        width: 40px;
        height: 40px;
      }
      .chat-pao {
        vertical-align: top;
        display: inline-block;
        max-width: 70%;
        min-height: 40px;
        line-height: 38px;
        border: 0.5px solid #c2d9ea;
        border-radius: 4px;
        position: relative;
        padding: 0 10px;
        background-color: #e0effb;
        word-break: break-all;
        font-size: 14px;
        color: #333;
        &::before {
          content: '';
          width: 10px;
          height: 10px;
          position: absolute;
          top: 12px;
          border-top: 0.5px solid #c2d9ea;
          border-right: 0.5px solid #c2d9ea;
          background: #e0effb;
        }
      }
      .chat-pao.my {
        background-color: #9eea6a;
        &::before {
          content: '';
          background: #9eea6a;
        }
      }
    }
  }
}
.chat-item.right {
  text-align: right;
  .chat-pao {
    margin-left: 0;
    margin-right: 15px;
    &::before {
      right: -6px;
      transform: rotate(45deg);
    }
  }
}
.chat-item.left {
  text-align: left;
  .chat-pao {
    margin-left: 15px;
    margin-right: 0;
    &::before {
      left: -5px;
      transform: rotate(-135deg);
    }
  }
}
.reply-container {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 44px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
}
</style>
```
