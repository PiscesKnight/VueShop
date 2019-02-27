<template>
    <!--收货地址-->
    <!--<div>-->
      <!--<header-top>-->
        <!--<p slot="top-title">收货地址</p>-->
      <!--</header-top>-->
      <!--<div>-->
        <!--<p style="padding: 15px;font-size: 16px;border-bottom: 1px solid #e4e1e1">添加新的地址</p>-->
      <!--</div>-->
      <!--<div style="display: flex;padding: 0 20px 10px 20px;">-->
        <!--<div style="flex: 1;">-->
          <!--<div style="display: flex;">-->
            <!--<p style="flex: 1">林生</p>-->
            <!--<p style="flex: 1;text-align: right">15521003360</p>-->
          <!--</div>-->
          <!--<div>-->
            <!--<p>广东省广州市天河区凌塘村上街北巷66号</p>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->

      <!--<div style="background: #e4e1e1;display: flex">-->
        <!--<div style="flex: 3">-->
          <!--<div class="checkbox">-->
            <!--<label>-->
              <!--<input type="checkbox" value="">-->
              <!--默认地址-->
            <!--</label>-->
          <!--</div>-->
        <!--</div>-->
        <!--<button>修改</button>-->
        <!--<button>删除</button>-->
      <!--</div>-->
    <!--</div>-->
  <div>
    <header-top>
    <p slot="top-title">添加地址</p>
      <p slot="top-right">完成</p>
    </header-top>

    <!--收货信息-->
    <div>
      <input class="form-control" placeholder="收货人姓名"/>
      <input class="form-control"placeholder="‘收货人电话"/>
      <input class="form-control"placeholder="所在地区"/>
      <input class="form-control"placeholder="具体收货地址"/>
    </div>
    <!--收货信息end-->
  </div>
</template>

<script>
    import HeaderTop from "../views/HeaderTop";
    export default {
        name: "Address",
      components: {HeaderTop}
    }
</script>

<style scoped>

</style>
