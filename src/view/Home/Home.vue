<template>
  <div class="content">
    <div class="control-wrapper">
      <div class="workbench">
        <h1>工作台</h1>
        <div class="workbench-container">
          <div class="left">
            <div class="user-logo">Pub</div>
            <div class="cont">
              <h3>今天没有更新博客哦，快去写博客吧！</h3>
              <div class="weather">
                <Icon type="md-rainy" />
                今天天气不错，可以多写几篇
              </div>
            </div>
          </div>
          <div class="right">
            <ul>
              <li>
                <div class="top">
                  <div class="icon-wrapper">
                    <Icon class="article" type="ios-keypad" />
                  </div>
                  <span>文章数</span>
                </div>
                <span class="count">121</span>
              </li>
              <li>
                <div class="top">
                  <div class="icon-wrapper">
                    <Icon class="comment" type="ios-paper" />
                  </div>
                  <span>评论数</span>
                </div>
                <span class="count">7878</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="control-cont">
        <div class="left">
          <div class="new-comment item">
            <div class="title">
              <div class="icon-wrapper">
                <Icon type="md-document" />
              </div>
              <h4>最新评论</h4>
            </div>

            <ul>
              <li v-for="(item, index) in comments" :key="index">
                <p><span>{{`#${index}`}}</span>{{item.content}}</p>
                <Button type="default" size="small" ghost>回复</Button>
              </li>
            </ul>
          </div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
        </div>
        <div class="right">
          <div class="top">
            <div class="icon-wrapper">
              <Icon type="md-nuclear" />
            </div>
            <h2>总控台</h2>
          </div>
          <div class="tab">
            <div class="item" v-for="(item, index) in topList" :key="index">
              <span>{{item.label}}</span>
              <strong>{{item.count}}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
            label: '全站打赏金额',
            count: 0
          },
          {
            label: '异常捕获',
            count: 0
          },
        ],
        comments: [
          {
            content: '道森股份东方国际就好看了好久',
          },
          {
            content: '是的法规的方法和规划局客户快递费',
          },
          {
            content: '这个如果是头发几个月电饭锅风格是真的好',
          },
          {
            content: '似懂非懂合格后空间环境科技热的食物是无法',
          },
          {
            content: '这个风格是真的好',
          },
          {
            content: '水电费水电费功夫就会快递费',
          },
          {
            content: '而非沃尔特让他愿意提供健康会尽快答复',
          },
          {
            content: '所发生的发生几个号结构化监管环境规划',
          },
          {
            content: '沙发斯蒂芬是的师范沙发斯蒂芬是的',
          },
          {
            content: '这个风格是真s的递四方速递水电费dfa的好',
          }
        ]
      }
    },
    components: {
      Wrapper
    }
  }
</script>

<style lang="less" scoped>
  @import "../../assets/theme/index";
  .content {
    /*padding-right: 30px;*/
  }

  .control-wrapper {
    padding: 10px;
    .workbench {
      background-color: @menu-dark-title;
      margin: 0px -10px 8px;
      padding-left: 30px;
      padding-bottom: 8px;
      h1 {
        color: #ffffff;
        font-weight: normal;
        padding: 8px 0;
      }
      .workbench-container {
        display: flex;
        justify-content: space-between;
        .left {
          display: flex;
          align-items: center;
          .user-logo {
            width: 65px;
            height: 65px;
            border-radius: 50%;
            background-color: @global-golden;
            text-align: center;
            line-height: 65px;
          }
          .cont {
            margin-left: 10px;
            color: @theme-global-color;
            .weather {
              margin-top: 10px;
            }
          }
        }
        .right {
          padding-right: 30px;
          ul {
            display: flex;
            li {
              padding: 0 10px;
              text-align: right;
              .top {
                display: flex;
                .icon-wrapper {
                  width: 30px;
                  height: 30px;
                  background-color: #ffffff;
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  .article {
                    color: @primary-color;
                  }
                  .comment {
                    color: @error-color;
                  }
                }
                span {
                  font-size: 14px;
                  margin-left: 8px;
                }
              }
              .count {
                font-weight: 600;
                font-size: 16px;
              }
            }
          }
        }
      }
    }
    .control-cont {
      display: flex;
      .icon-wrapper {
        width: 20px;
        height: 20px;
        background-color: #ffffff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .left {
        flex: 1;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        padding-right: 12px;
        .item {
          width: 49.6%;
          background-color: @menu-dark-title;

          border-radius: 5px;
          min-height: 400px;
          margin-bottom: 10px;
          &:nth-child(3), &:nth-child(4) {
            margin-bottom: 0;
          }
          h4 {
            font-size: 15px;
            color: #ffffff;
            margin-left: 10px;
          }
          ul {
            li {
              display: flex;
              padding: 10px;
              justify-content: space-between;
              //border-bottom: 1px solid @border-color-split;
              &:nth-child(even) {
                background-color: @even-black;
              }
              p {
                span {
                  margin-right: 6px;
                }
              }
            }
          }
          .title {
            display: flex;
            padding: 15px 10px;
            border-bottom: 1px solid @border-color-black;
          }
          /deep/.ivu-icon {
            color: @primary-color;
          }
        }
      }
      .right {
        flex: 0 0 400px;
        width: 400px;
        background-color: @menu-dark-title;
        .top {
          display: flex;
          width: 100%;
          border-bottom: 1px solid @border-color-black;
          align-items: center;
          padding: 10px 15px;
          .icon-wrapper {

          }
          h2 {
            color: #ffffff;
            font-weight: normal;
            margin-left: 8px;
            font-size: 16px;
          }
        }
        .tab {
          padding: 0 15px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          margin-top: 10px;
          .item {
            flex: 0 0 46%;
            height: 90px;
            margin-bottom: 15px;
            background-color: @grey-black;
            border-radius: 0 3px 3px 0;
            border-left: 4px solid @menu-dark-title-select;
            box-sizing: content-box;
            font-size: 15px;
            transition: all .2s;
            color: @theme-global-color;
            &:last-child {
              span {

              }
              strong {
                color: #bd1c1c;
              }
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
      }
    }

  }

</style>
