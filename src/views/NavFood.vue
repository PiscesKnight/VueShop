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
   export default {
        name: "NavFood",
     data(){
       return{
         isIndex:0,
         navTab:[
            '/static/images/navfood/index2.png',
            '/static/images/navfood/ranking.png',
            '/static/images/navfood/me.png'
          ],
          indexTabImg:[
            '/static/images/navfood/index2.png',
            '/static/images/navfood/ranking.png',
            '/static/images/navfood/me.png'
          ],
          rankingTabImg:[
            '/static/images/navfood/index.png',
            '/static/images/navfood/ranking2.png',
            '/static/images/navfood/me.png'
          ],
          meTabImg:[
            '/static/images/navfood/index.png',
            '/static/images/navfood/ranking.png',
            '/static/images/navfood/me2.png'
          ]
       }
     },
     mounted:function () {
       this.initTab()
     },
      methods:{
          initTab(){
            switch (this.$route.name){
              case 'index':
                  this.navTab= this.indexTabImg
                this.isIndex = 0
                break;
              case 'ranking':
                this.navTab= this.rankingTabImg
                this.isIndex = 1
                break
              case 'me':
                this.navTab= this.meTabImg
                this.isIndex = 2
                break
            }
          },
          tabClick(index){
            this.isIndex = index
                if(index==0){
                  this.navTab= this.indexTabImg
                 }else if(index == 1){
                  this.navTab= this.rankingTabImg
                }else if(index == 2){
                  this.navTab= this.meTabImg
                }
          }
      }
    }
</script>

<style lang="scss">

  .font-yellow{
    color:  #ffcc00;
  }

</style>
