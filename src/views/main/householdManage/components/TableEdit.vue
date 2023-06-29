<template>
  <el-dialog v-dialogDrag :title="title" :visible.sync="dialogFormVisible" width="600px" destroy-on-close @close="close">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="账号" prop="customerNo">
        <el-input v-model.trim="form.customerNo" autocomplete="off" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="customerName">
        <el-input v-model.trim="form.customerName" autocomplete="off" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model.trim="form.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="证件号码" prop="idCard">
        <el-input v-model.trim="form.idCard" autocomplete="off" placeholder="请输入证件号码"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model.trim="form.sceneType" placeholder="请选择用户类型" style="width: 450px">
          <el-option label="经理" value="经理"></el-option>
          <el-option label="部长" value="部长"></el-option>
          <el-option label="组长" value="组长"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="房间">
        <el-button type="success" plain  style="width: 450px">点击选择...</el-button>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model.trim="form.roomType" autocomplete="off" placeholder="请输入电话号码"></el-input>
      </el-form-item>
      <el-form-item label="是否在宿">
        <el-input v-model.trim="form.isStay" autocomplete="off" placeholder="请输入电话号码"></el-input>
      </el-form-item>
      <el-form-item label="卡号">
        <el-input v-model.trim="form.iotTag" autocomplete="off" placeholder="请输入门锁卡号"></el-input>
      </el-form-item>
      <el-form-item label="所属部门">
        <el-input v-model.trim="form.roomInfo" autocomplete="off" placeholder="请输入门所属部门"></el-input>
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

export default {
  name: 'TableEdit',
  data () {
    return {
      form: {
        isStay: '',
        idCard: '',
        customerNo:'',
        customerName: '',
        roomType: '',
        roomInfo: '',
        iotTag: '',
        sceneType: '',
        buildId: '',
        sex: 1,
        endTime: '',
        startTime: '',
        entryTime: '',
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
      Fingerprint: {
        overdata: '',
      },
      activities: [],
    }
  },
  mounted () {
    // this.getlistSection()
  },
  methods: {
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
