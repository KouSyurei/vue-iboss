<template>
  <div class="box_content" >
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
      :before-close="handleClose">
      <div class="dialog_set"><span>*</span>到访目标：<input type="text" placeholder="请设置到访目标数">人</div>
      <div class="dialog_set"><span>*</span>签单目标：<input type="text" placeholder="请设置到签单标数">单</div>
      <div class="dialog_set"><span>*</span>业绩目标：<input type="text" placeholder="请设置到业绩标数">元</div>
      <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <router-link :to="{path:'/businessAllocation',query: {visibility: false,flag: 2}}" >
                <el-button type="primary" @click="comiteFn">确 定</el-button>
              </router-link>
            </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'countDown',
  data () {
    return {
      dialogVisible: false
    }
  },
  props: {
    hr: {
      type: Number,
      default: () => 0
    },
    min: {
      type: Number,
      default: () => 0
    },
    sec: {
      type: Number,
      default: () => 0
    }
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {
        })
    },
    comiteFn: function () {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang='scss'>
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
          padding: 30px 0px;
          border-bottom: 1px solid #eee;
          .dialog_set {
            font-size: 12px;
            font-weight:600;
            color:#333333;
            height: 30px;
            padding-bottom: 14px;
            line-height: 30px;
            span {
              color: #FE322C;
              font-size: 12px;
              padding: 4px;
            }
            input {
              height: 28px;
              margin: 0px 8px;
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
</style>
