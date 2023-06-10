<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogFormVisible"
    width="60%"
    @close="close"
  >
    <div class="table-container">
      <div class="right">
        <div class="inputtotal">
          <el-form
            ref="form"
            :model="queryForm"
            :inline="true"
            @submit.native.prevent
          >
            <el-form-item>
              <label class="lb">时间:</label>
              <el-date-picker
                v-model="value1"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
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
              <el-button
                icon="el-icon-plus"
                type="primary"
                @click="handleExport"
              >
                导出表格
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table
          ref="tableSort"
          border
          :data="[]"
          :header-cell-style="{ 'text-align': 'left', background: '#f5f7fa' }"
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
        <!-- <el-pagination
          :background="background"
          :current-page="queryForm.pageNo"
          :layout="layout"
          :page-size="queryForm.pageSize"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        ></el-pagination> -->
      </div>
    </div>
  </el-dialog>
</template>

<script>
  import {
    doEdit,
    getNetlockLogListSearch,
    getNetlockLogList,
  } from '@/api/table'

  export default {
    data() {
      return {
        list: [],
        form: {
          title: '',
          author: '',
        },
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
        rules: {
          title: [{ required: true, trigger: 'blur', message: '请输入标题' }],
          author: [{ required: true, trigger: 'blur', message: '请输入作者' }],
        },
        title: '',
        dialogFormVisible: false,
        rentid: '',
        end: '',
        start: '',
        value1: [new Date(2023, 6, 3, 10, 10), new Date(2000, 10, 11, 10, 10)],
      }
    },
    computed: {},
    created() {},
    methods: {
      showEdit(row) {
        this.title = '开锁记录'
        this.dialogFormVisible = true
      },
      async fetchData() {
        // let data = await getNetlockLogList(query)
      },
      handleSizeChange(val) {
        this.queryForm.pageSize = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val
        this.fetchData()
      },
      handleQuery() {
        this.queryForm.pageNo = 1
        this.fetchData()
      },
      handleExport(row) {
        console.log(row, 'row')
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
        this.$emit('fetch-data')
      },
      save() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            this.$baseMessage(msg, 'success')
            this.$refs['form'].resetFields()
            this.dialogFormVisible = false
            this.$emit('fetch-data')
            this.form = this.$options.data().form
          } else {
            return false
          }
        })
      },
    },
  }
</script>
