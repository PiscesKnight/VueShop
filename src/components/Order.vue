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

    <!--订单信息-->
    <order-item :orderList="orderList" :params="params" :priceSum="priceSum" :freight="freight" :jb="jb" :priceTotals="priceTotals"
                :isBuy="isBuy">
      <div slot="distribution" style="display: flex;border-bottom: 1px solid #e4e1e1;">
        <p style="padding: 15px;font-size: 16px;flex: 1">配送方式：</p>
        <p style="padding: 15px;font-size: 16px">包邮</p>
      </div>
    </order-item>
    <!--订单信息end-->

    <!--底部-->
    <div class="navbar-fixed-bottom" style="height: 50px;background: black">
      <div style="display: flex;padding: 10px 20px">

        <span style="flex: 1;text-align: right;line-height: 34px;font-size: 16px;color: white;margin-right: 20px">总计：￥{{this.priceTotals}}.00</span>
        <button @click="orderConfirm" class="btn btn-danger">确定下单</button>
      </div>
    </div>
    <!--底部end-->
  </div>
</template>

<script>
  import HeaderTop from "../views/HeaderTop";
  import axios from 'axios'
  import OrderItem from "../views/OrderItem";

  export default {
    name: "Oder",
    data() {
      return {
        orderList: [{}],
        priceSum: 0,//商品总金额
        jb: 0,//金币抵扣
        freight: 0,//运费
        isBuy: false,//是否立刻购买按钮跳转过来的
        params:[]
      }
    },
    props: {},
    components: {OrderItem, HeaderTop},
    mounted: function () {
      this.getOrder()
    },
    computed: {
      priceTotals: function () {
        return this.priceSum + this.jb + this.freight
      }
    },
    methods: {
      toAddress() {
        this.$router.push({path: '/address'})
      },
      getOrder() {
        //判断是否有参数值
        if (this.$route.params.count) {
          this.isBuy = true
          this.orderList = this.$route.params.product
          this.priceSum = this.$route.params.product.productPrice * this.$route.params.count
          this.params.push(this.$route.params.count,this.$route.params.style)
        }
        else {
          this.isBuy = false
          axios.get("/users/cartlist").then((result) => {
            var res = result.data;
            if (res.status == '0') {
              this.orderList = res.result.users.carlist
              //初始化商品总金额
              for (var i = 0; i < this.orderList.length; i++) {
                if (this.orderList[i].checked) {
                  this.priceSum += this.orderList[i].productPrice * this.orderList[i].count
                }
              }
            }
            else {
              this.orderList = []
            }
          })
        }

      },
      //确定订单
      orderConfirm() {
        axios.post('/users/createOrder', {orderTotal: this.priceTotals}).then((response) => {
          let res = response.data
          if (res.status == '0') {
            this.$router.push({path: '/pay', query: {orderTotal: res.result.orderTotal, orderId: res.result.orderId}})
          }
        })
      }
    }
  }
</script>

<style lang="scss">

</style>
