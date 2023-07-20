<template>
  <el-dialog v-dialogDrag :title="title" :visible.sync="dialogFormVisible" width="35%" @close="close">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
       <el-form-item label="姓名">
            <el-input v-model="form.name" style="width:400px" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="部门">
            <el-input v-model="form.department" style="width:400px" placeholder="请输入部门"></el-input>
          </el-form-item>
          <el-form-item label="职务">
            <el-input v-model="form.duties" style="width:400px" placeholder="请输入职务"></el-input>
          </el-form-item>
          <el-form-item label="证件号码">
            <el-input v-model="form.idcard" style="width:400px" placeholder="请输入证件号码"></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="form.mobile" style="width:400px" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model.trim="form.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
              <el-radio :label="3">中性</el-radio>
            </el-radio-group>
          </el-form-item>
      <el-form-item  label="房间选择" prop="title">
        <el-select v-model.trim="form.role" style="width:400px" autocomplete="off" placeholder="请选择操作员需管理的房间"   >
          <!-- <el-option label="系统管理员" value="1"></el-option>
          <el-option label="普通管理员" value="2"></el-option>
          <el-option label="员工" value="3"></el-option> -->
        </el-select>
      </el-form-item>
      <el-form-item  label="菜单选择" prop="wgName">
        <el-tree :data="buildObjs" show-checkbox node-key="menuId" :default-expanded-keys="[1, 2]" :props="defaultProps">
        </el-tree>
      </el-form-item>
      <!-- <el-form-item  label="密码" prop="wgName">
        <el-input v-model="form.pwd"   ></el-input>
      </el-form-item>
      <el-form-item  label="重复密码" prop="wgName">
        <el-input v-model="form.towpwd"   ></el-input>
      </el-form-item>
      <el-form-item  label="联系电话" prop="wgName">
        <el-input v-model="form.mobile"   ></el-input>
      </el-form-item> -->
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
  props: {
    navtableData: {
      type: Array,
      default: '',
    },
  },
  data () {
    return {
      form: {
        name: '',
        duties: '',
        department: '',
        role: '',
        nav: '',
        sex:3,
        mobile:'',
        idcard:''
      },
      value1: '',
      radio: 1,
      buildObjs: [],
      defaultProps: {
        label: 'menuName',
        children: 'childs',
      },
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
    this.getBuildList()
  },
  methods: {
    async getBuildList () {
      let Builddata = await getBuildList({})
      this.Builddata = Builddata.data
      console.log(Builddata.data, 'Builddata.data')
    },
    showEdit (row) {
      this.buildObjs = this.navtableData
      if (!row) {
        this.title = '添加操作员'
        this.Edit = false
      } else {
        this.title = '编辑操作员'
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
