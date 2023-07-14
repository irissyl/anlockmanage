<template>
  <div class="table-container">
    <div style="float: right;margin-bottom:20px">
        <el-button type="primary" >添加</el-button>
       <el-button type="primary" >批量导出</el-button>
    </div>
    <el-table ref="tableSort" :data="list" :element-loading-text="elementLoadingText" :header-cell-style="{ 'text-align': 'center'}" :cell-style="{ 'text-align': 'center' }" style="width: 100%" @selection-change="setSelectRows"
      @sort-change="tableSortChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column show-overflow-tooltip prop="iotTag" label="门锁编号"></el-table-column>
      <el-table-column show-overflow-tooltip prop="" label="房间编号"></el-table-column>
      <el-table-column show-overflow-tooltip prop="" label="电池电压"></el-table-column>
      <el-table-column show-overflow-tooltip prop="" label="固件版本"></el-table-column>
      <el-table-column show-overflow-tooltip prop="" label="IMEI"></el-table-column>
      <el-table-column show-overflow-tooltip prop="" label="NB卡号"></el-table-column>
      <el-table-column show-overflow-tooltip prop="" label="运营商"></el-table-column>
      <el-table-column show-overflow-tooltip prop="" label="年费到期日"></el-table-column>
      <el-table-column show-overflow-tooltip prop="" label="账号"></el-table-column>
      <el-table-column show-overflow-tooltip label="操作" width="180px">
        <template #default="{ row }">
          <el-button type="primary" @click="handleEdit(row)" plain>编辑</el-button>
          <el-button type="primary" plain>删除</el-button>
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
  data () {
    return {
      list: [{iotTag:1143232}],
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
    height () {
      return this.$baseTableHeight()
    },
  },
  created () {
    this.fetchData()
  },

  methods: {
    async fetchData () {
      // this.listLoading = true
      // const datalist = await getCampusList()
      // this.list = datalist.data
      // datalist.data.forEach((item) => {
      //   this.buildObjs = item.buildObjs
      // })
      // console.log(datalist.data, 'datalist')
      // this.listLoading = false
    },
    tableSortChange () {
      const imageList = []
      this.$refs.tableSort.tableData.forEach((item, index) => {
        imageList.push(item.img)
      })
      this.imageList = imageList
    },
    setSelectRows (val) {
      this.selectRows = val
    },
    handleEdit (row) {
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
