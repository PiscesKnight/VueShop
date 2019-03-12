<template>
  <div>
    <div class="header">
      <span class="exit"></span>
      <span>我</span>
      <span @click="loginExit" class="exit" :class="{hiddenDiv:!infoVisible}"  >退出</span>
    </div>
    <div class="one">
      <!--未登录状态-->
      <div v-show="!infoVisible" style="text-align: center;margin: 50px">
        <span @click="login('1')" style="border: 1px solid black;border-radius: 50%;padding: 30px;color: yellow;background-color: black">
          登录
        </span>
      </div>

      <mt-popup style="width: 70%"
      v-model="popupVisible"
      popup-transition="popup-fade"
      modal="true">
        <div style="width: 100%;padding: 20px">
          <p style="font-size: 20px;font-weight: bold;text-align: center;padding: 20px;">Login</p>
          <input type="text" class="form-control" v-model="userName" placeholder="UserName"/>
          <input type="password" class="form-control" v-model="userPwd" placeholder="Password"/>
          <div style="width: 100%">
            <p v-show="loginNull">用户名或密码不能为空</p>
            <p v-show="loginErr">账户密码错误</p>
        <mt-button @click.native="login('2')" type="primary" style="width:100%;margin: 20px 0">登录</mt-button>
          </div>

        </div>
      </mt-popup>
      <!--未登录状态end-->

      <!--登录状态-->
      <div class="container" v-show="infoVisible" style="margin-top: 10px">
        <div class="row" style="padding-bottom: 20px;">
          <div class="col-xs-2">
            <img class="img-circle" src="/static/images/tx.jpg" width="50px"/>
          </div>
          <div class="col-xs-9">
            <p>{{userInfo.nickname}}</p>
            <span class="address"><router-link to="address">管理收货地址 ></router-link></span>
          </div>
          <div class="col-xs-1" style="line-height: 50px;text-align: right"> ></div>
        </div>
      <!--登录状态end-->

        <div class="row" style="border-top:1px solid gainsboro;border-bottom:1px solid gainsboro;text-align: center ">
          <router-link to="carlist">
          <div class="col-xs-6" style="border-right: 1px solid gainsboro;padding: 20px 0">
            <img src="../assets/shopcart.svg" width="25px">
            <span style="line-height: 25px;color: black">购物车</span>
          </div>
          </router-link>
          <router-link to="orderlist">
            <div class="col-xs-6" style="padding: 20px 0">
              <img src="../assets/my-order.svg" width="25px">
              <span style="color:black;line-height: 25px">我的订单</span>
            </div>
          </router-link>

        </div>
      </div>

      <!--分割-->
      <div style="width: 100%;height: 8px;background: gainsboro"></div>
      <!--分割end-->

      <div class="row" style="margin: 15px 15px;text-align: center;border-bottom: 1px solid gainsboro;">
        <div class="col-xs-4" style="border-right: 1px solid gainsboro">
          <p>0</p>
          <p>点赞</p>
        </div>
        <div class="col-xs-4" style="border-right: 1px solid gainsboro">
          <p>0</p>
          <p>收藏</p>
        </div>
        <div class="col-xs-4">
          <p>0</p>
          <p>浏览历史</p>
        </div>
      </div>

      <div class="myJb">
        <p>
        我的金币：{{userInfo.userjb}}
        </p>
      </div>
    </div>


    <nav-food></nav-food>
  </div>
</template>

<script>
  import navFood from '@/views/NavFood'
  import axios from 'axios'
  export default {
    name: "Me",
    data(){
      return{
        userInfo:[],
        userName:'',
        userPwd:'',
        popupVisible:false,
        infoVisible:false,
        loginErr:false,//登录失败显示
        loginNull:false
      }
    },
    components:{
      'nav-food':navFood
    },
    mounted(){
    //  检验是否已登录
      this.checkLogin()
    },
    methods:{
      checkLogin(){
        axios.get('/users/checkLogin').then((response)=>{
          let res = response.data;
          if(res.status=='0'){
            this.infoVisible =!this.infoVisible
            this.userInfo = res.result
          }else {
            this.infoVisible =false
          }
        })
      },
      login(str){
        //点击页面上的登录图案
        if(str=='1'){
          this.popupVisible = !this.popupVisible
        }
        //点击弹出的登录按钮
        else if(str=='2') {
          //判断输入是否为空
          if(!this.userName || !this.userPwd){
              this.loginNull = true
            this.loginErr = false
              return;
          }else {
            this.loginNull = false
          }
          axios.post('/users/login',{userName:this.userName,userPwd:this.userPwd}).then((response)=>{
            let res = response.data;
            if(res.status=='0'){
              this.infoVisible =!this.infoVisible
              this.popupVisible = !this.popupVisible
              this.loginErr=false
              this.userInfo = res.result
              this.$toast('登录成功')
            }else {
              this.loginErr = true
            }
          })

        }
      },
      loginExit(){
        axios.post('/users/loginOut').then((response)=>{
          let res =response.data;
          if(res.status=='0'){
            this.userInfo = []
            this.infoVisible =!this.infoVisible
          }
        })

      }
    }
  }
</script>

<style lang="scss">
  .header {
    background: rgba(0, 0, 0, 0.8);
    text-align: center;
    display: flex;
    span {
      flex: 2;
      color: white;
      font-size: 18px;
      padding: 10px 0;
      line-height: 25px;
    }
    .exit{
      flex: 1;
      color: white;
      font-size: 14px;
    }
  }
  .hiddenDiv{
    visibility: hidden;
  }
  .one {
    .address {
      background: #0f0f0f;
      color: ghostwhite;
      border-radius: 10px;
      padding: 5px;
      font-size: 10px;
    }
  }

  .myJb{
    margin: 0px 15px 15px 15px;
    border-bottom: 1px solid gainsboro;
    text-align: center;
  }

</style>
