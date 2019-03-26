<template>
    <div>
      <back-btn></back-btn>
        <img :src="'/static/images/'+productList.productIntroImg" width="100%"/>

      <!--商品链接-->
      <div>
        <!--<img :src="'/static/images/'+productList.productCover" width="100%"/>-->
        <div style="padding: 15px">
        <span class="price">￥{{productList.productPrice}}</span>
        <button class="click-btn" @click="clickContent">查看详情</button>
        </div>
      </div>
      <!--商品链接end-->
    </div>
</template>

<script>
    import BackBtn from "../views/backBtn";
    export default {
        name: "IndexContent",
      components: {BackBtn},
      created:function () {

      },
        data(){
          return{
            productList:[]
          }
        },
      mounted:function(){
          this.saveStoreData()
      },
      methods:{
          saveStoreData(){
            this.$indicator.open({
              text: '加载中...',
              spinnerType: 'fading-circle'
            });

            if(this.$route.query.product.productId){
              this.$store.commit('getIndexProduct',this.$route.query.product)
              this.productList = this.$store.state.indexProduct
            }else {
              this.productList = this.$store.state.indexProduct
            }

            setTimeout(()=>{
              this.$indicator.close()
            },2000)


          },
        clickContent(){
          this.$router.push({name:'productContent',query:{productId:this.productList.productId}})
        }
      }
    }
</script>

<style lang="scss">
  h3{
    line-height: 40px;
  }

  .padding-lr{
    padding: 0 15px
  }

  .price{
    font-size: 18px;
    color: red;
    margin-top: 10px;
    line-height: 40px;
  }

  .click-btn{
    float: right;
    border: 1px solid black;
    background: white;
    padding: 5px 10px;
    color: black;
  }
</style>
