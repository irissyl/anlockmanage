<template>
  <div>
    <el-dialog title="房间住户管理" :visible.sync="dialogVisible" width="50%" @close="handleClose">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="办理入住" name="first">
          <div class="trans">
            <tree-transfer ref="treeTransfer" class="transtransfer" :titles="['未分配:', '已分配:']" :button-texts="['删除', '添加人员']" :data-source.sync="dataSource" :default-checked-keys="defaultValue" :is-radio="false" :filterable="true"
              :father-choose="false" @left-check-change="handleLeftCheckChange" @right-check-change="handleRightCheckChange" @change="handleChange"></tree-transfer>
          </div>
        </el-tab-pane>
        <el-tab-pane label="房间调整" name="second">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="编号" width="180"></el-table-column>
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="address" label="性别"></el-table-column>
            <el-table-column prop="address" label="类型"></el-table-column>
            <el-table-column prop="address" label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="handleChangeroom(scope.row)">调换房间</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="退宿处理" name="third">退宿处理</el-tab-pane>
        <el-tab-pane label="名单状态" name="fourth">
          <el-divider content-position="left">未生效白名单</el-divider>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="address" label="未生效白名单"></el-table-column>
            <el-table-column prop="address" label="指纹信息"></el-table-column>
            <el-table-column prop="address" label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="fail(scope.row)">挂失</el-button>
                <el-button type="text" size="small" @click="succeed(scope.row)">生效</el-button>
                <el-button type="text" size="small" @click="reload(scope.row)">重载</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-divider content-position="left">已生效白名单</el-divider>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="address" label="已生效白名单"></el-table-column>
            <el-table-column prop="address" label="指纹信息"></el-table-column>
            <el-table-column prop="address" label="更新时间"></el-table-column>
            <el-table-column prop="address" label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="fail(scope.row)">挂失</el-button>
                <el-button type="text" size="small" @click="reload(scope.row)">重载</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-divider content-position="left">退房名单</el-divider>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="date" label="ID" width="180"></el-table-column>
            <el-table-column prop="address" label="退房名单"></el-table-column>
            <el-table-column prop="address" label="操作">
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="reload(scope.row)">重载</el-button>
                <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="开关情况" name="five">
          <div class="inputtotal">
            <el-form ref="form" :model="queryForm" :inline="true">
              <el-form-item>
                <label class="lb">时间:</label>
                <el-date-picker v-model="timeval" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-checkbox v-model="checked">入库</el-checkbox>
              </el-form-item>
              <el-form-item>
                <el-button icon="el-icon-search" type="info" native-type="submit" @click="handleQuery" size="mini">
                  查询
                </el-button>
              </el-form-item>
            </el-form>
          </div>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="编号" width="180"></el-table-column>
            <el-table-column prop="name" label="姓名" width="180"></el-table-column>
            <el-table-column prop="date" label="卡号" width="180"></el-table-column>
            <el-table-column prop="address" label="刷卡时间"></el-table-column>
            <el-table-column prop="address" label="开门方式"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <permission-popup ref="popup"></permission-popup>
  </div>
</template>

<script>
import treeTransfer from '@/components/tree-transfer.vue'
import PermissionPopup from './PermissionPopup.vue';
const tree = [
  {
    label: 'A部门',
    id: '1',
    children: [
      {
        label: '小明',
        children: [],
        id: '1-1',
      },
      {
        label: '小红',
        children: [],
        id: '1-2',
      },
      {
        label: '小刚',
        children: [],
        id: '1-3',
      },
    ],
  },
  {
    label: 'B部门',
    id: '2',
    children: [
      {
        label: '小王',
        children: [],
        id: '2-1',
      },
      {
        label: '小李',
        children: [],
        id: '2-2',
      },
      {
        label: '小朱',
        children: [],
        id: '2-3',
      },
    ],
  },
]
export default {
  components: { treeTransfer, PermissionPopup, },
  name: 'AnlockmanageHouseholdManange',

  data () {
    return {
      dialogVisible: false,
      activeName: 'first',
      dataSource: tree,
      defaultValue: [],
      tableData: [{ name: '雷诗云' }],
      checked: false,
      timeval: ''
    };
  },

  mounted () {

  },

  methods: {
    showEdit (row, Builddata) {
      this.dialogVisible = true
    },
    succeed (row) {

    },
    fail (row) {

    },
    reload (row) {

    },
    handleClose (done) {
      this.dialogVisible = false
    },
    handleClick (tab, event) {
      console.log(tab, event);
    },
    handleChangeroom (row) {
      this.$refs['popup'].showEdit(row)
    },
    handleChange (value, direction, currentKeys) {
      console.log('handleChange', value, direction, currentKeys)
    },
    handleRightCheckChange (value, currentKeys) {
      console.log('handleRightCheckChange:', value, currentKeys)
    },
    handleLeftCheckChange (value, currentKeys) {
      console.log('handleLeftCheckChange:', value, currentKeys)
    },
  },
};
</script>

<style lang="scss" scoped>
</style>