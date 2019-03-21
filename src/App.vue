<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
  name: 'App'
}
</script>

<style lang="scss">
  @import '../node_modules/bootstrap/dist/css/bootstrap.css';
  a:link {color: white} /* 未访问的链接 */
  a:visited {color: white}	/* 已访问的链接 */
  a:hover {color: white;text-decoration: none}	/* 鼠标移动到链接上 */
  a:active {color: white}	/* 选定的链接，即鼠标按下去的时候不松开显示的状态 */
  a:focus{color: white;text-decoration: none}
  a{
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    text-decoration: none;
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
