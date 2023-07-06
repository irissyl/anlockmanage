<template>
  <el-dialog
    v-dialogDrag
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label-width="120px" label="网关编号" prop="builds">
        <el-input v-model="form.areaName"></el-input>
      </el-form-item>
      <el-form-item label-width="120px" label="通讯模式" prop="builds">
        <el-select
          v-model.trim="form.builds"
          autocomplete="off"
          placeholder="请选择通讯模式"
        >
          <el-option label="4G" value="4G"></el-option>
          <el-option label="WiFi" value="WiFi"></el-option>
          <el-option label="RJ45" value="RJ45"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label-width="120px" label="运营商" prop="builds">
        <el-select
          v-model.trim="form.title"
          autocomplete="off"
          placeholder="请选择通讯模式"
        >
          <el-option label="移动" value="移动"></el-option>
          <el-option label="电信" value="电信"></el-option>
          <el-option label="联通" value="联通"></el-option>
          <el-option label="铁通" value="铁通"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label-width="120px" label="卡号 " prop="wgName">
        <el-input v-model="form.wgName"></el-input>
      </el-form-item>
      <el-form-item label-width="120px" label="资费到期日" prop="num">
        <el-date-picker
          v-model="value1"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label-width="120px" label="Lora信道" prop="num">
        <el-input-number
          v-model="form.num"
          controls-position="right"
          :min="1"
          :max="10"
        ></el-input-number>
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
          level: '',
          num: '',
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
    mounted() {
      this.getBuildList()
    },
    methods: {
      async getBuildList() {
        let Builddata = await getBuildList({})
        this.Builddata = Builddata.data
        console.log(Builddata.data, 'Builddata.data')
      },
      showEdit(row, Builddata) {
        if (!row) {
          this.title = '添加网关设备'
          this.Edit = false
        } else {
          this.title = '编辑网关设备'
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
