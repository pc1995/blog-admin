<template>
  <div class="aside-nav-container" :class="{hide: type === 'unfold'}">
    <Menu :theme="theme" width="100%" :active-name="activeName" @on-select="select">
      <img class="user-avatar" src="./img/1099.png" v-if="type === 'fold'" alt="">
      <MenuItem :title="item.title" v-for="(item, index) in nav" :key="index" :name="item.path">
        <template>
          <Icon style="font-size: 18px" :type="item.icon" />
          <span class="menu-text" v-if="show" :class="{hide: type === 'unfold'}">{{item.title}}</span>
        </template>
      </MenuItem>
    </Menu>
  </div>
</template>

<script>
  export default {
    name: "AsideNav",
    props: {
      type: {
        type: String,
        default: 'fold'
      }
    },
    data() {
      return {
        theme: 'dark',
        nav: [
          {
            title: '主页',
            icon: 'ios-home-outline',
            path: '/'
          },
          {
            title: '文章管理',
            icon: 'ios-paper',
            path: '/article'
          },
          {
            title: '教学视频',
            icon: 'md-videocam',
            path: '/course'
          },
          {
            title: '分类管理',
            icon: 'ios-briefcase-outline',
            path: '/category'
          },
          {
            title: '轮播广告',
            icon: 'ios-albums-outline',
            path: '/banners'
          },
          {
            title: '评论管理',
            icon: 'ios-albums-outline',
            path: '/banners'
          },
          {
            title: '打赏管理',
            icon: 'ios-albums-outline',
            path: '/banners'
          }
        ],
        show: true,
        activeName: this.$route.path
      }
    },
    methods: {
      select(data) {
        this.$router.push({
          path: data
        })
      }
    },
    watch: {
      type(val) {
        if (val === 'fold') {
          this.show = true
        } else {
          setTimeout(() => {
            this.show = false
          }, 200)
        }

      }
    }
  }
</script>

<style lang="less" scoped>
  .aside-nav-container {
    width: 180px;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
    transition: all .2s;
    .user-avatar {
      display: block;
      width: 80px;
      margin-bottom: 20px;
      margin-left: 20px;
    }
    &.minWidth {
      width: 70px;
    }
    > ul {
      height: 100%;
    }
    /deep/.ivu-menu {
      background-color: #000c17;
      padding-top: 20px;
    }
    /deep/.ivu-menu-dark {
      background-color: #001529;
    }
    /deep/.ivu-menu-dark.ivu-menu-vertical  /deep/.ivu-menu-opened  /deep/.ivu-menu-submenu-title {
      background-color: #001529;
    }
    /deep/.ivu-menu-vertical {
      .ivu-menu-item, .ivu-menu-submenu-title {
        text-align: left;
        padding: 12px 24px;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
      }
    }
    .menu-text {
      transition: all .2s;
      opacity: 1;
      &.hide {
        opacity: 0;
      }
    }
  }
</style>
