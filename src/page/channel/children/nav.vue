<template>
<div class="channel-navbox" :class="{active:activeIndex>=0}">
  <div  class="channel-nav">
    <div class="channel-item" :class="{active:activeIndex===0}" @click="showMore(0)">
      <a class="channel-a">
        <span>美食</span>
        <svg-icon class="svg-drop" icon-class="unfold"></svg-icon>
      </a>
    </div>
    <div class="channel-item" :class="{active:activeIndex===1}"  @click="showMore(1)">
      <a class="channel-a">
        <span>综合排序</span>
        <svg-icon  class="svg-drop" icon-class="unfold"></svg-icon>
      </a>
    </div>
    <div class="channel-item" :class="{active:activeIndex===2}"  @click="showMore(2)">
      <a class="channel-a">
        <span>筛选</span>
        <svg-icon class="svg-drop" icon-class="unfold"></svg-icon>
      </a>
    </div>
  </div>
  <div class="channel-navcont">
    <div class="navcont" v-if="activeIndex===0">
      111
    </div>
    <div class="navcont" v-if="activeIndex===1">
      <ul class="sort-type">
        <li class="sort-li">综合排序</li>
        <li class="sort-li">销量最高</li>
        <li class="sort-li">速递最快</li>
        <li class="sort-li">评分最高</li>
        <li class="sort-li">起送价最低</li>
        <li class="sort-li">配送费最低</li>
      </ul>
    </div>
    <div class="navcont" v-if="activeIndex===2">
      333
    </div>
  </div>
  <div class="zzc" @click="activeIndex=-1"></div>
</div>
</template>

<script>
  export default{
    data() {
      return {
        activeIndex: -1
      }
    },
    methods: {
      showMore(index) {
        this.activeIndex = index
      }
    }
  }
</script>

<style scoped lang="scss">
.channel-navbox{
  position: relative;
  .zzc{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.2);
  z-index:1;
  display: none;
  }
  &.active .zzc{
    display: block;
  }
}
.channel-nav{
  position: relative;
  width:100%;
  display: flex;
  height: 0.9rem;
  border-bottom:1px solid #ccc;
  background: #fff;
  z-index: 2;
  &.fixed{
  position: fixed;
  top: 0;
  left: 0;
  }
}

.channel-item{
  position: relative;
  width: 33.333%;
  height: 0.9rem;
  line-height: 0.9rem;
  text-align: center;
  background: #fff;
  border-bottom:1px solid #ccc;
  .svg-drop{
    transition:all .1s ease-in;
  }
  &.active .svg-drop{
    transform:rotate(180deg)
  }
  &.active:after{
  content: '';
  position: absolute;
  left:50%;
  bottom: -.12rem;
  display: inline-block;
  width: .24rem;
  height: .24rem;
  margin-left: -.12rem;
  border:1px solid #ccc;
  border-width:1px 1px 0 0;
  transform:rotate(-45deg);
  background:inherit;
}
}
.channel-a{
  display: inline-block;
  width: 100%;
  border-right:1px solid #ccc;
}
.channel-navcont{
  position: absolute;
  width: 100%;
  left: 0;
  top: 0.9rem;
  background: #fff;
  z-index: 2;
}
.navcont{
  position: relative;
  background:inherit;

}

.sort-type{
  li{
    height: 0.9rem;
    line-height: 0.9rem;
    padding:0 .4rem;
    border-bottom:1px solid #ccc;
  }
}


</style>

