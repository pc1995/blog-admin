<template>
  <wrapper>
    <div class="content" slot="content">
      <div class="tab">
        <div class="item" v-for="(item, index) in topList" :key="index">
          <span>{{item.label}}</span>
          <strong>{{item.count}}</strong>
        </div>
      </div>
    </div>
  </wrapper>
</template>

<script>
  import Wrapper from '../../components/Wrapper/Wrapper'
  export default {
    name: "Home",
    data() {
      return {
        topList: [
          {
            label: '今日阅读量',
            count: 0
          },
          {
            label: '全站阅读量',
            count: 0
          },
          {
            label: '全站评论量',
            count: 0
          },
          {
            label: '全站标签数',
            count: 0
          },
          {
            label: '全站访问量',
            count: 0
          },
          {
            label: '今日打赏金额',
            count: 0
          },
          {
            label: '全栈打赏金额',
            count: 0
          },
        ]
      }
    },
    components: {
      Wrapper
    }
  }
</script>

<style lang="less" scoped>
  .content {
    padding-right: 30px;
  }
  .tab {
    display: flex;
    .item {
      flex: 1;
      height: 100px;
      margin-left: 20px;
      background-color: #fff;
      border-radius: 0 5px 5px 0;
      border-left: 6px solid #ddd;
      box-sizing: content-box;
      font-size: 18px;
      transition: all .2s;
      &:nth-child(1) {
        margin-left: 10px;
      }
      &:last-child {

      }
      &:hover {
        box-shadow: 5px 0 10px rgba(0, 0, 0, 0.5);
      }
      text-align: center;
      span {
        display: block;
        margin-top: 20px;
      }
    }
  }
</style>
