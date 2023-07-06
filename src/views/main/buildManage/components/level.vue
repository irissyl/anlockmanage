<template>
  <el-dialog v-dialogDrag :title="title" :visible.sync="dialogFormVisible" width="500px" @close="close" append-to-body>
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="层级编号:">
        <el-input v-model.trim="form.roomNo" autocomplete="off" placeholder="请输入层级编号"></el-input>
      </el-form-item>
      <el-form-item label="层级名称:">
        <el-input v-model.trim="form.roomname" autocomplete="off" placeholder="请输入层级名称"></el-input>
      </el-form-item>
      <el-form-item label="层级类型:">
        <el-select v-model.trim="form.sceneType" placeholder="请选择层级类型">
          <el-option label="三级" value="房间"></el-option>
          <el-option label="四级" value="楼层"></el-option>
          <el-option label="五级" value="宿舍楼"></el-option>
          <el-option label="六级" value="宿舍楼"></el-option>
          <el-option label="七级" value="宿舍楼"></el-option>
          <el-option label="八级" value="宿舍楼"></el-option>
          <el-option label="九级" value="宿舍楼"></el-option>
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
import { doEdit } from '@/api/table'

export default {
  name: 'TableEdit',
  data () {
    return {
      form: {
        roomname: '',
        sceneType: '',
        roomNo: '',
      },
      activeName: 'first',
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
      this.title = '层级管理'
      this.dialogFormVisible = true
    },
    handleClick () { },
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
