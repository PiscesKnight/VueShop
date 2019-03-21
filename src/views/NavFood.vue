<template>
  <div>
  <router-view/>
  <div class="food-nav container" style="line-height: 25px;position: fixed;left: 0;bottom: 0;width: 100%;height: 60px;z-index: 11199;background-color: rgb(0,0,0)">
    <div class="row" style="color: white;text-align: center; padding:5px 0;">
      <div  @click="tabClick(0)">
        <router-link :to="{name:'index'}"  class="col-xs-4"  >
          <img :src="navTab[0]" width="30px" >
          <p style="font-size: 10px;" :class="{'font-yellow':isIndex==0}">首页</p>
        </router-link>
      </div>
     <div @click="tabClick(1)">
       <router-link :to="{name:'ranking'}"  class="col-xs-4" >
         <img :src="navTab[1]" width="30px"  >
         <p style="font-size: 10px;" :class="{'font-yellow': isIndex==1}">商店</p>
       </router-link>
     </div>
    <div  @click="tabClick(2)">
      <router-link :to="{name:'me'}" class="col-xs-4"  >
        <img :src="navTab[2]" width="30px">
        <p style="font-size: 10px;" :class="{'font-yellow':isIndex==2}">我的</p>
      </router-link>
    </div>

    </div>
  </div>
  </div>
</template>

<script>
  import store from '@/store/tabStore'
   export default {
        name: "NavFood",
     store,
     data(){
       return{
         isIndex:0,
         navTab:[
            '/static/images/navfood/index2.png',
            '/static/images/navfood/ranking.png',
            '/static/images/navfood/me.png'
          ]//初始化底部标签突破
       }
     },
     mounted:function () {
       this.initTab()
     },
      methods:{
          initTab(){
            //当链接不是首页时，拿到store存储的数据填充
            if(this.$store.state.navTab.length!=0){
              this.navTab = this.$store.state.navTab
              this.isIndex = this.$store.state.tabIndex
            }
          },
          tabClick(index){
            this.isIndex = index
                if(index==0){
                    this.navTab[0] =  '/static/images/navfood/index2.png'
                  this.navTab[1] ='/static/images/navfood/ranking.png',
                    this.navTab[2]= '/static/images/navfood/me.png'
                 }else if(index == 1){
                    this.navTab[0] =  '/static/images/navfood/index.png'
                    this.navTab[1] ='/static/images/navfood/ranking2.png',
                      this.navTab[2]= '/static/images/navfood/me.png'
                }else if(index == 2){
                  this.navTab[0] =  '/static/images/navfood/index.png'
                  this.navTab[1] ='/static/images/navfood/ranking.png',
                    this.navTab[2]= '/static/images/navfood/me2.png'
                }
            this.$store.commit('getTab',this.navTab)
            this.$store.commit('getTabIndex',index)
          }
      }
    }
</script>

<style lang="scss">

  .font-yellow{
    color:  #ffcc00;
  }

</style>
