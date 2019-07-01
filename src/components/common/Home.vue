<template>
    <div class="wrapper">
         <v-head></v-head>
        <div class="main">
           <v-sidebar></v-sidebar>
          <div class="content-box" :class="{'content-collapse':collapse}">
               <v-tags></v-tags>
              <div class="content">
                  <transition name="move" mode="out-in">
                      <keep-alive :include="tagsList">
                          <router-view></router-view>
                      </keep-alive>
                  </transition>
              </div>
          </div>
        </div>
    </div>
</template>

<script>
import vHead from './Header.vue'
import vSidebar from './Sidebar.vue'
// import vTags from './Tags.vue'
import bus from './bus'
export default {
  data () {
    return {
      tagsList: [],
      collapse: false
    }
  },
  components: {
    vHead, vSidebar
  },
  created () {
    bus.$on('collapse', msg => {
      this.collapse = msg
    })

    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    // bus.$on('tags', msg => {
    //   let arr = []
    //   for (let i = 0, len = msg.length; i < len; i++) {
    //     msg[i].name && arr.push(msg[i].name)
    //   }
    //   this.tagsList = arr
    // })
  }
}
</script>

<style lang='scss'>
  .wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    .main {
      flex: 1;
      display: flex;
      .content {
        flex: 1;
        overflow-x: hidden;
        width: 100%;
        // top: 48px;
        left: 180px;
      }
    }
  }
  .content-box {
    left: 180px;
    top: 0px;
  }
  .content-collapse {
    left: 65px;
  }
</style>
