<template>
  <div class="build-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :lg="5" :xl="5">
        <el-card class="treeall1" shadow="never">
          <el-tree class="tree" :data="treedata" :props="defaultProps" node-key="id" :default-expanded-keys="[1, 2, 3]" @node-click="handleNodeClick">
            <span slot-scope="{ node, data }">
              <i :class="data.icon" :style="`color: ${data.color}`"></i>
              <span style="padding-left: 4px">{{ node.label }}</span>
            </span>
          </el-tree>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="19" :xl="19">
        <div class="righttable1">
          <div class="btntotal21">
              <el-button icon="el-icon-circle-plus-outline" type="primary" @click="handleAdd">房间管理</el-button>
              <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addappend">建筑管理</el-button>
            <el-button icon="el-icon-plus" type="primary">导入表格</el-button>
          </div> 
          <el-table ref="tableSort" height="700" v-loading="listLoading" style="width: 95%;margin:0 auto;" :data="lists"  @selection-change="setSelectRows"
            @sort-change="tableSortChange">
            <el-table-column show-overflow-tooltip prop="areaName" label="房间名称"></el-table-column>
            <el-table-column show-overflow-tooltip prop="" label="房间编号"></el-table-column>
            <el-table-column show-overflow-tooltip prop="" label="门锁编号"></el-table-column>
            <el-table-column show-overflow-tooltip prop="" label="水表编号"></el-table-column>
            <el-table-column show-overflow-tooltip prop="" label="电表编号"></el-table-column>
            <el-table-column show-overflow-tooltip prop="" label="授权人数">
              <template #default="{ row }">
                <el-tag type="danger">5/100</el-tag>
              </template>
            </el-table-column>
            <el-table-column show-overflow-tooltip width="300px" prop="" label="操作">
              <template #default="{ row }">
                <el-button type="primary" icon="el-icon-edit" @click="handleEdit(row)" plain></el-button>
                <el-button type="primary" icon="el-icon-delete" @click="handleDelete(row)" plain></el-button>
                <el-button type="primary" @click="openRecord(row)" plain>开锁记录</el-button>
                <el-button type="primary"  @click="remote(row)" plain>远程开锁</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
      <table-edit ref="edit" @fetchData="fetchData"></table-edit>
      <fj-table-edit ref="fangjian" @fetchData="fetchData"></fj-table-edit>
      <jianzhuDialog ref="jianzhu" @fetchData="fetchData"></jianzhuDialog>
      <open-door-record  ref="record" @fetchData="fetchData"></open-door-record>
  </div>
</template>

