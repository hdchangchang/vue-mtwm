<template>
  <section>
    <Header></Header>
    <section class="address-box">
      <div class="address-box-in">
        <span class="address-city" @click="toCity">
          <span>{{cityName}}</span>
          <svg-icon icon-class="unfold" class="i-drop"></svg-icon>
        </span>
        <section class="address-detail">
            <input v-model="addressKeyword" class="adress-txt" type="text" placeholder="请输入地址" />
            <svg-icon v-if="addressKeyword" class="i-del" icon-class="close" @click.native="addressKeyword=''"></svg-icon>  
        </section>
      </div>
    </section>
    <section class="address-list">
      <dl class="address-dl" v-for="place in relativedPlaceList" :key="JSON.stringify(place)" @click="toHome(place)">
        <dt class="address-dt">{{place.name}}</dt>
        <dd class="address-dd">{{place.address}}</dd>
      </dl>
    </section>
  </section>
</template>

<script>
import Header from '../../component/header/header'
import { getCityList, getRelativePlace, getLocation } from '../../service'
import { lStorage, removeLStorage } from '../../js/utils.js'

export default {
  name: 'searchAddress',
  data() {
    return {
      cityName: '',
      addressKeyword: '',
      relativedPlaceList: []
    }
  },
  components: { Header },
  watch: {
    addressKeyword() {
      this.listRelativedPlace(this.addressKeyword, this.cityName)
    }
  },
  methods: {
    toHome(place) {
      lStorage('place', place)
      this.$router.push({ path: '/home' })
    },
    selectCity() {
      const query = this.$route.query
      // 找出匹配城市
      getCityList().then(res => {
        const cityList = res.data.data.city_nav
        try {
          cityList.forEach(cityArr => {
            cityArr.cities.forEach(city => {
              if (parseInt(city.city_id) === parseInt(query.city_id)) {
                this.cityName = city.city_name
                throw new Error(city.city_name) // 跳出循环
              }
            })
          })
        } catch (e) {
          console.log(e.message)
        }
      })
    },
    toCity() {
      removeLStorage('myCity')
      this.$router.push({ path: '/city' })
    },
    listRelativedPlace(place, city) {
      this.relativedPlaceList = []
      // 输入关联地理位置
      getRelativePlace(place, city).then(res => {
        const list = res.result
        const arr = []
        list.forEach((item, index) => {
          arr.push(getLocation(item.location.lat + ',' + item.location.lng))
        })
        Promise.all(arr).then(res => {
          list.forEach((item, index) => {
            item.address = res[index].result.formatted_address
          })
          this.relativedPlaceList = list
        })
      })
    }
  },
  created() {
    this.selectCity()
  }
}
</script>
<style lang='scss' scoped>
@import "../../style/mixin.scss";


.address-box {
  position: fixed;
  top: 0.9rem;
  left: 0;
  width:100%;
  padding: 0.2rem;
  background: #e1e1e1;
  z-index: 1;
}
.address-box-in {
  display: flex;
  height: 0.6rem;
  line-height: 0.6rem;
  border-radius: 0.1rem;
  background: #fff;
}
.address-city {
  position: relative;
  display: flex;
  align-items: center;
  flex: 2;
  padding: 0 .1rem;
  border-right: 1px solid #ccc;
  .i-drop {
    flex:1;
  }
  span{
    flex:5;
    @include ellipsis;
  }
}

.address-detail {
  position: relative;
  flex: 6;
  padding-left: 0.2rem;
  padding-right: 0.5rem;
  .i-del {
    position: absolute;
    right: 0.2rem;
    top: 50%;
    transform: translateY(-50%);
  }
}
.adress-txt {
  display: block;
  width: 100%;
  height: 0.6rem;
  line-height: .6rem;
  font-size: 0.26rem;
}
.address-list {
  position: absolute;
  width:100%;
  left: 0;
  top: 0;
  padding: 2rem .2rem .2rem .2rem;
  font-size: 0.26rem;
}
.address-dl {
  border-bottom: 1px solid #e1e1e1;
  padding: 0.2rem;
}
.address-dt {
  margin-bottom: 0.15rem;
}
.address-dd {
  color: #999;
  width: 100%;
  @include ellipsis;
}
</style>

