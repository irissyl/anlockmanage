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
                <el-button type="text" size="small"  @click="handleChangeroom(scope.row)">调换房间</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="退宿处理" name="third">退宿处理</el-tab-pane>
        <el-tab-pane label="名单状态" name="fourth">名单状态</el-tab-pane>
        <el-tab-pane label="开关情况" name="five">开关情况</el-tab-pane>
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
  components: { treeTransfer,PermissionPopup, },
  name: 'AnlockmanageHouseholdManange',

  data () {
    return {
      dialogVisible: false,
      activeName: 'first',
      dataSource: tree,
      defaultValue: [],
      tableData:[{name:'雷诗云'}]
    };
  },

  mounted () {

  },

  methods: {
    showEdit (row, Builddata) {
      this.dialogVisible = true
    },
    handleClose (done) {
      this.dialogVisible = false
    },
    handleClick (tab, event) {
      console.log(tab, event);
    },
    handleChangeroom(row){
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