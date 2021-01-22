
const columns = (Vue) => {
  return [
    {
      title: '封面',
      key: 'img_src',
      align: 'center',
      render(h, {row}) {
        console.log('row', row)
        return h('div', {
          attrs: {
            'data-src': row.img_src,

          },
          style: {
            width: '80px',
            height: '50px',
            lineHeight: '50px',
            margin: '5px auto',
            backgroundImage: `url(${row.img_src})`,
            backgroundSize: 'cover'
          },
          class: ''
        }, row.img_src ? '' : '暂无图片')
      }
    },
    {
      title: '文章标题',
      key: 'title',
      align: 'center'
    },
    {
      title: '是否原创',
      key: 'original',
      align: 'center',
      render(h, {row}) {
        return h('i-switch', {
          props: {
            value: row.original,
            size: 'large'
          },
          on: {
            'on-change': () => (Vue.update({
              id: row.id,
              original: !row.original
            }))
          }
        }, [
          h('span', {
            slot: 'open'
          }, '原创'),
          h('span', {
            slot: 'close'
          }, '转载')
        ])
      }
    },
    {
      title: '是否热门',
      key: 'is_hot',
      align: 'center',
      render(h, {row}) {
        return h('i-switch', {
          props: {
            value: row.is_hot,
            size: 'large'
          },
          on: {
            'on-change': () => (Vue.update({
              id: row.id,
              is_hot: !row.is_hot
            }))
          }
        }, [
          h('span', {
            slot: 'open'
          }, '热门'),
          h('span', {
            slot: 'close'
          }, '普通')
        ])
      }
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
      title: '描述',
      key: 'desc',
      align: 'center',
      render(h, {row}) {
        return h('p', {
          class: 'm-content',
          attrs: {
            title: row.desc
          }
        }, row.desc)
      }
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
                Vue.modifyArticle(row)
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
                Vue.deleteArticle(row)
              }
            }
          }, '删除')
        ])
      }
    },
  ]
}

export default columns
