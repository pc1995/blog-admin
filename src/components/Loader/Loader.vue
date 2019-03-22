<template>
  <div class="loader" :class="{hidden: !show}">
    <div class="wrapper">
      <div class="inner"></div>
      <div class="text">LOADING</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Loader",
    data() {
      return {
        show: true
      }
    },
    mounted() {
      setTimeout(() => {
        this.show = false
      }, 600)
    },
  }
</script>

<style lang="less" scoped>
  @import "./Loader";
</style>
