<template>
  <el-dialog v-dialogDrag :title="title" :visible.sync="dialogFormVisible" width="600px" @close="close">
    <el-tabs type="card" v-model="activeName2" style="width: 550px; margin: 0 auto" @tab-click="handleClick">
      <el-tab-pane label="正式卡" name="first">
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
          <el-form-item label="门卡MacID:" prop="title">
            <el-input v-model.trim="form.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="持卡人:" prop="author">
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
          <el-form-item prop="title">
            <el-button type="primary" @click="save">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="临时卡" name="second">
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
          <el-form-item label="门卡MacID:" prop="title">
            <el-input v-model.trim="form.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="持卡人:" prop="author">
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
          <el-form-item label="门卡名称:" prop="author">
            <el-input v-model.trim="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="title">
            <el-button type="primary" @click="save">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">关闭</el-button>
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
        name: '',
        author: '',
        sceneType: '',
        num: 1,
        room: '',
        status: '',
      },
      rules: {},
      title: '',
      times: '',
      radio: '1',
      dialogFormVisible: false,
      activeName2: 'first',
    }
  },
  created () { },
  methods: {
    showEdit (row) {
      if (!row) {
        this.title = '添加门卡'
      } else {
        this.title = '编辑门卡'
        this.form = Object.assign({}, row)
      }
      this.dialogFormVisible = true
    },
    handleClick (tab, event) {
      console.log(tab, event)
      if (tab.label == '楼层') {
        this.activeName = 'first'
      }
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
