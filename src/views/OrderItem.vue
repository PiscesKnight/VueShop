<template>
    <!--订单产品信息-->
  <!--产品信息-->
  <div>

    <!--立即购买-->
    <div class="oder-productdiv"  v-show="isBuy">
      <div>
        <img :src="'/static/images/'+orderList.productCover" width="80px"/>
      </div>
      <div class="oder-productinfo">
        <p>{{orderList.productName}}</p>
        <div style="display: flex;" v-if="params">
          <p style="flex: 1">颜色：{{params[1]}}</p>
          <p>x{{params[0]}}</p>
        </div>
      </div>
    </div>
    <!--立即购买end-->

    <!--购物车列表结算-->
    <!--item.checked  用于加载购物车列表时勾选的商品-->
  <div class="oder-productdiv" v-show="!isBuy" v-for="item in orderList" v-if="item.checked==true" >
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
    <!--购物车列表结算end-->
  <!--产品信息end-->

  <!--订单其他信息-->
  <div>
    <slot name="distribution">
    </slot>

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
  </div>
</template>

<script>
    export default {
        name: "OrderItem",
        data(){
          return{

          }
        },
        props:[
          'orderList',
          'priceSum',
          'freight',
          'jb',
          'priceTotals',
          'isBuy',//立即购买按钮跳转
          'params'
        ]
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
