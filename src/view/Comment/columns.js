
const columns = (Vue) => {
  return [
    {
      title: '昵称',
      key: 'nickname',
      align: 'center'
    },
    {
      title: '邮箱',
      key: 'email',
      align: 'center',
    },
    {
      title: '网站',
      key: 'link',
      align: 'center',
    },
    {
      title: '评论内容',
      key: 'content',
      align: 'center',
    },
    {
      title: '更新时间',
      key: 'updated_at',
      align: 'center'
    },
    {
      title: '操作',
      align: 'center',
      render(h, {row}) {
        return h('span', [
          h('Button', {
            props: {
              type: 'primary',
              size: 'small'
            },
            style: {
              marginRight: '10px'
            },
            on: {
              click: () => (Vue.replay(row))
            }
          }, '回复')
        ])
      }
    },
  ]
}

export default columns
