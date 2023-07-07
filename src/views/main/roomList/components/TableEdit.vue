<template>
  <el-dialog v-dialogDrag :title="title" :visible.sync="dialogFormVisible" width="600px" destroy-on-close @close="close">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="房间编号">
        <el-input v-model.trim="form.roomNO" autocomplete="off" placeholder="请输入房间编号"></el-input>
      </el-form-item>
      <el-form-item label="房间名称">
        <el-input v-model.trim="form.roomName" autocomplete="off" placeholder="请输入房间名称"></el-input>
      </el-form-item>
      <el-form-item label="房间场景">
        <el-select v-model.trim="form.sceneType" placeholder="请选择房间类别" style="width: 450px">
          <el-option label="办公室" value="办公室"></el-option>
          <el-option label="宿舍" value="宿舍"></el-option>
          <el-option label="预约" value="预约"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="房型">
        <el-input v-model.trim="form.roomType" autocomplete="off" placeholder="请输入房型"></el-input>
      </el-form-item>
      <el-form-item label="楼层">
        <el-input-number v-model="form.floorKey" style="width: 450px" controls-position="right" :min="1" :max="40" @change="handlenumChange"></el-input-number>
      </el-form-item>
      <el-form-item label="门锁标识">
        <el-input v-model.trim="form.iotTag" autocomplete="off" placeholder="请输入门锁编号"></el-input>
      </el-form-item>
      <el-form-item label="房间信息">
        <el-input v-model.trim="form.roomInfo" autocomplete="off" placeholder="请输入门锁编号"></el-input>
      </el-form-item>
      <!-- <el-form-item label="电表标识">
        <el-input
          v-model.trim="form.rentCardnoHex"
          autocomplete="off"
          placeholder="请输入电表编号"
        ></el-input>
      </el-form-item>
      <el-form-item label="水表标识">
        <el-input
          v-model.trim="form.rentCardnoHex"
          autocomplete="off"
          placeholder="请输入水表编号"
        ></el-input>
      </el-form-item> -->
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
        floorKey: 1,
        roomNO: '',
        roomName: '',
        roomType: '',
        roomInfo: '',
        iotTag: '',
        sceneType: '',
        buildId: '',
      },

      Builddata: [],
      num: 1,
      rules: {
        roomname: [
          { required: true, trigger: 'blur', message: '请输入房间名称' },
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
        this.title = '添加房间'
        this.Edit = false
        this.form.buildId = row
      } else {
        this.title = '编辑房间'
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
