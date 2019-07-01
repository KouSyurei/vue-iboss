<template>
  <div>
    <el-card class="box-card5">
      <div class="box">
        <div class="box_top">
          <p class="box_top_set">今日数据</p>
          <!-- <span>
            <el-button type="text" @click="dialogVisible = true">
              <p>自定义设置</p>
            </el-button>
            <el-dialog
              title="选择要显示的内容"
              :visible.sync="dialogVisible"
              width="12%"
            >
              <div class="drag-list" draggable="true"
                v-for="list in userModulData"
                :data-id="list.moduleId"
                :key="list.moduleId"
                @dragstart="dragstartEvent"
                @dragend="dragendEvent"
                @dragenter="dragenterEvent"
                @dragleave="dragleaveEvent"
                @dragover="dragoverEvent"
            >{{list.moduleName}}</div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
              </span>
            </el-dialog>
          </span> -->
        </div>
        <ul id="wheel-container"
            @mouseover="isHover=true"
            @mouseout="isHover=false"
            @mousewheel.prevent = "mouse_wheel"
            :style="{overflowX:isHover?'scroll':'hidden'}" class="box_content">
          <li>
            <el-card class="content-card">
            <div class="text item">
              <div class="content-card_title">
                <span>电话量</span>
                <p>（今天/次）</p>
              </div>
              <img src="../../../assets/img/group7(5).png" alt="" class="content-card_ico">
              <div id='myVue' class="content-card_body">
                <span id="name1">30S以上：<p id="thirtyCall">{{celldata === null ? 0 : celldata.callThirtyCounts}}</p></span>
                <span id="name2">60s以上：<p id="sixtyCall">{{celldata === null ? 0 : celldata.callSixtyCounts}}</p></span>
                <span id="name3">共计通话：<p id="countCall">{{celldata === null ? 0 : celldata.callAllCounts}}</p></span>
              </div>
            </div>
          </el-card>
          </li>
          <li>
            <el-card class="content-card">
            <div class="text item">
              <div class="content-card_title">
                <span>自开发</span>
                <p>（月/单）</p>
              </div>
              <img src="../../../assets/img/group7(11).png" alt="" class="content-card_ico">
              <div id='myVue' class="content-card_body">
                <span id="name1">今日：<p>{{todayDataAll === null ? 0 : todayDataAll.selfDevelopingLines}}</p></span>
                <span id="name2">本月：<p>{{todayDataAll === null ? 0 : todayDataAll.selfDevelopingMonth}}</p></span>
                <span id="name3">本月签单：<p>{{todayDataAll === null ? 0 : todayDataAll.selfDevelopingContract}}</p></span>
              </div>
            </div>
          </el-card>
          </li>
          <li>
            <el-card class="content-card">
            <div class="text item">
              <div class="content-card_title">
                <span>集团资源</span>
                <p>（条）</p>
              </div>
              <img src="../../../assets/img/group7(8).png" alt="" class="content-card_ico">
              <div id='myVue' class="content-card_body">
                <span id="name1">今日：<p>{{todayDataAll === null ? 0 : todayDataAll.companyResourceDay}}</p></span>
                <span id="name2">本月：<p>{{todayDataAll === null ? 0 : todayDataAll.companyResourceMonth}}/ {{todayDataAll === null ? 0 : todayDataAll.companyResourceValidnum}}</p></span>
                <span id="name3">本月签单：<p>{{todayDataAll === null ? 0 : todayDataAll.companyResourceContract}}</p></span>
              </div>
            </div>
          </el-card>
          </li>
          <li>
            <el-card class="content-card">
            <div class="text item">
              <div class="content-card_title">
                <span>主管协单</span>
                <p>（次）</p>
              </div>
              <img src="../../../assets/img/group7(9).png" alt="" class="content-card_ico">
              <div id='myVue' class="content-card_body">
                <span id="name1">今日：<p>{{todayDataAll === null ? 0 : todayDataAll.competentAssist}}</p></span>
                <span id="name2">本月：<p>{{todayDataAll === null ? 0 : todayDataAll.competentAssistMonth}}</p></span>
                <span id="name3">分润业绩：<p>{{todayDataAll === null ? 0 : todayDataAll.competentAssistPerformance}}</p></span>
              </div>
            </div>
          </el-card>
          </li>
          <li>
            <el-card class="content-card">
            <div class="text item">
              <div class="content-card_title">
                <span>资源转化率</span>
                <p>（百分比）</p>
              </div>
              <img src="../../../assets/img/group7(10).png" alt="" class="content-card_ico">
              <div id='myVue' class="content-card_body">
                <span id="name1">本月：<p>{{todayDataAll === null ? 0 : todayDataAll.monthPercent}}%</p></span>
                <span id="name2">近三月：<p>{{todayDataAll === null ? 0 : todayDataAll.threeMonthPercent}}%</p></span>
              </div>
            </div>
          </el-card>
          </li>
          <li>
            <el-card class="content-card">
              <div class="text item">
                <div class="content-card_title">
                  <span>工时</span>
                  <p>（小时）</p>
                </div>
                <img src="../../../assets/img/group7(3).png" alt="" class="content-card_ico">
                <div id='myVue' class="content-card_body">
                  <span id="name1">昨日工时：<p>{{todayDataAll === null ? 0 : todayDataAll.manHourYesterday}}</p></span>
                  <span id="name2">日均工时：<p>{{todayDataAll === null ? 0 : todayDataAll.manHourAvg}}</p></span>
                  <span id="name3" style="float:left; padding-top: 6px;">昨日打卡：
                    </span>
                    <p style="display:block;"> {{todayDataAllClockIn ? todayDataAllClockIn : 0}}</p>
                    <p> {{todayDataAllClockOut ? todayDataAllClockOut : 0}}</p>
                </div>
              </div>
            </el-card>
          </li>
          <li>
            <el-card class="content-card">
            <div class="text item">
              <div class="content-card_title">
                <span>转介绍</span>
                <p>（月/单）</p>
              </div>
              <img src="../../../assets/img/group7(4).png" alt="" class="content-card_ico">
              <div id='myVue' class="content-card_body">
                <span id="name1">接收：<p>{{todayDataAll === null ? 0 : todayDataAll.acceptReferralNum}}</p></span>
                <span id="name2">转出：<p>{{todayDataAll === null ? 0 : todayDataAll.giveReferralNum}}</p></span>
                <span id="name3">业绩：<p>{{todayDataAll === null ? 0 : todayDataAll.giveReferralPerformance}}（转出）</p></span>
              </div>
            </div>
          </el-card>
          </li>
          <li>
            <el-card class="content-card">
            <div class="text item">
              <div class="content-card_title">
                <span>成本</span>
                <p>（月/元）</p>
              </div>
              <img src="../../../assets/img/group7(7).png" alt="" class="content-card_ico">
              <div id='myVue' class="content-card_body">
                <span id="name1">资源成本：<p>{{todayDataAll === null ? 0 : todayDataAll.resourceCosts}}</p></span>
                <span id="name2">渠道成本：<p>{{todayDataAll === null ? 0 : todayDataAll.channelCosts}}</p></span>
                <span id="name3">成本总计：<p>{{todayDataAll === null ? 0 : todayDataAll.totalCost}}</p></span>
              </div>
            </div>
          </el-card>
          </li>
          <li>
            <el-card class="content-card">
            <div class="text item">
              <div class="content-card_title">
                <span>外出见客</span>
                <p>（组）</p>
              </div>
              <img src="../../../assets/img/group7(6).png" alt="" class="content-card_ico">
              <div id='myVue' class="content-card_body" v-if='this.todayDataAll !== null | this.todayDataAll !== undefined'>
                <span id="name1">今日：<p>{{todayDataAll === null ? 0 : todayDataAll.outVisitorNum}}</p></span>
                <span id="name2">本月：<p>{{todayDataAll === null ? 0 : todayDataAll.outVisitorMonth}}</p></span>
                <span id="name3">本月签单：<p>{{todayDataAll === null ? 0 : todayDataAll.outVisitorContractnum}}</p></span>
              </div>
            </div>
          </el-card>
          </li>
          <li>
            <el-card class="content-card">
            <div class="text item">
              <div class="content-card_title">
                <span>客户到访</span>
                <p>（组）</p>
              </div>
              <img src="../../../assets/img/group7(2).png" alt="" class="content-card_ico">
              <div id='myVue' class="content-card_body">
                <span id="name1">今日：<p>{{todayDataAll === null ? 0 : todayDataAll.clientVisitNum}}</p></span>
                <span id="name2">本月：<p>{{todayDataAll === null ? 0 : todayDataAll.clientVisitMonth}}</p></span>
                <span id="name3">本月签单：<p>{{todayDataAll === null ? 0 : todayDataAll.clientVisitContractnum}}</p></span>
              </div>
            </div>
          </el-card>
          </li>
        </ul>
      </div>
    </el-card>
  </div>
