<template>
  <div class="table-container">
    <div class="btntotal">
      <el-button icon="el-icon-plus" type="primary" @click="handledep">
        添加部门
      </el-button>
      <el-button icon="el-icon-plus" type="primary" @click="handleAdd">
        添加
      </el-button>
      <el-button icon="el-icon-plus" type="primary">导入表格</el-button>
    </div>
    <el-table
      ref="tableSort"
      v-loading="listLoading"
      border
      :data="list"
      :element-loading-text="elementLoadingText"
      :header-cell-style="{ 'text-align': 'center', background: '#f5f7fa' }"
      :cell-style="{ 'text-align': 'center' }"
      style="width: 100%"
      @selection-change="setSelectRows"
      @sort-change="tableSortChange"
    >
      <el-table-column
        show-overflow-tooltip
        prop="areaName"
        label="姓名"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="areaName"
        label="部门"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="areaAddress"
        label="职务"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="areaAddress"
        label="手机"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="areaAddress"
        label="性别"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="操作"
        width="150px"
        fixed="right"
      >
        <template #default="{ row }">
          <el-button type="text" @click="handleEdit(row)">编辑</el-button>
          <el-button type="text" @click="openlock(row)">开锁记录</el-button>
          <el-button type="text" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <table-edit ref="edit" @fetchData="fetchData"></table-edit>
    <open-door-record ref="openlock" @fetchData="fetchData"></open-door-record>
    <add-department ref="department" @fetchData="fetchData"></add-department>
  </div>
</template>

<script>
  import { getCampusList, deleteCampus } from '@/api/table'
  import TableEdit from './components/TableEdit'
  import OpenDoorRecord from './components/openDoorRecord.vue'
  import AddDepartment from './components/AddDepartment.vue'
  export default {
    name: '',
    components: {
      TableEdit,
      OpenDoorRecord,
      AddDepartment,
    },
    data() {
      return {
        list: [],
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
      handledep() {
        this.$refs['department'].showEdit()
      },
      handleAdd() {
        this.$refs['edit'].showEdit()
      },
      openlock(row) {
        this.$refs['openlock'].showEdit(row)
      },
      handleEdit(row) {
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
