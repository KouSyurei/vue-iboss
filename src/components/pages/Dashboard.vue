<template>
  <div>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :lg="16" style="margin-top: 10px">
        <card1 ref='card1'></card1>
        </el-col>
      <el-col :xs="24" :sm="24" :lg="8" style="padding-left: 0; margin-top: 10px"> <card2 ref='card2'></card2></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :lg="16" style="margin-top: 10px"><card3 ref='card3'></card3></el-col>
      <el-col :xs="24" :sm="24" :lg="8" style="padding-left: 0"><card4 ref='card4'></card4></el-col>
    </el-row>
<card5 ref='card5'></card5>
    <el-row :gutter="20">
      <el-col  :xs="24" :sm="24" :lg="12" style="margin-top: 10px; padding-right:0"><card6 ref='card6'></card6></el-col>
      <el-col :xs="24" :sm="24" :lg="12"><card7 ref='card7'></card7></el-col>
    </el-row>
    <card8 />
  </div>
</template>

<script>
import card1 from '../common/BusinessAllocation/card1.vue'
import card2 from '../common/BusinessAllocation/card2.vue'
import card3 from '../common/BusinessAllocation/card3.vue'
import card4 from '../common/BusinessAllocation/card4.vue'
import card5 from '../common/BusinessAllocation/card5.vue'
import card6 from '../common/BusinessAllocation/card6.vue'
import card7 from '../common/BusinessAllocation/card7.vue'
import card8 from '../common/BusinessAllocation/card8.vue'

export default {
  name: 'businessAllocation',
  components: {
    card1,
    card2,
    card3,
    card4,
    card5,
    card6,
    card7,
    card8
  },
  async mounted () {
    /**
     * 获取登陆名
     */

    await this.$http.loginNameSession().then(data => {
      // sessionStorage.setItem('loginName', data.data.data)
      sessionStorage.setItem('loginName', 78067405)
    })
    this.$refs['card1'].requst()
    this.$refs['card2'].requst()
    this.$refs['card3'].requst()
    this.$refs['card4'].requst()
    this.$refs['card5'].requst()
    this.$refs['card6'].requst()
    this.$refs['card7'].requst()
    // this.$http.performance()
    // this.$http.realTime()
    // this.$http.salaryAndIdIoGraph()
    // this.$http.personalized()
    // this.$http.Salary()
    // this.$http.toDoTodayLoginName()
    // this.$http.modifyCustomization()
    // this.$http.getJo()
    // this.$http.firstCallOrWillLost()
    // this.$http.targetAll()
    // this.$http.target()
    // this.$http.estimateSalary()
    //   .then(resp => {
    //     // this.loginName = resp.data.data
    //     sessionStorage.setItem('loginName', resp.data.data)
    //     alert(resp.data.data)
    //     // sessionStorage.setItem('loginName', 78067405)
    //     let d = resp.data.data
    //     return d
    //   }).then((resg) => {
    //     this.$http.loginNameSession(resg).then(() => {

    //     })
    //   })
  }
  // methods: {
  //   // 电话量实时通讯
  //   initWebSocket () {
  //     this.connection()
  //   },
  //   removeTab (targetName) {
  //   },
  //   connection () {
  //     let socket = new SockJS('http://172.16.1.253:8333/gs-guide-websocket')
  //     let stompClient = Stomp.over(socket)
  //     stompClient.connect({login: sessionStorage.getItem('loginName')}, function (frame) {
  //       // stompClient.subscribe('/user/${user_id}/topic/greetings', function (greeting) {
  //       stompClient.subscribe('/user/topic/pushResultMessage', function (greeting) {
  //         // console.log(JSON.parse(greeting.body).outContent)
  //         var dataScoket = JSON.parse(greeting.body).outContent
  //         var data = JSON.parse(JSON.parse(greeting.body).message)
  //         if (dataScoket === 'emp') {
  //           this.datessss = dataScoket.data
  //         }
  //         if (dataScoket === 'normal') {
  //           $('#thirtyCall').text(data.callThirtyCounts)
  //           $('#sixtyCall').text(data.callSixtyCounts)
  //           $('#countCall').text(data.callAllCounts)
  //           $('#firstPhone').text(data.firstPhone)
  //           $('#waitGrabOrder').text(data.waitGrabOrder)
  //           $('#waitProcessOrderss').text(data.waitProcessOrder)
  //           $('#invitationVisit').text(data.invitationVisit)
  //           $('#todWaitFollowContinue').text(data.todWaitFollowContinue)
  //           $('#todWaitFollowSigned').text(data.todWaitFollowSigned)
  //           $('#tomMoveContinue').text(data.tomMoveContinue)
  //           $('#tomMoveSigned').text(data.tomMoveSigned)
  //           $('#twoMoveContinue').text(data.twoMoveContinue)
  //           $('#twoMoveSigned').text(data.twoMoveSigned)
  //         }
  //       })
  //     }, function (error) {
  //       console.log(error)
  //       alert('请重新加载')
  //     })
  //   }
  // }
}
</script>

<style lang='scss'>
  .cardbox {
    width: 100%;
    height: 100%;
  }
  .el-card__body {
    padding: 20px;
  }
</style>
