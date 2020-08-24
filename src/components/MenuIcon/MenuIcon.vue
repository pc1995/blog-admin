<template>
  <div class="menu-icon">
    <span v-if="type === 'fold'" class="iconfont icon-menu-fold"></span>
    <span v-else class="iconfont icon-menu-unfold"></span>
  </div>
</template>

<script>
  export default {
    name: "MenuIcon",
    props: {
      type: {
        type: String,
        default: 'fold'
      }
    }
  }
</script>

<style lang="less" scoped>
  .menu-icon {
    width: 35px;
    height: 32px;
    text-align: center;
    cursor: pointer;
    border-radius: 3px;
    line-height: 32px;
    span {
      font-size: 20px;
    }
  }
</style>
