  <template>
    <div>
      <el-card class="box-card6">
        <div class="text item">
          <div class="card6_top">
            <div class="card6_title">
              <span style="font-weight: 800; font-size: 14px; padding-left: 6px;">业绩排行榜</span>
              <span>（每1小时更新）</span>
              <el-input v-model="search" placeholder="请输入姓名" @input="toSearch" class="handle-input mr10"></el-input>
            </div>
            <div class="card6_top_right">
              <el-form
                :inline="true"
                :model="formInline"
                class="demo-form-inline">
                <el-form-item label="时间：">
                  <el-select @change="selectGet1(formInline.time)" class="time" v-model="formInline.time">
                    <el-option label="今天" value="day"></el-option>
                    <el-option label="本周" value="week"></el-option>
                    <el-option label="本月" value="month"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="团队：">
                  <el-select @change="selectGet2(formInline.team)" class="team" v-model="formInline.team">
                    <el-option label="部门" value="dept"></el-option>
                    <el-option label="中心" value="center"></el-option>
                    <el-option label="事业部" value="business"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="card6_list" id="tableCon">
            <table class="tableTitle" cellpadding="2" width="100%">
              <thead>
                <tr bgcolor="#fff">
                  <td width="14%">排名</td>
                  <td width="34%">事业部</td>
                  <td width="26%">姓名</td>
                  <td width="14%">签单量</td>
                  <td width="12%">业绩</td>
                </tr>
              </thead>
            </table>
              <vue-seamless-scroll :data="searchData" :class-option="defaultOption" style="height: 170px; overflow: hidden;">
                <table class="tableCon" width="100%" >
                  <tr  v-for="item in searchData"  :key="item.id"  >
                    <td width="13%">{{item.rankNo}}</td>
                    <td width="34%">{{item.level5Name}}</td>
                    <td width="26%">{{item.realName}}</td>
                    <td width="14%">{{item.signContractNum}}</td>
                    <td width="10%">{{item.signPerformance}}</td>
                  </tr>
                  <tr ></tr>
              </table>
            </vue-seamless-scroll>
          </div>
        </div>
      </el-card>
    </div>
  </template>

<script>
// import loginName from '../../../../static/config.js'
import vueSeamlessScroll from 'vue-seamless-scroll'
export default {
  data () {
    return {
      loginName: '',
      yes: 0,
      formInline: {
        time: 'month',
        team: 'business'
      },
      performanceData: [],
      multipleSelection: [],
      scroll: -1,
      myInterval: '', // 设置定时器
      speed: 60, // 定时器执行时间间隔
      search: '',
      searchData: []
    }
  },
  created () {

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
      this.$http.performance(this.loginName, this.formInline.team, this.formInline.time)
        .then(resp => {
          if (resp.data.data == null) {
            this.searchData = []
            return false
          }
          this.searchData = resp.data.data
          this.performanceData = resp.data.data
        })
    },
    // 搜索框筛选
    toSearch () {
      const word = this.search
      if (word) {
        this.searchData = this.performanceData.filter(item => item.realName.includes(word))
      } else {
        this.searchData = this.performanceData
      }
    },
    // 时间
    selectGet1: function (str) {
      this.$http.performance(this.loginName, this.formInline.team, str)
        .then(resp => {
          if (resp.data.data == null) {
            this.searchData = []
            return false
          }
          this.searchData = resp.data.data
          this.performanceData = resp.data.data
        })
    },
    // 团队
    selectGet2: function (str, time) {
      this.$http.performance(this.loginName, str, this.formInline.time)
        .then(resp => {
          if (resp.data.data == null) {
            this.searchData = []
            return false
          }
          this.searchData = resp.data.data
          this.performanceData = resp.data.data
        })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    }

  }
}
</script>

  <style lang='scss'>
    .box-card6 {
      width: 100%;
      height: 280px;
      margin-right: 10px;
      float: left;
      background:rgba(255,255,255,1);
      .card6_top {
        height: 14px;
        width: 100%;
        border-left: 4px solid rgba(204,204,204,1);
        .card6_title {
          height: 14px;
          line-height: 14px;
          float: left;
          font-size: 12px;
        }
        .card6_top_right {
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
        }
        .el-input--small {
          width: 150px;
          .el-input__inner {
            height: 24px;
            line-height: 24px;
          }
        }
      }
      .card6_list {
        margin-top: 10px;
        margin-left: 5px;
        #demo{
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
      }
    }
  </style>
