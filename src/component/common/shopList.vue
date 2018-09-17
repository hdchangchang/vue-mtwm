<template>
<div>
  <div class="shop-list">
    <a class="shop-item" href="" v-for="item,index in list" :key="'nearby'+index">
      <div class="shop-imgbox">
        <img class="shop-img" :src="item.pic_url" alt=""/>
      </div>
      <div class="shop-info">
        <h6 class="tit">{{item.name}}</h6>
        <p class="info">
            <span class="star"></span>
            <span>月售999</span>
        </p>
        <p class="info">起送价 20 <span class="gray">|</span> 配送价10元起</p>
        <p class="send-mark">
            <span class="send-t">30min <span class="gray">|</span> 165m</span>
            <span class="send-logo">美团专送</span>
        </p>
      </div>
    </a>
  </div>
  <p class="loading" v-if="!loadOver">
    <svg-icon class="circle" icon-class="loading"></svg-icon>努力记载中...
  </p>
</div> 
</template>
<script>

export default {
  name: 'shopList',
  props: ['list', 'loadOver'],
  data() {
    return {
      timer: null
    }
  },
  methods: {
    // 滑动到底部
    scrollHandle() {
      const h = document.documentElement
      const b = document.body
      const winH = h.clientHeight || b.clientHeight
      const hsh = h.scrollHeight || b.scrollHeight
      const bst = h.scrollTop || b.scrollTop // 有的手机h.scrollTop 为0，需要兼容
      if (bst + winH + 200 > hsh) {
        // 事件节流，防止重复提交请求
        if (this.timer) {
          clearTimeout(this.timer)
        }
        // 加载更多数据list
        this.timer = setTimeout(() => {
          this.$emit('loadMore')
        }, 2000)
      }
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollHandle, false)
  },
  mounted() {
    // 单页面程序，防止影响其它页面
    window.addEventListener('scroll', this.scrollHandle, false)
  }
}

</script>
<style lang="scss" scoped>
.shop-list {
  padding: 0 0.3rem;
}
.shop-item {
  position: relative;
  display: block;
  padding: 0.3rem 0 0.3rem 2rem;
  border-bottom: 1px solid #ccc;
}
.shop-imgbox {
  position: absolute;
  top: 0.3rem;
  left: 0;
  width: 1.7rem;
  height: 1.28rem;
  border: 1px solid #ccc;
  overflow: hidden;
  text-align: center;
}
.shop-img {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  height: 100%;
}
.shop-info {
  font-size: 0.24rem;
  .tit {
    font-size: 0.32rem;
    margin-bottom: 0.1rem;
  }
  .info {
    margin-top: 0.1rem;
  }
  .send-mark {
    position: absolute;
    right: 0;
    top: 0.8rem;
    .send-t {
      display: block;
      margin-bottom: 0.1rem;
    }
    .send-logo {
      display: block;
      background: #ffd161;
      padding: 0.01rem 0.12rem;
      float: right;
      border-top-left-radius: 0.12rem;
      border-bottom-right-radius: 0.12rem;
    }
  }
}
.loading{
  height: .8rem;
  line-height: .8rem;
  width: 100%;
  text-align: center;
  color:#999;
  .circle{
    margin-right: 0.15rem;
    animation: rotate360 3s infinite ;
  }
}
</style>