</template>

<script>
import card3 from './card3'
import '../js/sockjs.min.js'
import '../js/stomp.min.js'
import '../js/jquery.min.js'
// import loginName from '../../../../static/config.js'
export default {
  components: {
    card3
  },
  data () {
    return {
      loginName: '',
      datessss: [],
      isHover: false, // 数据表在该区域
      websock: null,
      dataList: [],
      celldata: [],
      todayDataAll: [],
      // dialogVisible: false,
      userModulData: [],
      todayDataAllClockIn: '',
      todayDataAllClockOut: ''
    }
  },
  created () {

    // 自定义列表所有数据
    // this.$http.userModuleAll('job')
    //   .then(resp => {
    //     this.userModulData = resp.data.data
    //   })
  },
  mounted: function () {
    this.initWebSocket()
  },
  beforeDestroy: function () {
    // 页面离开时断开连接，清除定时器
    this.disconnect()
    clearInterval(this.timer)
  },
  methods: {
    requst () {
      this.loginName = sessionStorage.getItem('loginName')
      // 电话量
      this.$http.realTime(this.loginName)
        .then(resp => {
          this.celldata = resp.data.data
        }).catch(e => {
          this.celldata.callThirtyCounts = 0
          this.celldata.callSixtyCounts = 0
          this.celldata.callAllCounts = 0
        })
      // 页面的所有数据
      this.$http.getJo(this.loginName)
        .then(resp => {
          this.todayDataAll = resp.data.data
          if (this.todayDataAll === null) {
            this.todayDataAllClockIn = 0
            this.todayDataAllClockOut = 0
          } else {
            this.todayDataAllClockIn = resp.data.data.clockIn
            this.todayDataAllClockOut = resp.data.data.clockOut
          }
        }).catch(e => {
          this.todayDataAll.selfDevelopingLines = 0
          this.todayDataAll.selfDevelopingMonth = 0
          this.todayDataAll.selfDevelopingContract = 0
          this.todayDataAll.companyResourceDay = 0
          this.todayDataAll.companyResourceMonth = 0
          this.todayDataAll.companyResourceContract = 0
          this.todayDataAll.competentAssist = 0
          this.todayDataAll.competentAssistMonth = 0
          this.todayDataAll.competentAssistPerformance = 0
          this.todayDataAll.monthPercent = 0
          this.todayDataAll.threeMonthPercent = 0
          this.todayDataAll.manHourYesterday = 0
          this.todayDataAll.manHourAvg = 0
          this.todayDataAll.acceptReferralNum = 0
          this.todayDataAll.giveReferralNum = 0
          this.todayDataAll.giveReferralPerformance = 0
          this.todayDataAll.resourceCosts = 0
          this.todayDataAll.channelCosts = 0
          this.todayDataAll.totalCost = 0
          this.todayDataAll.outVisitorNum = 0
          this.todayDataAll.outVisitorMonth = 0
          this.todayDataAll.outVisitorContractnum = 0
          this.todayDataAll.clientVisitNum = 0
          this.todayDataAll.clientVisitMonth = 0
          this.todayDataAll.clientVisitContractnum = 0
        })
    },
    // 拖拽排序
    // dragstartEvent (ev) {
    //   const self = this
    //   self.dragElement = ev.target
    //   ev.target.style.backgroundColor = '#f8f8f8'
    // },
    // dragendEvent (ev) {
    //   console.log('拖动前的索引 :' + ev.oldIndex)
    //   console.log('拖动后的索引 :' + ev.newIndex)
    //   ev.target.style.backgroundColor = '#fff'
    //   ev.preventDefault()
    // },
    // dragenterEvent (ev) {
    //   const self = this
    //   if (self.dragElement !== ev.target) {
    //     ev.target.parentNode.insertBefore(self.dragElement, ev.target)
    //   }
    // },
    // dragleaveEvent (ev) {
    //   console.log('拖动前的索引 :' + ev.oldIndex)
    //   console.log('拖动后的索引 :' + ev.newIndex)
    //   const self = this
    //   if (self.dragElement !== ev.target) {
    //     if (self.lock && (ev.target === ev.target.parentNode.lastElementChild || ev.target === ev.target.parentNode.lastChild)) {
    //       ev.target.parentNode.appendChild(self.dragElement)
    //       self.lock = false
    //     } else {
    //       self.lock = true
    //     }
    //   }
    // },
    // dragoverEvent (ev) {
    //   ev.preventDefault()
    // },
    // 电话量实时通讯
    initWebSocket () {
      this.connection()
    },
    removeTab (targetName) {
    },
    connection () {
      let socket = new SockJS('https://tibossworkstationweb.dgg.net/api/gs-guide-websocket')
      let stompClient = Stomp.over(socket)
      stompClient.connect({login: this.loginName}, function (frame) {
        // stompClient.subscribe('/user/${user_id}/topic/greetings', function (greeting) {
        stompClient.subscribe('/user/topic/pushResultMessage', function (greeting) {
          // console.log(JSON.parse(greeting.body).outContent)
          var dataScoket = JSON.parse(greeting.body).outContent
          var data = JSON.parse(JSON.parse(greeting.body).message)
          if (dataScoket === 'emp') {
            this.datessss = dataScoket.data
          }
          if (dataScoket === 'normal') {
            $('#thirtyCall').text(data.callThirtyCounts)
            $('#sixtyCall').text(data.callSixtyCounts)
            $('#countCall').text(data.callAllCounts)
            $('#firstPhone').text(data.firstPhone)
            $('#waitGrabOrder').text(data.waitGrabOrder)
            $('#waitProcessOrderss').text(data.waitProcessOrder)
            $('#invitationVisit').text(data.invitationVisit)
            $('#todWaitFollowContinue').text(data.todWaitFollowContinue)
            $('#todWaitFollowSigned').text(data.todWaitFollowSigned)
            $('#tomMoveContinue').text(data.tomMoveContinue)
            $('#tomMoveSigned').text(data.tomMoveSigned)
            $('#twoMoveContinue').text(data.twoMoveContinue)
            $('#twoMoveSigned').text(data.twoMoveSigned)
          }
        })
      }, function (error) {
        console.log(error)
        // alert('请重新加载')
      })
    },
    // 滑动
    mouse_wheel () {
      let wheelElement = document.getElementById('wheel-container')
      wheelElement.addEventListener('mousewheel', function (event, data) {
        this.parentElement.setAttribute('style', 'overflow:"hidden"')
        let detail = event.wheelDelta || event.detail
        let moveForwardStep = 1
        let moveBackStep = -1
        let step = 0
        if (detail > 0) {
          step = moveForwardStep * 10
        } else {
          step = moveBackStep * 10
        }
        this.scrollLeft += step
      })
    }
  }
}
</script>

