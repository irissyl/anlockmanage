<template>
  <div class="table-container">
    <el-tree
      class="left"
      :data="data"
      node-key="sectionId"
      :default-expanded-keys="[1]"
      :props="defaultProps"
      @node-click="handleNodeClick"
    ></el-tree>
    <div class="right">
      <div class="btntotal">
        <el-button icon="el-icon-plus" type="primary" @click="handleExport">
          导出名单
        </el-button>
        <el-button icon="el-icon-plus" type="primary" @click="handleImport">
          导入名单
        </el-button>
        <el-button icon="el-icon-plus" type="primary" @click="handleAdd">
          添加名单
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
        </el-form>
      </div>
      <el-table
        ref="tableSort"
        v-loading="listLoading"
        border
        :data="list"
        :element-loading-text="elementLoadingText"
        :height="height"
        :header-cell-style="{ 'text-align': 'left', background: '#f5f7fa' }"
        :cell-style="{ 'text-align': 'left' }"
        style="width: 100%"
        @selection-change="setSelectRows"
        @sort-change="tableSortChange"
      >
        <el-table-column show-overflow-tooltip label="序号" width="95">
          <template #default="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="customerName"
          label="姓名"
        ></el-table-column>
        <el-table-column show-overflow-tooltip label="性别">
          <template #default="{ row }">
            <el-tag>
              <!-- {{ item.sex=='M'}}?{{'男'}}:{{'女'}} -->
              {{ row.sex == 'M' ? '男' : '女' }}
            </el-tag>
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
          prop=""
          label="楼栋"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop=""
          label="房间名称"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop=""
          label="房型"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop=""
          label="床位"
        ></el-table-column>

        <el-table-column
          show-overflow-tooltip
          prop="rentCach"
          label="租金"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="rentDeposit"
          label="押金"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="startTime"
          label="起始时间"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="endTime"
          label="结束时间"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="endTime"
          label="同步"
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
            <el-button type="text">开门记录</el-button>
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

    <table-edit ref="edit" @fetchData="fetchData"></table-edit>
  </div>
</template>

<script>
  import { listHostelRentPage, deleteBuild, listSection } from '@/api/table'
  import TableEdit from './components/TableEdit'
  export default {
    name: 'VueAdminBetterIndex',
    components: {
      TableEdit,
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
        data: [
          {
            sectionId: 1,
            sectionName: '宿舍',
            children: [],
          },
        ],
        defaultProps: {
          children: 'children',
          label: 'sectionName',
        },
        section: '',
      }
    },
    computed: {
      height() {
        return this.$baseTableHeight()
      },
    },

    created() {
      this.fetchData()
      this.getdepartmemtData()
    },

    methods: {
      handleNodeClick(data) {
        this.section = data.sectionName
        this.fetchData()
        console.log(data)
      },
      async getdepartmemtData() {
        const departdatalist = await listSection({})
        this.data.map((item) => {
          if (item.sectionId === 1) {
            // 找到要合并的元素
            item.children = item.children.concat(departdatalist.data) // 将s数组合并到该元素的children属性中
          }
          return item
        })
      },
      async fetchData() {
        // this.listLoading = true
        let formdata = {
          pageNumber: this.queryForm.pageNo,
          pageSize: this.queryForm.pageSize,
          // section: this.section=='宿舍'?'':this.section
        }
        const datalist = await listHostelRentPage(formdata, {})
        this.list = datalist.data.datas
        this.total = datalist.data.dataCount
        // datalist.data.datas.forEach((item) => {
        //   this.buildObjs = item.buildObjs
        // })
        console.log(datalist, this.section, 'fetchData')
        setTimeout(() => {
          this.listLoading = false
        }, 500)
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
        let buildid = { buildid: row.buildId }
        let res = await deleteBuild(buildid)
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

  .left {
    width: 10%;
    height: 560px;
    float: left;
    margin-top: 50px;
    border: 1px solid rgb(231, 231, 231);
  }

  .right {
    width: 88%;
    float: right;
  }
</style>
