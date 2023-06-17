<template>
  <el-dialog
    v-dialogDrag
    :title="title"
    :visible.sync="dialogFormVisible"
    width="600px"
    destroy-on-close
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="姓名" prop="customerName">
        <el-input
          v-model.trim="form.customerName"
          autocomplete="off"
          placeholder="请输入姓名"
        ></el-input>
      </el-form-item>
      <el-form-item label="证件号码" prop="idCard">
        <el-input
          v-model.trim="form.idCard"
          autocomplete="off"
          placeholder="请输入证件号码"
        ></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="mobile">
        <el-input
          v-model.trim="form.mobile"
          autocomplete="off"
          placeholder="请输入手机号码"
        ></el-input>
      </el-form-item>
      <el-form-item label="开门密码" prop="rentDoorPass">
        <el-input
          v-model.trim="form.rentDoorPass"
          autocomplete="off"
          placeholder="请输入6位数字密码"
          class="ie"
        ></el-input>
        <el-button type="primary" @click="handleFree">生成随机密码</el-button>
      </el-form-item>

      <el-form-item label="持卡卡号" prop="rentCardnoHex">
        <el-input
          v-model.trim="form.rentCardnoHex"
          autocomplete="off"
          placeholder="请输入持卡卡号"
          class="ie"
        ></el-input>
        <el-button type="primary" @click="handleRead">读卡器读卡号</el-button>
      </el-form-item>
      <el-form-item label="指纹">
        <el-button style="width: 320px" type="primary" @click="handlePrint">
          <span v-show="currentFingerprintNum == 0">采集指纹（未采集）</span>

          <span v-show="currentFingerprintNum > 0">
            采集指纹 {{ currentFingerprintNum }}
          </span>
        </el-button>
        <el-button style="width: 120px" type="primary" @click="handleClear">
          清除已采集的指纹
        </el-button>
      </el-form-item>
      <el-form-item label="所属部门" prop="content">
        <el-select
          v-model="form.content"
          multiple
          placeholder="请选择部门"
          style="width: 450px"
        >
          <el-option
            v-for="item in Builddata"
            :key="item.sectionId"
            :label="item.sectionName"
            :value="item.sectionId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model.trim="form.remark"
          type="textarea"
          :rows="2"
          autocomplete="off"
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
    <el-dialog
      title="录入指纹"
      size="small"
      :visible.sync="printdialogVisible"
      width="25%"
      :before-close="handleClose"
      append-to-body
    >
      <div class="contents">
        <div class="right">
          <img v-if="imgShow1" src="../../../../assets/print/1.png" />
          <img v-if="imgShow2" src="../../../../assets/print/2.png" />
          <img v-if="imgShow3" src="../../../../assets/print/3.png" />
          <img v-if="imgShow4" src="../../../../assets/print/4.png" />
          <img v-if="imgShow5" src="../../../../assets/print/5.png" />
        </div>
        <el-timeline class="left">
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            size="large"
            :color="activity.color"
          >
            {{ activity.message }}
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-dialog>
  </el-dialog>
</template>

