<template>
    <div>
      <img :src="'/static/images/'+productList.productImgs" width="100%"/>
      <div class="padding-lr">
      <h3>{{productList.productTitle}}</h3>
      <p>{{productList.productIntro}}</p>
      </div>
      <!--商品链接-->
      <div>
        <img :src="'/static/images/'+productList.productCover" width="100%"/>
        <div style="padding: 15px">
        <span class="price">￥{{productList.productPrice}}</span>
        <button class="click-btn" @click="clickContent">查看详情</button>
        </div>
      </div>
      <!--商品链接end-->
    </div>
</template>

<script>
    export default {
        name: "IndexContent",
        data(){
          return{
            productList:this.$route.query.product
          }
        },
      methods:{
        clickContent(){
          this.$router.push({name:'productContent',params:{item:this.productList}})
        }
      }
    }
</script>

<style lang="scss">
  h3{
    line-height: 40px;
  }

  .padding-lr{
    padding: 0 15px
  }

  .price{
    font-size: 18px;
    color: red;
    margin-top: 10px;
    line-height: 40px;
  }

  .click-btn{
    float: right;
    border: 1px solid black;
    background: white;
    padding: 5px 10px;
    color: black;
  }
</style>
