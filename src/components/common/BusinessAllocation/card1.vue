<template>
  <div>
    <el-card class="box-card1">
      <div class="box">
        <div class="box_top">
          <p class="box_top_set">今日待办</p>
          <span>
            <el-button type="text" @click="dialogVisible">
              <p>自定义设置</p>
            </el-button>
            <el-dialog
              title="选择要显示的内容"
              :visible.sync="dialogContent"
              width="15%">
              <el-checkbox-group v-model="checkList">
                <el-checkbox
                  :label="item.moduleName"
                  :value='item.moduleId'
                  v-for="item in listAll"
                  v-dragging="{ item: item, list: listAll, group: 'item' }"
                  :key="item.moduleId"
                  @change="checkItem(item)"
                ></el-checkbox>
              </el-checkbox-group>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogContent = false">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
              </span>
            </el-dialog>
          </span>
        </div>

        <div class="box_content" :data='checkListBox' >
          <div v-html="dongtaijiazai">{{dongtaijiazai}}</div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogContent: false,
      checkList: [], // 自定义里根据工号查找的
      checkLists: [], // 自定义里所有的列表数据
      userModules: [],
      toDoToday: [],
      checkListBox: [],
      listAll: [], // CheckBox选中和未选中的合集
      celldata: [], // 页面的数据
      listId: [], // 选中的id
      listOrder: [], // 排序后的顺序
      objarr: [],
      rankList: [], // 自定义排序后的Array
      datelist: [
        {
          str1: '',
          str2: ''
        },
        {
          str1: '',
          str2: ''
        },
        {
          str1: '',
          str2: ''
        }, {
          str1: '',
          str2: ''
        }, {
          str1: '',
          str2: ''
        }, {
          str1: '',
          str2: ''
        }],
      loginName: '',
      dongtaijiazai: ''

    }
  },
  created () {
  },
  // 拖拽排序
  mounted () {
    this.$dragging.$on('dragged', ({ value }) => {
      this.rankList = value.list
    })
    this.$dragging.$on('dragend', () => {
    })
    // this.showThis()
  },
  methods: {
    requst () {
      this.loginName = sessionStorage.getItem('loginName')
      // 所有的数据
      if (sessionStorage.getItem('loginName') !== null) {
        this.$http.toDoTodayAll('day', 'job')
          .then(resp => {
            this.checkLists = resp.data.data
            // 第二步
            this.$http.realTime(this.loginName)
              .then(resp => { // scoket回调结果
                this.celldata = resp.data.data
                this.showThis()
                // 第三步：排序
                this.$http.toDoTodayLoginName('day', this.loginName)
                  .then(resp => {
                    this.checkListBox = resp.data.data
                    var arr = Array.prototype.slice.call(resp.data.data)
                    var nameArr = [arr.length]
                    for (var i = 0; i < arr.length; i++) {
                      nameArr[i] = arr[i].moduleName
                    }
                    this.checkList = nameArr

                    this.paixu()
                  })
              })
          })
      } else {
        this.celldata = null
        this.showThis()
        for (var m = 0; m < this.datelist.length; m++) {
          this.dongtaijiazai += this.datelist[m].str1
        }
      }
    },
    paixu () {
      this.checkListBox.forEach(elemt => {
        this.datelist.forEach(elemt2 => {
          if (elemt.moduleCode === elemt2.str2) {
            this.dongtaijiazai += elemt2.str1
          }
        })
      })

      if (this.celldata === null && this.checkListBox === null) {
        for (var m = 0; m < this.datelist.length; m++) {
          this.dongtaijiazai += this.datelist[m].str1
        }
      }
    },

    showThis () {
      this.datelist[0].str1 = `<el-card class="content-card">
            <p class="content_title">待处理商机</p>
            <span id="firstPhone" style="cursor: pointer;" onClick="window.parent.updateTab('待首电' ,  'https://tibossbus.dgg.net/bus/sell/wait_follow.html?tabPage=sd')">` + (this.celldata === null | this.celldata === undefined ? 0 : this.celldata.firstPhone) + `</span>
            <p class="following">待首电</p>
            <span class="content_wire"></span>
            <span id="waitGrabOrder" style="cursor: pointer;" onClick="window.parent.updateTab('待抢单' ,  'https://tibossbus.dgg.net/bus/sell/wait_grab.html')">` + (this.celldata === null ? 0 : this.celldata.waitGrabOrder) + `</span>
            <p class="sign">待抢单</p>
            </el-card>`
      this.datelist[0].str2 = 'firstCall'
      this.datelist[1].str1 = `<el-card class="content-card" onClick="window.parent.updateTab('待处理订单' ,  'https://tibossorf.dgg.net/orf/order/initPendOrder.html')">
            <p class="content_title">订单处理</p>
            <span id="waitProcessOrderss" style="width: 100%; padding-left: 0; cursor: pointer;">` + (this.celldata === null ? 0 : this.celldata.waitProcessOrder) + ` </span>
            <p style="padding-left:30%; padding-top:56px;">待处理订单</p>
          </el-card>`
      this.datelist[1].str2 = 'waitProcessOrder'
      this.datelist[2].str1 = ` <el-card class="content-card" onClick="window.parent.updateTab('访客预约-个人' ,  'https://tibossbus.dgg.net/bus/visitor/visitorManage.html?type=2')">
            <p class="content_title">订单处理</p>
            <span id="invitationVisit" style="width: 100%; padding-left: 0; cursor: pointer;">` + (this.celldata === null ? 0 : this.celldata.invitationVisit) + ` </span>
            <p style="padding-left:33%; padding-top:56px;">邀约到访</p>
          </el-card>`
      this.datelist[2].str2 = 'waitInviteOrder'
      this.datelist[3].str1 = `
          <el-card class="content-card">
            <p class="content_title">今日待跟进</p>
            <span id="todWaitFollowContinue" style="cursor: pointer;" onClick="window.parent.updateTab('跟进中' ,  'https://tibossbus.dgg.net/bus/sell/following.html?tabPage=today')">` + (this.celldata === null ? 0 : this.celldata.todWaitFollowContinue) + ` </span>
            <p class="following">跟进中</p>
            <span class="content_wire"></span>
            <span id="todWaitFollowSigned" style="cursor: pointer;" onClick="window.parent.updateTab('已签单' ,  'https://tibossbus.dgg.net/bus/sell/signed.html?tabPage=dgj')">` + (this.celldata === null ? 0 : this.celldata.todWaitFollowSigned) + ` </span>
            <p class="sign">已签单</p>
          </el-card>`
      this.datelist[3].str2 = 'followUp'
      this.datelist[4].str1 = `<el-card class="content-card" :id="checkListBox.dropTomorrow">
            <p class="content_title">即将掉库</p>
            <span id="tomMoveContinue" style="cursor: pointer;" onClick="window.parent.updateTab('跟进中' ,  'https://tibossbus.dgg.net/bus/sell/following.html?tabPage=today_drop')">` + (this.celldata === null ? 0 : this.celldata.tomMoveContinue) + ` </span>
            <p class="following">跟进中</p>
            <span class="content_wire"></span>
            <span id="tomMoveSigned" style="cursor: pointer;" onClick="window.parent.updateTab('已签单' ,  'https://tibossbus.dgg.net/bus/sell/team/team_will_drop_today_business.html')">` + (this.celldata === null ? 0 : this.celldata.tomMoveSigned) + ` </span>
            <p class="sign">已签单</p>
          </el-card>`
      this.datelist[4].str2 = 'dropTomorrow'
      this.datelist[5].str1 = `<el-card class="content-card" :id="checkListBox.dropTwoDays">
            <p class="content_title">明日掉库</p>
            <span id="twoMoveContinue" style="cursor: pointer;" onClick="window.parent.updateTab('跟进中' ,  'https://tibossbus.dgg.net/bus/sell/following.html?tabPage=tomorrow_drop')">` + (this.celldata === null ? 0 : this.celldata.twoMoveContinue) + ` </span>
            <p class="following">跟进中</p>
            <span class="content_wire"></span>
            <span id="twoMoveSigned" style="cursor: pointer;" onClick="window.parent.updateTab('已签单' ,  'https://tibossbus.dgg.net/bus/sell/signed.html?tabPage=s_tomorrow_drop')">` + (this.celldata === null ? 0 : this.celldata.twoMoveSigned) + ` </span>
            <p class="sign">已签单</p>
          </el-card> `
      this.datelist[5].str2 = 'dropTwoDays'
    },
    // 自定义设置的点击
    dialogVisible () {
      this.$http.toDoTodayLoginName('day', this.loginName)
        .then(resp => {
          this.checkListBox = resp.data.data
          var arr = Array.prototype.slice.call(resp.data.data)
          var nameArr = [arr.length]
          for (var i = 0; i < arr.length; i++) {
            nameArr[i] = arr[i].moduleName
          }
          this.checkList = nameArr
        })
      this.$http.toDoTodayAll('day')
        .then(resp => {
          if (resp.data.code === 0) {
            this.dialogContent = true
            this.checkLists = resp.data.data
          }
        })
      var checkListBox = this.checkListBox
      var listAll = checkListBox
      var checkLists = this.checkLists
      for (var i = 0; i < checkListBox.length; i++) {
        this.listAll[i] = checkListBox[i]
        for (var j = 0; j < checkLists.length; j++) {
          if (checkLists[j].moduleId === checkListBox[i].moduleId) {
            checkLists.splice(j, 1)
          }
        }
      }
      for (var m = 0; m < checkLists.length; m++) {
        listAll.push(checkLists[m])
      }
      this.listAll = listAll
    },
    checkItem (item) {
    },
    // 确定按钮
    confirm () {
      this.listId = []
      for (let val of this.listAll) {
        for (let item of this.checkList) {
          if (val.moduleName === item) {
            this.listId.push(val.moduleId)
          }
        }
      }
      this.listOrder = []
      for (let n = 0; n < this.listId.length; n++) {
        this.listOrder.push(n + 1)
      }
      this.dongtaijiazai = ''
      this.checkListBox = []
      this.checkLists = []
      this.$http.modifyCustomization('day', this.listId, this.listOrder, this.loginName)
        .then(resp => {
          if (resp.data.code === 0) {
            this.dialogContent = false
            // 所有的数据
            this.dongtaijiazai = ''
            this.$http.toDoTodayAll('day', 'job')
              .then(resp => {
                this.checkLists = resp.data.data
                // 第二步
                this.$http.realTime(this.loginName)
                  .then(resp => { // scoket回调结果
                    this.celldata = resp.data.data
                    this.showThis()
                    // 第三步：排序
                    this.$http.toDoTodayLoginName('day', this.loginName)
                      .then(resp => {
                        this.checkListBox = resp.data.data
                        var arr = Array.prototype.slice.call(resp.data.data)
                        var nameArr = [arr.length]
                        for (var i = 0; i < arr.length; i++) {
                          nameArr[i] = arr[i].moduleName
                        }
                        this.checkList = nameArr
                        this.paixu()
                      })
                  })
              })
          } else {
            this.$message.error('操作失败')
          }
        })
    }
  }
}
</script>

