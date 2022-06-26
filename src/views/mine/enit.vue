<template>
  <div class="enit">
    <van-nav-bar title="编辑资料" left-arrow @click-left="$router.push('/layout/mine')"></van-nav-bar>
    <div class="tu">
      <img
        class="xzq"
        :src='userinfo.photo'
        alt=""
      />
    </div>
    <van-cell-group>
         <van-cell title="名称" :value="userinfo.name" is-link @click="nameShow=true" />
         <van-cell title="性别" :value="userinfo.gender" is-link />
         <van-cell title="生日" :value="userinfo.birthday" is-link />
    </van-cell-group>
     <van-popup  v-model="nameShow" style="width:80%">
       <h3 class="title">修改昵称</h3>
       <van-field class="field" v-model.trim="name"></van-field>
       <div class="btn">
        <van-button class="btn-item" @click="nameShow=false">取消</van-button>
        <van-button class="btn-item" @click="nameSubmit"><span style="color:red">确定</span></van-button>
       </div>
     </van-popup>
  </div>
</template>

<script>
import {mapState} from 'vuex'
// 导入api
import { userprofilePatch } from "../../api/mine";
export default {
  

  data () {
    return {
      nameShow:false,
      name:this.$store.state.userinfo.name
    }
  },
  computed:{
   ...mapState(['userinfo'])
  },
  created(){
    // this.$store.dispatch('getuserinfo')
  },

  mounted () {},

  methods: {
    async nameSubmit(){
      console.log(111);
     if(this.name===this.userinfo.name||this.name===''){
      this.$toast.fail('请修后再提交')
      return
     }
     await userprofilePatch({
      name:this.name
     })
     this.$toast.success('修改用户名成功')
     this.nameShow=false
     this.$store.commit('setuserinfo',{
      ...this.userinfo,
      name:this.name
     })
    }
  },
  // 监听器
  watch:{
    nameShow:{
      handler(newval){
        if(!newval){
          this.name=this.$store.state.userinfo.name
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.tu {
  text-align: center;
  .xzq {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    padding: 10px 0;
    // background-size: cover;
    object-fit: cover;
  }
}
.title{
  text-align: center;
  padding: 15px;
}
.van-popup{
   border-radius: 20px;

}
.field{
   border-top: 1px solid white;
}
.btn{
  display: flex;
  .btn-item{
    flex: 1;
  }
}
</style>
