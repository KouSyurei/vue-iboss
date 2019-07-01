<template>
  <div id="card">
    <el-card class="box-card4">
      <div class="box">
        <div class="box_top">
          <p class="box_top_set">提成计算</p>
        </div>
        <div
          class="box_content"
          >
          <div class="user">
            <div style="float:left">
              <div class="headerLogo" style="color: red">更换头像</div>
              <el-upload
                class="avatar-uploader"
                action="https://tibossworkstationweb.dgg.net/api/upload/image"
                :show-file-list="false"
                :on-remove="handleRemove"
                :on-error="imgUploadError"
                :data="imgUpload"
                :on-preview="handlePictureCardPreview"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="allowance.personalIcon" :src="allowance.personalIcon" class="avatar" style="width: 100%; height: 100%">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <span>操行分： </span>
              <p>{{(allowance.conductPoints === null ? 0 : allowance.conductPoints)}}</p>
            </div>
            <div class="salary">
            <div class="salary_left">
              <span>
                本月当前业绩
                <div class="xym4" v-if="eye"   @click="showPassword()"><img src="../../../assets/img/img_yinchang.png" alt=""></div>
                <div class="xym4" v-else  @click="showPassword()"><img src="../../../assets/img/group7(1).png" alt=""></div>
                <p>{{performanceMonth}}</p>
              </span>
            </div>
            <div class="salary_right">
              <span>本月目标工资
                <el-tooltip class="item" effect="dark" content="请输入数字(0-999999999),按enter保存" placement="bottom-start">
                  <el-input
                    class="salaryVal"
                    type="number"
                    :min="0"
                    :max="999999999"
                    onkeyup="this.value=this.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')"
                    step="0.01"
                    placeholder="输入金额"
                    v-model="allowance.predictSalary"
                    @keyup.enter.native="salaryHandle"
                  >
                  </el-input>
                </el-tooltip>
              </span>
            </div>
          </div>
          </div>
          <div>
            <el-input
              placeholder="今天想对自己说点什么"
              class="user_input"
              v-model="allowance.idiograph"
              type="textarea"
              :autosize="{ minRows: 4, maxRows: 4}"
              :minlength='0'
              :maxlength='50'
              clearable>
            </el-input>
            <span class="limitNumber">{{Array.from(allowance.idiograph).length}}/ 50</span>
            <el-button
              style="margin-left: 86%; margin-top: 30px;"
              type="primary"
              size="mini"
              @click="testHandle"
            >保存</el-button>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
// import loginName from '../../../../static/config.js'
import header from '../../../assets/img/header.jpg'
export default {
  name: 'card',
  data () {
    return {
      personalIcon: header,
      loginName: '',
      newpsd: '',
      eye: true,
      allowance: {
        predictSalary: 0,
        idiograph: '',
        personalIcon: header,
        conductPoints: 0
      },
      imageUrl: '',
      dialogVisible: false,
      // imgLimit: 1,
      idiograph: '',
      predictSalary: 0,
      txtVal: 0,
      desc: '',
      month: '',
      performanceMonth1: '',
      targetAll: {
        performanceMonth: 0
      },
      performanceMonth: 0,
      imgUpload: {
        loginName: sessionStorage.getItem('loginName')
      }
    }
  },
  created () {
  },
  mounted () {

  },
  methods: {
    requst () {
      this.loginName = sessionStorage.getItem('loginName')
      if (this.loginName !== null) {
      // 头像、操行分、个性签名、预估工资
        this.$http.salaryAndIdIoGraph(this.loginName)
          .then(resp => {
            this.allowance = resp.data.data
            this.allowance = {
              conductPoints: resp.data.data.conductPoints ? resp.data.data.conductPoints : 0,
              idiograph: resp.data.data.idiograph ? resp.data.data.idiograph : '',
              personalIcon: resp.data.data.personalIcon ? resp.data.data.personalIcon : header,
              predictSalary: resp.data.data.predictSalary ? resp.data.data.predictSalary : 0
            }
            // this.allowance.personalIcon = resp.data.data.personalIcon
            // if (this.allowance === null && this.allowance === undefined) {
            //   this.idiograph = ''
            //   this.allowance.personalIcon = header
            //   this.allowance.conductPoints = 0
            //   this.allowance.predictSalary = 0
            // } else {
            //   this.idiograph = resp.data.data.idiograph
            //   this.allowance.predictSalary = ((resp.data.data.predictSalary === null) ? 0 : (resp.data.data.predictSalary))
            //   this.allowance.conductPoints = ((resp.data.data.conductPoints === null) ? 0 : (resp.data.data.conductPoints))
            //   this.allowance.personalIcon = ((resp.data.data.personalIcon === null) ? header : (resp.data.data.personalIcon))
            // }
          }).catch(e => {
            this.idiograph = ''
            this.allowance.personalIcon = header
            this.allowance.conductPoints = 0
            this.allowance.predictSalary = 0
          })
        // 预估工资
        // this.$http.estimateSalary(this.loginName, this.myformatter(new Date()))
        //   .then(resp => {
        //     this.salary = resp.data.data
        //     if (this.salary === null) {
        //       this.salaryVal = 0
        //     } else {
        //       this.salaryVal = resp.data.data.estimatedSalary
        //     }
        //   }).catch(e => {
        //     this.salaryVal = 0
        //   })
        // 本月当前业绩
        this.$http.targetAll(this.loginName)
          .then(resp => {
            this.performanceMonth = resp.data.data ? resp.data.data.performanceMonth : 0
            if (this.targetAll === null) {
              this.month = 0
            } else {
              this.month = this.performanceMonth
            }
          }).catch(e => {
            this.performanceMonth1 = 0
            this.month = 0
          })
      } else {
        this.allowance.conductPoints = 0
        this.inputVal = 0
        this.performanceMonth1 = 0
        this.month = 0
        this.allowance.personalIcon = header
      }
    },
    // 头像上传
    handleRemove (file, fileList) { // 移除图片
    },
    handlePictureCardPreview (file) { // 预览图片时调用
      this.imageUrl = file.url
      this.dialogVisible = true
    },

    beforeAvatarUpload (file) { // 文件上传之前调用做一些拦截限制
      const isJPG = true
      // const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleAvatarSuccess (res, file) { // 图片上传成功
      this.imageUrl = URL.createObjectURL(file.raw)
      this.$message({
        showClose: true,
        message: '上传成功',
        type: 'success'
      })
      this.$http.salaryAndIdIoGraph(this.loginName)
        .then(resp => {
          this.allowance = resp.data.data
        })
    },
    // handleExceed (files, fileList) { // 图片上传超过数量限制
    //   this.$message.error('上传图片不能超过1张!')
    // },
    imgUploadError (err, file, fileList) { // 图片上传失败调用
      console.log(err)
      this.$message.error('上传图片失败!')
    },
    // 业绩显示和隐藏
    showPassword () {
      var performanceMonth = this.month
      if (this.eye) {
        this.eye = false
        this.performanceMonth = this.performanceMonth.toString().replace(/[\w\W]/g, '*')
      } else {
        this.eye = true
        this.performanceMonth = performanceMonth
      }
    },
    // 个性签名和目标工资
    testHandle () {
      this.$http.personalized(this.allowance.idiograph, this.loginName)
        .then(resp => {
          if (resp.data.code === 0) {
            this.$message({
              showClose: true,
              message: '保存成功',
              type: 'success'
            })
          } else {
            this.$message.error('保存失败')
          }
        })
    },
    // 填报工资
    salaryHandle () {
      this.$http.Salary(this.allowance.predictSalary, this.loginName)
        .then(resp => {
          if (resp.data.code === 0) {
            this.$message({
              showClose: true,
              message: '保存成功',
              type: 'success'
            })
          } else {
            this.$message.error('保存失败')
          }
        })
    },
    // 当前时间
    myformatter (date) {
      var strDate = date.getFullYear() + '-'

      if (date.getMonth() < 10) {
        var s = date.getMonth() + 1

        strDate += '0' + s
      } else {
        strDate += date.getMonth() + 1
      }
      return strDate
    }
  }
}
</script>

