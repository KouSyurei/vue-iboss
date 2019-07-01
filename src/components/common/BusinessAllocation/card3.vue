<template>
  <div>
    <el-card class="box-card3">
      <div class="box">
        <div class="box_top">
          <p class="box_top_set">掉库商机</p>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label="`待首电(${total})`"  :formatter="this.total" name="first">
              <el-table
                :data="tableData"
                style="width: 100%;"
                row-key
                id="tableId"
              >
                <el-table-column
                  prop="rankNo"
                  label="序号"
                  width="80">
                </el-table-column>
                <el-table-column
                  :show-overflow-tooltip="true"
                  label="商机"
                  width="200">
                  <template slot-scope="scope">
                      <div
                        @click="handelGoBussId(scope.row.no)"
                        class="BussIdStyle"
                      >
                        {{scope.row.no}}  {{scope.row.name}}
                      </div >
                  </template>
                </el-table-column>
                <el-table-column
                  :show-overflow-tooltip="true"
                  prop="customerName"
                  label="客户"
                  width="200">
                  <template slot-scope="scope">
                    <div >
                      {{scope.row.customerNo}}  {{scope.row.customerName}}
                    </div >
                  </template>
                </el-table-column>
                <el-table-column
                  :show-overflow-tooltip="true"
                  prop="customerPhone"
                  label="联系号码"
                  width="300">
                  <template slot-scope="scope">
                    <p>{{scope.row.customerPhone}}<img
                        src="../../../assets/img/phone.png"
                        style="cursor:pointer; float: right; padding-right:28px"
                        @click="handelGoBussId(scope.row.no)"
                      >
                    </p>
                  </template>
                </el-table-column>
                <el-table-column
                  :show-overflow-tooltip="true"
                  prop="businessStatus"
                  label="商机状态"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="willDropTime"
                  label="掉库剩余时间">
                  <!-- <template slot-scope="scope">
                    {{timeDown(scope.row.willDropTime)}}
                  </template> -->
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane :label="`即将掉库(${total})`"  :formatter="this.willBeLostTotal" name="second">
              <el-table
                :data="willBeLostData"
                style="width: 100%;"
              >
                <el-table-column
                  prop="rankNo"
                  label="序号"
                  width="80">
                </el-table-column>
                <el-table-column
                  :show-overflow-tooltip="true"
                  prop="no"
                  label="商机"
                  width="200">
                  <template slot-scope="scope">
                      <div
                        @click="handelGoBussId(scope.row.no)"
                        class="BussIdStyle"
                      >
                        {{scope.row.no}}  {{scope.row.name}}
                      </div >
                  </template>
                </el-table-column>
                <el-table-column
                  :show-overflow-tooltip="true"
                  prop="customerNo"
                  label="客户"
                  width="200">
                  <template slot-scope="scope">
                    <div >
                      {{scope.row.customerNo}} {{scope.row.customerName}}
                    </div >
                  </template>
                </el-table-column>
                <el-table-column
                  :show-overflow-tooltip="true"
                  prop="customerPhone"
                  label="联系号码"
                  width="300">
                  <template slot-scope="scope">
                    <p>{{scope.row.customerPhone}}<img
                        src="../../../assets/img/phone.png"
                        style="cursor:pointer; float: right; padding-right:28px"
                        @click="handelGoBussId(scope.row.no)"
                      >
                    </p>
                  </template>
                </el-table-column>
                <el-table-column
                  :show-overflow-tooltip="true"
                  prop="businessStatus"
                  label="商机状态"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="willDropTime"
                  label="掉库剩余时间">
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
          <div class="pagination">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page"
              :page-size="pageSize"
              layout="prev, pager, next, jumper"
              :total="count"
            >
            </el-pagination>
          </div>
        </div>
        <div></div>
      </div>
    </el-card>
  </div>
</template>

