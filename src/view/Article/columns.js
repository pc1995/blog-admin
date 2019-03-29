import {Button} from 'iview'
const columns = (Vue) => {
  return [
    {
      title: '封面',
      key: 'img_src',
      align: 'center',
      render(h, {row}) {
        console.log('row', row)
        return h('img', {
          attrs: {
            src: row.img_src,
            width: '80',
            height: '60'
          },
          style: {
            marginTop: '5px'
          },
          class: ''
        })
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
        console.log('row.original', row.original)
        return h('i-switch', {
          props: {
            value: row.original,
            size: 'large'
          },
          on: {
            'on-change': () => (Vue.originalChange(row))
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
      title: '发布时间',
      key: 'add_time',
      align: 'center'
    },
    {
      title: '更新时间',
      key: 'update_time',
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
      title: '文章内容',
      key: 'markdown',
      align: 'center',
      width: '400',
      render(h, {row}) {
        return h('p', {
          class: 'm-content',
          attrs: {
            title: row.markdown
          }
        }, row.markdown)
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
