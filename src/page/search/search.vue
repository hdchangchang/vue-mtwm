<template>
  <div class="search-page">
    <div class="header">
      <div class="header-l" @click="toPre">
        <svg-icon class="header-pre" icon-class="return"></svg-icon>
      </div>
      <div class="header-m search-txtbox">
        <svg-icon class="search-i" icon-class="search"></svg-icon>
        <input class="search-txt" type="text" v-model="searchKeyWord" @keyup.enter="getList" />
        <svg-icon class="search-i" icon-class="close" @click.native="clearWord"></svg-icon>
      </div>
      <a class="search-btn" href="javascript:" @click="getList">搜索</a>
    </div>
    <div class="search-list">
      <ul class="search-ul">
        <li class="search-li" v-for="item in list" :key="JSON.stringify(item)">
          <div class="search-imgbox">
            <img class="search-img" :src="item.pic_url" />
          </div>
          <div class="search-detail">
            <h6 class="search-tit">{{item.name}}</h6>
            <p class="search-p">
              <span class="start-box">
                {{item.wm_poi_score}}
                <i class="star" v-for="i in Math.floor(item.wm_poi_score)"></i>
                <i class="star star-half" v-if="item.wm_poi_score - Math.floor(item.wm_poi_score)>0"></i>
                <i class="star star-empty" v-for="i in 5-Math.ceil(item.wm_poi_score)"></i>
              </span>
              <span>{{item.mt_delivery_time}} | {{item.distance}}</span>
            </p>
            <p class="search-p">
              <span>{{item.min_price_tip+' '+ item.shipping_fee_tip}}</span>
              <span class="send-logo">美团专送</span>
            </p>
            <p class="search-p other-yh" v-for="it in item.product_list" :key="JSON.stringify(it)">
              <span>{{it.product_name}}</span>
              <span>{{it.price}}元</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
    <div class="his-box" v-if="list.length===0 && keywordArr.length!==0">
      <div class="his-tit">
        <h6>历史纪录</h6>
        <svg-icon icon-class="empty" @click.native="clearHis"></svg-icon>
      </div>
      <p class="his-list">
        <span v-for="item in keywordArr">{{item}}</span>
      </p>
    </div>
  </div>
</template>
<script>
import { getSearchData } from '@/service/'
import { lStorage, removeLStorage } from '@/js/utils'

export default {
  data() {
    return {
      searchKeyWord: '', // 搜索关键字
      list: [], // 获取的搜索列表
      num: 10, // localstorage中最多存储10个关键字
      keywordArr: []
    }
  },
  methods: {
    toPre() {
      this.$router.go(-1)
    },
    // 存储查询过的关键字，最多存10个
    setLstorage() {
      if (!this.searchKeyWord) {
        return false
      }
      let keywordArr = lStorage('searchKeyword') || []

      keywordArr = keywordArr.filter((item) => {
        return item !== this.searchKeyWord
      })
      keywordArr.unshift(this.searchKeyWord)
      if (keywordArr.length > this.num) {
        keywordArr.length = this.num
      }
      lStorage('searchKeyword', keywordArr)
      this.keywordArr = keywordArr
    },
    getList() {
      this.setLstorage()

      this.list = []
      getSearchData().then((res) => {
        this.list = res.data.data.search_poi_list
      })
    },
    clearWord() {
      this.searchKeyWord = ''
      this.list = []
    },
    clearHis() {
      removeLStorage('searchKeyword')
      this.keywordArr = []
    }
  },
  mounted() {
    this.keywordArr = lStorage('searchKeyword') || []
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/mixin.scss';
.search-txtbox {
  display: flex;
  align-items: center;
  width: auto;
  height: 0.7rem;
  margin-left: 0.8rem;
  margin-right: 1.4rem;
  margin-top: 0.1rem;
  background: #e1e1e1;
  border-radius: 0.1rem;
  justify-content: space-between;
  .search-i {
    flex: 1;
  }
}
.search-txt {
  height: 100%;
  flex: 8;
  background: inherit;
  font-size: 0.26rem;
}

.search-list{
  padding-top: 0.9rem;
}
.search-li{
  position: relative;
  background: #fff;
  margin-top: 0.2rem;
}
.search-imgbox{
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 2rem;
  height: 2rem;
}
.search-img{
  display: block;
  width: 100%;
} 
.search-detail{
  padding: 0.2rem;
  padding-left: 2.2rem;
} 
.search-tit{
  font-size: 0.3rem;
  margin-bottom: 0.2rem;
}
.search-p{
  display: flex;
  justify-content: space-between;
  font-size: 0.24rem;
  margin-bottom: 0.2rem;
}
.search-btn{
  position: absolute;
  top: .1rem;
  right: .2rem;
  height: 0.7rem;
  line-height: 0.7rem;
  border-radius:.1rem;
  background: $orange;
  padding: 0 .2rem;
}
.other-yh{
  font-size: 0.26rem;
  border-top:1px solid #ccc;
  padding: .2rem  0;
  margin-bottom: 0;
  :nth-child(1){
    flex:6;
    @include ellipsis;
  }
  :nth-child(2){
    flex:2;
    text-align: right;
    color: $orange;
  }
}

.his-box{
  padding: 0 .2rem;
  background: #fff;
  margin-top: .2rem ;
}
.his-tit{
  font-size: 0.4rem;
  display:flex;
  justify-content: space-between;
  padding: .3rem 0;
  border-bottom:1px solid #ccc;
}
.his-list{
  display: flex;
  padding: .2rem 0;
  flex-wrap: wrap;
  span{
    display: inline-block;
    padding: .1rem .2rem;
    border:1px solid #999;
    margin:.1rem;
  }
}
</style>

