<template>
  <div class="aside-nav-container" :class="{hide: type === 'unfold'}">
    <div class="logo">
      <span class="logo-name">Pub <span v-show="type === 'fold'">Admin</span></span>
    </div>
    <Menu :theme="theme" width="100%" :open-names="openNames" :active-name="activeName" @on-select="select" @on-open-change="openChange" v-show="type === 'fold'">
      <Submenu v-for="(item, index) in nav" :key="index" :name="index + ''">
        <template slot="title">
          <Icon style="font-size: 18px" :type="item.icon" />
          <template>
            <span :class="{hide: type === 'unfold'}">{{item.title}}</span>
          </template>
        </template>
        <MenuItem :title="item.title" v-for="(subItem, subIndex) in item.children" :key="subIndex" :name="`${index}-${subIndex}`" append>
          <template>
            <span class="menu-text" :class="{hide: type === 'unfold'}">{{subItem.title}}</span>
          </template>
        </MenuItem>
      </Submenu>
    </Menu>
    <div class="menu-list" v-show="type === 'unfold'">
      <div class="menu-list-item" v-for="(item, index) in nav" :key="index" :class="{active: index === menuIndex}">
        <Dropdown placement="right-start" @on-click="select">
          <Icon :type="item.icon" size="18" v-if="item.icon" />
          <div class="drop-content" slot="list">
            <DropdownMenu  v-if="item.children">
              <DropdownItem :name="`${index}-${subIndex}`" v-for="(subItem, subIndex) in item.children" :key="subIndex" :class="{active: subIndex === secondIndex && index === menuIndex}">
                <span>{{subItem.title}}</span>
              </DropdownItem>
            </DropdownMenu>
          </div>
        </Dropdown>
      </div>
    </div>
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
            type: 'group',
            title: 'Dashboard',
            icon: 'md-clock',
            children: [
              {
                title: '工作台',
                path: '/'
              },
              {
                title: '监控台',
                path: '/article'
              },
            ],
          },
          {
            type: 'group',
            title: '内容管理',
            icon: 'ios-aperture',
            children:[
              {
                title: '文章管理',
                icon: 'ios-paper',
                path: '/article'
              },
              {
                title: '评论管理',
                icon: 'ios-albums-outline',
                path: '/comment'
              },
            ]
          },
          {
            title: '分类管理',
            icon: 'md-analytics',
            type: 'group',
            children: [
              {
                path: '/category',
                title: '栏目管理'
              },
              {
                path: '/tags',
                title: '标签管理'
              },
              {
                path: '/topic',
                title: '话题管理'
              }
            ]
          },
          {
            title: '活动广告',
            icon: 'md-aperture',
            type: 'group',
            children: [
              {
                path: '/banners',
                title: '轮播广告'
              }
            ]
          },
          {
            title: '金钱管理',
            icon: 'logo-usd',
            type: 'group',
            children: [
              {
                path: '/money',
                title: '打赏管理'
              }
            ]
          },
          {
            title: '异常管理',
            icon: 'md-warning',
            type: 'group',
            children: [
              {
                title: '接口异常',
                path: '/apiError'
              }
            ]
          }
        ],
        show: true,
        activeName: 0,
        openNames: [],
        menuIndex: 0,
        secondIndex: 0
      }
    },
    created() {
      this.init();

    },
    methods: {
      init() {
        let point = false;
        const path = this.$route.path;
        let itemObj = {};
        for (let i = 0; i < this.nav.length; i++) {
          const item = this.nav[i];
          if (item.children) {
            for (let j = 0; j < item.children.length; j++) {
              const subItem = item.children[j];
              if (subItem.path === path) {
                this.menuIndex = i;
                this.secondIndex = j;
                const current =  {
                  path: subItem.path,
                  title :subItem.title
                }
                const list = [
                  {
                    path: '/',
                    title: '首页'
                  },
                  {
                    path: item.path,
                    title: item.title
                  },
                  current
                ];

                this.$store.commit('global/updateBreadCrumbList', list);
                this.$store.commit('global/updateTabNav',  current);
                point = true;

                break;
              }
            }
          }
          if (point) {
            break;
          }
        }
      },
      select(data) {
        const arr = data.split('-').map(num => Number(num));
        const path = this.nav[arr[0]].children[arr[1]].path;
        const current =  {
          path: this.nav[arr[0]].children[arr[1]].path,
          title: this.nav[arr[0]].children[arr[1]].title
        }
        const list = [
          {
            path: '/',
            title: '首页'
          },
          {
            path: this.nav[arr[0]].path,
            title: this.nav[arr[0]].title
          },
          current
        ];

        this.menuIndex = arr[0];
        this.secondIndex = arr[1];
        this.$store.commit('global/updateBreadCrumbList', list);
        this.$store.commit('global/updateTabNav',  current);
        this.$router.push({
          path: path
        })
      },
      openChange(values) {
        this.openNames = values;
      },
    },
    watch: {
      type(val) {
        if (val === 'fold') {
          this.show = true
        } else {
          setTimeout(() => {
            this.show = false;
            this.activeName = '';
          }, 200)
        }

      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../assets/theme/index";
  .aside-nav-container {
    width: 200px;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
    transition: all .2s;
    background-color: @menu-dark-title;
    .user-avatar {
      display: block;
      width: 45%;
      margin-bottom: 20px;
      margin-left: 20px;
    }
    .logo {
      height: 61px;
      border-bottom: 1px solid #000000;
      .logo-name {
        line-height: 61px;
        padding-left: 20px;
        color: @global-golden;
        font-size: 24px;
      }
    }
    &.minWidth {
      width: 70px;
    }
    > ul {
      height: 100%;
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
    /deep/.ivu-menu {
      &.ivu-menu-dark {
        /*background-color: #151518;*/
        .ivu-menu-submenu-title:hover {
          background-color: #151518;
        }
        .ivu-menu {
          background-color: #070910;
        }
      }
    }
    .menu-text {
      transition: all .2s;
      opacity: 1;
      &.hide {
        opacity: 0;
      }
    }
    .menu-list {
      transition: all .2s;
      .menu-list-item {
        height: 52px;
        text-align: center;
        line-height: 52px;
        cursor: pointer;
        &.active {
          background-color: @menu-dark-title-select;
        }
        /deep/.ivu-dropdown {
          min-width: 100%;
          .ivu-select-dropdown {
            margin-left: 3px;
          }
          .ivu-dropdown-item {
            color: @theme-global-color;
            padding: 12px 16px;
            &.active {
              background-color: @primary-color;
            }
          }
        }
        .drop-content {
          width: 150%;
          text-align: center;
          background-color: @menu-dark-select;
          margin-left: 5px;
        }
        color: @theme-global-color;
      }
    }
  }
</style>
