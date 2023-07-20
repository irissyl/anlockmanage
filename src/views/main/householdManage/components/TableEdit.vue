<template>
  <el-dialog v-dialogDrag :title="title" :visible.sync="dialogFormVisible" width="600px" @close="close">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="姓名" prop="customerName">
        <el-input v-model.trim="form.customerName" autocomplete="off" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="职务">
        <el-input v-model="form.duties" style="width:400px"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="mobile">
        <el-input v-model.trim="form.mobile" autocomplete="off" placeholder="请输入手机号码"></el-input>
      </el-form-item>
      <el-form-item label="证件号码" prop="idCard">
        <el-input v-model.trim="form.idCard" autocomplete="off" placeholder="请输入证件号码"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model.trim="form.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
          <el-radio :label="3">中性</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="组织机构">
        <el-select v-model.trim="form.sceneType" placeholder="请选择组织机构" style="width: 450px">
          <!-- <el-option label="经理" value="经理"></el-option>
          <el-option label="部长" value="部长"></el-option>
          <el-option label="组长" value="组长"></el-option> -->
        </el-select>
      </el-form-item>
      <el-form-item label="房间">
        <el-button type="success" plain style="width: 450px" @click="chooseRoom">点击选择...</el-button>
      </el-form-item>
      <el-form-item label="是否在宿">
        <el-radio-group v-model.trim="form.isStay">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="开门密码" prop="rentDoorPass">
        <el-input v-model.trim="form.rentDoorPass" autocomplete="off" placeholder="请输入6位数字密码" class="ie"></el-input>
        <el-button type="primary" @click="handleFree">生成随机密码</el-button>
      </el-form-item>

      <el-form-item label="持卡卡号" prop="rentCardnoHex">
        <el-input v-model.trim="form.rentCardnoHex" autocomplete="off" placeholder="请输入持卡卡号" class="ie"></el-input>
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
      <el-form-item label="入职时间">
        <el-date-picker v-model="form.entryTime" type="datetime" placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="入宿时间">
        <el-date-picker v-model="form.startTime" type="datetime" placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="退宿时间">
        <el-date-picker v-model="form.endTime" type="datetime" placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
    <permission-popup ref="findroom"></permission-popup>
  </el-dialog>
</template>

<script>
import {
  updateBuild,
  addOfficeRent,
  addKeyFinger,
  listSection,
} from '@/api/table'
import {
  addSingleRoom,
  listRoom,
  addBatchRoom,
  delRoom,
  updateRoom,
} from '@/api/api'
import PermissionPopup from './PermissionPopup.vue'

