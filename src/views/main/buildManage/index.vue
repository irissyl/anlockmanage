<template>
  <div class="table-container">
    <div class="lefttree">
      <div style="padding-left: 14px" class="btns">
        <el-button
          type="text"
          size="big"
          icon="el-icon-circle-plus-outline"
          @click="() => addappend(data)"
        ></el-button>
        <el-button
          type="text"
          size="big"
          icon="el-icon-delete"
          @click="() => deleteappend(data)"
        ></el-button>
      </div>
      <!-- <label for="">建筑列表：</label> -->
      <el-tree
        class="tree"
        :data="data"
        :props="defaultProps"
        node-key="id"
        :default-expanded-keys="[1, 2, 3]"
        @node-click="handleNodeClick"
      >
        <span slot-scope="{ node, data }">
          <i :class="data.icon" :style="`color: ${data.color}`"></i>
          <span style="padding-left: 4px">{{ node.label }}</span>
        </span>
      </el-tree>
    </div>

    <div class="btntotal">
      <el-button icon="el-icon-plus" type="primary" @click="handleAdd">
        添加房间
      </el-button>
      <el-button icon="el-icon-plus" type="primary">导入表格</el-button>
    </div>
    <el-table
      ref="tableSort"
      v-loading="listLoading"
      border
      :data="lists"
      :element-loading-text="elementLoadingText"
      :header-cell-style="{ 'text-align': 'center', background: '#f5f7fa' }"
      :cell-style="{ 'text-align': 'center' }"
      style="width: 85%; float: right"
      @selection-change="setSelectRows"
      @sort-change="tableSortChange"
    >
      <el-table-column
        show-overflow-tooltip
        prop="areaName"
        label="名称"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop=""
        label="编号"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop=""
        label="别名"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop=""
        label="入住情况"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop=""
        label="入住性别"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop=""
        label="建筑类型"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="操作" fixed="right">
        <template #default="{ row }">
          <el-button
            type="text"
            icon="el-icon-edit"
            @click="handleEdit(row)"
          ></el-button>
          <el-button
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <table-edit ref="edit" @fetchData="fetchData"></table-edit>
    <fj-table-edit ref="fangjian" @fetchData="fetchData"></fj-table-edit>
    <loudongTableEdit ref="loudong" @fetchData="fetchData"></loudongTableEdit>
    <yuanqu-edit ref="yuanqu" @fetchData="fetchData"></yuanqu-edit>
    <open-door-record ref="open" @fetchData="fetchData"></open-door-record>
    <jianzhuDialog ref="jianzhu" @fetchData="fetchData"></jianzhuDialog>
  </div>
</template>

<script>
  import { getCampusList, deleteCampus } from '@/api/table'
  import TableEdit from './components/TableEdit'
  import FjTableEdit from './components/fjTableEdit.vue'
  import loudongTableEdit from './components/loudongTableEdit.vue'
  import YuanquEdit from './components/yuanquEdit.vue'
  import OpenDoorRecord from './components/openDoorRecord.vue'
  import jianzhuDialog from './components/jianzhuDialog.vue'
  export default {
    name: 'VueAdminBetterIndex',
    components: {
      TableEdit,
      FjTableEdit,
      loudongTableEdit,
      YuanquEdit,
      OpenDoorRecord,
      jianzhuDialog,
    },
    data() {
      return {
        list: [],
        lists: [{ areaName: '呼呼' }],
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
        data: [
          {
            id: 1,
            label: '狐狸园区',
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
      height() {
        return this.$baseTableHeight()
      },
    },

    created() {
      this.fetchData()
    },

    methods: {
      async fetchData() {
        this.listLoading = true
        const datalist = await getCampusList()
        this.list = datalist.data
        datalist.data.forEach((item) => {
          this.buildObjs = item.buildObjs
        })
        console.log(datalist.data, 'datalist')
        this.listLoading = false
      },
      lockcheckedChange(val) {
        if (val == true) {
          this.lockshow = true
        } else {
          this.lockshow = false
        }
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
      changkai() {
        this.ckVisible = true
      },
      handleAdd() {
        this.$refs['yuanqu'].showEdit()
      },
      handleEdit(row) {
        console.log(row, 'row')
        this.$refs['edit'].showEdit(row)
      },
      handleloudong() {
        this.$refs['loudong'].showEdit()
      },
      handlefangjian() {
        this.$refs['fangjian'].showEdit()
      },
      open() {
        this.$refs['open'].showEdit()
      },
      handleDelete(row) {
        console.log(row, 'rowd')
      },
      handleNodeClick(data) {
        console.log(data, 'data1')
      },
      addappend(data) {
        this.$refs['jianzhu'].showEdit()
      },
      deleteappend(data) {
        console.log(data)
      },
    },
  }
</script>

<style lang="scss">
  .btntotal {
    float: right;
    margin-bottom: 10px;
  }

  .lefttree {
    width: 12%;
    height: 560px;
    float: left;
    margin-top: -10px;
  }

  .tree {
    .btns {
      font-size: 20px;

      .el-icon-circle-plus-outline {
        font-size: 20px;
      }
    }
    .el-tree-node__content {
      padding: 0 !important;
      border-radius: 5px;
      border: 1px rgb(161, 160, 160) dashed;
      margin-top: 15px;
      text-align: left;
      font-size: 17px;
      height: 40px;
    }
    .el-tree-node__content:hover {
      border: 1px #f26a4f dashed;
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
      background-color: #f7ff063c;
      color: #000000 !important;
      font-size: 15px;
    }
  }
</style>
