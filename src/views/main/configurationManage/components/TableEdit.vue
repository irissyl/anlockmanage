<template>
  <el-dialog v-dialogDrag :title="title" :visible.sync="dialogFormVisible" width="500px" @close="close" append-to-body>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item  label="ID" prop="areaName">
        <el-input v-model="form.Name" placeholder="请输入ID"   ></el-input>
      </el-form-item>
      <el-form-item  label="业务类型ID" prop="wgName">
        <el-input v-model="form.department"   ></el-input>
      </el-form-item>
      <el-form-item  label="类型名称" prop="wgName">
        <el-input v-model="form.department"   ></el-input>
      </el-form-item>
      <el-form-item  label="业务类型" prop="builds">
        <el-select v-model.trim="form.truthName" autocomplete="off"  >
          <el-option label="锁类型" value="4G"></el-option>
          <el-option label="开锁方式" value="4G"></el-option>
          <el-option label="人员类型" value="4G"></el-option>
          <el-option label="门卡类型" value="4G"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item  label="是否显示" prop="wgName">
        <el-input v-model="form.department"   ></el-input>
      </el-form-item>
      <el-form-item  label="排序" prop="wgName">
        <el-input v-model="form.department"   ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { updateArea, getBuildList, doAddCampus } from '@/api/table'

export default {
  name: 'TableEdit',
  data () {
    return {
      form: {
        Name: '',
        truthName: '',
        towpwd: '',
        role: '',
        department: '',
        pwd:'',
        mobile:''
      },
      value1: '',
      radio: 1,
      buildObjs: [],
      Builddata: '',
      rules: {
        areaName: [
          { required: true, trigger: 'blur', message: '请输入ID' },
        ],
        areaAddress: [
          { required: true, trigger: 'blur', message: '请输入片区地址' },
        ],
        buildName: [
          { required: true, trigger: 'blur', message: '请选择楼栋' },
        ],
      },
      title: '',
      dialogFormVisible: false,
      Edit: false,
    }
  },
  mounted () {
    this.getBuildList()
  },
  methods: {
    async getBuildList () {
      let Builddata = await getBuildList({})
      this.Builddata = Builddata.data
      console.log(Builddata.data, 'Builddata.data')
    },
    showEdit (row) {
      if (!row) {
        this.title = '添加字典'
        this.Edit = false
      } else {
        this.title = '编辑字典'
        this.Edit = true

        console.log(this.form, row, 'row2')
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
          if (this.Edit == true) {
            let builds = this.form.builds.join(',')
            let formdata = {
              name: this.form.areaName,
              address: this.form.areaAddress,
              builds: builds,
              areaid: this.form.areaId,
            }
            console.log(formdata, this.Edit, 'valid')

            let data = await updateArea(formdata)
            console.log(data, builds, 'success')
            if (data.resultCode == 0) {
              this.$message('修改成功')
            }
          } else {
            let builds = this.form.builds.join(',')
            let formdata = {
              name: this.form.areaName,
              address: this.form.areaAddress,
              builds: builds,
            }
            console.log(formdata, this.Edit, 'valid')

            let data = await doAddCampus(formdata)
            console.log(data, builds, 'success')
            if (data.resultCode == 0) {
              this.$message('添加成功')
            }
          }

          this.$refs['form'].resetFields()
          this.form = this.$options.data().form
          this.dialogFormVisible = false
          this.$emit('fetchData')
          // this.$parent.fetchData();
        } else {
          return false
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.lists {
  height: 200px;

  overflow: scroll;
  border: 1px solid #ececec;

  div {
    border-bottom: 1px solid #ececec;
    // background-color: rgb(23, 84, 63);

    span {
      padding-left: 15px;
    }
  }
}
</style>
