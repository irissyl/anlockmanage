<template>
  <div class="table-container">
    <el-table
      ref="tableSort"
      border
      :data="list"
      :element-loading-text="elementLoadingText"
      :header-cell-style="{ 'text-align': 'center'}"
      :cell-style="{ 'text-align': 'center' }"
      style="width: 100%"
      @selection-change="setSelectRows"
      @sort-change="tableSortChange"
    >
      <el-table-column
        show-overflow-tooltip
        prop=""
        label="门锁编号"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop=""
        label="IMEI"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop=""
        label="NB卡号"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop=""
        label="账号"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="180px">
        <template #default="{ row }">
          <el-button type="text" @click="handleEdit(row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <table-edit ref="edit" @fetchData="fetchData"></table-edit>
    <PermissionPopup ref="gatewayset" @fetchData="fetchData"></PermissionPopup>
  </div>
</template>

<script>
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
        queryForm: {
          pageNo: 1,
          pageSize: 10,
          title: '',
        },
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
        // this.listLoading = true
        // const datalist = await getCampusList()
        // this.list = datalist.data
        // datalist.data.forEach((item) => {
        //   this.buildObjs = item.buildObjs
        // })
        // console.log(datalist.data, 'datalist')
        // this.listLoading = false
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
      handleEdit(row) {
        console.log(row, 'row')
        this.$refs['edit'].showEdit(row)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .btntotal {
    float: right;
    margin-bottom: 20px;
  }
  .ei {
    float: right;
    width: 200px;
  }
  .lb {
    // border: 1px solid saddlebrown;
    float: left;
    margin-right: 10px;
  }
</style>
