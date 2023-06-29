<template>
  <div class="table-container">
    <div class="btntotal">
      <el-button icon="el-icon-plus" type="primary" @click="handleImport">
        导入
      </el-button>
    </div>

    <div class="inputtotal">
      <el-form
        ref="form"
        :model="queryForm"
        :inline="true"
        @submit.native.prevent
      >
        <el-form-item>
          <label class="lb">园区:</label>
          <el-input v-model="queryForm.title" class="ei" placeholder="姓名" />
        </el-form-item>
        <el-form-item>
          <label class="lb">楼栋:</label>
          <el-input v-model="queryForm.title" class="ei" placeholder="姓名" />
        </el-form-item>
        <el-form-item>
          <el-button
            icon="el-icon-search"
            type="primary"
            native-type="submit"
            @click="handleQuery"
          >
            查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      ref="tableSort"
      v-loading="listLoading"
      border
      :data="[]"
      :element-loading-text="elementLoadingText"
      :header-cell-style="{ 'text-align': 'center'}"
      :cell-style="{ 'text-align': 'center' }"
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
        prop="areaName"
        label="网关"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="areaAddress"
        label="门锁"
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
        width="150px"
        fixed="right"
      >
        <template #default="{ row }">
          <el-button type="text" @click="handleEdit(row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <table-edit ref="edit" @fetchData="fetchData"></table-edit>
  </div>
</template>

<script>
  import { getCampusList, getDeviceListPage } from '@/api/table'
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
          pageSize: 20,
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
        const datalist = await getDeviceListPage()
        this.list = datalist.data.datas
        // datalist.data.forEach((item) => {
        //   this.buildObjs = item.buildObjs
        // })
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
        this.$refs['edit'].showEdit()
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
  .inputtotal {
    width: 70%;
    float: left;
    // border: 1px solid saddlebrown;

    .ei {
      float: right;
      width: 200px;
    }
    .lb {
      // border: 1px solid saddlebrown;
      float: left;
      margin-right: 10px;
    }
  }
</style>
