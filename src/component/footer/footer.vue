<template>
  <footer class="footer">
    <router-link exact to="/home" class="footer-a">
      <svg-icon icon-class="home"></svg-icon>
      <span>首页</span>
    </router-link>
    <router-link exact to="/menu" class="footer-a">
      <svg-icon icon-class="menu"></svg-icon>
      <span>菜单</span>
    </router-link>
    <router-link exact to="/mine" class="footer-a">
      <svg-icon icon-class="mine"></svg-icon>
      <span>我的</span>
    </router-link>
  </footer>
</template>

<script>
  export default {
    data() {
      return {}
    }
  }
</script>

<style>

</style>
