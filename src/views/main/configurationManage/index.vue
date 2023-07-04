<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>业务字典管理</span>
      </div>
      <el-table :data="tableData" style="width: 100%;margin-top: 10px;margin-left: 20px;">
        <el-table-column prop="id" label="ID" ></el-table-column>
        <el-table-column prop="" label="业务类型ID" ></el-table-column>
        <el-table-column prop="name" label="业务类型" ></el-table-column>
        <el-table-column fixed="right" label="操作" >
          <template #default="{ row }">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(row)"></el-button>
            <el-button type="text" icon="el-icon-delete" @click="handleDelete(row)"></el-button>
            <el-button type="text"  @click="getlook(row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <table-edit ref="edit"></table-edit>
    <look ref="look"></look>
  </div>
</template>

<script>
import Look from './components/look.vue'
import TableEdit from './components/TableEdit.vue'
export default {
  components: { TableEdit, Look },
  name: 'AnlockmanageIndex',

  data () {
    return {
      tableData: [{ id: 67889 }]
    }
  },

  mounted () { },

  methods: {
    handleEdit (row) {
      this.$refs['edit'].showEdit(row)
    },
    handleAdd () {
      this.$refs['edit'].showEdit()
    },
    getlook (row) {
      this.$refs['look'].showEdit(row)
    },
  },
}
</script>

<style lang="scss" scoped></style>
