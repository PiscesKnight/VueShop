<template>
  <div>
    <div class="container" style="position: fixed;
top: 0;left: 0;z-index: 100;width: 100%">
      <div class="headertop row" style=" height: 50px;line-height:50px;background-color: black;color: white;" >
        <div class="col-xs-2"><span class="glyphicon glyphicon-menu-left"></span></div>
        <div class="col-xs-8" style="text-align: center"><slot name="top-title"></slot></div>
        <div class="col-xs-2"><slot name="top-right"></slot></div>
      </div>
    </div>
    <!--空div，用于将顶部定位空出的位置补上-->
    <div style="width: 100%;height: 50px"></div>
  </div>



</template>

<script>
    export default {
        name: "HeaderTop"
    }
</script>

<style lang="scss">
.headertop{
  height: 50px;
  background-color: black;
  color: white;
}
</style>
