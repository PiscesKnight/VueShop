<template>
  <div>
    <div>
      <img src="../../static/images/index/carousel2.jpg" width="100%">
    </div>
    <div style="text-align: center;margin: 20px 0">
      <img src="/static/images/index/index-tj.png" width="70%">
    </div>
    <div>
      <div v-for="item in pruductList" @click="clickIndexItem(item)">
        <img :src="'/static/images/'+item.productImgs" width="100%">
        <div style="padding: 0 10px 10px 10px">
          <p style="font-size: 17px;font-weight: bold;padding-top:10px ">{{item.productTitle}}</p>
          <p style="font-size:13px;color: darkgray;letter-spacing:1px">{{item.productIntro}}</p>
        </div>
      </div>
    </div>

    <div style="width: 100%;height: 60px"></div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'Index',
    data() {
      return {
        pruductList: []
      }
    },
    mounted: function () {
      this.getAppData()
    },
    methods: {
      getAppData() {
        axios.get("/indexs").then((result) => {
          // var res = result.data.data;
          var res = result.data;
          if (res.status == '0') {
            this.pruductList = res.result.list;
          }
          else {
            this.pruductList = [];
          }
        })
      },
      clickIndexItem(product) {
        this.$router.push({path: '/indexContent?id=' + product.productId, query: {product: product}});
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
