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
      <div class="row" v-for="item in carList" ref="item">
        <div class="col-xs-1" style="line-height: 123px">
          <div class="" @change="clickCheck(item)">
            <label><input type="checkbox" :checked="item.checked" ></label>
          </div>
        </div>
        <div class="col-xs-4" style="line-height: 133px">
          <img :src="'/static/images/'+item.productCover" width="100%" />
        </div>
        <div class="col-xs-7 list-col">
          <div class="">
            <p style="font-weight: 600">{{item.productName}}</p>
            <p v-for="style in item.productStyle" style="color: gray;font-size: 10px">
              {{style.style}}：{{style.value[0]}}
            </p>
            <p style="color: red">{{item.productPrice}}</p>
          </div>
          <div>
            <button @click="changeCount('sub',item)" class="btn-default btn">-</button>
            <!--<input type="number" v-model="item.count" class="form-control" style="width: 50px;display: inline-block"/>-->
            <span class="form-control" style="width: 50px;display: inline-block">{{item.count}}</span>
            <button @click="changeCount('add',item)" class="btn-default btn">+</button>
          </div>
        </div>
      </div>
    </div>
    <!--列表end-->

    <div style="width: 100%;height: 50px;"></div>
    <!--底部-->
    <div class="carlist-fooder ">
      <div class="row">
        <div class="checkbox col-xs-3" >
          <label><input type="checkbox" value="">全选</label>
        </div>
        <div class="col-xs-6">
          <p style="text-align: right">总计：￥{{this.sum}}.00</p>
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
            carList:[],
            sum:0,
          }
      },
      mounted () {
        this.getCarList()
      },
      methods:{
        //  获取购物车列表
        getCarList(){
            axios.get("/users/cartlist").then((result)=>{
              var res = result.data;
              if(res.status == '0'){
                this.carList = res.result.users[0].carlist
                //初始化新加入购物车的数据
                for(var i=0;i<this.carList.length;i++){
                    if(this.carList[i].checked){
                    this.sum+= (this.carList[i].productPrice*this.carList[i].count)
                    }
                  }
              }
              else {
                this.carList = []
              }
            })

          },
        //购物车数量加减
        changeCount(str,item) {
          if(str=='add'){
            item.count++;
            if(item.checked){
                this.sum+=item.productPrice
            }
            axios.post('/users/carEdit',{productId:item.productId,count:item.count,styleValue:item.productStyle,checked:item.checked}).then((response)=>{
              let res = response.data;
            })
          }else if(str=='sub'){
            if (item.count <= 1) {
              item.count = 1
            } else {
              item.count -= 1
              if(item.checked){
                  this.sum-=item.productPrice
              }
              axios.post('/users/carEdit',{productId:item.productId,count:item.count,styleValue:item.productStyle,checked:item.checked}).then((response)=>{
                let res = response.data;
              })
            }
          }
        },
        //勾选状态
        clickCheck(item){
          item.checked = !item.checked//第一次默认勾选，点击属于第二次操作
            if(item.checked){
              this.sum+= item.productPrice*item.count
            }else {
              this.sum-= item.productPrice*item.count
            }
            axios.post('/users/carEdit',{productId:item.productId,count:item.count,styleValue:item.productStyle,checked:item.checked}).then((response)=>{
              let res = response.data;
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
