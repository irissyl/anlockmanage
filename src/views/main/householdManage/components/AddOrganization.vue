<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="60%" :before-close="handleClose" append-to-body>
      <el-table ref="tableSort" default-expand-all :data="lists" row-key="id" border :tree-props="{children: 'children'}" max-height="500px">
        <el-table-column show-overflow-tooltip prop="id" label="编号"></el-table-column>
        <el-table-column show-overflow-tooltip prop="label" label="名称"></el-table-column>
        <el-table-column show-overflow-tooltip prop="" label="类型"></el-table-column>
        <el-table-column show-overflow-tooltip prop="" label="办公地点"></el-table-column>
        <el-table-column show-overflow-tooltip prop="" label="描述"></el-table-column>
        <el-table-column show-overflow-tooltip label="操作" fixed="right">
          <template #default="{ row }">
            <el-button type="text" icon="el-icon-circle-plus-outline" @click="handleClick(row)"></el-button>
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(row)"></el-button>
            <el-button type="text" icon="el-icon-delete" @click="handleDelete(row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <cengji-add ref="organization"></cengji-add>
    <table-edit ref="edit"></table-edit>
  </div>
</template>

<script>
import TableEdit from '../../../main/OrganizationManage/components/TableEdit.vue';
import cengjiAdd from './cengjiAdd.vue';
export default {
  components: { cengjiAdd, TableEdit },
  name: 'AnlockmanageAddOrganization',
  data () {
    return {
      dialogVisible: false,
      form: {
        roomname: '',
        isShow: '',
        sectionName: '',
        sceneType: '',
        num: 1,
        room: '',
        roomNo: '',
        address: '',
        sort: 1
      },
      rules: {},
      title: '新增',
      titles:'',
      lists: [
        {
          id: 2,
          label: '部门列表',
          children: [
            {
              id: 1,
              label: '人事部门',
              children: [],
            },
          ],
        },
      ],
    };
  },

  mounted () {

  },

  methods: {
    handleChange () { },
    handleClose () { },
    showEdit (row, tableDataid) {
      this.dialogVisible = true
      this.title = '新增组织结构'
    },
    handleClick (row) {
      console.log(this.lists[0].id,row.id,'tableData')
      this.$refs['organization'].showEdit(row,this.lists[0].id)
    },
    handleEdit (row) {
      console.log(row, 'row')
      this.$refs['edit'].showEdit(row)
    },
    handleDelete (row) {
      console.log(row, 'rowd')
    },
  },
};
</script>

<style lang="scss" scoped>
</style>