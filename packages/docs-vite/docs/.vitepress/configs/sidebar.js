export const sidebar = {
    '/': [
      { text: '快速开始', link: '/' },
      {
        text: '通用',
        items: [
          {
            text: 'Tabs',
            link: '/components/tabs',
          },
          {
            text: 'Button 按钮',
            //   link: '/components/button/',
            items: [
              {
                text: '简单用法',
                link: '/components/button/simple',
              },
              {
                text: '高级用法',
                link: '/components/button/complex',
              },
            ],
          },
          {
            text: 'icon',
            link: '/components/icon/',
          },
          {
            text: 'checkbox',
            link: '/components/checkbox/',
          },
          {
            text: 'transfer',
            link: '/components/transfer/',
          },
          {
            text: 'message',
            link: '/components/message/',
          },
        ],
      },
      { text: '导航' },
      { text: '反馈' },
      { text: '数据录入' },
      { text: '数据展示' },
      { text: '布局' },
    ],
  };