<script>
// import loginName from '../../../../static/config.js'
export default {
  data () {
    return {
      count: 0,
      loginName: '',
      activeName: 'first',
      page: 1, // 当前页码
      pageSize: 5, // 每页条数
      tableData: [],
      tableData1: [],
      total: '0',
      willBeLostTotal: 0,
      flag: false,
      checkList: [],
      checkLists: [],
      datas: '',
      willBeLostData: [],
      status: 'first',
      datessss: null
    }
  },
  created () {
  },
  mounted () {
    let time = setInterval(() => {
      if (this.flag === true) {
        clearInterval(time)
      }
      this.timeDown()
    }, 1000)
  },
  methods: {
    requst () {
      this.loginName = sessionStorage.getItem('loginName')
      this.init(this.pageSize, this.page)
      this.$http.firstCallOrWillLost('willBeLost', this.loginName, this.pageSize, this.page).then(resp => {
        this.willBeLostTotal = resp.data.data
        if (resp.data.data && resp.data.data.length > 0) {
          this.willBeLostTotal = resp.data.count
        }
      })
      this.$http.firstCallOrWillLost('waitingFirstCall', this.loginName, this.pageSize, this.page).then(resp => {
        this.tableData = resp.data.data
        if (resp.data.data && resp.data.data.length > 0) {
          this.tableData = resp.data.count
        }
      })
    },
    handelGoBussId (opId) {
      let url = `https://tibossbus.dgg.net/bus/com/business_detail.html?businessId=${opId}`
      window.open(url)
    },
    init (pageSize, page) {
      setInterval(() => {
        this.$http.firstCallOrWillLost('waitingFirstCall', this.loginName, pageSize, page).then(resp => {
          this.validaResp('firstCall', resp)
        }).catch((err) => {
          console.log('网络连接错误' + err)
        })
        clearInterval()
      }, 5000)
    },
    init1 (pageSize, page) {
      setInterval(() => {
        this.$http.firstCallOrWillLost('willBeLost', this.loginName, pageSize, page).then(resp => {
          this.validaResp('willBeLost', resp)
        }).catch((err) => {
          console.log('网络连接错误' + err)
        })
        clearInterval()
      }, 5000)
    },
    validaResp (flag, resp) { // 验证接口返回数据
      if (resp.data.code === 0) {
        if (resp.data.data.length > 0) {
          this.count = resp.data.count
        }
        switch (flag) {
          case 'firstCall':
            this.tableData = resp.data.data
            this.createTime = resp.data.data.willDropTime
            this.total = resp.data.count
            this.tableData.forEach(e => {
              e['willDropTime1'] = e.willDropTime
            })
            this.timeDown()
            break
          case 'willBeLost':
            this.willBeLostData = resp.data.data
            this.createTime = resp.data.data.willDropTime
            this.willBeLostTotal = resp.data.count
            this.willBeLostData.forEach(e => {
              e['willDropTime1'] = e.willDropTime
            })
            this.timeDown()
            break
          default:
            break
        }
      } else {
      }
    },
    timeDown () {
      // this.tableData = this.getdate;
      if (this.tableData !== null) {
        for (let i = 0; i < this.tableData.length; i++) {
          this.checkList[i] = new Date(this.tableData[i].willDropTime1)
          // 执行时分秒
          const endTime = this.checkList[i]
          const nowTime = new Date()
          let leftTime = parseInt((endTime.getTime() - nowTime.getTime()) / 1000) - 5 * 60
          // let d = parseInt(leftTime / (24 * 60 * 60))
          // let h = this.formate(parseInt((leftTime / (60 * 60)) % 24))
          let m = this.formate(parseInt((leftTime / 60) % 60))
          let s = this.formate(parseInt(leftTime % 60))
          if (leftTime <= 0 || m == null) {
            m = '00'
          }
          if (leftTime <= 0 || m == null) {
            s = '00'
          }

          this.tableData[i].willDropTime = m + '分' + s + '秒'
        }
      } else {
      }
      if (this.willBeLostData !== null) {
        for (let i = 0; i < this.willBeLostData.length; i++) {
          this.checkList[i] = new Date(this.willBeLostData[i].willDropTime1)
          // 执行时分秒
          const endTime = this.checkList[i]
          const nowTime = new Date()
          let leftTime = parseInt((endTime.getTime() - nowTime.getTime()) / 1000) - 5 * 60
          // let d = parseInt(leftTime / (24 * 60 * 60))
          // let h = this.formate(parseInt((leftTime / (60 * 60)) % 24))
          let m = this.formate(parseInt((leftTime / 60) % 60))
          let s = this.formate(parseInt(leftTime % 60))
          if (leftTime <= 0 || m == null) {
            m = '00'
          }
          if (leftTime <= 0 || m == null) {
            s = '00'
          }

          this.willBeLostData[i].willDropTime = m + '分' + s + '秒'
        }
      } else {
      }
    },
    formate (time) {
      if (time >= 10) {
        return time
      } else {
        return `0${time}`
      }
    },
    handleClick (val) {
      this.status = val.name
      if (val.name === 'first') {
        this.init(this.pageSize, this.page)
      } else {
        this.init1(this.pageSize, this.page)
      }
    },
    handleSizeChange (val) {
      this.pageSize = val
      if (this.status === 'first') {
        this.init(this.pageSize, this.page)
      } else {
        this.init1(this.pageSize, this.page)
      }
    },
    handleCurrentChange (page) {
      this.page = page
      if (this.status === 'first') {
        this.init(this.pageSize, this.page)
      } else {
        this.init1(this.pageSize, this.page)
      }

      clearInterval()
    },
    // callPhone () {
    //   var id = this.rankNo
    //   this.$router.push({
    //     path: '/clue',
    //     query: {
    //       id: id,
    //       name: 'customerName'
    //     }
    //   })
    // },
    // callPhone (id, customerPhone, customerName, importTime) {
    //   var customerList = this.tableData
    //   // console.log(customerList)
    //   // var customer = {id: id, name: customerName}
    //   // customer.phoneList = []
    //   // customer.phoneList.push({
    //   //   no: customerPhone,
    //   //   name: customerName
    //   // })
    //   // customerList.push(customer)
    //   console.log(customerList)
    //   window.parent.dialing(customerList, '')
    // },
    dialing (customerList) {
    }
  },
  beforeDestroy () {
    clearInterval()
  }
}
</script>

<style lang='scss'>
  .box-card3 {
    width:100%;
    height:330px;
    background:rgba(255,255,255,1);
    float: left;
    margin-right: 10px;
    .box_top {
      height: 14px;
      width: 100%;
      border-left: 4px solid rgba(204,204,204,1);
      .box_top_set {
        font-size: 14px;
        height: 12px;
        line-height: 12px;
        font-weight: 600;
        padding-left: 6px;
        float: left;
      }
      .el-tabs__header {
        float: right;
        .el-tabs__item {
          font-size: 12px;
          font-weight: 400;
          height: 22px;
          line-height: 14px;
        }
        .el-tabs__nav-wrap::after {
          width: 0;
        }
      }
      .el-tabs__content {
        width: 100%;
        .el-table--small td {
          padding: 6px 0;
          .cell {
            padding-right: 0;
          }
        }
      }
    }
    .BussIdStyle {
      cursor: pointer;
    }
    .BussIdStyle:hover {
      color: #409EFF;
    }
  }
</style>
