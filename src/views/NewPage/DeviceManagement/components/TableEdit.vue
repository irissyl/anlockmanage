<template>
  <el-dialog v-dialogDrag :title="title" :visible.sync="dialogFormVisible" width="500px" @close="close">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item  label="门锁编号" prop="areaName">
        <el-input v-model="form.areaName" placeholder="请选择门锁编号"   style="width: 270px;"></el-input>
      </el-form-item>
      <el-form-item  label="房间编号" prop="builds">
        <el-select v-model.trim="form.builds" autocomplete="off" placeholder="请选择门锁位置"   style="width: 270px;">
          <el-option label="4G" value="4G"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item  label="锁类型" prop="title">
        <el-select v-model.trim="form.title" autocomplete="off" placeholder="请选择锁类型"   style="width: 270px;">
          <el-option label="WIFI" value="1"></el-option>
          <el-option label="LoRa" value="2"></el-option>
          <el-option label="NBIOT" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item  label="IMEI " prop="wgName">
        <el-input v-model="form.wgName"   style="width: 270px;"></el-input>
      </el-form-item>
      <el-form-item  label="是否有效" prop="effective">
        <el-select v-model.trim="form.effective" autocomplete="off" placeholder="请选择门锁是否有效"   style="width: 270px;">
          <el-option label="可用" value="可用"></el-option>
          <el-option label="不可用" value="不可用"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item  label="开门方向" prop="direction">
        <el-select v-model.trim="form.direction" autocomplete="off" placeholder="请选择开门方向"   style="width: 270px;">
          <el-option label="左开" value="左开"></el-option>
          <el-option label="右开" value="右开"></el-option>
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
  data () {
    return {
      form: {
        areaName: '',
        areaAddress: '',
        builds: '',
        level: '',
        num: '',
        effective:'',
        direction:''
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
