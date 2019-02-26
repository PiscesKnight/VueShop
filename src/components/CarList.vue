<template>
<!--购物车列表-->
  <div>
    <!--头部-->
    <div class="top-div container">
      <div class=" row" >
        <div class="col-xs-2"><</div>
        <div class="col-xs-8"><p style="text-align: center">我的购物车</p></div>
        <div class="col-xs-2"><button class="btn">编辑</button></div>
      </div>
    </div>
    <!--头部end-->

    <div style="height: 50px;width: 100%"></div>
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
          <label><input type="checkbox" value="" >全选</label>
        </div>
        <div class="col-xs-6">
          <p style="text-align: right">总计：￥{{sum}}.00</p>
        </div>
        <div class="col-xs-3"><button class="btn btn-danger">去结算</button></div>
      </div>
    </div>
    <!--底部end-->
  </div>

</template>

<script>
  import axios from 'axios'

    export default {
        name: "CarList",
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
                console.log( this.prodctList[0].productStyle[0].style)
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
  .top-div{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid gray;
    background-color: rgba(133,133,133,0.5);
    color: white;
    padding-right: 30px;
    p{
      padding-left: 15px;
    }
    .btn{
      color: white;
      background-color: black;
      border: 1px solid black;
    }
  }
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
