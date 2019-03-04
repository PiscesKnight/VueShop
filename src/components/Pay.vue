<template>
    <!--支付页面-->
  <div>
    <header-top>
      <span slot="top-title">收银台</span>
    </header-top>

    <p style="margin: 20px">支付方式</p>

    <div style="display: flex;border: 1px solid gainsboro;margin: 20px;padding: 15px;line-height: 27px">
      <span style="flex: 1">金币支付(剩余金币：555)</span>
      <label>
        <input type="checkbox"/>
      </label>
    </div>



    <!--底部-->
    <div class="navbar-fixed-bottom" style="height: 50px;background: black">
      <div style="display: flex;padding: 10px 20px">

        <span style="flex: 1;text-align: right;line-height: 34px;font-size: 16px;color: white;margin-right: 20px">￥{{this.$route.params.priceTotals}}.00</span>
        <button class="btn btn-danger">支付</button>
      </div>
    </div>
    <!--底部end-->
  </div>
</template>

<script>
    import HeaderTop from "../views/HeaderTop";
    export default {
        name: "Pay",
      components: {HeaderTop}
    }
</script>

<style scoped>

</style>
