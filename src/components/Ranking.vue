<template>
  <div>
    <!--顶部导航-->
    <div class="container top-nav">
      <div class="row" style="text-align: center;color: white">
        <div v-for="(items,index) in tabs" @click="tabClick(index)" :class="{active:index==num}" class="col-xs-3">
          <p :class="{'font-yellow':index==num}">{{items}}</p>
          <div v-show="index==num" style="border-bottom: 1px solid yellow">
          </div>
        </div>
      </div>
    </div>
    <!--顶部导航end-->

    <div>
      <img src="images/zhitu-des/ranking-item.png" width="100%">
    </div>
    <div v-infinite-scroll="loadMore"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="5">
      <div v-for="(items,index) in tabsContent" v-show="index==num" class="container">
        <div class="row" style="margin-top: 25px">
          <div v-for="item in items" class="col-xs-6" style="min-height: 261px" @click="clickProduct(item)">
            <div class="item-jum">
              <img v-lazy="'/static/images/'+item.productCover" width="100%">
              <p class="item-title">{{item.productName}}</p>
              <p class="item-price">￥{{item.productPrice}}</p>
            </div>
          </div>
          </div>
        </div>
      </div>
    <div style="text-align: center;margin-bottom: 20px"  v-if="mtSpinner">
      <mt-spinner color="rgb(0,0,0)"  type="snake" class="loading-more"></mt-spinner>
      加载中。。。
    </div>

    <div class="no-more" v-if="noMore">没有更多了~</div>
    <div style="width: 100%;height: 60px"></div>
    <nav-food></nav-food>
  </div>

</template>

<script>
  import axios from 'axios'
  import navFood from '@/views/NavFood'
  import store from '@/store/store'

  export default {
    name: "Ranking",
    store,
    components: {
      'nav-food': navFood
    },
    data() {
      return {
        isActive: false,
        tabs: ["送父母", "送恋人", "送闺蜜", "送基友"],
        tabsContent: [],//tab的切面数据数组，用push的方式把各个json数据加进去
        rankingList:[],
        parents:[],
        parents2:[],
        lover:[],
        ladybro:[],
        buddy:[],
        num: 0,
        loading:true,
        mtSpinner:false,
        page:1,//当前页
        pageSize:6,//每页数量
        noMore:false
      }
    },
    mounted: function () {
      this.initProductList()
    },
    methods: {
      //初始化数据
      initProductList(){
        let param = {
          page:this.page,
          pageSize:this.pageSize
        }
        axios.post("/indexs/rankings",{params:param}).then((result) => {
          if (result.data.status == '0') {
            var res = result.data.result;
            this.rankingList = res

            //循环将Tab标签分出了，放进各自的数组
            for(var i=0;i<this.rankingList.length;i++){
              if(this.rankingList[i].productTab=='parents'){
                this.parents.push(this.rankingList[i])
              }else if(this.rankingList[i].productTab=='lover'){
                this.lover.push(this.rankingList[i])
              }else if(this.rankingList[i].productTab=='ladybro'){
                this.ladybro.push(this.rankingList[i])
              }else if(this.rankingList[i].productTab=='buddy'){
                this.buddy.push(this.rankingList[i])
              }
            }
            this.loading = false
          }
          this.tabsContent.push(this.parents, this.lover, this.ladybro, this.buddy)

        })
      },
      //下拉加载数据
      loadProductList(index) {
        let param = {
          page:this.page,
          pageSize:this.pageSize
        }
        axios.post("/indexs/rankings",{params:param}).then((result) => {
          if (result.data.status == '0') {
            var res = result.data.result;

            //多次加载数据
            // console.log('res:' + res.length)
            if (res.length == 0) {//判断数据是否为0,为0则关闭加载
              this.loading = true
              this.noMore = true
            } else {
              //根据this.num保存的Tab指标，来选择性加载数据
              if (index== 0) {
               this.addLoadList(res,'parents')
              } else if (index== 1) {
                this.addLoadList(res,'lover')
              }else if(index==2){
                this.addLoadList(res,'ladybro')
              }else if(index ==3){
                this.addLoadList(res,'buddy')
              }

              let skip = this.rankingList.length - ((this.page - 1) * this.pageSize) //需要跳过的条数
              let loadSkip = (this.page - 1) * this.pageSize  //需要加载的条数下标

              // console.log(this.rankingList)
              // console.log('loadSkip:' + loadSkip)
              // console.log('skip:' + skip)
              for (var i = 0; i < loadSkip; i++) {
                // console.log(this.rankingList[i + skip].productTab)
                if (this.rankingList[i + skip].productTab == 'parents') {
                  this.parents.push(this.rankingList[i + skip])
                }
                else if (this.rankingList[i + skip].productTab == 'lover') {
                  this.lover.push(this.rankingList[i + skip])
                } else if (this.rankingList[i + skip].productTab == 'ladybro') {
                  this.ladybro.push(this.rankingList[i + skip])
                } else if (this.rankingList[i + skip].productTab == 'buddy') {
                  this.buddy.push(this.rankingList[i + skip])
                }
                this.loading = false
              }
            }
          }
        })
      },
      //封装加载数据代码
      addLoadList(res,str){
        let loadList = []
        for (let a = 0; a < res.length; a++) {
          if (res[a].productTab == str) {
            loadList.push(res[a])
          }
        }
        this.rankingList = this.rankingList.concat(loadList)
      },
      tabClick(index) {
        this.num = index;
        this.loading =false //点击切换Tab时启动无限加载
        this.noMore = false //隐藏
        this.page = 1;//复原页码
      },
      //跳转商品详情页，使用Vuex保存product数据
      clickProduct(product) {
        this.$router.push({name: 'productContent'})
        sessionStorage.removeItem('product');
        this.$store.commit('getProductList', product)
      },
      loadMore(){
        this.loading  = true
        this.mtSpinner = true
      //  多次加载
        setTimeout(() => {
          this.page ++;
          this.loadProductList(this.num);
          this.mtSpinner = false
        }, 800);
      }
    }
  }
</script>

<style>
  .top-nav {
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 99;
    background-color: rgba(0, 0, 0, 0.8);
    padding-top: 10px
  }

  .item-jum {
    background-color: white;
    padding: 0;
    box-shadow: 0 0 10px #ccc;
    margin-bottom: 25px;
  }

  .item-jum .item-title {
    font-size: 14px;
    padding: 8px 8px 0 8px;
    margin-bottom: 0;
    overflow: hidden;
    text-overflow: clip;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .item-jum .item-price {
    color: red;
    font-size: 16px;
    margin-bottom: 0;
    padding-left: 5px;
    margin-top: 8px;
    margin-bottom: 5px;

  }

  .font-yellow {
    color: yellow;
  }

  .loading-more{
    display:inline-block;vertical-align: middle; margin-right:.2rem
  }
  .no-more{
    text-align: center;
    margin-bottom: 20px;
  }
</style>
