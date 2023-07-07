<template>
  <el-dialog
    v-dialogDrag
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="住户名称:" prop="title">
        <el-input v-model.trim="form.roomname" autocomplete="off" placeholder="请输入住户名称"></el-input>
      </el-form-item>
      <el-form-item label="手机号码:" prop="title">
        <el-input v-model.trim="form.room" autocomplete="off" placeholder="请输入手机号码"></el-input>
      </el-form-item>
      <el-form-item label="房间编号" prop="roomNo">
        <el-input
          v-model.trim="form.roomNo"
          autocomplete="off"
          placeholder="请输入房间编号"
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
        this.title = '办理退宿'
        this.dialogFormVisible = true
      },
      close() {
        // this.$refs['form'].resetFields()
        // this.form = this.$options.data().form
        this.dialogFormVisible = false
        // this.$emit('fetch-data')
      },
      save() {
            this.dialogFormVisible = false

        // this.$refs['form'].validate(async (valid) => {
        //   if (valid) {
        //     const { msg } = await doEdit(this.form)
        //     this.$baseMessage(msg, 'success')
        //     this.$refs['form'].resetFields()
        //     this.dialogFormVisible = false
        //     this.$emit('fetch-data')
        //     this.form = this.$options.data().form
        //   } else {
        //     return false
        //   }
        // })
      },
    },
  }
</script>
