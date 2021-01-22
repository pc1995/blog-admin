<template>
  <header class="header-container">
    <div class="left">
      <div class="menu-shrink" @click="shrink">
        <menu-icon :type="type"></menu-icon>
      </div>
      <Breadcrumb class="bread">
        <BreadcrumbItem v-for="(item, index) in breadcrumbList" :key="index">{{item.title}}</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="right">
      <div class="expand" @click="fullScreen">
        <Icon type="md-expand" size="20" />
      </div>
      <Dropdown trigger="click" @on-click="handleUser">
          <span class="username">
            {{username}}
           <Icon size="20" type="md-arrow-dropdown" />
          </span>
        <DropdownMenu slot="list">
          <DropdownItem name="changePassword">修改密码</DropdownItem>
          <DropdownItem name="logout">退出</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </header>
</template>

<script>
  import MenuIcon from '../MenuIcon/MenuIcon';
  import { mapState } from 'vuex';
  export default {
    name: "HeaderTop",
    data() {
      return {
        type: 'fold',
        visible: false,

      }
    },
    computed: {
      ...mapState({
        breadcrumbList: state => state.global.breadcrumbList,
        username: state => {
          if (state.user.info) {
            return state.user.info.username
          }
          return ''
        }
      })
    },
    methods: {
      shrink() {
        this.type = this.type === 'fold' ? 'unfold' : 'fold'
        this.$emit('shrink', this.type)
      },
      handleUser(name) {
        if (name === 'logout') {
          window.localStorage.clear()
          this.$router.push({
            path: '/login'
          })
        }
      },
      fullScreen() {
        const el = document.documentElement;
        const rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;
        if (typeof rfs !== "undefined" && rfs) {
          rfs.call(el);
        }
        return false;

      },
    },
    components: {
      MenuIcon
    }
  }
</script>

<style lang="less" scoped>
  @import "../../assets/theme/index";
  .header-container {
    width: 100%;
    height: 60px;
    background-color: @menu-dark-title;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .menu-shrink {
      margin-left: 20px;
    }
    .left {
      display: flex;
      align-items: center;
      .bread {
        margin-left: 15px;
      }
    }
    /deep/span {
      color: @theme-global-color;
    }
    .right {
      display: flex;
      margin-right: 50px;
      align-items: center;
      .expand {
        margin-right: 15px;
        cursor: pointer;
        /deep/.ivu-icon-md-expand {
          color: @theme-global-color;
        }
      }
      .username {
        cursor: pointer;
        display: flex;
        align-items: center;
        font-size: 14px;
      }
    }
  }
</style>
