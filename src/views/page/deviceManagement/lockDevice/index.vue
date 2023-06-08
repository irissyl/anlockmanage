<template>
  <div class="table-container">
    <div class="btntotal">
      <el-button icon="el-icon-plus" type="primary" @click="handleAdd">
        添加门锁设备
      </el-button>
      <el-button type="primary">表格导出</el-button>
      <el-button type="primary" @click="lockSet">门锁批量设置</el-button>
      <el-button type="primary" @click="fetchData">刷新设备列表</el-button>
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
      :header-cell-style="{ 'text-align': 'left', background: '#f5f7fa' }"
      style="width: 100%"
      @selection-change="setSelectRows"
      @sort-change="tableSortChange"
    >
      <el-table-column
        show-overflow-tooltip
        width="110"
        prop="iotTag"
        label="设备标识"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="iotName"
        width="110"
        label="房间名称"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="设备类型" width="110">
        <template #default="{ row }">
          {{ row.iotType == 1 ? '门锁' : '未知' }}
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="协议" width="110">
        <template #default="{ row }">
          <span v-if="row.procotol == 0">433无线</span>
          <span v-if="row.procotol == 1">NBIOT</span>
          <span v-if="row.procotol == 2">WIFI</span>
          <span v-if="row.procotol == 3">LORA</span>
          <span v-if="row.procotol == 4">BLEA</span>
          <span v-if="row.procotol == 5">BLEB</span>
          <span v-if="row.procotol == 15">BLEB</span>
          <span v-if="row.procotol == 6">电信NBIOT</span>
          <span v-if="row.procotol == 7">电信NBIOT-ZF</span>
          <!-- {{ row.procotol == 1 ? '门锁' : '无' }} -->
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="floorno"
        label="楼栋"
        width="110"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="heartbeatSecond"
        label="心跳间隔(秒)"
        width="110"
      ></el-table-column>

      <el-table-column
        show-overflow-tooltip
        prop="heartbeatTime"
        width="110"
        label="最后一次心跳"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="logTime"
        label="最后开门时间"
        width="110"
      ></el-table-column>

      <el-table-column
        show-overflow-tooltip
        prop="createTime"
        label="创建时间"
        width="110"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="areaAddress"
        label="电压"
        width="110"
      >
        <template #default="{ row }">
          {{ row.iotlastValueJson?.voltage }}
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="设备状态" width="110">
        <template #default="{ row }">
          <el-tag v-if="row.iotlastValueJson" type="warning">
            信号强度:{{ row.iotlastValueJson?.rssi }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="romVer"
        label="固件版本"
        width="110"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="lockType"
        label="固件状态"
        width="110"
      >
        <template #default="{ row }">
          <el-tag v-if="row.romInfo">
            {{ JSON.parse(row.romInfo).update == true ? '等待升级' : '' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="logTime"
        width="110"
        label="固件更新时间"
      >
        <template #default="{ row }">
          <span v-if="row.romInfo">
            {{ JSON.parse(row.romInfo).updatetime }}
          </span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="remark"
        width="110"
        label="备注"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="操作"
        width="120px"
        fixed="right"
      >
        <template #default="{ row }">
          <el-button type="text">设置</el-button>
          <el-button type="text" @click="handleEdit(row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :background="background"
      :current-page="queryForm.pageNo"
      :layout="layout"
      :page-size="queryForm.pageSize"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
    <table-edit ref="edit" @fetchData="fetchData"></table-edit>
    <LockParameter ref="lockParameter" @fetchData="fetchData"></LockParameter>
  </div>
</template>

<script>
  import { getDeviceListPage } from '@/api/table'
  import TableEdit from './components/TableEdit'
  import LockParameter from './components/lockParameter.vue'
  export default {
    name: 'VueAdminBetterIndex',
    components: {
      TableEdit,
      LockParameter,
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
        formdata: {
          name: '',
        },
      }
    },
    computed: {
      height() {
        return this.$baseTableHeight()
      },
    },

    async mounted() {
      await this.fetchData()
    },
    methods: {
      async fetchData() {
        this.listLoading = true
        const datalist = await getDeviceListPage()
        this.list = datalist.data.datas
        // datalist.data.forEach((item) => {
        //   this.buildObjs = item.buildObjs
        // })
        console.log(datalist, 'datalist')
        setTimeout(() => {
          this.listLoading = false
        }, 500)
      },
      addLockDevice() {},
      handleSizeChange(val) {
        this.queryForm.pageSize = val
        console.log(this.queryForm.pageSize, 'pageSize')
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val
        console.log(this.queryForm.pageNo, 'pageNo')
        this.fetchData()
      },
      handleQuery() {
        this.queryForm.pageNo = 1
        this.fetchData()
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
      lockSet() {
        this.$refs['lockParameter'].showEdit()
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
