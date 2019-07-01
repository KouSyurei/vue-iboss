<template>
  <div>
    <el-card class="box-card2">
      <div class="box">
        <div class="box_content"  v-if = 'visibility' style="height:320px;">
          <div class="box_top">
            <p class="box_top_set">业绩目标</p>
          </div>
              <p class="box-time">本月目标设置倒计时</p>
          <div class="time">
            <span>{{hr}}<p>时</p></span>
            <span>{{min}}<p>分</p></span>
            <span>{{sec}}<p>秒</p></span>
          </div>
          <el-button type="warning" @click="dialogVisible = true">立即设置</el-button>
          <el-dialog
            title="设置本月业绩目标"
            :visible.sync="dialogVisible"
            width="20%"
          >
            <el-form :model="form" label-width="92px" ref="form" :rules="rules" label-position="left">
              <el-row>
              <el-col :span="22">
                  <el-form-item label="到访目标：" prop="pkspace_num">
                  <el-input v-model="form.pkspace_num" auto-complete="off" clearable></el-input>
                  </el-form-item>
              </el-col>
                  <span class="units">人</span>
              </el-row>
              <el-row>
                <el-col :span="22">
                  <el-form-item label="签单目标："  prop="price">
                  <el-input v-model="form.price" auto-complete="off" clearable ></el-input>
                  </el-form-item>
                </el-col>
                  <span class="units">单</span>
              </el-row>
              <el-row>
              <el-col :span="22">
                  <el-form-item label="业绩目标："  prop="c_disrate">
                  <el-input v-model="form.c_disrate" auto-complete="off" clearable></el-input>
                  </el-form-item>
              </el-col>
                  <span class="units">元</span>
              </el-row>
              <el-button type="primary" @click="comiteFn('form')" style="margin-top: 10px; float: right; margin-left: 15px">确 定</el-button>
          </el-form>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                  </span>
          </el-dialog>
        </div>
        <!-- 跳转后的页面 -->
        <div class="echartsAll" v-if = 'display'>
          <div class="box_top">
            <p class="box_top_set">业绩目标</p>
            <el-tooltip class="item" effect="dark" content="在前三个工作日内可修改" placement="left">
              <p class="top_amend">修改<span><img src="../../../assets/img/list_bianji.png" alt=""></span></p>
            </el-tooltip>
          </div>
          <div class="echartsAlls">
            <div class="visit" >
              <div id="myChartVisit" :style="{width: '120px', height: '120px'}"></div>
              <div class="visitText">
                <span>本月见客目标<p>{{(targetAll === null ? 0 :  targetAll.estimatedVisitNum)}}</p></span>
                <span>本月已完成<p>{{(targetAll === null ? 0 :  targetAll.pisitMonth)}}</p></span>
                <span>今日见客<p>{{(targetAll === null ? 0 :  targetAll.pisit)}}</p></span>
              </div>
            </div>
            <div class="sign">
              <div id="myChartSign" :style="{width: '120px', height: '120px'}"></div>
              <div class="signText">
                <span>本月签单目标<p>{{(targetAll === null ? 0 :  targetAll.estimatedOrderNum)}}</p></span>
                <span>本月已完成<p>{{(targetAll === null ? 0 :  targetAll.contractMonth)}}</p></span>
                <span>今日签单<p>{{(targetAll === null ? 0 :  targetAll.contract)}}</p></span>
              </div>
            </div>
            <div class="performance">
              <div id="myChartPerformance" :style="{width: '120px', height: '120px'}"></div>
              <div class="performanceText">
                <span>本月业绩目标<p>{{(targetAll === null ? 0 :  targetAll.estimatedPerformance)}}</p></span>
                <span>本月已完成<p>{{(targetAll === null ? 0 :  targetAll.performanceMonth)}}</p></span>
                <span>今日业绩<p>{{(targetAll === null ? 0 :  targetAll.performance)}}</p></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
