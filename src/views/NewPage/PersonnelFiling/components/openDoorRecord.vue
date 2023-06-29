<template>
  <el-dialog
    v-dialogDrag
    :title="title"
    :visible.sync="dialogFormVisible"
    width="70%"
    destroy-on-close
    @close="close"
  >
    <div class="btntotal">
      <el-form
        ref="form"
        :model="queryForm"
        :inline="true"
        @submit.native.prevent
      >
        <el-form-item>
          <label class="lb">查询时间段开锁日志 :</label>
          <el-date-picker
            v-model="value1"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changes"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" type="primary" @click="fetchData">
            查询
          </el-button>
          <el-button icon="el-icon-plus" type="primary" @click="handleExport">
            导出表格
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-container">
      <el-table
        ref="tableSort"
        border
        :data="[]"
        :header-cell-style="{ 'text-align': 'left'}"
        :cell-style="{ 'text-align': 'left' }"
        style="width: 100%"
      >
        <el-table-column show-overflow-tooltip label="序号" width="95">
          <template #default="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="customerName"
          label="门锁名称"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="keycount"
          label="命令"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="mobile"
          label="卡片类型"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="idCard"
          label="卡号/用户名/密码时间"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="rentContent"
          label="开锁时间"
        ></el-table-column>
      </el-table>
    </div>
  </el-dialog>
</template>

<script>
  import { doEdit, getNetlockLogListSearch } from '@/api/table'

  export default {
    data() {
      return {
        list: [],
        form: {
          title: '',
          author: '',
        },
        listLoading: true,
        total: 0,
        background: true,
        queryForm: {
          pageNo: 1,
          pageSize: 10,
          title: '',
        },
        title: '',
        dialogFormVisible: false,
        rentid: '',
        end: '',
        start: '',
        value1: '',
        datatime: [],
      }
    },
    computed: {},
    created() {},
    methods: {
      showEdit(row) {
        this.title = '开锁记录'
        this.dialogFormVisible = true
        this.rentid = row.rentId
        console.log(row, 'row')
      },
      async fetchData() {
        if (this.datatime.length < 0) {
          this.$message('请先选择开锁日志时间段')
        }
        let data = {
          rentid: this.rentid,
          start: this.datatime[0],
          end: this.datatime[1],
        }
        console.log(data, 'data')
        let Netlockdata = await getNetlockLogListSearch(data, {})
        console.log(Netlockdata, 'Netlockdata')
      },
      changes(val) {
        this.datatime = val
        console.log(val, 'val')
      },
      handleQuery() {
        this.queryForm.pageNo = 1
        this.fetchData()
      },
      handleExport(row) {
        console.log(row, 'row')
      },
      close() {
        this.dialogFormVisible = false
      },
      save() {
        this.dialogFormVisible = false
      },
    },
  }
</script>
<style lang="scss" scoped>
  .btntotal {
    float: right;
    margin-bottom: 10px;
  }
  .lb {
    margin-right: 10px;
  }
</style>
