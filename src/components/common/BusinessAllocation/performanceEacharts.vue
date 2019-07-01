<template>
  <div class="echartsAll">
    <div class="visit" :data='targetAll'>
      <div id="myChartVisit" :style="{width: '120px', height: '120px'}"></div>
      <div class="visitText">
        <span>本月到访目标<p>{{targetAll.estimatedVisitNum}}</p></span>
        <span>本月已完成<p>{{targetAll.pisitMonth}}</p></span>
        <span>今日到访<p>{{targetAll.pisit}}</p></span>
      </div>
    </div>
    <div class="sign">
      <div id="myChartSign" :style="{width: '120px', height: '120px'}"></div>
      <div class="signText">
        <span>本月签单目标<p>{{targetAll.estimatedOrderNum}}</p></span>
        <span>本月已完成<p>{{targetAll.contractMonth}}</p></span>
        <span>今日签单<p>{{targetAll.contract}}</p></span>
      </div>
    </div>
    <div class="performance">
      <div id="myChartPerformance" :style="{width: '120px', height: '120px'}"></div>
      <div class="performanceText">
        <span>本月业绩目标<p>{{targetAll.estimatedPerformance}}</p></span>
        <span>本月已完成<p>{{targetAll.performanceMonth}}</p></span>
        <span>今日业绩<p>{{targetAll.performance}}</p></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      estimatedVisitNum: '',
      pisitMonth: '',
      baifenbi: '',
      targetAll: [],
      estimatedOrderNum: '',
      estimatedPerformance: '',
      performanceMonth: ''
    }
  },
  mounted () {
    this.$http.targetAll('907367403', '2019-05-23')
      .then(resp => {
        this.targetAll = resp.data.data
        // 到访完成率
        this.estimatedVisitNum = resp.data.data.estimatedVisitNum
        this.pisitMonth = resp.data.data.pisitMonth
        if (this.estimatedVisitNum <= this.pisitMonth) {
          this.estimatedVisitNum = 0
          this.baifenbi = '100%'
        } else {
          this.estimatedVisitNum = this.estimatedVisitNum - this.pisitMonth
          this.baifenbi = this.pisitMonth / this.estimatedVisitNum * 100 + '%'
        }
        // 签单完成率
        this.estimatedOrderNum = resp.data.data.estimatedOrderNum
        this.contractMonth = resp.data.data.contractMonth
        if (this.estimatedOrderNum <= this.contractMonth) {
          this.estimatedOrderNum = 0
          this.baifenbi = '100%'
        } else {
          this.estimatedOrderNum = this.estimatedOrderNum - this.contractMonth
          this.baifenbi = this.contractMonth / this.estimatedOrderNum * 100 + '%'
        }
        // 业绩完成率
        this.estimatedPerformance = resp.data.data.estimatedPerformance
        this.performanceMonth = resp.data.data.performanceMonth
        if (this.estimatedPerformance <= this.performanceMonth) {
          this.estimatedPerformance = 0
          this.baifenbi = '100%'
        } else {
          this.estimatedPerformance = this.estimatedPerformance - this.performanceMonth
          this.baifenbi = this.performanceMonth / this.estimatedPerformance * 100 + '%'
        }

        this.drawLine()
      })
  },
  methods: {
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChartVisit'))
      let myChartSign = this.$echarts.init(document.getElementById('myChartSign'))
      let myChartPerformance = this.$echarts.init(document.getElementById('myChartPerformance'))

      // 绘制图表
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
              {value: this.estimatedVisitNum, name: ''}

            ]
          }
        ]
      })
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
              {value: this.contractMonth, name: this.baifenbi},
              {value: this.estimatedOrderNum, name: ''}
            ]
          }
        ]
      })
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
              {value: this.performanceMonth, name: this.baifenbi},
              {value: this.estimatedPerformance, name: ''}
            ]
          }
        ]
      })
    }
  }
}
</script>

<style lang='scss'>
  .echartsAll {
    .visit {
      float: left;
      margin-top: 32px;
      .visitText {
        padding-top: 24px;
        height: 60px;
        width: 120px;
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
      float: left;
      margin-top: 32px;
      margin-left: 15%;
      .signText {
        padding-top: 24px;
        height: 60px;
        width: 120px;
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
      float: right;
      margin-top: 32px;
      .performanceText {
        padding-top: 24px;
        height: 60px;
        width: 120px;
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
