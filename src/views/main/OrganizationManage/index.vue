<template>
  <div class="table-container">
    <div class="lefttree">
      <el-tree class="tree" :data="treedata" :props="defaultProps" node-key="id" :default-expanded-keys="[1, 2, 3]" @node-click="handleNodeClick">
        <span slot-scope="{ node, data }" class="nodeslot">
          <i :class="data.icon" :style="`color: ${data.color}`"></i>
          <span style="padding-left: 4px;line-height:40px">{{ node.label }}</span>
          <span class="btns" ><el-button type="text" size="big" icon="el-icon-delete" @click="() => deleteappend(data)"></el-button></span>
        </span>
      </el-tree>
    </div>
    <div class="righttable">
      <div class="btntotal">
        <el-button icon="el-icon-plus" type="primary" @click="handleAdd" >添加</el-button>
      </div>
      <el-table ref="tableSort" v-loading="listLoading"  :data="lists" :element-loading-text="elementLoadingText" :header-cell-style="{ 'text-align': 'center'}" :cell-style="{ 'text-align': 'center' }"
         @selection-change="setSelectRows" @sort-change="tableSortChange">
        <el-table-column show-overflow-tooltip prop="areaName" label="名称"></el-table-column>
        <el-table-column show-overflow-tooltip prop="" label="编号"></el-table-column>
        <el-table-column show-overflow-tooltip prop="" label="区域类型"></el-table-column>
        <el-table-column show-overflow-tooltip prop="" label="办公地点"></el-table-column>
        <el-table-column show-overflow-tooltip prop="" label="联系方式"></el-table-column>
        <el-table-column show-overflow-tooltip prop="" label="描述"></el-table-column>
        <el-table-column show-overflow-tooltip label="操作" fixed="right">
          <template #default="{ row }">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(row)"></el-button>
            <el-button type="text" icon="el-icon-delete" @click="handleDelete(row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <table-edit ref="edit" @fetchData="fetchData"></table-edit>
  </div>
</template>

<script>
import TableEdit from './components/TableEdit'
import { getCampusList, deleteCampus } from '@/api/table'
export default {
  name: 'VueAdminBetterIndex',
  components: {
    TableEdit
  },
  data () {
    return {
      list: [],
      lists: [{ areaName: '研发部' }],
      imageList: [],
      form: {
        appld: '',
        appSecret: '',
        builds: '',
      },
      nodetitle: '添加园区',
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
          label: 'anlock公司',
          children: [
            {
              id: 3,
              label: 'anlock东莞区',
              children: [
                {
                  id: 4,
                  label: '人事部',
                  children: [
                    {
                      id: 6,
                      label: '招聘组',
                    },
                    {
                      id: 7,
                      label: '面试组',
                      disabled: true,
                    },
                  ],
                },
                {
                  id: 5,
                  label: '研发部',
                  // disabled: true,
                  children: [
                    {
                      id: 6,
                      label: '小程序组',
                    },
                    {
                      id: 7,
                      label: '移动端组',
                      disabled: true,
                    },
                  ],
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
    lockcheckedChange (val) {
      if (val == true) {
        this.lockshow = true
      } else {
        this.lockshow = false
      }
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
    changkai () {
      this.ckVisible = true
    },
    handleAdd () {
      this.$refs['edit'].showEdit()
    },
    handleEdit (row) {
      console.log(row, 'row')
      this.$refs['edit'].showEdit(row)
    },

    handlefangjian () {
      this.$refs['fangjian'].showEdit()
    },

    handleDelete (row) {
      console.log(row, 'rowd')
    },
    handleNodeClick (data) {
      console.log(data, 'data1')
    },
    addappend (data) {
      this.$refs['jianzhu'].showEdit()
    },
    deleteappend (data) {
      console.log(data)
    },
  },
}
</script>

<style lang="scss">
.btntotal {
  width: 100%;
  
  button{
    float: right;
    margin-bottom: 20px;
  }
}

.lefttree {
  width: 19%;
  float: left;
  margin-top: 39px;
}
.righttable{
    width: 80%;
    float: right;
}

.tree {
  .btns {
    float: right;
    width: 20px;
    font-size: 20px;
  }
  .nodeslot{
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
    border: 1px #F2934F dashed;
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
    background: #fff;
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
</style>
