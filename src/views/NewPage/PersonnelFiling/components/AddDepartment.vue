<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="500px"
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="部门名称" prop="name">
        <el-input
          v-model.trim="form.sectionName"
          autocomplete="off"
          placeholder="请输入部门名称"
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
          sectionName: '',
        },
        buildObjs: [],
        Builddata: '',
        rules: {
          sectionName: [
            { required: true, trigger: 'blur', message: '请输入部门名称' },
          ],
        },
        title: '',
        dialogFormVisible: false,
      }
    },
    methods: {
      showEdit(row, Builddata) {
        if (!row) {
          this.title = '添加部门'
        } else {
          this.title = '编辑部门'
          this.form = Object.assign({}, row)
          console.log(this.form, row, 'row2')
        }
        this.dialogFormVisible = true
      },
      close() {
        this.dialogFormVisible = false
      },
      save() {
        this.dialogFormVisible = false
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
