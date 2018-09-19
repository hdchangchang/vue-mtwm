<template>
  <div>
    <Header :title="title"></Header>
    <section class="page">
      <TopNav></TopNav>
      <div>9月5日-9月29日，经典巨无霸限时10元！更有多款巨无霸套餐优惠及新品草莓派，快来品尝，美味不容错过！</div>
      <router-view></router-view>
      <router-view name="left-nav"></router-view>
      <router-view name="right-list"></router-view>
    </section>
  </div>
</template>
<script>
  import Header from '@/component/header/header'
  import TopNav from './children/topNav.vue'
  export default{
    data() {
      return {
        title: ''
      }
    },
    components: { Header, TopNav },
    created() {
      console.log(this.$route)
      this.title = this.$route.query.name
    }
  }
</script>
<style scoped lang="scss"> 
.page{
  width:100vw;
  height:100vh;
  padding-top: 0.9rem;
}
</style>
