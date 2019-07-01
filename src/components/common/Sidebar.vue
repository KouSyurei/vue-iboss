<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus'
export default {
  data () {
    return {
      collapse: false,
      items: [
        {
          icon: 'el-icon-news',
          index: 'dashboard',
          title: '工作台'
        },
        {
          icon: 'el-icon-more-outline',
          index: '3',
          title: '资源',
          subs: [
            {
              index: 'volumeIncrease',
              title: '批量增加'
            },
            {
              index: 'addRecord',
              title: '增加记录'
            },
            {
              index: 'businessAllocation',
              title: '商机分配'
            },
            {
              index: 'qualityControl',
              title: '商机质检'
            },
            {
              index: 'resource',
              title: '商机资源明细'
            }
          ]
        },
        {
          icon: 'el-icon-share',
          index: 'business',
          title: '商机'
        },
        {
          icon: 'el-icon-tickets',
          index: 'order',
          title: '订单'
        },
        {
          icon: 'el-icon-message',
          index: 'clue',
          title: '线索'
        },
        {
          icon: 'el-icon-star-off',
          index: 'finance',
          title: '财务'
        }
      ]
    }
  },
  computed: {
    onRoutes () {
      return this.$route.path.replace('/', '')
    }
  },
  created () {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on('collapse', msg => {
      this.collapse = msg
    })
  }
}
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 48px;
        height: 100%;
        bottom:0;
        width: 180px;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 180px;
    }
    .sidebar > ul {
        height:100%;
    }
    .el-menu-item {
      /* max-width: 180px; */
      min-width: 64px;
    }
</style>
