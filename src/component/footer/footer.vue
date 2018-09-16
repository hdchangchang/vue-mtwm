<template>
  <footer class="footer">
    <router-link to="/home" class="footer-a" activeClass="active">
      <svg-icon icon-class="home"></svg-icon>
      <span>首页</span>
    </router-link>
    <router-link to="/menu" class="footer-a"  activeClass="active">
      <svg-icon icon-class="menu"></svg-icon>
      <span>菜单</span>
    </router-link>
    <router-link to="/mine" class="footer-a"  activeClass="active">
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
