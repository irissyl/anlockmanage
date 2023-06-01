<template>
  <div class="table-container">
    <div class="btntotal">
      <el-button icon="el-icon-plus" type="primary">添加门锁设备</el-button>
      <el-button type="primary">表格导出</el-button>
      <el-button type="primary">门锁批量设置</el-button>
      <el-button type="primary">刷新设备列表</el-button>
    </div>
    <el-form
      ref="form"
      :model="queryForm"
      :inline="true"
      @submit.native.prevent
    >
      <el-form-item>
        <label class="lb">查询条件:</label>
        <el-input
          v-model="queryForm.title"
          class="ei"
          placeholder="请输入查询条件"
        />
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="primary" native-type="submit">
          查询
        </el-button>
      </el-form-item>
    </el-form>
    <el-table
      ref="tableSort"
      v-loading="listLoading"
      border
      :data="list"
      :element-loading-text="elementLoadingText"
      :height="height"
      :header-cell-style="{ 'text-align': 'center', background: '#f5f7fa' }"
      :cell-style="{ 'text-align': 'center' }"
      style="width: 100%"
      @selection-change="setSelectRows"
      @sort-change="tableSortChange"
    >
      <el-table-column
        show-overflow-tooltip
        prop="areaName"
        label="设备标识"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="areaName"
        label="房间名称"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="areaName"
        label="设备类型"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="areaName"
        label="协议"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="areaName"
        label="楼栋"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="areaName"
        label="心跳间隔(秒)"
      ></el-table-column>

      <el-table-column
        show-overflow-tooltip
        prop="areaAddress"
        label="最后一次心跳"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="areaAddress"
        label="最后开门时间"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="areaAddress"
        label="电压"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="areaAddress"
        label="设备状态"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="areaAddress"
        label="创建时间"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="areaAddress"
        label="备注"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="areaAddress"
        label="固件版本"
      ></el-table-column>
      <!-- <el-table-column show-overflow-tooltip label="所在楼栋">
        <template #default="{ row }">
          <el-tag v-for="item in row.buildObjs" :key="item.buildId">
            {{ item.buildName }}
          </el-tag>
        </template>
      </el-table-column> -->
      <el-table-column show-overflow-tooltip label="操作" width="180px">
        <template #default="{ row }">
          <el-button type="text">设置</el-button>
          <el-button type="text" @click="handleEdit(row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <table-edit ref="edit" @fetchData="fetchData"></table-edit>
  </div>
</template>

<script>
  import { getCampusList, deleteCampus } from '@/api/table'
  import TableEdit from './components/TableEdit'
  export default {
    name: 'VueAdminBetterIndex',
    components: {
      TableEdit,
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
        this.listLoading = true
        const datalist = await getCampusList()
        this.list = datalist.data
        datalist.data.forEach((item) => {
          this.buildObjs = item.buildObjs
        })
        console.log(datalist.data, 'datalist')
        setTimeout(() => {
          this.listLoading = false
        }, 500)
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
        this.$refs['edit'].showEdit()
      },
      handleEdit(row) {
        console.log(row, 'row')
        this.$refs['edit'].showEdit(row)
      },
      async handleDelete(row) {
        console.log(row, 'rowd')
        let areaId = { areaid: row.areaId }
        let res = await deleteCampus(areaId)
        if (res.resultCode == 0) {
          this.$message('删除成功')
        }
        this.fetchData()
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
