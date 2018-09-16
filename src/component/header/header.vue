<template>
  <header class="header">
    <span class="header-l" @click="backToPre"> 
      <svg-icon class="header-pre" icon-class="return"></svg-icon>
    </span>
    <span class="header-r">新增地址</span>
    <span class="header-m">选择收货地址</span>
  </header>
</template>
<script>
  export default{
    data() {
      return {}
    },
    methods: {
      backToPre() {
        this.$router.go(-1)
      }
    },
    beforeCreate() {
      console.log(this.$route)
    }
  }
</script>
<style scoped lang="scss">

</style>