export default {
  components: { PermissionPopup },
  name: 'TableEdit',
  data () {
    return {
      form: {
        duties:'',
        isStay: 2,
        idCard: '',
        mobile: '',
        customerNo: '',
        customerName: '',
        roomType: '',
        roomInfo: '',
        iotTag: '',
        sceneType: '',
        buildId: '',
        sex: 3,
        endTime: '',
        startTime: '',
        entryTime: '',
        customerName: '',
        rentCardnoHex: '',
        rentDoorPass: '',
      },

      Builddata: [],
      num: 1,
      rules: {
        customerName: [
          { required: true, trigger: 'blur', message: '请输入姓名' },
        ],
        idCard: [
          { required: true, trigger: 'blur', message: '请输入身份证号' },
        ],
        sex: [
          { required: true, trigger: 'blur', message: '请输入性别' },
        ],
      },
      title: '',
      dialogFormVisible: false,
      Edit: false,
      activities: [],
      fingerprintList: [], // 存储指纹信息的数组
      maxFingerprintNum: 5, // 最大指纹数量
      currentFingerprintNum: 0, // 当前指纹数量
    }
  },
  mounted () {
    // this.getlistSection()
  },
  methods: {
    handleFree (row) {
      // 生成一个6位数的随机密码
      var password = Math.floor(Math.random() * 900000 + 100000)
      this.form.rentDoorPass = password
      console.log(password, row, 'password')
    },
    handleRead (row) {
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
    handlePrint (row) {
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
        this.$ws.onerror = function (evt) {
          this.$message('请检查是否开启指纹驱动')
          this.$message.error('请检查是否开启指纹驱动')
        }

        this.$ws.addEventListener('message', (event) => {
          const result = JSON.parse(event.data)
          if (result.message === '开始连接设备') {
            this.printdialogVisible = true
            let data = { message: '录入指纹:请放手指', color: '#e98f36' }
            if (
              !this.activities.some(
                (activity) => activity.message === data.message
              )
            ) {
              this.activities.push(data)
            }
          }
          if (result.message === '录入指纹:第1次特征录入成功') {
            let data = {
              message: '录入指纹:第1次特征录入成功,请第二次放手指',
              color: '#e98f36',
            }
            if (
              !this.activities.some(
                (activity) => activity.message === data.message
              )
            ) {
              this.activities.push(data)
            }
            this.imgShow2 = true
            this.imgShow1 = false
            this.imgShow5 = false
            this.imgShow4 = false
            this.imgShow3 = false
          }
          if (result.message === '录入指纹:第2次特征录入成功') {
            let data = {
              message: '录入指纹:第2次特征录入成功,请第三次放手指',
              color: '#e98f36',
            }
            if (
              !this.activities.some(
                (activity) => activity.message === data.message
              )
            ) {
              this.activities.push(data)
            }
            this.imgShow3 = true
            this.imgShow2 = false
            this.imgShow1 = false
            this.imgShow5 = false
            this.imgShow4 = false
          }

          if (result.message === '录入指纹:第3次特征录入成功') {
            let data = {
              message: '录入指纹:第3次特征录入成功,请第四次放手指',
              color: '#e98f36',
            }
            if (
              !this.activities.some(
                (activity) => activity.message === data.message
              )
            ) {
              this.activities.push(data)
            }
            this.imgShow4 = true
            this.imgShow3 = false
            this.imgShow2 = false
            this.imgShow1 = false
            this.imgShow5 = false
          }

          if (result.command === 'Error') {
            let data = { message: result.message, color: '#e98f36' }
            if (
              !this.activities.some(
                (activity) => activity.message === data.message
              )
            ) {
              this.activities.push(data)
            }
            this.printdialogVisible = false
            this.activities = []
            this.$message.error(result.message)
          }
          if (
            result.command === 'GetFingerprint' &&
            result.message === '指纹录入成功' &&
            result.data
          ) {
            let data = { message: '指纹录入成功', color: '#e98f36' }
            if (
              !this.activities.some(
                (activity) => activity.message === data.message
              )
            ) {
              this.activities.push(data)
            }
            let printdata = result.data
            if (!this.fingerprintList.includes(printdata)) {
              this.fingerprintList.push(printdata)
            }
            this.imgShow5 = true
            this.imgShow4 = false
            this.imgShow3 = false
            this.imgShow2 = false
            this.imgShow1 = false

            // console.log(
            //   result,
            //   this.fingerprintList,
            //   this.activities,
            //   this.currentFingerprintNum,
            //   'fingerprintList'
            // )
            this.printdialogVisible = false
            this.currentFingerprintNum = this.fingerprintList.length
            // console.log(this.currentFingerprintNum,'this.currentFingerprintNum')
          }
        })
        this.$ws.close = function (evt) {
          console.log('关闭：', evt)
        }
      } else {
        this.$message('指纹数量已达到上限！')
      }
    },
    handleClear (row) {
      this.fingerprintList = []
      this.activities = []
    },
    async getlistSection () {
      let data = await listSection({})
      this.Builddata = data.data
      console.log(data, 'data')
    },
    handlenumChange () { },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
          this.activities = []
        })
        .catch((_) => { })
    },
    chooseRoom () {
      this.$refs['findroom'].showEdit()
    },
    showEdit (row) {
      console.log(typeof row === 'object', 'row')
      if ((typeof row === 'object') == false) {
        this.title = '添加住户'
        this.Edit = false
        this.form.buildId = row
      } else {
        this.title = '编辑住户'
        this.Edit = true
        this.form = Object.assign({}, row)
        // this.form.content = row.rentContent.split(',').map((item) => {
        //   return Number(item)
        // })
        // console.log(this.form, row, 'row2')
      }
      this.dialogFormVisible = true
    },
    close () {
      this.$refs['form'].resetFields()
      this.form = this.$options.data().form
      this.dialogFormVisible = false
      this.$emit('fetch-data')
    },
    save () {
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          if (this.Edit == false) {
            console.log(this.form, 'form')
            let data = await addSingleRoom(this.form)
            if (data.resultCode == 0) {
              this.$message('添加成功')
            }
          } else {
            let data = await updateRoom(this.form)
            if (data.resultCode == 0) {
              this.$message('修改成功')
            }
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
