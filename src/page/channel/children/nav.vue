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
      <dl class="navcont-dl" v-for="(item,index) in categoryFilterList" :key="index">
        <dt class="navcont-dt">{{item.name}}</dt>
        <dd class="navcont-dd" >
          <span v-for="(it,idx) in item.sub_category_list" :key="idx">{{it.name}}{{'('+it.quantity+')'}}</span>
        </dd>
      </dl>
    </div>
    <div class="navcont" v-if="activeIndex===1">
      <ul class="sort-type">
        <li class="sort-li" v-for="(item,index) in sortTypeList" :key="index">{{item.name}}</li>
      </ul>
    </div>
    <div class="navcont" v-if="activeIndex===2">
      <dl class="navcont-dl2" v-for="(item,index) in activityFilterList" :key="index">
        <dt class="navcont-dt2" v-if="item.group_title">{{item.group_title}}</dt>
        <dd class="navcont-dd2">
          <span v-for="(it,idx) in item.items" 
                :key="idx" 
                :class="it.cla"
                v-if="item.support_multi_choice"  
                @click="choose(it)" >
            <img :src="it.icon" alt="" />
            {{it.name}}
          </span>
          <p v-else @click="choose(it)" :class="it.cla" >
            <img :src="it.icon" alt="" />
            {{it.name}}
          </p>
        </dd>
      </dl>
      <div class="navcont-btn">
        <a href="javascript:" @click="clear" >清除筛选</a>
        <a href="javascript:" class="active">完成{{choosedNum?'('+choosedNum+')':''}}</a>
      </div>
    </div>
  </div>
  <div class="zzc" @click="activeIndex=-1"></div>
</div>
</template>

<script>
  import { getFilterConditions } from '@/service'
  export default{
    data() {
      return {
        activeIndex: -1,
        activityFilterList: [],
        categoryFilterList: [],
        sortTypeList: []
      }
    },
    computed: {
      choosedNum() {
        let num = 0
        this.activityFilterList.forEach((item, index) => {
          item.items.forEach((itm, idx) => {
            if (itm.cla) {
              num++
            }
          })
        })
        return num
      }
    },
    methods: {
      showMore(index) {
        if (this.activeIndex === index) {
          this.activeIndex = -1
        } else {
          this.activeIndex = index
        }
      },
      choose(item) {
        // 这里是下面???不生效的原因，必须copy一份出来，vue直接更改属性不会实时更新
        const activityFilterList = [...this.activityFilterList]
        activityFilterList.forEach((itm, index) => {
          // 多选
          if (itm.support_multi_choice === 1) {
            itm.items.forEach((it, idx) => {
              if (it.code === item.code) {
                it.cla = !it.cla ? { active: true } : undefined
              }
            })
          } else { // 单选
            itm.items.forEach((it, idx) => {
              if (itm.items.some((em) => {
                return em.code === item.code
              })) {
                it.cla = undefined
                if (it.code === item.code) {
                  it.cla = { active: true }
                }
              }
            })
          }
        })
        this.activityFilterList = activityFilterList // ???这里为何不能实时更新
        console.log(this.activityFilterList)
      },
      clear() {
        const activityFilterList = [...this.activityFilterList]
        activityFilterList.forEach((item, index) => {
          item.items.forEach((itm, idx) => {
            itm.cla = undefined
          })
        })
        this.activityFilterList = activityFilterList
      }
    },
    mounted() {
      getFilterConditions().then((res) => {
        const lists = res.data.data
        this.activityFilterList = lists.activity_filter_list
        this.categoryFilterList = lists.category_filter_list
        this.sortTypeList = lists.sort_type_list
      })
    }
  }
</script>

<style scoped lang="scss">
@import '@/style/mixin.scss';
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
  max-height:80vh;
  left: 0;
  top: 0.9rem;
  background: #fff;
  z-index: 2;
  overflow: scroll;
}
.navcont{
  position: relative;
  background:inherit;
  font-size: 0.24rem;
}

.sort-type{
  li{
    height: 0.9rem;
    line-height: 0.9rem;
    padding:0 .4rem;
    border-bottom:1px solid #ccc;
  }
}

.navcont-dl{
  margin-bottom:.2rem;
  .navcont-dt{
    width:100%;
    background: #efefef;
    height: 0.6rem;
    line-height: 0.6rem;
    padding: 0 .2rem;
    font-size: 0.28rem;
  }
  .navcont-dd{
    display: flex;
    flex-wrap: wrap;
    padding:.2rem .3rem 0 .3rem;
    span{
      display: inline-block;
      width: 30%;
      margin: 1.6%;
      padding: .1rem;
      border:1px solid #ccc;
      text-align: center;
      @include ellipsis;
    }
  }
}

.navcont-dl2{
  @extend .navcont-dl;
  .navcont-dt2{
    @extend .navcont-dt;

    background: none;
  }
  .navcont-dd2{
    @extend .navcont-dd;
    span.active{
      border-color:$orange;
      background:transparentize($orange,0.8);
    }
    img{
        vertical-align: middle;
    }
    p{
      line-height: 0.8rem;
      width: 100%;
      border-bottom:1px solid #ccc;
      &.active{
        border-color:$orange;
        background:transparentize($orange,0.8);
      }
    }
  }
}
.navcont-btn{
  width: 100%;
  display: flex;
  font-size: 0.28rem;
  a{
    display: inline-block;
    width: 50%;
    height: 0.9rem;
    line-height: 0.9rem;
    text-align: center;
    border:1px solid #ccc;
    &.active{
      background: $orange;
    }
  }
}
</style>

