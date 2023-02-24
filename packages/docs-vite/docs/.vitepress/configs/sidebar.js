export const sidebar = {
    '/guides': [
        { text: '快速开始', link: '/guides/' },
    ],

    '/components': [
      {
        text: '组件',
        items: [
          {
            text: 'Tabs',
            link: '/components/tabs/',
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
        ],
      },
    ],
  };