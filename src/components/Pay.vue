<template>
    <!--支付页面-->
  <div>
    <header-top>
      <span slot="top-title">收银台</span>
    </header-top>

    <p style="margin: 20px">支付方式</p>

    <div style="display: flex;border: 1px solid gainsboro;margin: 20px;padding: 15px;line-height: 27px">
      <span style="flex: 1">金币支付(剩余金币：{{this.jb}})</span>
      <label>
        <input type="checkbox" checked="true"/>
      </label>
    </div>



    <!--底部-->
    <div class="navbar-fixed-bottom" style="height: 50px;background: black">
      <div style="display: flex;padding: 10px 20px">

        <span style="flex: 1;text-align: right;line-height: 34px;font-size: 16px;color: white;margin-right: 20px">￥{{this.orderTotal}}.00</span>
        <button @click="pay" class="btn btn-danger">支付</button>
      </div>
    </div>
    <!--底部end-->
  </div>
</template>

<script>
    import HeaderTop from "../views/HeaderTop";
    import {setCookie,getCookie} from "../utils/CookieUtil";
    import axios from 'axios'

    export default {
        name: "Pay",
      data(){
          return{
            jb:getCookie('userjb'),
            orderTotal:this.$route.query.orderTotal,
            orderId:this.$route.query.orderId
          }
      },
      components: {HeaderTop},
      computed:{
          priceTotal:function () {
            let sum = this.jb-this.orderTotal
            if(sum<=0){
              return 0
            }else {
              return sum
            }
          }
      },
      methods:{
        pay(){
            this.$messagebox.confirm('',{
              message:'请输入密码',
              showInput:true,
              inputType:'password',
              showConfirmButton:true,
              showCancelButton:true,
              cancelButtonClass:'cancelButton',
              confirmButtonClass:'confirmButton',
              confirmButtonText:'确定',
              cancelButtonText:'暂不'
            }).then(({value})=>{
              if(value==null){
                this.$toast('密码不能为空')
                return
              }
              if(this.priceTotal>=0){
                axios.post('/users/payOrder',{orderId:this.orderId,userPwd:value,userjd:this.priceTotal}).then((response)=>{
                  let res = response.data
                  if(res.status=='0') {
                    if (res.result.n==1 && res.result.nModified==1 && res.result.ok==1) {

                      setCookie('userjb',this.priceTotal)
                      this.$indicator.open({
                        text: '支付成功，等待跳转',
                        spinnerType: 'fading-circle'
                      });
                      setTimeout(()=>{
                        this.$router.push('/orderlist')
                        this.$indicator.close()
                      },1500)

                    } else {
                      this.$toast('密码错误，请重新输入')
                    }
                  }
                })
              }else {
                this.$toast('金币不足')
              }
            }).catch(err=>{
              if(err == 'cancel'){
                this.$toast('支付取消')
              }
            })
        }
      }
    }
</script>

<style scoped>

</style>
