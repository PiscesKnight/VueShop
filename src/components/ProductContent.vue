<template>
    <div>
      <img :src="'/static/images/'+productList.productCover" width="100%"/>
      <div class="one">
        <p class="name">{{productList.productName}}</p>
        <p class="price">{{productList.productPrice}}元</p>
      </div>

<!--详情-->
      <div>
        <h4 style="text-align: center;padding:10px;border-bottom: 1px solid silver">商品详情</h4>
      </div>
<!--详情end-->

      <!--底部-->
      <div class="cart-food">
        <img style="flex-grow: 1" src="../assets/shopcart.svg" width="10px">
        <div style="flex-grow: 1"></div>
        <button class="add-btn">加入购物车</button>
        <button class="buy-btn">立即购买</button>
      </div>
      <!--底部end-->
    </div>
</template>

<script>
    export default {
        name: "productContent",
      data(){
          return{
            productList:this.$route.params.item,

          }
      }
    }
</script>

<style lang="scss">
  .one{
    padding: 25px 15px 0 15px;
    border-bottom: 5px solid gainsboro;
    text-align: center;
    .name{
     font-size: 16px;
      font-weight: bold;
    }
    .price{
      color: red;
      font-size: 16px;
    }
  }

  .cart-food{
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 99;
    width: 100%;
    text-align: center;
    display: flex;
    height: 60px;
    img{
      margin-left: 15px;
    }
    .clearpadding{
      padding-right: -5px;
    }
    .add-btn,.buy-btn{
      border: 0;
      padding: 10px 20px;
      margin: 10px;
    }
    .add-btn{
      flex-grow: 1;
      background: black;
      color: white;

    }
    .buy-btn{
      flex-grow: 1;
      background: red;
      color: white;
    }
  }
</style>