<style lang='scss'>
  .box-card4 {
    width:100%;
    height:330px;
    margin-top: 10px;
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
        padding-left: 6px;
        float: left;
      }
    }
    .box_content {
      width: 100%;
      height: 100%;
      padding-top: 14px;
      .user {
        width: 100%;
        height: 120px;
        float: left;
        .headerLogo {
          z-index: 999;
          display: none;
          position: absolute;
          font-size: 14px;
          padding: 34px 16px;
        }
        .headerLogo:hover {
          border-color: #409EFF;
          display: inline-block;
          color: #fff;
          opacity: 0.5;
          background-color: #ccc;
        }
        .avatar-uploader .el-upload {
        width: 88px;
        height: 88px;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        }
        .avatar-uploader .el-upload:hover:after {
          content: "更换头像";
          width: 88px;
          height: 88px;
          line-height: 88px;
          position: absolute;
          left: 0;
          top: 0;
          font-size: 14px;
          color: #FFFFFF;
          background: rgba(0,0,0,0.50);
          letter-spacing: 2.5px;
        }
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 88px;
          height: 88px;
          line-height: 88px;
          text-align: center;
        }
        .avatar {
          width: 88px;
          height: 88px;
          display: block;
        }
        span {
          font-size: 12px;
          float: left;
        }
        p {
          font-size: 12px;
          font-weight: 800
        }
        .el-upload--picture-card {
          width: 80%;
          height: 88px;
          line-height: 88px;
        }
      }
      .user_input {
        width: 100%;
        height: 20px;
      }
      .salary {
        display: flex;
        justify-content: flex-start;
        height: 100%;
        padding-left: 20px;
        .salary_left {
          width: 30%;
          height: 48px;
          border-right: 1px solid rgba(228,231,237,1);
          span {
            font-size: 12px;
            display: block;
            height: 70px;
            p {
              font-weight: 400;
              padding-top: 5px;
              font-size: 24px;
            }
          }
        }
        .salary_right {
          width: 40%;
          height: 100%;
          padding-left: 60px;
          span {
            font-size: 12px;
            display: block;
            height: 70px;
            p {
              font-weight: 800;
              padding-top: 5px;
            }
            .salaryVal {
              margin-top: 5px;
              height: 20px;
            }
          }
        }
      }
      .limitNumber {
          position: absolute;
          margin-top: 45px;
          font-size: 14px;
          margin-left: 23.5%;
        }
      .xym4 {
        display: inline;
      }
    }
  }
</style>
