import {Button} from 'iview'
const columns = (Vue) => {
  return [
    {
      title: '轮播图',
      key: 'image',
      align: 'center',
      render(h, {row}) {
        return h('img', {
          attrs: {
            src: row.image,
            class: 'banner-img'
          }
        })
      }
    },
    {
      title: '跳转链接',
      key: 'link',
      align: 'center',
      render(h, {row}) {
        return h('span', row.link ? row.link : '暂无')
      }
    },
    {
      title: '所属产品',
      key: 'product_name',
      align: 'center',
      render(h, {row}) {
        return h('span', row.product_name === 'music' ? '音乐' : '文章')
      }
    },
    {
      title: '创建时间',
      key: 'add_time',
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
              click: () => (Vue.editBanner(row))
            }
          }, '修改'),
          h('Button', {
            props: {
              type: 'error',
              size: 'small'
            },
            on: {
              click: () => (Vue.deleteBanner(row))
            }
          }, '删除')
        ])
      }
    },
  ]
}

export default columns
