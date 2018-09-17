<template>
  <div  class="channel-nav">
    <div class="channel-item">
      <a class="channel-a">
        <span>美食</span>
        <svg-icon icon-class="unfold"></svg-icon>
      </a>
    </div>
    <div class="channel-item">
      <a class="channel-a">
        <span>综合排序</span>
        <svg-icon icon-class="unfold"></svg-icon>
      </a>
    </div>
    <div class="channel-item">
      <a class="channel-a">
        <span>筛选</span>
        <svg-icon icon-class="unfold"></svg-icon>
      </a>
    </div>
  </div>
</template>

<script>
  export default{
    data() {
      return {}
    }
  
  }
</script>

<style scoped lang="scss">
.channel-nav{
  display: flex;
  height: 0.9rem;
  border-bottom:1px solid #ccc;
  background: #fff;
}
.channel-item{
  width: 33.333%;
  height: 0.9rem;
  line-height: 0.9rem;
  text-align: center;
}
.channel-a{
  display: inline-block;
  width: 100%;
  border-right:1px solid #ccc;
}
</style>

