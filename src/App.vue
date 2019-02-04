<template>
  <div id="app">
    <router-view></router-view>
    <nav-food></nav-food>
  </div>
</template>

<script>
  import NavFood from './views/NavFood'

  export default {
  name: 'App',
  components:
    {
      'nav-food':NavFood
    }
}
</script>

<style>
  @import '../node_modules/bootstrap/dist/css/bootstrap.css';
  a:link {color: white} /* 未访问的链接 */
  a:visited {color: white}	/* 已访问的链接 */
  a:hover {color: white}	/* 鼠标移动到链接上 */
  a:active {color: white}	/* 选定的链接，即鼠标按下去的时候不松开显示的状态 */
  a{
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
  body,html{
    margin: 0;
    padding: 0;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
