export const sidebar = {
    '/guides': [
        { text: '快速开始', link: '/guides/' },
        { text: '颜色', link: '/guides/color-block' },
    ],

    '/components': [
      {
        text: '组件',
        items: [
          {
            text: 'radio-group-button',
            link: '/components/radio-group-button/',
          },
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