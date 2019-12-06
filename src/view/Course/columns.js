const columns = (Vue) => {
  return [
    {
      title: '封面',
      key: 'img_src',
      align: 'center',
      width: '220px',
      render(h, {row}) {
        return h('img', {
          attrs: {
            src: row.img_src
          },
          style: {
            width: '180px'
          }
        });
      }
    },
    {
      title: '视频标题',
      key: 'title',
      align: 'center'
    },
    {
      title: '视频类型',
      key: 'type',
      align: 'center'
    },
    {
      title: '视频链接',
      key: 'video_link',
      align: 'center'
    },
    {
      title: '简介',
      key: 'desc',
      align: 'center'
    },
    {
      title: '发布时间',
      key: 'created_at',
      align: 'center'
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
              click: () => {
                Vue.modify(row)
              }
            }
          }, '修改'),
          h('Button', {
            props: {
              type: 'error',
              size: 'small'
            },
            on: {
              click: () => {
                Vue.delete(row)
              }
            }
          }, '删除')
        ])
      }
    },
  ]
}

export default columns
