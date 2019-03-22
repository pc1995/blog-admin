<template>
  <section class="admin-wrapper">
    <aside-nav :type="type" :style="{width: type === 'fold' ? '180px' : '70px'}"></aside-nav>
    <div class="content-wrapper" :style="{marginLeft: type === 'fold' ? '180px' : '70px'}">
      <header-top @shrink="shrink"></header-top>
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
      Loader
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
      background-color: #f2f2f2;
      transition: all .2s;
      .detail-content-wrapper {
        padding: 20px 10px 0;
      }
    }
  }
</style>
