<template>
    <!--我的订单-->
  <div>
    <header-top>
      <span slot="top-title">我的订单</span>
    </header-top>

    <div class="nav">
      <mt-button size="small" @click.native.prevent="active = 'all'">全部</mt-button>
      <mt-button size="small" @click.native.prevent="active = 'tab-container2'">待付款</mt-button>
      <mt-button size="small" @click.native.prevent="active = 'tab-container3'">待发货</mt-button>
      <mt-button size="small" @click.native.prevent="active = 'tab-container4'">待收货</mt-button>
    </div>

    <mt-tab-container :swipeable="true" v-model="active">
      <mt-tab-container-item id="all">
        <!--订单信息-->
        <div v-for="order in orderList">
        <order-item :orderList="order.productlist" :isBuy="false"  :priceTotals="order.orderTotal">
        </order-item>
        </div>
        <!--订单信息end-->
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-container2">
        <mt-cell v-for="n in 5" title="tab-container 2"></mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-container3">
      <mt-cell v-for="n in 7" title="tab-container 3"></mt-cell>
    </mt-tab-container-item>
      <mt-tab-container-item id="tab-container4">
        <mt-cell v-for="n in 7" title="tab-container 3"></mt-cell>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
  import axios from 'axios'
    import HeaderTop from "../views/HeaderTop";
    import {TabContainer} from 'mint-ui'
  import OrderItem from "../views/OrderItem";
    export default {
        name: "OrderList",
      data(){
        return{
          orderList:[],
          jb:0,
          active:'all'
        }
      },
      components: {
        OrderItem,
          HeaderTop,
          TabContainer
      },
      mounted(){
        this.initOrderList()
      },
      methods:{
        initOrderList(){
              axios.get('/users/cartlist').then((response)=>{
                let res = response.data
                if(res.status == '0'){
                  this.orderList = res.result.users.orderlist
                  this.jb = res.result.users.jb
                  console.log(this.orderList)
                }
              })
          }
      }
    }
</script>

<style scoped>

</style>
