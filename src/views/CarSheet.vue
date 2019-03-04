<template>
  <!--购物车弹出层-->
  <div class="container" v-show="showSheet"  v-bind:style="styleObject">
    <!--弹出层空白部分 点击关闭-->
    <div style="height: 100%;width: 100%;position: fixed;top: 0;left: 0;z-index: 3" @click="closeSheet"></div>
    <!--弹出层空白部分 end-->
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "CarSheet",
    data() {
      return {
        showSheet: false
      }
    },
    props:{
      styleObject:{
        type:Object,
        default:function () {
          return{
            position:'fixed',
            bottom:0,
            left:0,
            height:'100%',
            width:'100%',
            background:'rgba(0,0,0,0.8)',
            zIndex:100,
          }
        }
      }
    },
    methods:{
      closeSheet(){
      this.showSheet = false
      }
    }
  }
</script>

<style scoped>

</style>
