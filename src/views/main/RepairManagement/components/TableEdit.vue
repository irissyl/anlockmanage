<template>
  <el-dialog v-dialogDrag :title="title" :visible.sync="dialogFormVisible" width="900px" @close="close">
    <el-form ref="form" :model="form" :inline="true" class="demo-form-inline" :rules="rules" label-width="120px">
      <el-form-item label="账号:" prop="title">
        <el-input v-model.trim="form.id" autocomplete="off" style="width:250px;margin-right:10px;"></el-input>
      </el-form-item>
      <el-form-item label="姓名:" prop="author">
        <el-input v-model.trim="form.author" autocomplete="off" style="width:250px;margin-right:10px;"></el-input>
      </el-form-item>
      <el-form-item label="电话:" prop="author">
        <el-input v-model.trim="form.mobile" autocomplete="off" style="width:250px;margin-right:10px;"></el-input>
      </el-form-item>
      <el-form-item label="时间:" prop="title">
        <el-date-picker v-model="form.retime" type="datetime" placeholder="选择日期时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="位置:" prop="title">
        <el-select v-model.trim="form.y" placeholder="片区" style="width:150px;margin-right:10px;">
          <el-option label="故障类别" value="办公室"></el-option>
        </el-select>
        <el-select v-model.trim="form.l" placeholder="楼栋" style="width:150px;margin-right:10px;">
          <el-option label="故障类别" value="办公室"></el-option>
        </el-select>
        <el-select v-model.trim="form.c" placeholder="层" style="width:110px;margin-right:10px;">
          <el-option label="故障类别" value="办公室"></el-option>
        </el-select>
        <el-select v-model.trim="form.f" placeholder="房间" style="width:150px;margin-right:10px;">
          <el-option label="故障类别" value="办公室"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型:" prop="title">
        <el-select v-model.trim="form.sceneType" placeholder="请选择门卡状态">
          <el-option label="故障类别" value="办公室"></el-option>
          <el-option label="失效类别" value="宿舍"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态:" prop="title">
        <el-select v-model.trim="form.status" placeholder="请选择门卡状态">
          <el-option label="尚未维修" value="办公室"></el-option>
        </el-select>
      </el-form-item>
       <el-form-item label="维修人员:" prop="title">
        <el-input v-model.trim="form.roomNo" autocomplete="off" style="width:250px;margin-right:10px;"></el-input>
      </el-form-item>
      <el-form-item label="电量:" prop="author">
        <el-input v-model.trim="form.dian" autocomplete="off" style="width:250px;margin-right:10px;"></el-input>
      </el-form-item>
      <el-form-item label="描述:" prop="author">
        <el-input type="textarea" v-model.trim="form.remark" autocomplete="off" style="width:250px;margin-right:10px;"></el-input>
      </el-form-item>
      <el-form-item label="维修等级:" prop="title">
        <el-select v-model.trim="form.dengji" placeholder="请选择门卡状态">
          <el-option label="普通" value="普通"></el-option>
          <el-option label="严重" value="严重"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="修复方法:" prop="title">
        <el-select v-model.trim="form.way" placeholder="请选择门卡状态">
          <el-option label="更换电池" value="更换电池"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-card class="box-card" header="历史维修">
      <el-table :data="tableData" style="width: 100%;margin-top: 10px;margin-left: 20px;">
        <el-table-column prop="" label="维修编号" ></el-table-column>
        <el-table-column prop="" label="状态"></el-table-column>
        <el-table-column prop="name" label="报修人"></el-table-column>
        <el-table-column prop="name" label="报修类型"></el-table-column>
        <el-table-column prop="" label="报修日期" ></el-table-column>
      </el-table>
    </el-card>
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
        author: '',
        id: '',
        sectionName: '',
        sceneType: '',
        retime: '',
        status: '',
        roomNo: '',
        mobile:'',
        y:'',
        l:'',
        f:'',
        c:'',
        dian:'',
        way:'',
        dengji:"",
        remark:''
      },
      tableData:[],
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
        this.title = '添加报修'
      } else {
        this.title = '编辑报修'
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
