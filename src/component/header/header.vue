<template>
  <header class="header">
    <span class="header-l" @click="backToPre"> 
      <svg-icon class="header-pre" icon-class="return"></svg-icon>
    </span>
    <span class="header-m">{{title}}</span>
    <span class="header-r" v-if="/\/searchAddress/.test(path)">新增地址</span>
  </header>
</template>
<script>
  export default{
    props: ['title'],
    data() {
      return {
      }
    },
    computed: {
      path() {
        return this.$route.path
      }
    },
    methods: {
      backToPre() {
        this.$router.go(-1)
      }
    },
    beforeCreate() {
    },
    mounted() {
    }
  }
</script>
<style scoped lang="scss">

</style>

