<template>
  <el-dialog
    v-dialogDrag
    :title="title"
    :visible.sync="dialogFormVisible"
    width="70%"
    @close="close"
  >
    <div class="table-container">
      <div class="right">
        <div>
          <el-form
            ref="form"
            :model="queryForm"
            :inline="true"
            class="inputtotal"
            @submit.native.prevent
          >
            <el-form-item>
              <label class="lb">房名:</label>
              <el-input v-model="value1" class="ei" type="text"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                icon="el-icon-search"
                type="primary"
                native-type="submit"
              >
                查询
              </el-button>
              <el-button icon="el-icon-refresh" type="primary">
                刷新钥匙列表
              </el-button>
              <el-button
                icon="el-icon-refresh"
                type="primary"
                @click="shouquan"
              >
                授权新钥匙
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table
          ref="tableSort"
          border
          :data="listq"
          :header-cell-style="{ 'text-align': 'left'}"
          :cell-style="{ 'text-align': 'left' }"
          style="width: 100%"
        >
          <el-table-column
            show-overflow-tooltip
            prop=""
            label="钥匙编号"
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
            label="设备标识"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="idCard"
            label="卡号"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop=""
            label="密码"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop=""
            label="指纹"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop=""
            label="冻结"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop=""
            label="同步"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop=""
            label="授权开始"
          ></el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="idCard"
            label="授权结束"
          ></el-table-column>
          <el-table-column show-overflow-tooltip prop="" label="操作">
            <template #default="{ row }">
              <el-button type="text" @click="handleDelete(row)">删除</el-button>
              <el-button type="text" @click="handlefreeze(row)">冻结</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <permission-popup ref="keyrole"></permission-popup>
  </el-dialog>
</template>

<script>
  import PermissionPopup from './PermissionPopup'

  export default {
    components: { PermissionPopup },
    data() {
      return {
        list: [],
        listq: [{ idCard: 3 }],
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
        value1: '',
      }
    },
    methods: {
      showEdit(row) {
        this.title = '授权钥匙'
        this.dialogFormVisible = true
      },
      async fetchData() {
        // let data = await getNetlockLogList(query)
      },
      save() {
        this.dialogFormVisible = false
      },
      close() {
        this.dialogFormVisible = false
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
      handleDelete() {},
      shouquan() {
        this.$refs['keyrole'].showEdit()
      },
      handlefreeze(row) {
        this.$confirm('是否冻结该钥匙?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning',
        })
          .then(() => {
            this.$message({
              type: 'success',
              message: '冻结成功!',
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消冻结',
            })
          })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .inputtotal {
    width: 100%;
    float: left;
    // border: 1px solid saddlebrown;

    .ei {
      float: right;
      width: 190px;
    }
    .lb {
      // border: 1px solid saddlebrown;
      float: left;
      margin-right: 10px;
    }
  }
</style>
