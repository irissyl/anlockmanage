<template>
  <el-dialog v-dialogDrag :title="title" :visible.sync="dialogFormVisible" width="600px" @close="close">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="锁类型" prop="num">
        <el-radio-group v-model.trim="form.num" autocomplete="off" placeholder="请选择锁类型">
          <el-radio :label="1">NBIOT</el-radio>
          <el-radio :label="2">WIFI</el-radio>
          <el-radio :label="3">BLEB</el-radio>
          <el-radio :label="4">LoRa</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="上传文件" prop="wgName">
        <el-upload class='image-uploader' :multiple='false' :auto-upload='true' list-type='xlsx' :show-file-list='true' :before-upload="beforeUpload" :drag='true' action='' :limit="1" :on-exceed="handleExceed" :http-request="uploadFile">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">一次只能上传一个文件，仅限.xlsx表格格式，单文件不超过1MB</div>
        </el-upload>
      </el-form-item>
    </el-form> 
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">导 入</el-button>
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
        areaName: '',
        areaAddress: '',
        builds: '',
        level: '',
        num: 1,
        effective: '',
        direction: ''
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
    this.getBuildList()
  },
  methods: {
    async getBuildList () {
      let Builddata = await getBuildList({})
      this.Builddata = Builddata.data
      console.log(Builddata.data, 'Builddata.data')
    },
    // 上传文件之前的钩子
    beforeUpload (file) {
      //判断文件格式
      let hz = file.name.split(".")[1]
      if (hz != 'xlsx' && hz != 'xls') {
        return false;
      }
    },
    // 上传文件个数超过定义的数量
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，请删除后继续上传`)
    },
    // 上传文件
    uploadFile (item) {
      let fileObj = item.file
      const form = new FormData()// FormData 对象
      form.append('upload', fileObj)// 文件对象  'upload'是后台接收的参数名
    //   $.ajax({
    //     url: "http://",
    //     data: form,
    //     type: "POST",
    //     contentType: "multipart/form-data",
    //     processData: false, //告诉jquery不要对form进行处理
    //     contentType: false, //指定为false才能形成正确的Content-Type
    //     success: function (res) { }
    //   })
    },
    showEdit (row, Builddata) {
      if (!row) {
        this.title = '添加门锁设备'
        this.Edit = false
      } else {
        this.title = '编辑门锁设备'
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
