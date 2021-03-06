const columns = (Vue) => {
  return [
    {
      title: '栏目名称',
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
              click: () => (Vue.editCategory(row))
            }
          }, '修改'),
          h('Button', {
            props: {
              type: 'error',
              size: 'small'
            },
            on: {
              click: () => (Vue.deleteCategory(row))
            }
          }, '删除')
        ])
      }
    },
  ]
}

export default columns
