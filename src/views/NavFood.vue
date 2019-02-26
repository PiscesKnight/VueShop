<template>
  <div>
  <router-view/>
  <div class="food-nav container" style=" position: fixed;left: 0;bottom: 0;width: 100%;height: 60px;z-index: 99;padding-top: 5px;background-color: rgba(0,0,0,0.6)">
    <div class="row" style="color: white;text-align: center">
      <router-link :to="{name:'index'}"  class="col-xs-4">
        <img src="/static/images/navfood/gift.png" width="20px" style="padding: 5px 0">
        <br/>
        <span style="font-size: 12px;">首页</span>
      </router-link>
      <router-link :to="{name:'ranking'}"  class="col-xs-4">
        <img src="/static/images/navfood/ranking.png" width="25px" style="padding-top: 4px">
        <br/>
        <span style="font-size: 12px;">榜单</span>
      </router-link>
      <router-link :to="{name:'me'}" class="col-xs-4">
        <img src="/static/images/navfood/me.png" width="20px" style="padding: 5px 0">
        <br/>
        <span style="font-size: 12px;">我的</span>
      </router-link>
    </div>
  </div>
  </div>
</template>

<script>
   export default {
        name: "NavFood"
    }
</script>

<style>

</style>