<style lang='scss'>
  .box-card1 {
    width:100%;
    height:320px;
    background:rgba(255,255,255,1);
    float: left;
    margin-right: 0.6%;
    .box_top {
      height: 14px;
      width: 100%;
      border-left: 4px solid rgba(204,204,204,1);
      .box_top_set {
        font-size: 14px;
        height: 12px;
        line-height: 12px;
        font-weight: 600;
        padding-left: 0.6%;
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
        height: 373px;
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
          height: 238px;
          margin: 0px 20px;
          padding: 20px 0;
          border-bottom: 1px solid #eee;
          .el-checkbox-group {
            width: 100%;
            height: 100%;
            .el-checkbox {
              height: 30px;
              width: 100%;
              .el-checkbox__input {
                float: left;
                top: 10px;
              }
              .el-checkbox__label {
                line-height: 30px;
                float: left;
              }
            }
            .el-checkbox:hover {
              background:rgba(250,245,242,1);
            }
            .is-checked+.el-checkbox__label {
              color: #FF8B4C;
            }
            .is-checked .el-checkbox__inner {
              background-color: #FF8B4C;
              border-color: #FF8B4C;
            }
            .el-checkbox__inner:hover {
              border-color: #FF8B4C;
            }
            .el-checkbox__input.is-focus .el-checkbox__inner {
              border-color: #FF8B4C;
            }
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
      width: 100%;
      height: 100%;
      margin-top: 5px;
      .content-card {
        position: relative;
        width: 20%;
        height: 90px;
        padding: 15px 21px;
        margin-right: 0.8%;
        border-radius: 4px;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        float: left;
        margin-top: 1%;
        border: 1px solid rgba(220,223,230,1);
        .content_title {
          font-size: 12px;
          color: rgba(153,153,153,1);
        }
        span {
          width: 17%;
          text-align: center;
          font-size: 20px;
          font-weight: 600;
          float: left;
          padding: 14% 10%;
        }
        p {
          font-size: 11px;
          position: absolute;
          font-weight: 400;
          color: rgba(102,102,102,1);
        }
        .content_wire {
          width: 1px;
          border-right: 1px solid rgba(228,231,237,1);
          height: 0px;
          margin-top: 12%;
          margin-right: 10%;
          padding-right: 4%;
          padding-top: 2%;
        }
        .following {
          position: absolute;
          margin-top: 22%;
          width: 48px;
          text-align: center;
          height: 16px;
          background: #578FFF;
          color: #fff;
          margin-left: 6%;
          border-radius: 8px;
        }
        .sign {
          position: absolute;
          margin-left: 59%;
          margin-top: 22%;
          width: 48px;
          text-align: center;
          height: 16px;
          background: #2CD696;
          color: #fff;
          border-radius: 8px;
        }
      }
    }
  }
</style>
