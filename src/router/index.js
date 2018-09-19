const App = r => require.ensure([], () => r(require('@/App')), 'app')
const Home = r => require.ensure([], () => r(require('@/page/home/home')), 'home')
const City = r => require.ensure([], () => r(require('@/page/city/city')), 'city')
const Search = r => require.ensure([], () => r(require('@/page/search/search')), 'search')

const SearchAddress = r => require.ensure([], () => r(require('@/page/SearchAddress/SearchAddress')), 'searchAddress')
const Channel = r => require.ensure([], () => r(require('@/page/channel/channel')), 'channel')
const Restaurant = r => require.ensure([], () => r(require('@/page/restaurant/restaurant')), 'restaurant')

const Comments = r => require.ensure([], () => r(require('@/page/restaurant/children/comments/comments')), 'comments')
const ShopIntro = r => require.ensure([], () => r(require('@/page/restaurant/children/intro/intro')), 'intro')
const leftNav = r => require.ensure([], () => r(require('@/page/restaurant/children/order/leftNav')), 'leftNav')
const rightList = r => require.ensure([], () => r(require('@/page/restaurant/children/order/rightList')), 'rightList')

// import App from '@/App'
// import Home from '@/page/home/home'
// import City from '@/page/city/city'

export default [{
  path: '/',
  component: App,
  redirect: (to) => { // to为 与url地址栏输入路径匹配的对象，可以根据to属性不同设定不同的返回值
    return { name: 'home' }
  },
  children: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/city',
      name: 'city',
      component: City
    },
    {
      path: '/searchAddress',
      name: 'searchAddress',
      component: SearchAddress
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/channel',
      name: 'channel',
      component: Channel

    },
    {
      path: '/restaurant/:id/',
      component: Restaurant,
      children: [{
        path: 'order',
        components: {
          'left-nav': leftNav,
          'right-list': rightList
        }
      }, {
        path: 'comment',
        component: Comments
      }, {
        path: 'intro',
        component: ShopIntro
      }]
    }
  ]
}]
