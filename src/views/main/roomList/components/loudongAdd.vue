<template>
  <el-dialog
    v-dialogDrag
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="选择园区:" prop="title">
        <el-select
          v-model.trim="form.areaId"
          autocomplete="off"
          style="width: 300px"
        >
          <el-option
            v-for="item in Campuslistdata"
            :key="item.areaId"
            :label="item.areaName"
            :value="item.areaId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="楼栋名称" prop="name">
        <el-input
          v-model.trim="form.name"
          autocomplete="off"
          placeholder="请输入楼栋名称"
          style="width: 300px"
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
  import { addBuild, getCampusList } from '@/api/api'

  export default {
    name: 'TableEdit',
    data() {
      return {
        form: {
          name: '',
          areaId: '',
        },
        buildObjs: [],
        Builddata: '',
        rules: {
          name: [
            { required: true, trigger: 'blur', message: '请输入楼栋名称' },
          ],
        },
        title: '',
        dialogFormVisible: false,
        Edit: false,
        Campuslistdata: [],
      }
    },
    mounted() {
      this.getdepartmemtData()
    },
    methods: {
      showEdit(row, Builddata) {
        this.title = '添加楼栋'
        this.dialogFormVisible = true
      },
      async getdepartmemtData() {
        const Campuslist = await getCampusList()
        this.Campuslistdata = Campuslist.data
        console.log(Campuslist, 'Campus')
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
            console.log(this.form, 'valid')
            if (this.Edit == false) {
              console.log(this.form, 'this.form')
              let data = await addBuild(this.form)
              console.log(data, 'success')
              if (data.resultCode == 0) {
                this.$message('添加成功')
              }
            } else {
              let formdata = {
                name: this.form.buildName,
                buildid: this.form.buildId,
              }
              // let data = await updateBuild(formdata)
              // console.log(data, 'success')
              // if (data.resultCode == 0) {
              //   this.$message('修改成功')
              // }
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
