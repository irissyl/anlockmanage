<template>
  <el-dialog v-dialogDrag :title="title" :visible.sync="dialogFormVisible" width="500px" @close="close">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item  label="菜单类型" prop="title">
        <el-select v-model.trim="form.role" autocomplete="off" placeholder="请选择菜单类型"   >
          <el-option label="目录" value="dic"></el-option>
          <el-option label="菜单" value="node"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item  label="菜单名称" prop="areaName">
        <el-input v-model="form.menuName" placeholder="请选择菜单名称"   ></el-input>
      </el-form-item>
      <el-form-item  label="上级菜单" prop="builds">
        <el-select v-model.trim="form.truthName" autocomplete="off" placeholder="请选择上级菜单"   >
        </el-select>
      </el-form-item>
      <el-form-item  label="菜单URL" prop="wgName">
        <el-input v-model="form.department"   ></el-input>
      </el-form-item>
      <el-form-item  label="菜单图标" prop="wgName">
        <el-input v-model="form.pwd"   ></el-input>
      </el-form-item>
      <el-form-item  label="排序" prop="wgName">
        <el-input-number v-model="form.menuSort"  :min="1" :max="100" ></el-input-number>
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
        menuName: '',
        truthName: '',
        menuSort: '',
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
          { required: true, trigger: 'blur', message: '请输入片区名称' },
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
  },
  methods: {
    async getBuildList () {
      let Builddata = await getBuildList({})
      this.Builddata = Builddata.data
      console.log(Builddata.data, 'Builddata.data')
    },
    showEdit (row) {
      if (!row) {
        this.title = '添加菜单'
        this.Edit = false
      } else {
        this.title = '编辑菜单'
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
