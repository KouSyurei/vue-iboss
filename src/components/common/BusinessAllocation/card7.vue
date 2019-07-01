<template>
  <div>
    <el-card class="box-card7">
      <div class="text item">
        <div class="card7_top">
          <div class="card7_title">
            <span style="font-weight: 800; font-size: 14px; padding-left: 6px;">转介绍排行榜</span>
            <span>（每月第5个工作日更新）</span>
          </div>
          <div class="card7_top_right">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="红/黑榜：">
                <el-select @change="selectGet1(formInline.board)" v-model="formInline.board">
                  <el-option label="红榜" value="red"></el-option>
                  <el-option label="黑榜" value="black"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="事业部：">
                <el-autocomplete
                  class="inline-input"
                  v-model="formInline.team"
                  :fetch-suggestions="querySearch"
                  placeholder="请输入内容"
                  @select="handleSelect"
                  clearable
                ></el-autocomplete>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="card7_list">
          <table class="tableTitle" cellpadding="2" width="100%">
              <thead>
                <tr bgcolor="#fff">
                  <td width="14%">排名</td>
                  <td width="34%">事业部</td>
                  <td width="26%">姓名</td>
                  <td width="14%">转换率</td>
                </tr>
              </thead>
            </table>
          <vue-seamless-scroll :data="performanceData" :class-option="defaultOption" style="height: 170px; overflow: hidden;">
                <table class="tableCon" width="100%" >
                  <tr  v-for="item in performanceData" :key="item.id">
                    <td width="15%">{{item.rankNo}}</td>
                    <td width="38%">{{item.level5Name}}</td>
                    <td width="30%">{{item.realName}}</td>
                    <td width="14%">{{item.referralSignRate}}%
                    </td>
                  </tr>
                  <tr></tr>
              </table>
          </vue-seamless-scroll>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import vueSeamlessScroll from 'vue-seamless-scroll'
export default {
  data () {
    return {
      loginName: '',
      yes: 0,
      formInline: {
        board: 'red',
        team: ''
      },
      performanceData: [],
      multipleSelection: [],
      scroll: -1,
      myInterval: '', // 设置定时器
      speed: 60, // 定时器执行时间间隔
      restaurants: []
    }
  },
  created () {

  },
  mounted () {
    // 事业部搜索
    this.$http.businessDivision()
      .then(resp => {
        for (var i = 0; i < resp.data.data.length; i++) {
          resp.data.data[i].value = resp.data.data[i].level3Name
        }
        this.restaurants = resp.data.data
      })
  },
  components: {vueSeamlessScroll},
  computed: {
    defaultOption () {
      return {
        step: 0.5
      }
    }
  },
  methods: {
    requst () {
      this.loginName = sessionStorage.getItem('loginName')
      this.$http.referral(null, 'red')
        .then(resp => {
          if (resp.data.data === null) {
            this.performanceData = []
            return false
          }
          this.performanceData = resp.data.data
        })
    },
    // 红/黑榜
    selectGet1: function (str) {
      this.$http.referral(this.formInline.team, str)
        .then(resp => {
          if (resp.data.data === null) {
            this.performanceData = []
            return false
          }
          this.performanceData = resp.data.data
        })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    // 事业部的搜索
    querySearch (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1)
      }
    },
    handleSelect (item) {
      this.$http.referral(item.level3, this.formInline.board)
        .then(resp => {
          if (resp.data.data === null) {
            this.performanceData = []
            return false
          }
          this.performanceData = resp.data.data
        })
    }
  }
}
</script>

<style lang='scss'>
  .box-card7 {
    width: 100%;
    margin-top: 10px;
    height: 280px;
    background:rgba(255,255,255,1);
    .card7_top {
      height: 14px;
      width: 100%;
      border-left: 4px solid rgba(204,204,204,1);
      .card7_title {
        height: 14px;
        line-height: 14px;
        float: left;
        font-size: 12px;
      }
      .card7_top_right {
        float: right;
        .el-form-item {
          margin-bottom: 0px;
          margin-right: -28px;
          .el-form-item__label {
            line-height: 12px;
            font-size: 12px;
            padding: 0 4px 0 0;
          }
          .el-input {
            width: 70%;
          }
          .el-input__inner {
            padding: 0 12px;
            height: 24px;
            line-height: 24px;
          }
          .el-form-item__content {
            line-height: 24px;
          }
          .el-input__icon {
            line-height: 24px;
          }
        }
        .el-autocomplete-suggestion li {
          font-size: 12px;
          padding: 0 10px;
        }
      }
    }
    .card7_list {
      #referralList{
          overflow:hidden;
          width:100%;
          height:200px;
        }
        .tableTitle{
          color: #909399;
          border-collapse: collapse;
          tr {
            font-size: 12px;
            font-weight: 600;
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid #EBEEF5;
          }
        }
        .tableCon{
          color: #606266;
          font-size: 16px;
          tr {
            height: 38px;
            border-bottom: 1px solid #EBEEF5;
            width: 100%;
            display: inline-block;
            line-height: 38px;
            td {
              display: inline-block;
              font-size: 12px;
            }
          }
        }
      .el-table--small td {
        padding: 7px 0;
      }
    }
    .el-table--small td {
      padding: 8px 0
    }
  }
</style>
