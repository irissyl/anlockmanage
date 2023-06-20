<template>
  <div class="table-container">
    <div class="left">
      <el-tree
        :data="treedata"
        node-key="sectionId"
        :default-expanded-keys="[1]"
        :props="defaultProps"
        @node-click="handleNodeClick"
      ></el-tree>
    </div>
    <div class="right">
      <div class="inputtotal">
        <el-form
          ref="form"
          :model="queryForm"
          :inline="true"
          @submit.native.prevent
        >
          <el-form-item>
            <label class="lb">姓名:</label>
            <el-input v-model="queryForm.title" class="ei" placeholder="姓名" />
          </el-form-item>
          <el-form-item>
            <label class="lb">手机号码:</label>
            <el-input
              v-model="queryForm.title"
              class="ei"
              placeholder="手机号码"
            />
          </el-form-item>
          <el-form-item>
            <label class="lb">证件号码:</label>
            <el-input
              v-model="queryForm.title"
              class="ei"
              placeholder="证件号码"
            />
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
          <el-form-item>
            <el-button icon="el-icon-plus" type="primary" @click="handleAdd">
              添加人员
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button
              icon="el-icon-plus"
              type="primary"
              @click="handledepartment"
            >
              添加部门
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-plus" type="primary" @click="handleExport">
              导出名单
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-plus" type="primary" @click="handleImport">
              导入名单
            </el-button>
          </el-form-item>
        </el-form>
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
        <!-- <el-table-column show-overflow-tooltip label="序号" width="95">
          <template #default="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column> -->
        <el-table-column
          show-overflow-tooltip
          prop="customerName"
          label="姓名"
        ></el-table-column>
        <el-table-column show-overflow-tooltip prop="keycount" label="钥匙数">
          <template #default="{ row }">
            <el-button type="primary" plain @click="setKey(row)">
              {{ row.keycount }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="idCard"
          label="证件号码"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="mobile"
          label="手机"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="rentContent"
          label="所属部门"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="rentDoorPass"
          label="开门密码"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="rentCardnoHex"
          label="持卡卡号"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="fingerCount"
          label="指纹"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="rentInputTime"
          label="输入时间"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="rentInputUser"
          label="操作员"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="操作"
          width="150px"
          fixed="right"
        >
          <template #default="{ row }">
            <el-button type="text" @click="handleEdit(row)">编辑</el-button>
            <el-button type="text" @click="handleDelete(row)">删除</el-button>
            <el-button type="text" @click="handleOpen(row)">开门记录</el-button>
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
    </div>
    <add-department ref="department"></add-department>
    <TableEdit ref="edit" @fetchData="fetchData"></TableEdit>
    <OpenDoorRecord ref="opendoor" @fetchData="fetchData"></OpenDoorRecord>
    <keys ref="keys" @fetchData="fetchData"></keys>
  </div>
</template>

<script>
  import {
    listRentCustomerPage,
    deleteBuild,
    listSection,
    delOfficeRent,
  } from '@/api/table'
  import TableEdit from './components/TableEdit'
  import OpenDoorRecord from './components/openDoorRecord'
  import AddDepartment from './components/AddDepartment.vue'
  import Keys from './components/keys.vue'
  export default {
    name: 'VueAdminBetterIndex',
    components: {
      TableEdit,
      OpenDoorRecord,
      AddDepartment,
      Keys,
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
        queryForm: {
          pageNo: 1,
          pageSize: 10,
          title: '',
        },
        Builddata: [],
        buildObjs: [],
        treedata: [
          {
            sectionId: 1,
            sectionName: '部门',
            children: [],
          },
        ],
        defaultProps: {
          children: 'children',
          label: 'sectionName',
        },
        section: '',
        opendoor: false,
        treedatadepart: [],
      }
    },
    computed: {
      height() {
        return this.$baseTableHeight()
      },
    },

    mounted() {
      this.fetchData()
      this.getdepartmemtData()
    },

    methods: {
      handleOpen(row) {
        console.log(row, 'opendoor')
        this.$refs['opendoor'].showEdit(row)
      },
      handleNodeClick(data) {
        this.section = data.sectionName
        this.fetchData()
        console.log(data)
      },
      async getdepartmemtData() {
        const departdatalist = await listSection({})
        console.log(departdatalist, this.treedata, 'departdatalist')
        this.treedata.map((item) => {
          if (item.sectionId === 1) {
            // 找到要合并的元素
            item.children = item.children.concat(departdatalist.data) // 将数组合并到该元素的children属性中
          }
          return item
        })
        console.log(this.treedata, 'this.treedata')
      },
      async fetchData() {
        // this.listLoading = true
        let formdata = {
          pageNumber: this.queryForm.pageNo,
          pageSize: this.queryForm.pageSize,
          pagenumber: 1,
          pagesize: 10,
          section: this.section == '办公室' ? '' : this.section,
        }
        console.log(formdata, 'formdata')
        const datalist = await listRentCustomerPage(formdata, {})
        this.list = datalist.data.datas
        this.total = datalist.data.dataCount
        // datalist.data.datas.forEach((item) => {
        //   this.buildObjs = item.buildObjs
        // })
        console.log(datalist, 'datalist')
        this.listLoading = false
      },
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
      handledepartment() {
        this.$refs['department'].showEdit()
      },
      setKey() {
        this.$refs['keys'].showEdit()
      },
      handleAdd() {
        this.$refs['edit'].showEdit()
      },
      handleImport(row) {
        console.log(row, 'row')

        // this.$refs['edit'].showEdit()
      },
      handleExport(row) {
        console.log(row, 'row')
        // this.$refs['edit'].showEdit()
      },
      handleEdit(row) {
        console.log(row, 'editrow')
        this.$refs['edit'].showEdit(row)
      },
      async handleDelete(row) {
        console.log(row, 'rowd')
        let rentId = { rentId: row.rentId }
        let res = await delOfficeRent(rentId)
        if (res.resultCode == 0) {
          this.$message('删除成功')
        }
        this.fetchData()
      },
    },
  }
</script>

<style lang="scss" scoped>
  .left {
    float: left;
    width: 10%;
    margin-top: 50px;
    border: 1px solid rgb(231, 231, 231);
  }

  .right {
    width: 88%;
    float: right;

    .inputtotal {
      width: 90%;
      float: left;
      // border: 1px solid saddlebrown;

      .ei {
        float: right;
        width: 150px;
      }
      .lb {
        // border: 1px solid saddlebrown;
        float: left;
        margin-right: 10px;
      }
    }
  }
</style>
