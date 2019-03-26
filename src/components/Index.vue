<template>
  <div>
    <div style="height:280px">

    <mt-swipe  :auto="4000" :show-indicators="false">
      <mt-swipe-item ref="swipeImg" ><img  src="../../static/images/index/slides1.jpg" width="100%"/></mt-swipe-item>
      <mt-swipe-item><img src="../../static/images/index/slides2.jpg" width="100%"/></mt-swipe-item>
      <mt-swipe-item><img  src="../../static/images/index/slides3.jpg" width="100%"/></mt-swipe-item>
    </mt-swipe>
    </div>
    <div style="text-align: center;margin: 20px 0">
      <img src="/static/images/index/index-tj.png" width="70%">
    </div>
    <div>
      <div v-for="item in pruductList" @click="clickIndexItem(item)">
        <img :src="'/static/images/'+item.productCover" width="100%">
        <div style="padding: 0 10px 10px 10px">
          <p style="font-size: 17px;font-weight: bold;padding-top:10px ">{{item.productTitle}}</p>
          <p style="font-size:13px;color: darkgray;letter-spacing:1px">{{item.productIntro}}</p>
        </div>
      </div>
    </div>

    <div style="width: 100%;height: 60px"></div>
  <nav-food></nav-food>
  </div>
</template>

<script>
  import {Swipe,SwipeItem} from 'mint-ui'
  import axios from 'axios'
  import navFood from '@/views/NavFood'

  export default {
    name: 'Index',
    components: {
      'nav-food': navFood,
      'mt-swipt':Swipe,
      'mt-swipt-item':SwipeItem
    },
    data() {
      return {
        pruductList: [],
        swipeHeight:0,//轮播图组件高度.
      }
    },
    mounted: function () {
      this.getSwipeHeight()
      this.getAppData()
    },
    computed:{

    },
    methods: {
      //获取轮播图图片高度
      getSwipeHeight(){
        // setTimeout( this.swipeHeight = this.$refs.swipeImg.$el.scrollHeight,100)
        // setTimeout( console.log(this.$refs.swipeImg),10)
      },
      getAppData() {
        this.$indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        axios.get("/indexs").then((result) => {
          // var res = result.data.data;
          var res = result.data;
          if (res.status == '0') {
            this.pruductList = res.result[0].list;
          }
          else {
            this.pruductList = [];
          }
        })

        setTimeout(()=>{
          this.$indicator.close()
        },1000)

      },
      clickIndexItem(product) {
        this.$router.push({path: '/indexContent?id=' + product.productId, query: {product: product}});
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">

</style>
