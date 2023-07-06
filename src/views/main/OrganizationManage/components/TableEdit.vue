<template>
  <el-dialog v-dialogDrag :title="title" :visible.sync="dialogFormVisible" width="500px" @close="close">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="部门编号:" prop="roomNO">
        <el-input v-model.trim="form.roomNO" autocomplete="off" placeholder="请输入部门编号"></el-input>
      </el-form-item>
      <el-form-item label="部门名称:" prop="roomname">
        <el-input v-model.trim="form.roomname" autocomplete="off" placeholder="请输入部门名称"></el-input>
      </el-form-item>
      <el-form-item label="部门类型:" prop="sceneType">
        <el-select v-model.trim="form.sceneType" placeholder="请选择部门类型">
          <el-option label="人力资源部" value="3"></el-option>
          <el-option label="行政部" value="1"></el-option>
          <el-option label="财务部" value="2"></el-option>
          <el-option label="研发部" value="7"></el-option>
          <el-option label="测试部" value="9"></el-option>
          <el-option label="生产部" value="4"></el-option>
          <el-option label="采购部" value="5"></el-option>
          <el-option label="销售部" value="8"></el-option>
          <el-option label="客户服务部" value="6"></el-option>
          <el-option label="无" value="10"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="层级类型:" prop="title">
        <el-select v-model.trim="form.cengjiType" placeholder="请选择层级类型">
          <el-option label="二级" value="1"></el-option>
          <el-option label="三级" value="2"></el-option>
          <el-option label="四级" value="3"></el-option>
          <el-option label="五级" value="4"></el-option>
          <el-option label="六级" value="5"></el-option>
          <el-option label="七级" value="6"></el-option>
          <el-option label="八级" value="7"></el-option>
          <el-option label="九级" value="8"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="办公地点:" prop="address">
        <el-input v-model.trim="form.address" autocomplete="off" placeholder="请输入办公地点"></el-input>
      </el-form-item>
      <el-form-item label="部门描述:" prop="room">
        <el-input type="textarea" v-model.trim="form.room" autocomplete="off" placeholder="请输入部门描述"></el-input>
      </el-form-item>
      <el-form-item label="是否可显示" prop="isShow">
        <el-select v-model.trim="form.isShow" placeholder="请选择区域类型">
          <el-option label="可显示" value="可显示"></el-option>
          <el-option label="不可显示" value="不可显示"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="排序:" prop="room">
        <el-input  v-model.trim="form.sort" autocomplete="off" placeholder="请输入联系方式"></el-input>
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
        isShow: '',
        sectionName: '',
        sceneType: '',
        num: 1,
        room: '',
        roomNo: '',
        address:'',
        sort:1
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
        this.title = '添加组织机构'
      } else {
        this.title = '编辑组织机构'
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