<style lang='scss'>
  .box-card5 {
    overflow: hidden;
    width: 100%;
    height: 228px;
    margin-top: 10px;
    background:rgba(255,255,255,1);
    .box_top {
      height: 14px;
      width: 100%;
      border-left: 4px solid rgba(204,204,204,1);
      .box_top_set {
        font-size: 14px;
        height: 14px;
        line-height: 14px;
        font-weight: 600;
        padding-left: 6px;
        float: left;
      }
      span {
        float: right;
        height: 12px;
        line-height: 12px;
        cursor: pointer;
        p {
          font-size: 11px;
          height: 12px;
          width: 90px;
          line-height: 12px;
          float: left;
          color:rgba(153,153,153,1);
          background: url('../../../assets/img/set.png') no-repeat right;
        }
        p:hover {
          color: #FF8B4C;
          background: url('../../../assets/img/set@1x.png') no-repeat right;
        }
      }
      .el-dialog {
        height: 474px;
        .el-dialog__header {
          height: 42px;
          background: rgba(245,245,245,1);
          padding: 0 20px;
          .el-dialog__title {
            float: left;
            line-height: 42px;
            font-size: 14px;
            color:rgba(77,77,77,1)
          }
          .el-dialog__headerbtn {
            top: 13px;
          }
        }
        .el-dialog__body {
          height: 340px;
          margin: 0px 20px;
          padding: 20px 0;
          border-bottom: 1px solid #eee;
          .drag-list {
            height: 30px;
            line-height: 30px;
            width: 100%;
            padding: 2px 10px;
          }
          .drag-list:hover {
            background: #FAF5F2;
          }
        }
        .el-button:active {
          border-color: #FF8B4C;
          color: #FF8B4C;
        }
        .el-button:focus, .el-button:hover {
          border-color: #FF8B4C;
          color: #FF8B4C;
          background: rgba(243, 214, 199, 0.548);
        }
        .el-button--primary:active {
          background: #FF8B4C;
          border-color: #FF8B4C;
        }
        .el-button--primary {
          background: #FF8B4C;
          border-color: #FF8B4C;
        }
      }
    }
    .box_content {
      overflow-y:hidden;
      overflow-x:scroll;
      display: flex;
      white-space: nowrap;
      width: 100%;
      height: 100%;
      padding: 17px 0px;
      .content-card {
        position: relative;
        width: 100%;
        padding: 0 10px;
        height: 150px;
        .content-card_title {
          width: 100%;
          height: 40px;
          span {
            font-size: 12px;
            font-weight: 800;
            float: left;
          }
          p {
            font-size: 12px;
          }
        }
        .content-card_body {
          span {
            font-size: 12px;
            height: 24px;
            line-height: 24px;
            display: block;
          }
          p {
            display: inline-block;
            font-size: 12px;
            font-weight: 800
          }
        }
        .content-card_ico {
          position: absolute;
          top: 18px;
          right: 20px;
        }
      }
      li {
        display: inline-block;
        width: 270px;
        flex-shrink: 0;
        margin-right: 40px;
      }
    }
    .box {
      height: 162px;
    }
  }
</style>