// import echarts from './performanceEacharts.vue'
// import countDown from './countDown.vue'
// import loginName from '../../../../static/config.js'
export default {
  name: 'card2',
  data () {
    let patter = /^(0|\+?[1-9][0-9]*)$/
    let isNumber = (rule, value, callback) => {
      if (!patter.test(value)) {
        return callback(new Error('请输入非负整数'))
      } else {
        callback()
      }
    }
    let percent = /^(0|\+?[1-9][0-9]*)$/
    let isPercent = (rule, value, callback) => {
      if (!percent.test(value)) {
        return callback(new Error('请输入非负整数'))
      } else {
        callback()
      }
    }
    let num = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/
    let isNum = (rule, value, callback) => {
      if (!num.test(value)) {
        return callback(new Error('必须非负整数或至多保留两位小数'))
      } else {
        callback()
      }
    }
    return {
      loginName: '',
      estimatedVisitNum: 0,
      pisitMonth: 0,
      baifenbi: 0,
      baifenbi1: 0,
      baifenbi2: 0,
      // targetAll: null,
      targetAll: [],
      estimatedOrderNum: 0,
      estimatedPerformance: 0,
      performanceMonth: 0,
      dialogVisible: false,
      hr: 0,
      min: 0,
      sec: 0,
      thirdWordDate: null,
      visibility: true,
      display: true,
      flag: false,
      form: {
        pkspace_num: '',
        price: '',
        c_disrate: ''
      },
      rules: {
        pkspace_num: [
          { required: true, message: '到访目标不能为空', trigger: 'blur' },
          { min: 1, max: 8, message: '长度在 1 到 8 个数字', trigger: 'blur' },
          {
            validator: isNum
          }
        ],
        price: [
          { required: true, message: '签单目标不能为空', trigger: 'blur' },
          { min: 1, max: 8, message: '长度在 1 到 8 个数字', trigger: 'blur' },
          {
            validator: isNumber
          }
        ],
        c_disrate: [
          { required: true, message: '业绩目标不能为空', trigger: 'blur' },
          { min: 1, max: 8, message: '长度在 1 到 8 个数字', trigger: 'blur' },
          {
            validator: isPercent
          }
        ]
      }
    }
  },
  // components: {
  //   echarts,
  //   countDown
  // },
  created () {

  },
  methods: {
    requst () {
      this.loginName = sessionStorage.getItem('loginName')
      this.$http.targetAll(this.loginName, this.myformatter(new Date()))
        .then(resp => {
          this.targetAll = resp.data.data
          // if (this.targetAll !== null) {
          //   this.visibility = false
          //   this.display = true
          //   this.flag = true
          // }
          // 到访完成率

          this.estimatedVisitNum = (resp.data.data ? resp.data.data.estimatedVisitNum ? resp.data.data.estimatedVisitNum : 0 : 0)

          this.pisitMonth = resp.data.data ? resp.data.data.pisitMonth ? resp.data.data.pisitMonth : 0 : 0

          if (this.estimatedVisitNum === null) {
            this.targetAll.estimatedVisitNum = 0
            this.estimatedVisitNum = 0
          }

          if (this.estimatedVisitNum === 0) {
            this.baifenbi = '100%'
          } else {
            this.estimatedVisitNums = this.estimatedVisitNum - this.pisitMonth
            this.baifenbi = (this.pisitMonth / this.estimatedVisitNum) * 100 + '%'
          }

          // 签单完成率
          this.estimatedOrderNum = resp.data.data ? resp.data.data.estimatedOrderNum ? resp.data.data.estimatedOrderNum : 0 : 0
          this.contractMonth = resp.data.data ? resp.data.data.contractMonth ? resp.data.data.contractMonth : 0 : 0
          if (this.estimatedOrderNum === null) {
            this.estimatedOrderNum = 0
            this.targetAll.estimatedOrderNum = 0
          }
          if (this.estimatedOrderNum === 0) {
            this.baifenbi1 = '100%'
            if (this.contractMonth < 0) {
              this.baifenbi1 = '-100%'
            }
          } else {
            this.estimatedOrderNums = this.estimatedOrderNum - this.contractMonth
            this.baifenbi1 = (this.contractMonth / this.estimatedOrderNum) * 100 + '%'
          }
          // 业绩完成率
          this.estimatedPerformance = resp.data.data ? resp.data.data.estimatedPerformance ? resp.data.data.estimatedPerformance : 0 : 0
          this.performanceMonth = resp.data.data ? resp.data.data.performanceMonth ? resp.data.data.performanceMonth : 0 : 0
          if (this.estimatedPerformance === null) {
            this.estimatedPerformance = 0
            this.targetAll.estimatedPerformance = 0
          }
          if (this.estimatedPerformance === 0) {
            this.baifenbi2 = '100%'
            if (this.performanceMonth < 0) {
              this.baifenbi2 = '-100%'
            }
          } else {
            this.estimatedPerformances = this.estimatedPerformance - this.performanceMonth
            this.baifenbi2 = (this.performanceMonth / this.estimatedPerformance) * 100 + '%'
          }

          this.drawLine()
        }).catch(e => {
          this.targetAll.estimatedVisitNum = 0
          this.targetAll.pisitMonth = 0
          this.targetAll.pisit = 0
          this.targetAll.estimatedOrderNum = 0
          this.targetAll.contractMonth = 0
          this.targetAll.contract = 0
          this.targetAll.estimatedPerformance = 0
          this.targetAll.performanceMonth = 0
          this.targetAll.performance = 0
          this.pisitMonth = 0
          this.baifenbi = 0
          this.estimatedVisitNums = 0
          this.contractMonth = 0
          this.baifenbi1 = 0
          this.estimatedOrderNums = 0
          this.performanceMonth = 0
          this.baifenbi2 = 0
          this.estimatedPerformances = 0

          this.drawLine()
        })

      this.countdown()
    },
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChartVisit'))
      let myChartSign = this.$echarts.init(document.getElementById('myChartSign'))
      let myChartPerformance = this.$echarts.init(document.getElementById('myChartPerformance'))

      // 绘制图表
      // 到访完成率
      myChart.setOption({

        legend: {
          data: []
        },
        color: ['#29C78B', '#EBEDF0'],
        graphic: [
          {
            type: 'text',
            left: 'center',
            top: '60%',
            style: {
              text: '到访完成率',
              textAlign: 'center',
              fontSize: '12',
              fill: '#999'
            }
          }
        ],
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['90%', '100%'],
            avoidLabelOverlap: false,
            selectedOffset: 0,
            hoverOffset: 0,
            label: {
              normal: {
                show: true,
                position: 'center',
                textStyle: {
                  fontSize: '20',
                  fontWeight: '400'
                }
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            data: [
              {value: this.pisitMonth, name: this.baifenbi},
              {value: this.estimatedVisitNums, name: ''}

            ]
          }
        ]
      })
      // 签单完成率
      myChartSign.setOption({
        legend: {
          data: []
        },
        color: ['#578FFF', '#EBEDF0'],
        graphic: [
          {
            type: 'text',
            left: 'center',
            top: '60%',
            style: {
              text: '签单完成率',
              textAlign: 'center',
              fontSize: '12',
              fill: '#999'
            }
          }
        ],
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['90%', '100%'],
            avoidLabelOverlap: false,
            selectedOffset: 0,
            hoverOffset: 0,
            label: {
              normal: {
                show: true,
                position: 'center',
                textStyle: {
                  fontSize: '20',
                  fontWeight: '400'
                }
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            data: [
              {value: this.contractMonth, name: this.baifenbi1},
              {value: this.estimatedOrderNums, name: ''}
            ]
          }
        ]
      })
      // 业绩完成率
      myChartPerformance.setOption({
        tooltip: {
          trigger: '',
          formatter: ''
        },
        legend: {
          selectedMode: false,
          orient: 'horizontal',
          x: 'left',
          itemWidth: 18,
          itemHeight: 18,
          data: [],
          textStyle: {
            color: ['red', '#fff']
          }
        },
        color: ['#FF9A57', '#EBEDF0'],
        graphic: [
          {
            type: 'text',
            left: 'center',
            top: '60%',
            style: {
              text: '业绩完成率',
              textAlign: 'center',
              fontSize: '12',
              fill: '#999'
            }
          }
        ],
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['90%', '100%'],
            avoidLabelOverlap: false,
            selectedOffset: 0,
            hoverOffset: 0,
            label: {
              normal: {
                show: true,
                position: 'center',
                textStyle: {
                  fontSize: '20',
                  fontWeight: '400'
                }
              }
            },
            labelLine: {
              normal: {
                show: true
              }
            },
            data: [
              {value: this.performanceMonth, name: this.baifenbi2},
              {value: this.estimatedPerformances, name: ''}
            ]
          }
        ]
      })
    },
    countdown () {
      const now = new Date()
      let currenMouth = now.getMonth() + 1

      let firstDate = new Date(now.getFullYear() + '-' + currenMouth + '-01')
      let firstDay = firstDate.getDay()
      if (firstDay === 4) {
        firstDate.setDate(firstDate.getDate() + 4)
      } else if (firstDay === 5) {
        firstDate.setDate(firstDate.getDate() + 4)
      } else if (firstDay === 6) {
        firstDate.setDate(firstDate.getDate() + 4)
      } else if (firstDay === 0) {
        firstDate.setDate(firstDate.getDate() + 3)
      } else {
        firstDate.setDate(firstDate.getDate() + 2)
      }
      // if (this.estimatedOrderNum) {
      //   this.flag = true
      // }
      const visibleDate = now.getDate() - firstDate.getDate()

      if (visibleDate > 0 | this.flag) {
        this.visibility = false
        this.display = true
      } else {
        this.visibility = true
        const end = new Date(firstDate.getFullYear() + '-' + currenMouth + '-' + firstDate.getDate() + ' 23:59:59').getTime()

        // alert(firstDate + '------' + firstDate.getFullYear() + '---' + firstDate.getMonth() + '-----' + firstDate.getDate() + '===' + currenMouth)
        // const end = new Date('2019-05-25 23:59:59').getTime()
        const msec = end - now.getTime()
        let hr = parseInt(msec / 1000 / 60 / 60 % 24)
        let min = parseInt(msec / 1000 / 60 % 60)
        let sec = parseInt(msec / 1000 % 60)
        this.hr = hr > 9 ? hr : '0' + hr

        this.min = min > 9 ? min : '0' + min
        this.sec = sec > 9 ? sec : '0' + sec
        const that = this
        setTimeout(function () {
          that.countdown()
        }, 1000)
      }
    },
    // 确定按钮
    comiteFn (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$http.target(this.loginName, this.form.pkspace_num, this.form.price, this.form.c_disrate, 'performanceTarget')
            .then(resp => {
              if (resp.data.code === 0) {
                this.dialogVisible = false
                this.visibility = false
                this.display = true
                this.flag = true
                this.$http.targetAll(this.loginName, this.myformatter(new Date()))
                  .then(resp => {
                    this.targetAll = resp.data.data
                  })
              } else {
                this.$message.error('设置失败')
              }
            })
        } else {
        }
      })
    },
    myformatter (date) {
      var strDate = date.getFullYear() + '-'

      if (date.getMonth() < 10) {
        var s = date.getMonth() + 1 + '-'

        strDate += '0' + s
      } else {
        strDate += date.getMonth() + 1 + '-'
      }

      if (date.getDate() < 10) {
        strDate += '0' + date.getDate()
      } else {
        strDate += date.getDate()
      }

      return strDate
    }
  }
}
</script>

