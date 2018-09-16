<template>
    <div class="page-home">
      <!-- banner -->
      <div class="home-banner">
          <img src="../../media/image/home-banner.jpg" alt="" />
          <div class="home-top">
              <div class="home-location" @click="reSelectCity">
                  <svg-icon icon-class="location"></svg-icon><svg-icon class="next" icon-class="next"></svg-icon>
                  {{!place?'未找到所在城市':place}}
              </div>
              <div class="home-search">
                  <svg-icon icon-class="search"></svg-icon>鸡排
              </div>
          </div>
      </div>
      <!-- 导航 -->
      <div class="head-nav">
          <a class="head-nav-a" v-for="item,index in navList" :key="'nav'+index"  v-if="index<8">
              <img :src="item.url" alt="">
              <span>{{item.name}}</span>
          </a>
      </div>
      <!-- 附近商家  -->
      <div class="home-nearby">
          <h6 class="nearby-tit">—— 附近商家 ——</h6>
          <shopList :list="neaybyList" @loadMore="loadMore" :loadMore="loadMore"></shopList>
      </div>
      <Footer></Footer>
    </div>
</template>

<script>

import Footer from '@/component/footer/footer.vue'
import shopList from '@/component/common/shopList.vue'

import { lStorage, removeLStorage } from '@/js/utils'
import { getNavData, getNearbyData } from '@/service'

export default {
  name: 'home',
  data() {
    return {
      navList: [],
      neaybyList: [],
      loadOver: false,
      myCity: '',
      selectedPlcae: {},
      place: ''
    }
  },
  components: { Footer, shopList },
  computed: {

  },
  methods: {
    reSelectCity() {
      removeLStorage('myCity')
      removeLStorage('place')
      this.$router.push({ path: '/city' })
    },
    getMyCity() {
      const myCityData = lStorage('myCity')
      if (myCityData) {
        this.myCity = myCityData.city_name
      }
    },
    getSelectedPlace() {
      const selectedPlcae = lStorage('place')
      if (selectedPlcae) {
        this.place = selectedPlcae.name
      } else {
        this.place = this.myCity
      }
    },
    // 列表加载更多
    loadMore() {
      getNearbyData().then(response => {
        if (response.data.data.poilist) {
          this.neaybyList = [...this.neaybyList, ...response.data.data.poilist]
        } else {
          this.loadOver = true
          console.log('没有更多数据！')
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  mounted() {
    getNavData().then(response => {
      this.navList = response.data.data.primary_filter
    })
    getNearbyData().then(response => {
      this.neaybyList = response.data.data.poilist
    })
    this.getMyCity()
    this.getSelectedPlace()
    if (!this.myCity && !this.place) {
      this.$router.push({ path: '/city' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/mixin.scss";

.page-home{
  padding-bottom: 1rem;
}
.home-banner {
  position: relative;
  height: 3.4rem;
  text-align: center;
  img {
    height: 100%;
  }
}
.home-top {
  position: absolute;
  display: flex;
  top: 0.2rem;
  width: 100%;
  justify-content: center;
}
.home-location,
.home-search {
  position: relative;
  height: .5rem;
  line-height: 0.5rem;
  border-radius: 0.25rem;
  color: #fff;
  font-size: 0.24rem;
  padding-left: 0.6rem;
  padding-right: 0.5rem;
  text-align: left;
  background: rgba(0, 0, 0, 0.3);
  max-width:45%;
  @include ellipsis;
  svg {
    position: absolute;
    left: 0.15rem;
    top: 50%;
    margin-top: -0.18rem;
    font-size: 0.36rem;

    &.next {
      left: auto;
      right: 0.15rem;
    }
  }
}

.home-search {
  width: 3rem;
  background: #fff;
  color: #666;
  margin-left: 0.2rem;
}

.head-nav {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  background: #fff;
  padding-bottom: 0.4rem;
  .head-nav-a {
    width: 25%;
    text-align: center;
    font-size: 0.24rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 0.3rem;
    img {
      width: 0.94rem;
      height: 0.94rem;
      border-radius: 50%;
      margin-bottom: 0.1rem;
    }
  }
}
.home-nearby {
  background: #fff;
  margin-top: 0.3rem;
  font-size: 0.28rem;
}
.nearby-tit {
  text-align: center;
  font-size: 0.32rem;
  line-height: 1rem;
  color: #999;
}

.gray {
  color: #ccc;
}

</style>
