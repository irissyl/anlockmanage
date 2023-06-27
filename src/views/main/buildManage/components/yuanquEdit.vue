<template>
  <el-dialog
    v-dialogDrag
    :title="title"
    :visible.sync="dialogFormVisible"
    width="600px"
    @close="close"
  >
    <el-tabs
      v-model="activeName2"
      style="width: 550px; margin: 0 auto"
      @tab-click="handleClick"
    >
      <el-tab-pane label="单个添加" name="first">
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
          <el-form-item label="房间名称:" prop="title">
            <el-input v-model.trim="form.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="可容纳人数:" prop="title">
            <el-input-number
              v-model="form.num"
              controls-position="right"
              :min="1"
              :max="10"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="房间别名:" prop="title">
            <el-input v-model.trim="form.room" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="入住性别:" prop="title">
            <el-radio-group v-model.trim="form.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="房间类型:" prop="title">
            <el-select
              v-model.trim="form.sceneType"
              placeholder="请选择房间类别"
            >
              <el-option label="办公室" value="办公室"></el-option>
              <el-option label="宿舍" value="宿舍"></el-option>
              <el-option label="预约" value="预约"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排序:" prop="title">
            <el-input
              v-model.trim="form.title"
              autocomplete="off"
              placeholder="请输入整数"
            ></el-input>
          </el-form-item>
          <el-form-item prop="title">
            <el-button type="primary" @click="save">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="批量添加" name="second">
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
          <el-form-item label="楼层开始名称:" prop="title">
            <el-input v-model.trim="form.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="楼层个数:" prop="title">
            <el-input v-model.trim="form.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="楼层模型:" prop="title">
            <el-input v-model.trim="form.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="入住性别:" prop="title">
            <el-radio-group v-model.trim="form.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="排序:" prop="title">
            <el-input
              v-model.trim="form.sort"
              autocomplete="off"
              placeholder="请输入整数"
            ></el-input>
          </el-form-item>
          <el-form-item prop="title">
            <el-button type="primary" @click="save">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
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
          sex: 1,
          author: '',
          sceneType: '',
          num: 1,
          room: '',
          sort: '',
        },
        rules: {},
        title: '',
        times: '',
        radio: '1',
        dialogFormVisible: false,
        activeName2: 'first',
      }
    },
    created() {},
    methods: {
      showEdit(row) {
        if (!row) {
          this.title = '添加房间'
        } else {
          this.title = '编辑房间'
          this.form = Object.assign({}, row)
        }
        this.dialogFormVisible = true
      },
      handleClick(tab, event) {
        console.log(tab, event)
        if (tab.label == '楼层') {
          this.activeName = 'first'
        }
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
