<template>
  <el-dialog
    v-dialogDrag
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="选择片区:" prop="title">
        <el-select
          v-model.trim="form.title"
          autocomplete="off"
          placeholder="请选择片区"
        ></el-select>
      </el-form-item>
      <el-form-item label="选择楼栋" prop="name">
        <el-select
          v-model.trim="form.buildName"
          autocomplete="off"
          placeholder="请选择楼栋"
        ></el-select>
      </el-form-item>
      <el-form-item label="房间编号" prop="name">
        <el-input
          v-model.trim="form.sectionName"
          autocomplete="off"
          placeholder="请输入房间编号"
        ></el-input>
      </el-form-item>
      <el-form-item label="房间名称" prop="name">
        <el-input
          v-model.trim="form.sectionName"
          autocomplete="off"
          placeholder="请输入房间名称"
        ></el-input>
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
    data() {
      return {
        form: {
          title: '',
          author: '',
        },
        rules: {},
        title: '',
        times: '',
        radio: '1',
        dialogFormVisible: false,
      }
    },
    created() {},
    methods: {
      showEdit(row) {
        if (!row) {
          this.title = '添加'
        } else {
          this.title = '编辑'
          this.form = Object.assign({}, row)
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
