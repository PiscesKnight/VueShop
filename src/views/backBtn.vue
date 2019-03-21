<template>
    <!--返回按钮-->
  <button class="back-btn" @click="$router.back(-1)"><span class="glyphicon glyphicon-menu-left"></span></button>
</template>

<script>
    export default {
        name: "backBtn"
    }
</script>

<style lang="scss">
  .back-btn{
    position: fixed;
    left: 15px;
    top: 15px;
    z-index: 119;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(0,0,0,0.8);
    border: 0;
    color: white;
  }
</style>
