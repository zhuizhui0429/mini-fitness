export default defineAppConfig({
  pages: [
    'pages/schedule/schedule',
    'pages/createSchedule/createSchedule',
    'pages/scheduleDetail/scheduleDetail',
    'pages/record/record',
  ],
  subpackages: [{
    root: 'packageDiet',
    pages: [
      'pages/add/add',
      'pages/dietDetail/dietDetail'
    ]
  },
  {
    root: 'packageWeight',
    pages: [
      'pages/weightManage/weightManage'
    ]
  }
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
        pagePath: 'pages/schedule/schedule',
        text: '计划',
        iconPath: './assets/schedule.png',
        selectedIconPath: './assets/schedule_active.png'
      },
      {
        pagePath: 'pages/record/record',
        text: '记录',
        iconPath: './assets/record.png',
        selectedIconPath: './assets/record_active.png'
      },
    ]

  }
})
