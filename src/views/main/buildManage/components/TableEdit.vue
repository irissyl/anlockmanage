<template>
  <el-dialog
    v-dialogDrag
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="名称:" prop="title">
        <el-input v-model.trim="form.roomname" autocomplete="off" placeholder="请输入房间名称"></el-input>
      </el-form-item>
      <el-form-item label="编号" prop="roomNo">
        <el-input
          v-model.trim="form.roomNo"
          autocomplete="off"
          placeholder="请输入房间编号"
        ></el-input>
      </el-form-item>
      <el-form-item label="别名" prop="sectionName">
        <el-input
          v-model.trim="form.sectionName"
          autocomplete="off"
          placeholder="请输入房间别名"
        ></el-input>
      </el-form-item>
      <el-form-item label="门锁:" prop="room">
        <el-input v-model.trim="form.room" autocomplete="off" placeholder="请输入门锁编号"></el-input>
      </el-form-item>
      <el-form-item label="水表:" prop="water">
        <el-input v-model.trim="form.water" autocomplete="off" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="电表:" prop="electricity">
        <el-input v-model.trim="form.electricity" autocomplete="off" placeholder="请输入"></el-input>
      </el-form-item>
      <!-- <el-form-item label="入住性别:" prop="sex">
        <el-radio-group v-model.trim="form.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
          <el-radio :label="3">中性</el-radio>
        </el-radio-group>
      </el-form-item> -->
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
          roomname:'',
          sex: 1,
          sectionName: '',
          sceneType: '',
          num: 1,
          room: '',
          roomNo: '',
          water:'',
          electricity:''
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
          this.title = '添加建筑'
        } else {
          this.title = '编辑建筑'
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
