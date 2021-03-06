export default {
  title: 'Ant Design Vue Boilerplate',
  description: 'Ant Design Vue Boilerplate',
  primaryColor: '#52C41A', // primary color of ant design
  navTheme: 'light', // theme for nav menu
  layout: 'topmenu', // nav menu position: sidemenu or topmenu
  contentWidth: 'Fluid', // layout of content: Fluid or Fixed, only works when layout is topmenu
  fixedHeader: true, // sticky header
  fixSiderbar: false, // sticky siderbar
  autoHideHeader: false, //  auto hide header
  colorWeak: false,
  multiTab: false,
  production:
    process.env.NODE_ENV === 'production' &&
    process.env.VUE_APP_USE_MOCK_API !== 'true',
  // vue-ls options
  storageOptions: {
    namespace: 'antdv__', // key prefix
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'local', // storage name session, local, memory
  },
}
