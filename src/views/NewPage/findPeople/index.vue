<template>
  <div class="table-container">
    <div class="btntotal">
      <el-button icon="el-icon-plus" type="primary">导入表格</el-button>
    </div>
    <el-table
      ref="tableSort"
      v-loading="listLoading"
      border
      :data="lists"
      :element-loading-text="elementLoadingText"
      :header-cell-style="{ 'text-align': 'center', background: '#f5f7fa' }"
      :cell-style="{ 'text-align': 'center' }"
      style="width: 100%"
      @selection-change="setSelectRows"
      @sort-change="tableSortChange"
    >
      <el-table-column
        show-overflow-tooltip
        prop="areaAddress"
        label="房间编号"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop=""
        label="房间名称"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop=""
        label="姓名"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop=""
        label="部门"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop=""
        label="职务"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop=""
        label="手机"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop=""
        label="性别"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="操作"
        width="150px"
        fixed="right"
      >
        <template #default="{ row }">
          <el-button type="text" @click="handleAdd(row)">匹配人员</el-button>
          <!-- <el-button type="text" @click="handleEdit(row)">编辑</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <table-edit ref="edit" @fetchData="fetchData"></table-edit>
    <permission-popup
      ref="permission"
      @fetchData="fetchData"
    ></permission-popup>
  </div>
</template>

<script>
  import { getCampusList, deleteCampus } from '@/api/table'
  import TableEdit from './components/TableEdit'
  import PermissionPopup from './components/PermissionPopup.vue'
  export default {
    name: 'VueAdminBetterIndex',
    components: {
      TableEdit,
      PermissionPopup,
    },
    data() {
      return {
        list: [],
        lists: [{ areaAddress: 12 }],
        imageList: [],
        listLoading: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        background: true,
        selectRows: '',
        elementLoadingText: '正在加载...',
        Builddata: [],
        buildObjs: [],
      }
    },
    computed: {
      height() {
        return this.$baseTableHeight()
      },
    },

    created() {
      this.fetchData()
    },

    methods: {
      async fetchData() {
        this.listLoading = true
        const datalist = await getCampusList()
        this.list = datalist.data
        datalist.data.forEach((item) => {
          this.buildObjs = item.buildObjs
        })
        console.log(datalist.data, 'datalist')
        this.listLoading = false
      },

      tableSortChange() {
        const imageList = []
        this.$refs.tableSort.tableData.forEach((item, index) => {
          imageList.push(item.img)
        })
        this.imageList = imageList
      },
      setSelectRows(val) {
        this.selectRows = val
      },
      handleAdd() {
        this.$refs['permission'].showEdit()
      },
      handleEdit(row) {
        console.log(row, 'row')
        this.$refs['edit'].showEdit(row)
      },
      async handleDelete(row) {
        console.log(row, 'rowd')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .btntotal {
    float: right;
    margin-bottom: 20px;
  }
</style>
