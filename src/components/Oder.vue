<template>
<!--确认订单-->
  <div>
    <header-top>
    <p slot="top-title">确认订单</p>
  </header-top>


    <!--收货地址-->
    <div @click="toAddress" style="display: flex;padding: 20px 10px 0 10px;border-bottom: 15px solid #e4e1e1">

        <div style="flex: 1;padding-right:15px; ">
          <div style="display: flex;">
            <p style="flex: 1">收货人：林生</p>
            <p style="flex: 1;text-align: right">15521003360</p>
          </div>
          <div>
            <p>收货地址：广东省广州市天河区凌塘村上街北巷66号</p>
          </div>
        </div>
        <div style="line-height: 60px;margin-right: 5px">
          <span class="glyphicon glyphicon-menu-right"></span>
        </div>

    </div>

    <!--收货地址end-->
  <!--产品信息-->
  <div class="oder-productdiv" v-for="item in orderList" v-if="item.checked==true" >
    <div>
      <img :src="'/static/images/'+item.productCover" width="80px"/>
    </div>
    <div class="oder-productinfo">
      <p>{{item.productName}}</p>
      <div style="display: flex;">
        <p style="flex: 1">颜色：{{item.productStyle[0].value[0]}}</p>
        <p>x{{item.count}}</p>
      </div>
    </div>
  </div>
  <!--产品信息end-->

    <!--订单其他信息-->
    <div>
      <div style="display: flex;border-bottom: 1px solid #e4e1e1;">
      <p style="padding: 15px;font-size: 16px;flex: 1">配送方式：</p>
        <p style="padding: 15px;font-size: 16px">包邮</p>
      </div>

      <div class="oder-info-div">
        <p class="oder-info-p">商品金额</p>
        <p class="oder-info-p2">￥{{this.priceSum}}.00</p>
      </div>
      <div class="oder-info-div">
        <p class="oder-info-p">金币抵扣：</p>
        <p class="oder-info-p2">-￥{{this.jb}}.00</p>
      </div>
      <div class="oder-info-div">
        <p class="oder-info-p">运费</p>
        <p class="oder-info-p2">+￥{{this.freight}}.00</p>
      </div>
      <div class="oder-info-div">
        <p class="oder-info-p" style="color: black">实付款：</p>
        <p class="oder-info-p2" style="color: red">￥{{this.priceTotals}}.00</p>
      </div>
    </div>
    <!--订单其他信息end-->

    <!--底部-->
    <div class="navbar-fixed-bottom" style="height: 50px;background: black">
      <div style="display: flex;padding: 10px 20px">

      <span style="flex: 1;text-align: right;line-height: 34px;font-size: 16px;color: white;margin-right: 20px">总计：￥{{this.priceTotals}}.00</span>
        <button class="btn btn-danger"><router-link :to="{ name: 'pay', params: { priceTotals: this.priceTotals}}">确定下单</router-link></button>
      </div>
    </div>
    <!--底部end-->
  </div>
</template>

<script>
  import HeaderTop from "../views/HeaderTop";
  import axios from 'axios'
    export default {
        name: "Oder",
      data(){
          return{
            orderList:[],
            priceSum:0,//商品总金额
            jb:0,//金币抵扣
            freight:0,//运费
          }
      },
      props:{

      },
      components: {HeaderTop},
      mounted:function () {
        this.getOrderList()
      },
      computed:{
        priceTotals:function () {
          return this.priceSum+this.jb+this.freight
        }
      },
      methods:{
          toAddress(){
            this.$router.push({path:'/address'})
          },
        getOrderList(){
          axios.get("/users/cartlist").then((result)=>{
            var res = result.data;
            if(res.status == '0'){
              this.orderList = res.result.users[0].carlist
              //初始化商品总金额
              for(var i=0;i<this.orderList.length;i++){
                if(this.orderList[i].checked){
                  this.priceSum +=this.orderList[i].productPrice*this.orderList[i].count
                }
              }

            }
            else {
              this.orderList = []
            }
          })
        }

      }
    }
</script>

<style lang="scss">
  .oder-productdiv{
    display: flex;background: rgba(0,0,0,0.8);padding: 10px 15px 0 15px;line-height: 30px;
    .oder-productinfo{
      flex: 1;color: white;padding: 5px 10px
  }
  }


  .oder-info-div{
    display: flex;
    .oder-info-p,.oder-info-p2{
      font-size: 16px;
      padding: 15px 20px 0 15px;
      color: #aca8a8;
    }
    .oder-info-p{
      flex: 1;
    }
  }
</style>
