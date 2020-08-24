<template>
  <div class="tab-nav-wrapper">
    <div class="main">
      <Icon class="arrow" type="ios-arrow-back" @click="prev" />
      <div class="nav-list-wrapper" ref="navList">
        <ul ref="ul">
          <li v-for="(item, index) in tabNav" :key="index" @click="onChange(item, index)" :class="{ active: index === oldIndex }">
            <span>{{item.title}}</span>
            <Icon type="md-close" />
          </li>
        </ul>
      </div>
      <Icon class="arrow" type="ios-arrow-forward" @click="next" />
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    name: "TabNav",
    data() {
      return {
        allLi: 0,
        oldIndex: 0,
        translateX: 0
      }
    },
    computed: {
      ...mapState({
        tabNav: state => state.global.tabNav
      })
    },
    methods: {
      onChange(data, index) {
        this.$nextTick(() => {
          this.onTranslate(index);
          this.$router.push(data.path)
        })
      },
      onTranslate(index) {
        const navListWidth = this.$refs.navList.getBoundingClientRect().width;
        const lis = this.$refs.ul.querySelectorAll('li');
        const marginRight = parseInt(window.getComputedStyle(lis[index]).marginRight);
        let allLi = 0;
        let subLi = 0;
        for (let i = 0; i < lis.length; i++) {
          const w = lis[i].getBoundingClientRect().width;
          if (subLi === 0) {
            subLi = w;
          }
          allLi += w;
        }
        allLi += ((index + 1) * marginRight)
        this.allLi = allLi;
        console.log('mar=2', marginRight, navListWidth, allLi);
        const count = Math.floor(navListWidth / (subLi + marginRight));
        const centerIndex = Math.floor(count / 2);
        if (index > centerIndex) {
          if (allLi > navListWidth) {
            console.log(`${navListWidth} + ${this.translateX} = ${navListWidth + this.translateX} < ${allLi}`, navListWidth + this.translateX < allLi)
            const wi = (subLi + marginRight);
            if ((index > this.oldIndex || this.oldIndex === 0) && (navListWidth + this.translateX - subLi / 2) < allLi) {
              this.translateX += wi;
            } else if (index <= this.oldIndex && this.translateX > 0) {
              this.translateX -= wi;
            }
          }
        }
        if (this.translateX < 0) {
          this.translateX = 0;
        }
        this.$refs.ul.style.transform = `translateX(-${this.translateX}px)`;
        this.oldIndex = index;
      },
      prev() {
        if (this.oldIndex === 0) return;
        this.onTranslate((this.oldIndex - 1));
      },
      next() {
        if (this.oldIndex === this.tabNav.length - 1) return;
        this.onTranslate((this.oldIndex + 1));
      }
    },
    watch: {
      $route: {
        handler(val, old) {
          for (let i = 0; i < this.tabNav.length; i++) {
            if (this.tabNav[i].path === val.path) {
              this.oldIndex = i;
              this.$nextTick(() => {
                this.onTranslate(this.oldIndex);
              });
              break;
            }
          }
        },
        deep: true
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../assets/theme/index";
  .tab-nav-wrapper {
    background-color: @body-background;
    margin-top: 1px;
    height: 41px;
    .main {
      display: flex;
      align-items: center;
      overflow: hidden;
      justify-content: space-between;
      .nav-list-wrapper {
        width: 100%;
        overflow: hidden;
        ul {
          display: flex;
          padding: 5px;
          flex-wrap: nowrap;
          white-space: nowrap;
          transition: all .5s;
          li {
            background-color: @menu-dark-title;
            color: @menu-dark-subsidiary-color;
            padding: 5px 10px;
            margin-right: 5px;
            border-radius: 5px;
            font-size: 14px;
            cursor: pointer;
            &.active {
              span {
                color: #ffffff;
              }
            }
          }
        }
      }
    }

    .arrow {
      position: relative;
      z-index: 10;
      padding: 0 10px;
      cursor: pointer;
    }
  }
</style>
