<template>
  <div>
    <div class="header">
      <p>我</p>
    </div>
    <div class="one">
      <div class="container">
        <div class="row" style="padding: 10px 15px 20px 15px">
          <div class="col-xs-2">
            <img class="img-circle" src="/static/images/tx.jpg" width="50px"/>
          </div>
          <div class="col-xs-9">
            <p>林</p>
            <span class="address">管理收货地址 ></span>
          </div>
          <div class="col-xs-1" style="line-height: 50px;text-align: right"> ></div>
        </div>

        <div class="row" style="border-top:1px solid gainsboro;border-bottom:1px solid gainsboro;text-align: center ">
          <div class="col-xs-6" style="border-right: 1px solid gainsboro;padding: 20px 0">
            <img src="../assets/shopcart.svg" width="25px">
            <span style="line-height: 25px">购物车</span>
          </div>
          <div class="col-xs-6" style="padding: 20px 0">
            <img src="../assets/my-order.svg" width="25px">
            <span style="line-height: 25px">我的订单</span>
          </div>
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
    </div>
  </div>
</template>

<script>
  export default {
    name: "Me"
  }
</script>

<style lang="scss">
  .header {
    background: rgba(0, 0, 0, 0.8);
    text-align: center;
    p {
      color: white;
      font-size: 18px;
      padding: 10px 0;
    }

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

</style>
