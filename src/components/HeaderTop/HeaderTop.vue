<template>
  <header class="header-container">
    <div class="menu-shrink" @click="shrink">
      <menu-icon :type="type"></menu-icon>
    </div>
    <div class="admin">
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
  import MenuIcon from '../MenuIcon/MenuIcon'
  export default {
    name: "HeaderTop",
    data() {
      return {
        type: 'fold',
        visible: false,
        username: window.localStorage.getItem('username')
      }
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
      }
    },
    components: {
      MenuIcon
    }
  }
</script>

<style lang="less" scoped>
  .header-container {
    width: 100%;
    height: 60px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .menu-shrink {
      margin-left: 20px;
    }
    .admin {
      margin-right: 100px;
      .username {
        cursor: pointer;
        display: flex;
        align-items: center;
        font-size: 14px;
      }
    }
  }
</style>
