<template>
    <!--我的订单-->
  <div>
    <header-top>
      <span slot="top-title">我的订单</span>
    </header-top>

    <div class="nav">
      <mt-button size="small" @click.native.prevent="active = 'tab-container1'">全部</mt-button>
      <mt-button size="small" @click.native.prevent="active = 'tab-container2'">待付款</mt-button>
      <mt-button size="small" @click.native.prevent="active = 'tab-container3'">待发货</mt-button>
      <mt-button size="small" @click.native.prevent="active = 'tab-container4'">待收货</mt-button>
      <mt-button size="small" @click.native.prevent="active = 'tab-container5'">待评论</mt-button>
    </div>

    <mt-tab-container :swipeable="true" v-model="active">
      <mt-tab-container-item id="tab-container1">

      </mt-tab-container-item>
      <mt-tab-container-item id="tab-container2">
        <mt-cell v-for="n in 5" title="tab-container 2"></mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-container3">
      <mt-cell v-for="n in 7" title="tab-container 3"></mt-cell>
    </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
    import HeaderTop from "../views/HeaderTop";
    import {TabContainer} from 'mint-ui'
    export default {
        name: "OrderList",
      components: {
          HeaderTop,
          TabContainer
      },
      data(){
          return{
            active:'tab-container1'
          }
      },
      mounted(){
        this.initOrderList()
      },
      methods:{
        initOrderList(){
          }
      }
    }
</script>

<style scoped>

</style>
