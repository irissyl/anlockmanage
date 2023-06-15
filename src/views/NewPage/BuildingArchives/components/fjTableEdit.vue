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
          v-model.trim="form.title"
          autocomplete="off"
          placeholder="请选择园区"
        ></el-select>
      </el-form-item>
      <el-form-item label="选择楼栋:" prop="title">
        <el-select v-model.trim="form.buildName" autocomplete="off"></el-select>
      </el-form-item>
      <el-form-item label="房间编号" prop="name">
        <el-input
          v-model.trim="form.sectionName"
          autocomplete="off"
          placeholder="请输入房间编号"
        ></el-input>
      </el-form-item>
      <el-form-item label="房间名称" prop="name">
        <el-input
          v-model.trim="form.sectionName"
          autocomplete="off"
          placeholder="请输入房间名称"
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
  import { addSection, getBuildList } from '@/api/table'

  export default {
    name: 'TableEdit',
    data() {
      return {
        form: {
          buildName: '',
          sectionName: '',
        },
        buildObjs: [],
        Builddata: '',
        rules: {
          sectionName: [
            { required: true, trigger: 'blur', message: '请输入房间名称' },
          ],
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    methods: {
      showEdit(row, Builddata) {
        if (!row) {
          this.title = '添加房间'
        } else {
          this.title = '编辑房间'
          this.form = Object.assign({}, row)
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
            let formdata = {
              sectionName: this.form.sectionName,
            }
            console.log(formdata, 'valid')

            let data = await addSection(formdata)
            console.log(data, 'success')
            if (data.resultCode == 0) {
              this.$message('添加成功')
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
