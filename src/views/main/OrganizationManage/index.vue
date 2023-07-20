<template>
  <div class="table-container">
    <div class="righttable">
      <el-table ref="tableSort" v-loading="listLoading" :data="lists" :element-loading-text="elementLoadingText" row-key="id" border :tree-props="{children: 'children'}" max-height="300px" :header-cell-style="{ 'text-align': 'center'}"
        :cell-style="{ 'text-align': 'center' }" @selection-change="setSelectRows" @sort-change="tableSortChange">
        <el-table-column show-overflow-tooltip prop="id" label="编号"></el-table-column>
        <el-table-column show-overflow-tooltip prop="label" label="名称"></el-table-column>
        <el-table-column show-overflow-tooltip prop="" label="类型"></el-table-column>
        <el-table-column show-overflow-tooltip prop="" label="办公地点"></el-table-column>
        <el-table-column show-overflow-tooltip prop="" label="描述"></el-table-column>
        <el-table-column show-overflow-tooltip prop="" label="排序"></el-table-column>
        <el-table-column show-overflow-tooltip label="操作" fixed="right">
          <template #default="{ row }">
            <el-button type="text" icon="el-icon-circle-plus-outline" @click="handleClick(row)"></el-button>
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(row)"></el-button>
            <el-button type="text" icon="el-icon-delete" @click="handleDelete(row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <table-edit ref="edit" @fetchData="fetchData"></table-edit>
    <add-organization ref="organization"></add-organization>
  </div>
</template>

<script>
import TableEdit from './components/TableEdit'
import { getCampusList, deleteCampus } from '@/api/table'
import AddOrganization from './components/AddOrganization.vue'
export default {
  name: 'VueAdminBetterIndex',
  components: {
    TableEdit,
    AddOrganization
  },
  data () {
    return {
      list: [],
      imageList: [],
      form: {
        appld: '',
        appSecret: '',
        builds: '',
      },
      ckVisible: false,
      listLoading: true,
      lockshow: false,
      lockchecked: false,
      background: true,
      selectRows: '',
      elementLoadingText: '正在加载...',
      buildObjs: [],
      lists: [
        {
          id: 2,
          label: '部门列表',
          children: [
            {
              id: 1,
              label: '人事部门',
              children: [],
            },
          ],
        },
      ],
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
    handleClick (row) {
      console.log(this.lists[0].id,row.id,'tableData')
      this.$refs['organization'].showEdit(row,this.lists[0].id)
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

  button {
    float: right;
    margin-bottom: 20px;
  }
}

.righttable {
  width: 100%;
  float: right;
}

.tree {
  .btns {
    float: right;
    width: 20px;
    font-size: 20px;
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
    width: 80%;
    height: 40px;
  }
  .el-tree-node__content:hover {
    border: 1px #f2934f dashed;
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
    background-color: #82c6fbbe;
    color: #000000 !important;
    font-size: 15px;
  }
}
</style>
