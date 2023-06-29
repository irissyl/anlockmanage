<template>
  <el-dialog v-dialogDrag :title="title" :visible.sync="dialogFormVisible" width="500px" @close="close">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="名称:" prop="title">
        <el-input v-model.trim="form.roomname" autocomplete="off" placeholder="请输入房间名称"></el-input>
      </el-form-item>
      <el-form-item label="编号" prop="roomNo">
        <el-input v-model.trim="form.roomNo" autocomplete="off" placeholder="请输入房间编号"></el-input>
      </el-form-item>
      <el-form-item label="区域类型:" prop="title">
        <el-select v-model.trim="form.sceneType" placeholder="请选择区域类型">
          <el-option label="总部" value="总部"></el-option>
          <el-option label="分布区域" value="分布区域"></el-option>
          <el-option label="部门" value="部门"></el-option>
          <el-option label="小组" value="小组"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="办公地点:" prop="room">
        <el-input v-model.trim="form.address" autocomplete="off" placeholder="请输入房间名称"></el-input>
      </el-form-item>
      <el-form-item label="联系方式:" prop="room">
        <el-input v-model.trim="form.room" autocomplete="off" placeholder="请输入房间名称"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="sectionName">
        <el-input v-model.trim="form.sectionName" autocomplete="off" placeholder="请输入描述"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { doEdit } from '@/api/table'

export default {
  name: 'TableEdit',
  data () {
    return {
      form: {
        roomname: '',
        sex: 1,
        sectionName: '',
        sceneType: '',
        num: 1,
        room: '',
        roomNo: '',
        address:''
      },
      rules: {},
      title: '',
      times: '',
      radio: '1',
      dialogFormVisible: false,
    }
  },
  created () { },
  methods: {
    showEdit (row) {
      if (!row) {
        this.title = '添加'
      } else {
        this.title = '编辑'
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
          const { msg } = await doEdit(this.form)
          this.$baseMessage(msg, 'success')
          this.$refs['form'].resetFields()
          this.dialogFormVisible = false
          this.$emit('fetch-data')
          this.form = this.$options.data().form
        } else {
          return false
        }
      })
    },
  },
}
</script>