<script>
import { getCampusList, deleteCampus } from '@/api/table'
import TableEdit from './components/TableEdit'
import FjTableEdit from './components/fjTableEdit.vue'
import jianzhuDialog from './components/jianzhuDialog.vue'
import OpenDoorRecord from '../../NewPage/BuildingArchives/components/openDoorRecord.vue'
export default {
  name: 'VueAdminBetterIndex',
  components: {
    TableEdit,
    FjTableEdit,
    jianzhuDialog,
    OpenDoorRecord,
  },
  data () {
    return {
      list: [],
      lists: [{ areaName: '呼呼' }],
      imageList: [],
      form: {
        appld: '',
        appSecret: '',
        builds: '',
      },
      nodetitle: '添加片区',
      ckVisible: false,
      startTime: '',
      endTime: '',
      value1: '',
      listLoading: true,
      lockshow: false,
      lockchecked: false,
      layout: 'total, sizes, prev, pager, next, jumper',
      total: 0,
      background: true,
      selectRows: '',
      elementLoadingText: '正在加载...',
      Builddata: [],
      buildObjs: [],
      treedata: [
        {
          id: 1,
          label: '狐狸片区',
          children: [
            {
              id: 3,
              label: 'anlock办公楼',
              children: [
                {
                  id: 4,
                  label: '1层',
                },
                {
                  id: 5,
                  label: '2层',
                  disabled: true,
                },
              ],
            },
            {
              id: 2,
              label: 'anlock研发楼',
              disabled: true,
              children: [
                {
                  id: 6,
                  label: '1层',
                },
                {
                  id: 7,
                  label: '2层',
                  disabled: true,
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
        icon: 'icon',
      },
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
      this.listLoading = true
      const datalist = await getCampusList()
      this.list = datalist.data
      datalist.data.forEach((item) => {
        this.buildObjs = item.buildObjs
      })
      console.log(datalist.data, 'datalist')
      this.listLoading = false
    },
    openRecord(row){
      this.$refs['record'].showEdit()
    },
    remote(row){
      this.$confirm('您确认是否对此设备进行远程开锁?', '远程开锁', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
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
    handleAdd () {
      this.$refs['fangjian'].showEdit()
    },
    handleEdit (row) {
      console.log(row, 'row')
      this.$refs['edit'].showEdit(row)
    },
    handleDelete (row) {
      console.log(row, 'rowd')
    },
    handleNodeClick () {
    },
    addappend () {
      this.$refs['jianzhu'].showEdit()
    },
    
  },
}
</script>

<style lang="scss">
.build-container{
  padding: 0 !important;
  margin: 0 !important;
  background: #f5f7f8 !important;

  .btntotal21 {
  float: right;
  margin-bottom: 20px;
  margin-top: 20px;


  button {
    margin-right: 5px;
  }
}

.lefttree1 {
  width: 100%;
  background-color: #fff;
}
.righttable1 {
  width: 100%;
  background-color: #fff;
}

.tree {

  .btns {
    float: right;
    width: 20px;
    font-size: 25px;
  }
  .nodeslot {
    text-align: left;
    width: 100%;
  }
  .el-tree-node__content {
    padding: 0 !important;
    border-radius: 5px;
    border: 1px rgb(161, 160, 160) dashed;
    margin-top: 15px;
    font-size: 17px;
    text-align: right;
    width: 180px;
    height: 40px;
  }
  .el-tree-node__content:hover {
    border: 1px #f2934f dashed;
    background-color: #fff;
  }
  .el-tree-node {
    position: relative;
    padding-left: 15px;
  }
  .el-tree-node__children {
    padding-left: 15px;
  }

  // 竖线
  .el-tree-node::before {
    content: '';
    height: 100%;
    width: 1px;
    position: absolute;
    left: -3px;
    top: -26px;
    border-width: 1px;
    border-left: 1px dashed #a9aeb6;
  }

  .el-tree-node:last-child::before {
    height: 38px;
  }

  // 横线
  .el-tree-node::after {
    content: '';
    width: 20px;
    height: 20px;
    position: absolute;
    left: -3px;
    top: 12px;
    border-width: 1px;
    border-top: 1px dashed #848d9c;
  }

  & > .el-tree-node::after {
    border-top: none;
  }
  & > .el-tree-node::before {
    border-left: none;
  }

  .el-tree-node__expand-icon {
    font-size: 16px;
  }
  .el-tree-node__expand-icon.expanded {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  .el-tree-node__expand-icon.expanded {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  /* //有子节点 且未展开 */
  .el-icon-caret-right:before {
    content: url('../../../assets/erji.png');
    display: block;
    width: 20px;
    height: 20px;
    font-size: 16px;
    background-size: 16px;
  }
  /* //有子节点 且已展开 */
  .el-tree-node__expand-icon.expanded.el-icon-caret-right:before {
    content: url('../../../assets/yiji.png');
    display: block;
    width: 20px;
    height: 20px;
    font-size: 16px;
    background-size: 16px;
  }
  /* //没有子节点 */
  .el-tree-node__expand-icon.is-leaf::before {
    
    content: '';
    display: block;
    width: 0px;
    height: 0px;
    font-size: 16px;
    background-size: 16px;
  }
  /* //高亮字体颜色 */
  .el-tree-node.is-current > .el-tree-node__content {
    background-color: #ff06061d;
    color: #000000 !important;
    font-size: 15px;
  }
}
}

</style>
