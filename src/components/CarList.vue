<template>
<!--购物车列表-->
  <div>
    <!--头部-->
    <header-top>
      <p slot="top-title">我的购物车</p>
      <p slot="top-right" v-if="!isListNull" @click="carDel">编辑</p>
    </header-top>
    <!--头部end-->
    <!--当购物车没有商品-->
  <div v-if="isListNull" style="width: 100%;text-align: center;position: absolute;left: 0;top: 0;z-index: 99;height: 100%">
    <div style="position: relative;top: 45%;">
    <p style="font-size: 18px;font-weight: bold">暂无商品</p>
    <p>快去采购吧</p>
    </div>
  </div>
    <!--当购物车没有商品end-->
    <!--列表-->
    <div class="list container">
      <div class="row" v-for="(item,index) in carList">
        <div class="col-xs-1" style="line-height: 123px;border-radius: 50%">
          <button v-show="delBtnShow" @click="delProduct(index)" class="btn-danger btn">-</button>
          <div v-show="!delBtnShow" @change="clickCheck(item)" >
            <label style="border-radius: 50%"><input type="checkbox" ref="checkbox" :checked="item.checked" style="border-radius: 50%" ></label>
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
        <div class="checkbox col-xs-3" @change="clickCheckAll">
          <label><input type="checkbox" ref="checkboxall" :checked="checkboxAllStatus">全选</label>
        </div>
        <div class="col-xs-6">
          <p style="text-align: right">总计：￥{{this.sum}}.00</p>
        </div>
        <div class="col-xs-3"><button class="btn btn-danger" @click="toOrder">去结算</button></div>
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
            delBtnShow:false,
            demo:0,
            options:[
            ],
            isListNull:false
          }
      },
      mounted () {
        this.getCarList()
      },
      computed:{
          checkboxAllStatus:function(){//判断是否勾选数量与购物车数量一致，一致为全选
            if(this.carList.length==0){
              return false
            }else {
              return this.checkCount == this.carList.length
            }

          },
        checkCount:function () {
          var i =0;
          this.carList.forEach((item)=>{
            if(item.checked)i++
          })
          return i
        }
      },
      methods:{
        //  获取购物车列表
        getCarList(){
            axios.get("/users/cartlist").then((result)=>{
              var res = result.data;
              if(res.status == '0'){
                this.carList = res.result.carlist
                if(this.carList.length==0){
                 this.isListNull = true
                  this.sum=0
                }else {
                  //初始化新加入购物车的数据
                  this.sum = 0;//初始化
                  this.isListNull = false
                  for(var i=0;i<this.carList.length;i++){
                    if(this.carList[i].checked){
                      this.sum+= (this.carList[i].productPrice*this.carList[i].count)
                    }
                  }
                }
              }
              else if(res.status == '10001'){
                  this.$toast('请登录后再查询购物车')
                  this.$router.push({name:'me',params:{toCarlist:'toCarlist'}})
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
        },
      //  全选按钮
        clickCheckAll(){
          console.log(this.$refs.checkboxall.checked)
         if(this.$refs.checkboxall.checked){
           axios.post('/users/carEditAll',{checked:this.$refs.checkboxall.checked}).then((response)=>{
             let res = response.data;
             if(res.status ==0){
               this.carList = res.result  //重新赋值carList，才可以让计算属性的checkCount更新
                res.result.forEach( (item)=> {
                  this.sum+=item.productPrice*item.count
                })
               for(let i =0;i<this.$refs.checkbox.length;i++){
                 this.$refs.checkbox[i].checked =  true
               }
             }
           })
         }else {
           this.sum =0
           axios.post('/users/carEditAll',{checked:this.$refs.checkboxall.checked}).then((response)=>{
             let res = response.data;
             if(res.status ==0){
               this.carList = res.result  //重新赋值carList，才可以让计算属性的checkCount更新
               for(let i =0;i<this.$refs.checkbox.length;i++){
                 this.$refs.checkbox[i].checked =  false
               }
             }
           })
         }
        },
      //  删除功能
        carDel(e){
          let text =  e.target.innerText
          if(text =='编辑'){
            e.target.innerText = '完成'
            this.delBtnShow = !this.delBtnShow
          }else if(text =='完成'){
            e.target.innerText ='编辑'
            this.delBtnShow = !this.delBtnShow
          }
        },
        delProduct(index){
          this.$messagebox.confirm("确定删除此商品?").then(() => {
            axios.post('/users/carDel',{_id:this.carList[index]._id}).then((response)=>{
                let res = response.data;
                if(res.status=='0'){
                  this.$toast("删除成功")
                    this.getCarList()
                }
            })
          })
        },
        //去结算
        toOrder(){
          if(this.carList.length==0){
            this.$toast("请添加商品")
          }else {
            this.$router.push('/orders')
          }
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
