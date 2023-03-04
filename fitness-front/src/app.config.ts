export default defineAppConfig({
  pages: [
    'pages/record/record',
    'pages/add/add',
    'pages/dietDetail/dietDetail',
    'pages/index/index',
    'pages/schedule/schedule',
    'pages/weightManage/weightManage',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#8a8a8a',
    selectedColor: '#70f603',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/record/record',
        text: '记录',
        iconPath: './assets/record.png',
        selectedIconPath: './assets/record_active.png'
      },
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: './assets/index.png',
        selectedIconPath: './assets/index_active.png'
      },

      {
        pagePath: 'pages/schedule/schedule',
        text: '计划',
        iconPath: './assets/schedule.png',
        selectedIconPath: './assets/schedule_active.png'
      }
    ]

  }
})
