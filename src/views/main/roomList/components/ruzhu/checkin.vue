<template>
  <el-dialog v-dialogDrag title="办理入住" :visible.sync="checkindialogVisible" width="50%" @close="close">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="常规人员" name="first">
        <tree-transfer ref="treeTransfer" class="transtransfer" :titles="['房间可入住人员:', '房间已入住人员:']" :button-texts="['删除', '添加人员']" :data-source.sync="dataSource" :default-checked-keys="defaultValue" :is-radio="false" :filterable="true"
          :father-choose="false" @left-check-change="handleLeftCheckChange" @right-check-change="handleRightCheckChange" @change="handleChange"></tree-transfer>
      </el-tab-pane>
      <el-tab-pane label="临时人员" name="second">
        <el-form label-width="120px" :model="formLabelAlign">
          <el-form-item label="姓名">
            <el-input v-model="formLabelAlign.name" style="width:400px"></el-input>
          </el-form-item>
          <el-form-item label="职务">
            <el-input v-model="formLabelAlign.duties" style="width:400px"></el-input>
          </el-form-item>
          <el-form-item label="证件号码">
            <el-input v-model="formLabelAlign.idcard" style="width:400px"></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="formLabelAlign.mobile" style="width:400px"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model.trim="formLabelAlign.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
              <el-radio :label="3">中性</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="房间数">
            <el-input v-model="formLabelAlign.roomNumber" style="width:400px" disabled></el-input>
          </el-form-item>
          <el-form-item label="微信">
            <el-input v-model="formLabelAlign.mobile" style="width:400px"></el-input>
          </el-form-item>
          <el-form-item label="持卡卡号" prop="rentCardnoHex">
            <el-input v-model.trim="formLabelAlign.rentCardnoHex" autocomplete="off" placeholder="请输入持卡卡号" class="ie"></el-input>
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
          <el-form-item label="密码">
            <el-input v-model="formLabelAlign.password" style="width:400px"></el-input>
          </el-form-item>
          <el-form-item label="时效">
            <el-date-picker v-model="formLabelAlign.time" type="datetimerange" range-separator="至" start-placeholder="入住时间" end-placeholder="到期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="formLabelAlign.remark" style="width:400px"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取消入住</el-button>
      <el-button type="primary" @click="save">确定入住</el-button>
    </div>
    <el-dialog title="录入指纹" size="small" :visible.sync="printdialogVisible" width="25%" :before-close="handleClose" append-to-body :close-on-click-modal="false">
      <div class="contents">
        <div class="right">
          <img v-if="imgShow1" src="../../../../../assets/print/1.png" />
          <img v-if="imgShow2" src="../../../../../assets/print/2.png" />
          <img v-if="imgShow3" src="../../../../../assets/print/3.png" />
          <img v-if="imgShow4" src="../../../../../assets/print/4.png" />
          <img v-if="imgShow5" src="../../../../../assets/print/5.png" />
        </div>
        <el-timeline class="left">
          <el-timeline-item v-for="(activity, index) in activities" :key="index" size="large" :color="activity.color">
            {{ activity.message }}
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-dialog>
  </el-dialog>
</template>

<script>
import TreeTransfer from '@/components/tree-transfer.vue';

export default {
  name: 'TableEdit',
  components: { TreeTransfer },
  data () {
    TreeTransfer
    return {
      title: '',
      checkindialogVisible: false,
      Edit: false,
      activities: [],
      activeName: 'first',
      dataSource: [
        {
          label: 'A部门',
          id: '1',
          children: [
            {
              label: '小明',
              children: [],
              id: '1-1',
            },
            {
              label: '小红',
              children: [],
              id: '1-2',
            },
            {
              label: '小刚',
              children: [],
              id: '1-3',
            },
          ],
        },
      ],
      formLabelAlign: {
        name: '',
        duties: '',
        sex: 3,
        idcard: '',
        roomNumber: 0,
        mobile: '',
        password: '',
        remark: '',
        WeChat: '',
        print: '',
        time: '',
        rentCardnoHex: ''
      },
      printdialogVisible: false,
      currentFingerprintNum: '',
      defaultValue: [],
      activities: [],
      fingerprintList: [], // 存储指纹信息的数组
      maxFingerprintNum: 5, // 最大指纹数量
      currentFingerprintNum: 0, // 当前指纹数量
      imgShow1: true,
      imgShow2: false,
      imgShow3: false,
      imgShow4: false,
      imgShow5: false,
    }
  },
  mounted () {

  },
  methods: {
    handleClick (tab, event) {
      // console.log(tab, event);
    },
    showEdit (row) {
      this.checkindialogVisible = true
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
          this.activities = []
        })
        .catch((_) => { })
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
    handleLeftCheckChange (value, currentKeys) {
      // console.log('handleLeftCheckChange:', value, currentKeys)
    },
    handleRightCheckChange (value, currentKeys) {
      // console.log('handleRightCheckChange:', value, currentKeys)
    },
    handleChange (value, direction, currentKeys) {
      // console.log('handleChange', value, direction, currentKeys)
    },
    close () {
      this.checkindialogVisible = false
    },
    save () {
      this.checkindialogVisible = false
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
