<template>
  <div>
    <!--顶部导航-->
    <div class="container top-nav" style=" ">
      <div class="row" style="text-align: center;color: white">
        <div v-for="(items,index) in tabs" @click="tabClick(index)" :class="{active:index==num}" class="col-xs-3">
          <p :class="{'font-yellow':index==num}">{{items}}</p>
          <div v-show="index==num" style="border-bottom: 1px solid yellow">
          </div>
        </div>
      </div>
    </div>
    <!--顶部导航end-->
    <div>
      <img src="images/zhitu-des/ranking-item.png" width="100%">
    </div>
    <div v-for="(items,index) in tabsContent" v-show="index==num" class="container">
      <div class="row" style="margin-top: 25px">
        <div v-for="item in items" class="col-xs-6" style="min-height: 261px" @click="clickProduct(item)">
          <div class="item-jum">
            <img v-lazy="'/static/images/'+item.productCover" width="100%">
            <p class="item-title">{{item.productName}}</p>
            <p class="item-price">￥{{item.productPrice}}</p>
          </div>
        </div>
      </div>
    </div>
    <div style="width: 100%;height: 60px"></div>
  </div>

</template>

<script>
  import axios from 'axios'

  export default {
    name: "Ranking",

    data() {
      return {
        isActive: false,
        tabs: ["送父母", "送恋人", "送闺蜜", "送基友"],
        tabsContent: [],//tab的切面数据数组，用push的方式把各个json数据加进去
        num: ''
      }
    },
    mounted: function () {
      this.getProductList()
    },
    methods: {
      getProductList() {
        axios.get("/indexs/rankings").then((result) => {
          var res = result.data.result.doc[0];
          this.parents = res.parents;
          this.lover = res.lover;
          this.ladybro= res.ladybro;
          this.buddy = res.buddy;
          this.tabsContent.push(this.parents,this.lover,this.ladybro,this.buddy)
        })
      },
      tabClick(index) {
        this.num = index;
      },
      clickProduct(product){
        this.$router.push({name: 'productContent',params:{ item:product}});
      }

    }
  }
</script>

<style>
  .top-nav {
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.8);
    padding-top: 10px
  }

  .item-jum {
    background-color: white;
    padding: 0;
    box-shadow: 0 0 10px #ccc;
    margin-bottom: 25px;
  }

  .item-jum .item-title {
    font-size: 14px;
    padding: 8px 8px 0 8px;
    margin-bottom: 0;
    overflow: hidden;
    text-overflow: clip;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .item-jum .item-price {
    color: red;
    font-size: 16px;
    margin-bottom: 0;
    padding-left: 5px;
    margin-top: 8px;
    margin-bottom: 5px;

  }

  .font-yellow {
    color: yellow;
  }
</style>
