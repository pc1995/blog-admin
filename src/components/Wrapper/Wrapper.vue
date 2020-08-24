<template>
  <section class="admin-wrapper">
    <aside-nav :type="type" :style="{width: type === 'fold' ? '200px' : '70px'}"></aside-nav>
    <div class="content-wrapper" :style="{marginLeft: type === 'fold' ? '200px' : '70px'}">
      <header-top @shrink="shrink"></header-top>
      <tab-nav />
      <div class="detail-content-wrapper">
        <slot name="content"></slot>
      </div>
    </div>
    <!--<loader />-->
  </section>
</template>

<script>
  import AsideNav from '../AsideNav/AsideNav'
  import HeaderTop from '../HeaderTop/HeaderTop'
  import Loader from '../Loader/Loader'
  import TabNav from "../TabNav/TabNav";
  export default {
    name: "Wrapper",
    data() {
      return {
        type: 'fold',
      }
    },
    methods: {
      shrink(type) {
        this.type = type
      }
    },
    components: {
      AsideNav,
      HeaderTop,
      Loader,
      TabNav
    }
  }
</script>

<style lang="less" scoped>
  .admin-wrapper {
    display: flex;
    height: 100%;
    .content-wrapper {
      flex: 1;
      width: 0;
      height: 100%;
      margin-left: 180px;
      transition: all .2s;
      /*min-width: 1740px;*/
      .detail-content-wrapper {
        padding: 5px 10px 0;
      }
    }
  }
</style>