<style lang='scss'>
  .box-card2 {
    width:100%;
    height:320px;
    background:rgba(255,255,255,1);
    .box_top {
      height: 14px;
      width: 100%;
      border-left: 4px solid rgba(204,204,204,1);
      .box_top_set {
        font-size: 14px;
        height: 12px;
        line-height: 12px;
        font-weight: 600;
        padding-left: 0.8%;
        float: left;
      }
      .top_amend {
        float: right;
        font-size: 12px;
        font-weight:400;
        cursor: pointer;
        color:rgba(255,133,47,1);
        height: 12px;
        img {
          display: inline-block;
          width: 12px;
          height: 12px;
          padding-left: 4px;
        }
      }
    }
    .box_content {
      text-align: center;
      .box-time {
        padding-top: 12%;
        font-size: 12px;
      }
      .time {
        padding-left: 32%;
        padding-top: 1%;
        padding-bottom: 8%;
        span {
          float: left;
          font-size: 24px;
          font-weight: 800;
          padding: 0 2%;
          p {
            float: right;
            font-size: 12px;
            font-weight: 400;
            padding-top: 24%;
            padding-left: 6%;
          }
        }
      }
      .el-dialog {
        height: 267px;
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
          height: 112px;
          margin: 0px 20px;
          padding-top: 20px;
          padding-bottom: 40px;
          border-bottom: 1px solid #eee;
          // .dialog_set {
          //   font-size: 12px;
          //   font-weight:600;
          //   color:#333333;
          //   height: 30px;
          //   padding-bottom: 14px;
          //   line-height: 30px;
          //   span {
          //     color: #FE322C;
          //     font-size: 12px;
          //     padding: 4px;
          //   }
          //   input {
          //     height: 28px;
          //     margin: 0px 8px;
          //   }
          // }
          .el-form-item--small .el-form-item__label {
            width: 92px;
          }
          .units {
            float: right;
            line-height: 36px;
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
    .echartsAlls {
      justify-content: space-between;
      display: flex;
      flex-direction: row;
    }
    .visit {
      // float: left;
      margin-top: 32px;
      .visitText {
        padding-top: 24px;
        height: 60px;
        width: 100%;
        font-size: 12px;
        span {
          font-weight:400;
          color:rgba(102,102,102,1);
          line-height:30px;
          display: block;
          p {
            float: right;
            font-weight:bold;
            color:rgba(51,51,51,1);
          }
        }
      }
    }
    .sign {
      // float: left;
      margin-top: 32px;
      .signText {
        padding-top: 24px;
        height: 60px;
        width: 100%;
        font-size: 12px;
        span {
          font-weight:400;
          color:rgba(102,102,102,1);
          line-height:30px;
          display: block;
          p {
            float: right;
            font-weight:bold;
            color:rgba(51,51,51,1);
          }
        }
      }
    }
    .performance {
      // float: right;
      margin-top: 32px;
      .performanceText {
        padding-top: 24px;
        height: 60px;
        width: 100%;
        font-size: 12px;
        span {
          font-weight:400;
          color:rgba(102,102,102,1);
          line-height:30px;
          display: block;
          p {
            float: right;
            font-weight:bold;
            color:rgba(51,51,51,1);
          }
        }
      }
    }
  }
</style>
