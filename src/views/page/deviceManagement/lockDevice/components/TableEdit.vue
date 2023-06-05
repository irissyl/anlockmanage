<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="园区名称" prop="name">
        <el-input
          v-model.trim="form.areaName"
          autocomplete="off"
          placeholder="请输入园区名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="园区地址" prop="address">
        <el-input
          v-model.trim="form.areaAddress"
          autocomplete="off"
          placeholder="请输入园区地址"
        ></el-input>
      </el-form-item>
      <el-form-item label="选择楼栋" prop="builds">
        <!-- <el-input v-model.trim="form.buildName" autocomplete="off" placeholder="请选择楼栋"></el-input>
        <div class="lists">
          <div v-for="item in Builddata" :key="item.value" @click="buildsclick(item)">
             <span>{{item.buildName}}</span>
          </div>
        </div> -->
        <el-select v-model.trim="form.builds" multiple placeholder="请选择">
          <el-option
            v-for="item in Builddata"
            :key="item.value"
            :label="item.buildName"
            :value="item.buildId"
          ></el-option>
        </el-select>
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
    data() {
      return {
        form: {
          areaName: '',
          areaAddress: '',
          builds: '',
        },
        buildObjs: [],
        Builddata: '',
        rules: {
          areaName: [
            { required: true, trigger: 'blur', message: '请输入园区名称' },
          ],
          areaAddress: [
            { required: true, trigger: 'blur', message: '请输入园区地址' },
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
    mounted() {},
    methods: {
      showEdit(row, Builddata) {
        if (!row) {
          this.title = '添加园区'
          this.Edit = false
        } else {
          this.title = '编辑园区'
          this.Edit = true

          this.form = Object.assign({}, row)
          this.form.builds = row.builds.split(',').map((item) => {
            return Number(item)
          })
          console.log(this.form, row, 'row2')
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
