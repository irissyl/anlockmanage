<template>
  <el-dialog v-dialogDrag :title="title" :visible.sync="dialogFormVisible" width="40%" destroy-on-close @close="close">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="指纹ID" prop="customerNo">
        <el-input v-model.trim="form.customerNo" autocomplete="off" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="住户编号" prop="customerNo">
        <el-input v-model.trim="form.customerNo" autocomplete="off" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="住户姓名" prop="customerName">
        <el-input v-model.trim="form.customerName" autocomplete="off" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model.trim="form.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="指纹类型">
        <el-select v-model.trim="form.sceneType" placeholder="请选择指纹类型" style="width: 450px">
          <el-option label="左大拇指" value="左大拇指"></el-option>
          <el-option label="左食指" value="左食指"></el-option>
          <el-option label="左中指" value="左中指"></el-option>
          <el-option label="左无名指" value="左无名指"></el-option>
          <el-option label="左小指" value="左小指"></el-option>
          <el-option label="右大拇指" value="右大拇指"></el-option>
          <el-option label="右食指" value="右食指"></el-option>
          <el-option label="右中指" value="右中指"></el-option>
          <el-option label="右无名指" value="右无名指"></el-option>
          <el-option label="右小指" value="右小指"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="更新时间">
        <el-date-picker v-model="form.entryTime" type="datetime" placeholder="请选择更新时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="状态">
        <el-select v-model.trim="form.sceneType" placeholder="请选择指纹状态" style="width: 450px">
          <el-option label="有效" value="有效"></el-option>
          <el-option label="无效" value="无效"></el-option>
        </el-select>
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
        customerNo: '',
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
    //   console.log(typeof row === 'object', 'row')
      if (!row) {
        this.title = '添加指纹'
        this.Edit = false
        this.form.buildId = row
      } else {
        this.title = '编辑指纹'
        this.Edit = true
        this.form = Object.assign({}, row)
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
