const App = r => require.ensure([], () => r(require('@/App')), 'app')
const Home = r => require.ensure([], () => r(require('@/page/home/home')), 'home')
const City = r => require.ensure([], () => r(require('@/page/city/city')), 'city')
const SearchAddress = r => require.ensure([], () => r(require('@/page/SearchAddress/SearchAddress')), 'SearchAddress')

// import App from '@/App'
// import Home from '@/page/home/home'
// import City from '@/page/city/city'

export default [{
  path: '/',
  component: App,
  children: [
    {
      path: '',
      component: Home,
      alias: '/home'
    },
    {
      path: '/city',
      component: City
    },
    {
      path: '/searchAddress',
      component: SearchAddress
    }
  ]
}]
