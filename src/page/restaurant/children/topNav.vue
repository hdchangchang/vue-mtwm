<template>
  <div class="top-nav">
    <router-link to = "order">点菜</router-link>
    <router-link to = "comment">评价</router-link>
    <router-link to = "intro">商家</router-link>
  </div>
</template>
<script>
  export default{
    data() {
      return {
        activeIndex: 0
      }
    }
  }
</script>
<style scoped lang="scss">
@import '../../../style/mixin.scss';
.top-nav{
  display:flex;
  text-align:center;
  line-height: 0.9rem;
  background: #fff;
  a{
    flex:1;
    border-right:1px solid #ccc;
    border-bottom:1px solid #ccc;
    &.active{
      border-bottom: 3px solid $orange;
      margin-bottom: -2px;
    }
  }
}
</style>
