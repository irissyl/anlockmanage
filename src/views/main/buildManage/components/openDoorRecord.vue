<template>
  <el-dialog
    v-dialogDrag
    :title="title"
    :visible.sync="dialogFormVisible"
    width="60%"
    @close="close"
  >
    <div class="btntotal">
      <el-button type="primary">表格导出</el-button>
    </div>
    <div class="table-container">
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
        this.dialogFormVisible = false
      },
      save() {
        this.dialogFormVisible = false
        // this.$refs['form'].validate(async (valid) => {
        //   if (valid) {
        //     this.$baseMessage(msg, 'success')
        //     this.$refs['form'].resetFields()
        //     this.dialogFormVisible = false
        //     this.$emit('fetch-data')
        //     this.form = this.$options.data().form
        //   } else {
        //     return false
        //   }
        // })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .btntotal {
    float: right;
    margin-bottom: 10px;
  }
</style>
