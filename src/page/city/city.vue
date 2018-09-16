<template>
    <div>
        <div class="citytop">
            <div class='cityheader'>
                <a class="logo">
                    <img src='//xs01.meituan.net/waimai_i/img/logo.42591fec.png' />
                </a>
                <h1 class='cityheader-tit'>选择城市</h1>
            </div>
            <p class='yourcity'>
                <template v-if='locatCity'>
                    猜您当前位于：<span @click='clickChooseCity(locatCity)'>{{locatCity.city_name}}</span>
                </template>
            </p>
        </div>

        <div id='cityList' class='citylist' @scroll="scrollActiveIdx($event)" :style='{width:winW+"px",height:winH+"px"}'>
            <dl v-for='item in cities' :key='item.idx'>
                <dt :id='"city"+item.idx'><span>{{item.idx}}</span></dt>
                <dd>
                    <a v-for='itm,index in item.cities' :key='index+itm.city_pinyin' @click='clickChooseCity2(itm)' href='javascript:'>
                        {{itm.city_name}}
                    </a>
                </dd>
            </dl>
        </div>

        <div class='citynav'>
            <a v-for='item,index in cityNavs' :key='"nav"+index' :class='{active:activeIdx==index}' @click='clickActiveIdx(item.idx,index)'>{{item.idx}}</a>
        </div>
    </div>
</template>

<script>
import { lStorage } from '@/js/utils'
import { getCityList } from '@/service'

export default {
  data() {
    return {
      scrollboxId: 'cityList',
      winH: 0, // 视口尺寸
      winW: 0,
      cities: [], // 城市列表
      cityNavs: [], // 城市首字母列表
      activeIdx: 0, // 当前处于哪个首字母index,:{} //
      locatCity: {} // 定位获得的城市
    }
  },
  watch: {
  },
  computed: {
    navTArr() {
      // 城市首字母offset组成的数组
      var arr = []
      this.cityNavs.map(function(item) {
        var id = 'city' + item.idx
        var elm = document.getElementById(id)
        if (elm) {
          arr.push(elm.offsetTop)
        }
      })
      return arr
    }
  },

  methods: {
    initData(data) {
      var d = data.data.data
      this.cities = d.city_nav
      this.cityNavs = d.classify_nav
      this.locatCity = d.my_city
      this.toHome()
    },
    toHome() {
      // 获取storagee中myCity,也是用户上次选择的城市
      var myCityData = lStorage('myCity')
      console.log(this.locatCity.city_id)
      console.log(typeof myCityData)
      // 如果用户上次选择的城市和定位的城市一致，跳转
      if (myCityData && this.locatCity.city_id === myCityData.city_id) {
        this.$router.push({ path: '/home' })
      }
    },
    clickActiveIdx(idx, index) {
      this.activeIdx = index
      this.$router.push({ hash: '#city' + idx })
    },
    scrollActiveIdx($event) {
      var _this = this
      var target = $event.target
      var t = target.scrollTop
      var idx = this.navTArr.length - 1
      try {
        this.navTArr.forEach(function(item, index) {
          if (item > t) {
            idx = index - 1
            idx = idx === -1 ? 0 : idx
            throw new Error('城市首字母：' + _this.cityNavs[idx].idx)
          }
        })
      } catch (e) {
        console.log(e.message)
      }
      this.activeIdx = idx
    },
    clickChooseCity(city) {
      // 存储最后一次选择的城市
      lStorage('myCity', city)
      this.$router.push({ path: '/home' })
    },
    clickChooseCity2(city) {
      // 存储最后一次选择的城市
      lStorage('myCity', city)
      console.log(city)
      this.$router.push({ path: `/searchAddress?city_id=${city.city_id}&cityCode=${city.city_pinyin}` })
    }
  },
  beforeCreate() {
  },
  created() {
    //   发送请求
    getCityList().then(response => {
      this.initData(response)
    })
  },
  mounted() {
    this.winH = document.documentElement.clientHeight
    this.winW = document.documentElement.clientWidth
  },
  updated() {
    //   适合 页面初始化+数据更新完 后执行的一些操作
    var _this = this
    var hash = this.$route.hash
    if (!hash) {
      return false
    }
    var scrollbox = document.getElementById(_this.scrollboxId)
    var nav = document.getElementById(hash.substring(1))
    if (scrollbox && nav) {
      scrollbox.scrollTop = nav.offsetTop + 1 // +1为了避免某些浏览器临界误差
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/mixin";
.citytop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #f4f4f4;
}
.cityheader {
  height: 1.2rem;
  line-height: 1.2rem;
  text-align: center;
  border-bottom: 1px solid #e1e1e1;
}
.cityheader-tit {
  font-size: 0.38rem;
}
.logo {
  position: absolute;
  display: inline-block;
  width: 1rem;
  height: 1rem;
  line-height: 1rem;
  top: .1rem;
  left: 0rem;
  padding-left: 0.2rem;
}
.logo img {
  display: inline-block;
  width: 100%;
  vertical-align: middle;
}
.yourcity {
  line-height: 0.8rem;
  font-size: 0.25rem;
  padding-left: 0.2rem;
  span {
    color: #c50000;
  }
}
.citylist {
  overflow-y: auto;
}
.citylist dt {
  padding-top: 2rem;
}
.citylist dt span {
  display: block;
  width: 100%;
  line-height: 0.6rem;
  font-size: 0.3rem;
  padding-left: 0.2rem;
  background: #eee;
  color: #999;
}
.citylist dd {
  margin-left: 0.2rem;
  margin-right: 0.4rem;
  margin-bottom: -2rem;
}
.citylist dd a {
  display: block;
  line-height: 0.8rem;
  font-size: 0.25rem;
  border-bottom: 1px solid #eee;
}

.citynav {
  position: fixed;
  display: flex;
  width: 0.25rem;
  flex-direction: column;
  justify-content: space-around;
  top: 3rem;
  right: 0.1rem;
  bottom: 1rem;
  z-index: 2;
  align-items: center;
  a {
    height: 0.25rem;
    text-align: center;
    font-size: 0.2rem;
    color: #999;
    &.active {
      color: #c50000;
    }
  }
}
</style>
