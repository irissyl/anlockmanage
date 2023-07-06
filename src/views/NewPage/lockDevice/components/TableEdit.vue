<template>
  <el-dialog
    v-dialogDrag
    :title="title"
    :visible.sync="dialogFormVisible"
    width="800px"
    append-to-body
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label-width="120px" label="楼栋" prop="floorno">
        <el-select v-model.trim="form.floor" placeholder="请选择">
          <el-option value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label-width="120px" label="房间" prop="builds">
        <el-select v-model.trim="form.builds" placeholder="请选择">
          <el-option value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label-width="120px" label="设备类型" prop="iotType">
        <el-select v-model.trim="form.iotType" placeholder="请选择">
          <el-option value="门锁"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label-width="120px" label="通信协议" prop="builds">
        <el-radio-group v-model="radio">
          <el-radio :label="1">NBIOT</el-radio>
          <el-radio :label="2">WIFI</el-radio>
          <el-radio :label="3">BLEB</el-radio>
          <el-radio :label="4">LoRa</el-radio>
          <el-radio :label="5">电信NBIOT</el-radio>
          <el-radio :label="6">NBIOTZF</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- <el-form-item label-width="120px" label="设备IMEI" prop="name">
        <el-input
          v-model.trim="form.areaName"
          autocomplete="off"
          placeholder="请输入"
        ></el-input>
      </el-form-item> -->
      <el-form-item label-width="120px" label="房间名称" prop="name">
        <el-input
          v-model.trim="form.areaName"
          autocomplete="off"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label-width="120px" label="门锁编号" prop="name">
        <el-input
          v-model.trim="form.areaName"
          autocomplete="off"
          placeholder="请输入"
        ></el-input>
      </el-form-item>
      <el-form-item label-width="120px" label="心跳间隔" prop="remark">
        <el-input-number
          v-model="num"
          controls-position="right"
          :min="1"
          :max="300"
        ></el-input-number>
      </el-form-item>
      <!-- <el-form-item label-width="120px" label="备注" prop="remark">
        <el-input
          v-model.trim="form.remark"
          type="textarea"
          :rows="2"
          autocomplete="off"
        ></el-input>
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
    data() {
      return {
        form: {
          areaName: '',
          areaAddress: '',
          builds: '',
          floorno: '',
          iotType: '',
        },
        radio: 1,
        num: 0,
        buildObjs: [],
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
    mounted() {},
    methods: {
      showEdit(row) {
        console.log(row, 'row')

        if (!row) {
          this.title = '添加门锁设备'
          this.Edit = false
        } else {
          this.title = '编辑门锁设备'
          this.Edit = true

          this.form = Object.assign({}, row)

          console.log(this.form, row, 'row2')
        }
        this.dialogFormVisible = true
      },
      close() {
        // this.$refs['form'].resetFields()
        // this.form = this.$options.data().form
        this.dialogFormVisible = false
        // this.$emit('fetch-data')
      },
      save() {
        this.dialogFormVisible = false
        //   this.$refs['form'].validate(async (valid) => {
        //     if (valid) {
        //       if (this.Edit == true) {
        //         let builds = this.form.builds.join(',')
        //         let formdata = {
        //           name: this.form.areaName,
        //           address: this.form.areaAddress,
        //           builds: builds,
        //           areaid: this.form.areaId,
        //         }
        //         console.log(formdata, this.Edit, 'valid')

        //         let data = await updateArea(formdata)
        //         console.log(data, builds, 'success')
        //         if (data.resultCode == 0) {
        //           this.$message('修改成功')
        //         }
        //       } else {
        //         let builds = this.form.builds.join(',')
        //         let formdata = {
        //           name: this.form.areaName,
        //           address: this.form.areaAddress,
        //           builds: builds,
        //         }
        //         console.log(formdata, this.Edit, 'valid')

        //         let data = await doAddCampus(formdata)
        //         console.log(data, builds, 'success')
        //         if (data.resultCode == 0) {
        //           this.$message('添加成功')
        //         }
        //       }

        //       this.$refs['form'].resetFields()
        //       this.form = this.$options.data().form
        //       this.dialogFormVisible = false
        //       this.$emit('fetchData')
        //       // this.$parent.fetchData();
        //     } else {
        //       return false
        //     }
        //   })
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
