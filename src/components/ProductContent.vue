<template>
  <div>
    <back-btn></back-btn>
    <img :src="'/static/images/'+product.productCover" width="100%"/>
    <div class="one">
      <p class="name">{{product.productName}}</p>
      <p class="price">{{product.productPrice}}元</p>
    </div>

    <!--详情-->
    <div>
      <h4 style="text-align: center;padding:10px;border-bottom: 1px solid silver">商品详情</h4>
    </div>
    <!--详情end-->

    <!--弹出层-->
    <car-sheet ref="sheet">

      <div style="position: fixed;bottom: 0;left: 0;width: 100%;background: white;z-index: 101" class="container">
        <div class="sheet row">
          <div class="col-xs-3"><img :src="'/static/images/'+product.productCover"/></div>
          <div class="col-xs-9"><p class="title">{{product.productName}}</p>
          </div>
        </div>

        <!--规格选择-->
        <div class="choose row" v-for="item in product.productStyle">
          <div class="col-xs-3" style="text-align: center"><span>{{item.style}}</span></div>
          <div class="col-xs-9">
            <div>
              <span @click="styleTab(index,itemstyle)" :class="{'btn-style-active':index==styleChoose}" class="btn btn-style"  v-for="(itemstyle,index) in item.value">{{itemstyle}}</span>
            </div>
          </div>
        <!--规格选择end-->

          <!--数量选择-->
        </div>
        <div class="choose row" style="margin-top: 10px">
          <div class="col-xs-3" style="text-align: center"><span>数量</span></div>
          <div class="col-xs-9">
            <button @click="subtractCount" class="btn-default btn">-</button>
            <input type="number" value="0" v-model="count" class="form-control" style="width: 50px;display: inline-block"/>
            <button @click="addCount" class="btn-default btn">+</button>
          </div>
        </div>
          <!--数量选择end-->

        <div style="padding-top: 15px;margin-top:10px;border-top: 1px solid gainsboro;text-align: center">
        <button v-show="isAddCart" class="btn" style="width: 50%;background-color: black;color: white;margin-bottom: 15px" @click="addCar">加入购物车</button>
        <button v-show="isBuy" class="btn" style="width: 50%;background-color: red;color: white;margin-bottom: 15px" @click="toOder">立即购买</button>
        </div>
      </div>
    </car-sheet>
    <!--弹出层end-->

    <!--底部-->
    <div class="cart-food">
      <router-link to="carList"><img style="flex-grow: 1;width: 45px;padding: 5px 0" src="../assets/shopcart.svg" ></router-link>
      <div style="flex-grow: 1"></div>
      <button class="add-btn" @click="showDefault('加入购物车')">加入购物车</button>
      <button class="buy-btn" @click='showDefault("立即购买")'>立即购买</button>
    </div>
    <!--底部end-->

  </div>
</template>

<script>
  import axios from 'axios'
  import store from '@/store/store'
  import CarSheet from '../views/CarSheet'
  import BackBtn from "../views/backBtn";

  export default {
    name: "productContent",
    components: {BackBtn, CarSheet},
    store,
    data() {
      return {
        product: this.$store.state.product,
        count: 1,
        styleChoose:'',//用于判断点击标签更换点击样式
        styleValue:this.$store.state.product.productStyle[0].value[0],//保存选择类型的值
        isAddCart:false,//加入购物车按钮
        isBuy:false//立即购买按钮
      }
    },
    methods: {
      showDefault(str) {
        if(str=='加入购物车'){
          this.isAddCart = true;
          this.isBuy = false
        }else if(str=='立即购买'){
          this.isAddCart = false;
          this.isBuy = true
        }
        this.$refs.sheet.$data.showSheet = true
      },
      //style标签选择
      styleTab(index,value){
        this.styleChoose = index,
          this.styleValue = value
      },
      addCount() {
        this.count++;
      },
      subtractCount() {
        if (this.count <= 1) {
          this.count = 1
        } else {
          this.count -= 1
        }
      },
      addCar(){
        this.$refs.sheet.$data.showSheet = false,
          axios.post('/users/cartlistFind',{productId:this.product.productId}).then((response)=>{
            let res = response.data;
            if(res.result == 0){//列表没有这个商品
              //  插入数据
                axios.post('/users/cartlistAdd',{product:this.product,styleValue:this.styleValue,count:this.count,docLength:res.result}).then((response)=>{
                  let res2 = response.data;
                  if(res2.status =='0'){
                    this.$toast('添加成功')
                  }else if(res2.status=='10001'){
                    this.$toast('请登录后再添加商品')
                    this.$router.push({path:'/me',query:{productId:this.product.productId}})
                  }else {
                    this.$toast('添加失败')
                  }
                })

            }else {
              this.$refs.sheet.$data.showSheet = false,
              axios.post('/users/cartlistAdd',{product:this.product,count:this.count,styleValue:this.styleValue,docLength:res.result}).then((response)=>{
                let res2 = response.data;
                if(res2.status =='0'){
                  this.$toast('添加成功')
                }else if(res2.status=='10001'){
                  this.$toast('请登录后再添加商品')
                }else {
                  this.$toast('添加失败')
                }
              })
            }
          })
      },
      //立即购买
      toOder(){
          this.$router.push({name:'orders',query:{count:this.count,style:this.styleValue}})
      }
    },

  }


</script>

<style lang="scss">

  .one {
    padding: 25px 15px 0 15px;
    border-bottom: 5px solid gainsboro;
    text-align: center;
    .name {
      font-size: 16px;
      font-weight: bold;
    }
    .price {
      color: red;
      font-size: 16px;
    }
  }

  .cart-food {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 99;
    width: 100%;
    text-align: center;
    display: flex;
    height: 60px;
    img {
      margin-left: 15px;
    }
    .clearpadding {
      padding-right: -5px;
    }
    .add-btn, .buy-btn {
      border: 0;
      padding: 10px 20px;
      margin: 10px;
    }
    .add-btn {
      flex-grow: 1;
      background: black;
      color: white;

    }
    .buy-btn {
      flex-grow: 1;
      background: red;
      color: white;
    }
  }

  /*弹出层*/
  .sheet {
    padding: 10px;
    img {
      width: 50px;
      float: left;
      margin-right: 20px;
    }
    .title {
      line-height: 50px;
      font-weight: bold;
      font-size: 18px;
    }
  }
  .choose{
    margin-top: 10px;
    span{
      line-height: 34px;
    }
  }

  .btn-style{
    color: #333;
    background-color: #fff;
    border-color: #ccc;
  }
  .btn-style-active{
    color: red;
    border: 1px solid red;
  }


</style>