<script>
  import {
    updateBuild,
    addOfficeRent,
    addKeyFinger,
    listSection,
  } from '@/api/table'

  export default {
    name: 'TableEdit',
    data() {
      return {
        form: {
          customerName: '',
          rentCardnoHex: '',
          content: [],
          idCard: '',
          mobile: '',
          rentDoorPass: '',
          remark: '',
        },
        imgShow1: true,
        imgShow2: false,
        imgShow3: false,
        imgShow4: false,
        imgShow5: false,
        printdialogVisible: false,
        buildObjs: [],
        Builddata: [],
        rules: {
          customerName: [
            { required: true, trigger: 'blur', message: '请输入姓名' },
          ],
        },
        title: '',
        dialogFormVisible: false,
        Edit: false,
        fingerprintList: [], // 存储指纹信息的数组
        maxFingerprintNum: 5, // 最大指纹数量
        currentFingerprintNum: 0, // 当前指纹数量
        activities: [],
      }
    },
    created() {
      this.getlistSection()
    },
    methods: {
      async getlistSection() {
        let data = await listSection({})
        this.Builddata = data.data
        console.log(data, 'data')
      },
      handleClose(done) {
        done()
        this.activities = []
      },
      handleFree(row) {
        // 生成一个6位数的随机密码
        var password = Math.floor(Math.random() * 900000 + 100000)
        this.form.rentDoorPass = password
        console.log(password, row, 'password')
      },
      handleRead(row) {
        console.log(row, 'row')
        let data = {
          command: 'ReadCardId', //指令
          message: '',
          data: '',
        }
        this.$ws.send(JSON.stringify(data))
        this.$ws.addEventListener('message', (event) => {
          const result = JSON.parse(event.data)
          if (
            result.command === 'ReadCardId' &&
            result.message === '读卡成功'
          ) {
            this.form.rentCardnoHex = result.data
            this.$message('读卡成功')
            console.log(this.form.cardno, 'ReadCardId')
          }
          console.log(result, 'result')
        })
      },
      handlePrint(row) {
        console.log(row, 'row')
        let data = {
          command: 'GetFingerprint', //指令
          message: '',
          data: '',
        }
        if (this.currentFingerprintNum < this.maxFingerprintNum) {
          this.activities = []
          this.imgShow1 = true
          this.imgShow2 = false
          this.imgShow5 = false
          this.imgShow4 = false
          this.imgShow3 = false
          this.$ws.send(JSON.stringify(data))
          this.$ws.addEventListener('message', (event) => {
            const result = JSON.parse(event.data)
            if (result.message === '录入指纹:请放手指') {
              this.printdialogVisible = true
              this.activities.push({
                message: result.message,
                color: '#e98f36',
              })
              console.log(this.activities, 'this.activities')
            }
            if (result.message === '录入指纹:第1次特征录入成功') {
              this.activities.push({ message: result.message })
              this.imgShow2 = true
              this.imgShow1 = false
              this.imgShow5 = false
              this.imgShow4 = false
              this.imgShow3 = false
            }
            if (result.message === '录入指纹:第2次特征录入成功') {
              this.activities.push({ message: result.message })
              this.imgShow3 = true
              this.imgShow2 = false
              this.imgShow1 = false
              this.imgShow5 = false
              this.imgShow4 = false
            }
            if (result.message === '录入指纹:第3次特征录入成功') {
              this.imgShow4 = true
              this.imgShow3 = false
              this.imgShow2 = false
              this.imgShow1 = false
              this.imgShow5 = false
              this.activities.push({ message: result.message })
            }
            if (result.message === '录入指纹:指纹模板保存成功') {
              this.activities.push({ message: result.message })
            }

            if (result.command === 'Error') {
              this.activities.push({ message: result.message })
              this.printdialogVisible = false
              this.activities = []
              this.$message.error(result.message)
            }
            if (
              result.command === 'GetFingerprint' &&
              result.message === '指纹录入成功' &&
              result.data
            ) {
              this.imgShow5 = true
              this.imgShow4 = false
              this.imgShow3 = false
              this.imgShow2 = false
              this.imgShow1 = false
              this.activities.push({ message: result.message })
              this.fingerprintList.push(result.data)
              this.currentFingerprintNum++
              this.printdialogVisible = false
              this.activities = []
              this.$message({
                showClose: true,
                message: '指纹录制成功',
                type: 'success',
              })
              console.log(
                result,
                this.fingerprintList,
                this.activities,
                this.currentFingerprintNum,
                'fingerprintList'
              )
            }
          })
          this.$ws.close = function (evt) {
            console.log('关闭：', evt)
          }
        } else {
          this.$message('指纹数量已达到上限！')
        }
      },
      handleClear(row) {
        this.fingerprintList = []
        this.activities = []
      },
      showEdit(row, Builddata) {
        if (!row) {
          this.title = '添加办公室名单'
          this.Edit = false
        } else {
          this.title = '编辑办公室名单'
          this.Edit = true
          this.form = Object.assign({}, row)
          this.form.content = row.rentContent.split(',').map((item) => {
            this.Builddata.forEach((item2) => {
              if (item2.sectionName == item) {
                item = item2.sectionId
              }
            })
            return Number(item)
          })
          console.log(this.form, row, 'row2')
        }
        this.dialogFormVisible = true
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
        this.$emit('fetch-data')
      },
      save() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            if (this.Edit == false) {
              let contents = this.form.content.join(',')
              console.log(contents, 'contents')
              let formdata = {
                customername: this.form.customerName,
                cardno: this.form.cardno,
                content: contents,
                idcard: this.form.idcard,
                mobile: this.form.mobile,
                pwd: this.form.pwd,
                remark: this.form.remark,
                finger1: '',
                finger2: '',
                finger3: '',
                finger4: '',
                finger5: '',
              }
              console.log(formdata, this.Edit, 'valid')

              let data = await addOfficeRent(formdata)
              console.log(data, 'success')
              if (data.resultCode == 0) {
                this.$message('添加成功')
              }
            } else {
              // let formdata = {
              //   customername: this.form.customerName,
              //   cardno:this.form.cardno,
              //   content:this.form.content,
              //   idcard:this.form.idcard,
              //   mobile:this.form.mobile,
              //   pwd:this.form.pwd,
              //   remark:this.form.remark,
              // }
              // if (data.resultCode == 0) {
              //   this.$message('修改成功')
              // }
            }

            this.$refs['form'].resetFields()
            this.form = this.$options.data().form
            this.dialogFormVisible = false
            this.$emit('fetchData')
            // this.$parent.fetchData();
          } else {
            return false
          }
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .lists {
    height: 200px;

    overflow: scroll;
    border: 1px solid #ececec;

    div {
      border-bottom: 1px solid #ececec;
      // background-color: rgb(23, 84, 63);

      span {
        padding-left: 15px;
      }
    }
  }

  .ie {
    width: 335px;
    margin-right: 10px;
  }

  .left {
    margin-left: 25%;
    padding-left: 30px;
  }
  .right {
    text-align: center;

    margin-bottom: 10%;
    img {
      width: 60px;
      height: 60px;
    }
  }
</style>
