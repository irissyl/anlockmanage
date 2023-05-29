<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="楼栋名称" prop="name">
        <el-input
          v-model.trim="form.buildName"
          autocomplete="off"
          placeholder="请输入楼栋名称"
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
  import { updateBuild, addBuild } from '@/api/table'

  export default {
    name: 'TableEdit',
    data() {
      return {
        form: {
          buildName: '',
        },
        buildObjs: [],
        Builddata: '',
        rules: {
          buildName: [
            { required: true, trigger: 'blur', message: '请输入楼栋名称' },
          ],
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    mounted() {
      this.getBuildList()
    },
    methods: {
      showEdit(row, Builddata) {
        if (!row) {
          this.title = '添加楼栋'
        } else {
          this.title = '编辑楼栋'
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
            console.log(this.form, 'valid')
            let formdata = {
              name: this.form.buildName,
            }
            let data = await addBuild(formdata)
            console.log(data, builds, 'success')

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
