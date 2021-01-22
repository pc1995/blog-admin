<template>
  <div id="app">
    <wrapper v-if="$route.path !== '/login'">
      <router-view slot="content" />
    </wrapper>
    <router-view v-else />
  </div>
</template>

<script>
  import Wrapper from './components/Wrapper/Wrapper'
  export default {
    name: 'App',
    components: {
      Wrapper
    },
    mounted() {
      this.$store.dispatch('user/info')
    }
  }

</script>

<style lang="less">
#app {
  height: 100%;
  width: 100%;
}
</style>
