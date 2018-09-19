<template>
  <div>
    <Header :title="title"></Header>
    <div class="channel-box">
      <Nav></Nav>
      <ShopList class="channel-list" :list="list" @loadMore="loadMore"></ShopList>
    </div>
  </div>
</template>

<script>
import Header from '@/component/header/header'
import ShopList from '@/component/common/shopList'
import Nav from './children/nav.vue'

import { getNearbyData } from '@/service'
export default{
  name: 'channel',
  data() {
    return {
      list: []
    }
  },
  components: { Header, ShopList, Nav },
  computed: {
    title() {
      return this.$route.query.category_text
    }
  },
  methods: {
    // 列表加载更多
    loadMore() {
      getNearbyData().then(response => {
        if (response.data.data.poilist) {
          this.list = [...this.list, ...response.data.data.poilist]
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
    getNearbyData().then(response => {
      this.list = response.data.data.poilist
    })
  }

}
</script>

<style scoped lang="scss">
.channel-box{
  position: relative;
  padding-top: .9rem;
  display: flex;
  flex-direction: column;
}

.channel-list{
  flex:1;
}

</style>

