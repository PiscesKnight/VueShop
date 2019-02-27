<template>
<!--购物车列表-->
  <div>
    <!--头部-->
    <header-top>
      <p slot="top-title">我的购物车</p>
      <p slot="top-right">编辑</p>
    </header-top>
    <!--头部end-->

    <!--列表-->
    <div class="list container">
      <div class="row" v-for="item in prodctList">
        <div class="col-xs-1" style="line-height: 153px">
          <div class="checkbox">
            <label><input type="checkbox" value=""></label>
          </div>
        </div>
        <div class="col-xs-4" style="line-height: 163px">
          <img :src="'/static/images/'+item.productCover" width="100%" />
        </div>
        <div class="col-xs-7 list-col">
          <div class="">
            <p style="font-weight: 600">{{item.productName}}</p>
            <p v-for="style in item.productStyle" style="color: gray;font-size: 10px">
              {{style.style}}:{{style.value}}
            </p>
            <p style="color: red">{{item.productPrice}}</p>
          </div>
          <div>
            <button @click="" class="btn-default btn">-</button>
            <input type="number" value="0" v-model="item.count" class="form-control" style="width: 50px;display: inline-block"/>
            <button @click="" class="btn-default btn">+</button>
          </div>
        </div>
      </div>
    </div>
    <!--列表end-->

    <!--底部-->
    <div class="carlist-fooder ">
      <div class="row">
        <div class="checkbox col-xs-3" >
          <label><input type="checkbox" value="">全选</label>
        </div>
        <div class="col-xs-6">
          <p style="text-align: right">总计：￥{{sum}}.00</p>
        </div>
        <div class="col-xs-3"><router-link to="oders"><button class="btn btn-danger">去结算</button></router-link></div>
      </div>
    </div>
    <!--底部end-->
  </div>

</template>

<script>
  import axios from 'axios'
  import HeaderTop from "../views/HeaderTop";

    export default {
        name: "CarList",
      components: {HeaderTop},
      data(){
          return{
            prodctList:[],
            sum:0
          }
      },
      mounted () {
        this.getCarList()
      },
      computed:{

      },
      methods:{
        getCarList(){
            axios.get("/indexs/users").then((result)=>{
              var res = result.data;
              if(res.status == '0'){
                this.prodctList = res.result.users[0].users[0].carlist
              }
              else {
                this.prodctList = []
              }
            })

          },
        getCarList2(){
            axios.get('indexs/rankings').then((req,err)=>{

            })
        }
      }
    }
</script>

<style lang="scss">
  .list-col{
  padding: 10px;
    border-bottom: 1px solid gray;
  }
  .carlist-fooder{
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: black;
    height: 50px;
    line-height: 50px;
    z-index: 100;
    width: 100%;
    color: white;
  }
</style>
