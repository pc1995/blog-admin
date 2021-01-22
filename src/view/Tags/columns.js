export default (Vue) => {
  return [
    {
      title: '标签名',
      key: 'name',
      align: 'center'
    },
    {
      title: '图标',
      key: 'icon',
      align: 'center',
      render(h, {row}) {
        return h('span',{
            class: `iconfont ${row.icon}`
          }
        );
      }
    },
    {
      title: '标签类型(英文)',
      key: 'type',
      align: 'center'
    },
    {
      title: '创建时间',
      key: 'created_at',
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
              click: () => (Vue.editTag(row))
            }
          }, '修改'),
          h('Button', {
            props: {
              type: 'error',
              size: 'small'
            },
            on: {
              click: () => (Vue.deleteTag(row))
            }
          }, '删除')
        ])
      }
    },
  ]
}
