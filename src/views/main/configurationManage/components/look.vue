<template>
  <el-dialog v-dialogDrag :title="title" :visible.sync="dialogFormVisible" width="1100px" @close="close">
    <div>
        <el-button style="float: right; " type="primary"  @click="handleAdd()">创建类型</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%;margin-top: 10px;margin-left: 20px;">
        <el-table-column prop="id" label="ID" ></el-table-column>
        <el-table-column prop="" label="业务类型ID" ></el-table-column>
        <el-table-column prop="" label="类型ID" ></el-table-column>
        <el-table-column prop="" label="类型名称" ></el-table-column>
        <el-table-column prop="" label="是否显示" ></el-table-column>
        <el-table-column prop="name" label="排序" ></el-table-column>
        <el-table-column fixed="right" label="操作" >
          <template #default="{ row }">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(row)"></el-button>
            <el-button type="text" icon="el-icon-delete" @click="handleDelete(row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
    <table-edit ref="edit"></table-edit>
  </el-dialog>
</template>

<script>
import { updateArea, getBuildList, doAddCampus } from '@/api/table'
import TableEdit from './TableEdit.vue'

export default {
  components: { TableEdit },
  name: 'TableEdit',
  data () {
    return {
      tableData: [{ id: 67889 }],
      value1: '',
      Builddata: '',
      rules: {
        areaName: [
          { required: true, trigger: 'blur', message: '请输入ID' },
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
      if (!row) {
        this.title = '添加'
        this.Edit = false
      } else {
        this.title = '字典详情'
        this.Edit = true

        console.log(this.form, row, 'row2')
      }
      this.dialogFormVisible = true
    },
    handleEdit (row) {
      this.$refs['edit'].showEdit(row)
    },
    handleAdd () {
      this.$refs['edit'].showEdit()
    },
    handleDelete(){},
    close () {
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
