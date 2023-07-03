<template>
  <el-dialog v-dialogDrag :title="title" :visible.sync="dialogFormVisible" width="500px" @close="close">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="门卡ID:" prop="title">
        <el-input v-model.trim="form.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="持卡人ID:" prop="author">
        <el-input v-model.trim="form.author" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="持卡人姓名:" prop="author">
        <el-input v-model.trim="form.author" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="门卡状态:" prop="title">
        <el-select v-model.trim="form.sceneType" placeholder="请选择门卡状态">
          <el-option label="正常" value="办公室"></el-option>
          <el-option label="失效" value="宿舍"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="门卡类型:" prop="title">
        <el-select v-model.trim="form.status" placeholder="请选择门卡状态">
          <el-option label="NFC" value="办公室"></el-option>
          <el-option label="CPU" value="宿舍"></el-option>
          <el-option label="IC" value="宿舍"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="注册时间:" prop="title">
        <el-date-picker v-model="form.retime" type="datetime" placeholder="选择日期时间">
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
        retime: '',
        room: '',
        roomNo: '',

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
