<template>
  <div class="housecontainer">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="10" :lg="5" :xl="5">
        <el-card class="treeall1" shadow="never">
          <el-tree class="tree" :data="treedata" :props="defaultProps" node-key="id" :default-expanded-keys="[1, 2, 3]" @node-click="handleNodeClick">
            <span slot-scope="{ node, data }">
              <i :class="data.icon" :style="`color: ${data.color}`"></i>
              <span style="padding-left: 4px">{{ node.label }}</span>
            </span>
          </el-tree>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="20" :lg="19" :xl="19">
        <el-card class="all1" shadow="never" style="height: 800px">
          <div class="grid-content bg-purple">
            <div class="right">
              <div class="inputtotal">
                <el-form ref="form" :model="queryForm" :inline="true">
                  <el-form-item>
                    <label class="lb">姓名:</label>
                    <el-input v-model="queryForm.roomName" class="ei" placeholder="请输入姓名" />
                  </el-form-item>
                  <el-form-item>
                    <label class="lb">手机号:</label>
                    <el-input v-model="queryForm.roomName" class="ei" placeholder="请输入手机号" />
                  </el-form-item>
                  <el-form-item>
                    <label class="lb">证件号:</label>
                    <el-input v-model="queryForm.roomName" class="ei" placeholder="请输入证件号" />
                  </el-form-item>
                  <el-form-item>
                    <label class="lb">卡号:</label>
                    <el-input v-model="queryForm.roomName" class="ei" placeholder="请输入卡号" />
                  </el-form-item>
                  <el-form-item>
                    <el-button icon="el-icon-search" type="info" native-type="submit" @click="handleQuery">
                      查询
                    </el-button>
                  </el-form-item>
                  <el-form-item>
                    <el-button icon="el-icon-s-management" type="primary" @click="handleAddorganization">
                      组织机构管理
                    </el-button>
                  </el-form-item>
                  <el-form-item>
                    <el-button icon="el-icon-s-management" type="primary" @click="handleAdd">
                      人员管理
                    </el-button>
                  </el-form-item>
                  <el-form-item>
                    <el-button icon="el-icon-files" type="primary" @click="uploads">导入表格</el-button>
                  </el-form-item>
                  <!-- <el-form-item>
                    <el-button icon="el-icon-plus" type="primary" @click="uploads">
                      导入门卡
                    </el-button>
                  </el-form-item> -->
                </el-form>
              </div>
              <el-table ref="tableSort" :data="list" :element-loading-text="elementLoadingText" :header-cell-style="{'text-align': 'left'
                }" :cell-style="{ 'text-align': 'left' }" style="width: 99%;margin:0 auto;" @selection-change="setSelectRows" @sort-change="tableSortChange">
                <!-- <el-table-column min-width="110px" show-overflow-tooltip prop="roomNO" label="住户ID"></el-table-column>
                <el-table-column min-width="110px" show-overflow-tooltip prop="roomName" label="住户姓名"></el-table-column>
                <el-table-column show-overflow-tooltip prop="lockKey" label="性别"></el-table-column>
                <el-table-column min-width="120px" show-overflow-tooltip prop="iotTag" label="住户类型"></el-table-column>
                <el-table-column min-width="110px" show-overflow-tooltip prop="" label="所属单位"></el-table-column>
                <el-table-column min-width="110px" show-overflow-tooltip prop="" label="分配状态"></el-table-column>
                <el-table-column min-width="110px" show-overflow-tooltip prop="" label="住户标记"></el-table-column>
                <el-table-column min-width="110px" show-overflow-tooltip prop="" label="是否在宿"></el-table-column>
                <el-table-column min-width="110px" show-overflow-tooltip prop="" label="联系电话"></el-table-column> -->
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column show-overflow-tooltip prop="roomName" label="姓名"></el-table-column>
                <el-table-column show-overflow-tooltip prop="" label="职务"></el-table-column>
                <el-table-column show-overflow-tooltip prop="" label="证件号"></el-table-column>
                <el-table-column show-overflow-tooltip prop="" label="手机"></el-table-column>
                <el-table-column show-overflow-tooltip prop="" label="性别"></el-table-column>
                <el-table-column show-overflow-tooltip prop="" label="房间数">
                  <template>可开门数</template>
                </el-table-column>
                <el-table-column show-overflow-tooltip prop="" label="微信"></el-table-column>
                <el-table-column show-overflow-tooltip prop="" label="左指纹"></el-table-column>
                <el-table-column show-overflow-tooltip prop="" label="右指纹"></el-table-column>
                <el-table-column show-overflow-tooltip prop="" label="卡号"></el-table-column>
                <el-table-column show-overflow-tooltip prop="" label="密码"></el-table-column>
                <el-table-column  show-overflow-tooltip prop="" label="时效"></el-table-column>
                <el-table-column show-overflow-tooltip prop="" label="备注"></el-table-column>
                <el-table-column min-width="110px" show-overflow-tooltip label="操作" width="280px" fixed="right">
                  <template #default="{ row }">
                    <el-button type="primary" icon="el-icon-edit" @click="handleEdit(row)" plain></el-button>
                    <el-button type="primary" icon="el-icon-delete" @click="del(row)" plain></el-button>
                     <el-button type="primary" @click="openRecord(row)" plain>开锁记录</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination :background="background" :current-page="queryForm.pageNo" :layout="layout" :page-size="queryForm.pageSize" :total="total" @current-change="handleCurrentChange" @size-change="handleSizeChange"></el-pagination>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <table-edit ref="edit" @fetchData="fetchData"></table-edit>
    <uploadfile ref="uploads" @fetchData="fetchData"></uploadfile>
    <add-organization ref="organization"></add-organization>
    <fingerprint-card ref="finger" @fetchData="fetchData"></fingerprint-card>
  </div>
</template>

<script>
import { getCampusList, listOfficeDevicePage } from '@/api/table'
import {
  addSingleRoom,
  listRoom,
  addBatchRoom,
  delRoom,
  SetKeepOpen,
} from '@/api/api'
import TableEdit from './components/TableEdit'
import Uploadfile from './components/uploadfile.vue'
import AddOrganization from './components/AddOrganization.vue'
import FingerprintCard from './components/FingerprintCard.vue'
export default {
  name: '',
  components: {
    TableEdit,
    Uploadfile,
    AddOrganization,
    FingerprintCard,
  },
  data () {
    return {
      list: [{ roomNO: 1, roomName: '狐狸房' }],
      imageList: [],
      form: {
        appld: '',
        appSecret: '',
        builds: '',
      },
      ckVisible: false,
      listLoading: true,
      lockshow: false,
      linshidialogVisible: false,
      layout: 'total, sizes, prev, pager, next, jumper',
      total: 0,
      background: true,
      selectRows: '',
      elementLoadingText: '正在加载...',
      queryForm: {
        pageNo: 1,
        pageSize: 10,
        roomName: '',
        roomNO: '',
        buildId: '',
      },
      buildId: '',
      buildObjs: [],
      treedata: [
        {
          id: 1,
          label: '部门列表',
          children: [
            {
              id: 4,
              label: '人事部',
              children: [
              ],
            },
            {
              id: 5,
              label: '研发部',
              children: [
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
      section: '',
    }
  },
  computed: {
    height () {
      return this.$baseTableHeight()
    },
  },

  mounted () {
    this.fetchData()
    this.getdepartmemtData()
  },

  methods: {
    handleNodeClick (data) {
      console.log(data, 'data  ')
      this.section = data.sectionName

      this.buildId = data.builds
      this.fetchData()
    },
    config (row) {
      this.$refs['finger'].showEdit(row)
    },
    uploads () {
      this.$refs['uploads'].showEdit()
    },
    async ckconfirm () {
      // let formdata = {
      //   iottag:
      //   keeptype: this.
      //   timearray
      // }
      //   await SetKeepOpen()
    },
    lockcheckedChange (val) {
      if (val == true) {
        this.lockshow = true
      } else {
        this.lockshow = false
      }
    },
    setKey () {
      this.$refs['keys'].showEdit()
    },
    async getdepartmemtData () {
      const departdatalist = await getCampusList()

      // this.treedata.map((item) => {
      //   if (item.areaId === 1) {
      //     // 找到要合并的元素
      //     item.children = item.children.concat(departdatalist.data) // 将s数组合并到该元素的children属性中
      //   }
      //   return item
      // })
      console.log(departdatalist.data, this.treedata, 'getCampusList')
    },
    async fetchData () {
      // this.listLoading = true
      let formdata = {
        buildId: this.buildId ? this.buildId : '',
        pagenumber: 1,
        pagesize: 10,
        roomNO: this.queryForm.roomNO,
        roomName: this.queryForm.roomName,
      }
      if (this.buildId) {
        let listOfficedatas = await listRoom(formdata)
        this.list = listOfficedatas.data.datas
        this.total = listOfficedatas.data.dataCount
      }
      // this.total = datalist.data.dataCount
      // datalist.data.datas.forEach((item) => {
      //   this.buildObjs = item.buildObjs
      // })
      this.listLoading = false
    },
    async del (row) {
      let data = {
        roomId: row.roomId,
      }
      console.log(row, 'delRoom')
      let res = await delRoom(data)
      if (res.resultCode == 0) {
        this.$message('删除成功')
      }
      this.fetchData()
    },
    handleClose () {
      this.linshidialogVisible = false
    },
    handleSizeChange (val) {
      this.queryForm.pageSize = val
      console.log(this.queryForm.pageSize, 'pageSize')
      this.fetchData()
    },
    handleCurrentChange (val) {
      this.queryForm.pageNo = val
      console.log(this.queryForm.pageNo, 'pageNo')
      this.fetchData()
    },
    handleQuery () {
      this.queryForm.pageNo = 1
      this.fetchData()
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
    record (row) {
      this.$refs['record'].showEdit(row)
    },
    handleyuanqu () {
      this.$refs['yuanqu'].showEdit()
    },
    handleloudong () {
      this.$refs['loudong'].showEdit()
    },
    handlelouceng () {
      this.$refs['louceng'].showEdit()
    },
    batchAdd () {
      let buildId = this.buildId
      this.$refs['batch'].showEdit(buildId)
    },
    handleAdd () {
      this.$refs['edit'].showEdit()
      // let buildId = this.buildId
      // if (buildId) {
      //   this.$refs['edit'].showEdit(buildId)
      // } else {
      //   this.$message('请先选择左边的办公区房间列表')
      // }
    },
    handleAddorganization () {
      this.$refs['organization'].showEdit()
    },
    handleImport (row) {
      console.log(row, 'row')
      // this.$refs['edit'].showEdit()
    },
    handleExport (row) {
      console.log(row, 'row')
      // this.$refs['edit'].showEdit()
    },
    handleEdit (row) {
      this.$refs['edit'].showEdit(row)
    },
    handleDelete (row) {
      console.log(row, 'rowd')
      this.ckVisible = true
    },
  },
}
</script>

<style lang="scss" >
.housecontainer {
  padding: 0 !important;
  margin: 0 !important;
  background: #f5f7f8 !important;

  .btntotal {
    float: right;
    margin-bottom: 20px;
  }
  .inputtotal {
    width: 85%;
    float: left;
    // border: 1px solid saddlebrown;

    .ei {
      float: right;
      width: 200px;
    }
    .lb {
      // border: 1px solid saddlebrown;
      float: left;
      margin-right: 10px;
    }
  }

  .left {
    width: 100%;
    height: 200px;
    float: left;
    margin-top: 5px;
  }

  .right {
    width: 100%;
    float: right;
  }
  .top {
    font-size: 40px;
    color: green;
    text-align: center;
  }
  .botm {
    ul li {
      list-style: none;
      font-size: 15px;
      color: #000;
      font-family: '微软雅黑';
    }
    .room {
      line-height: 40px;
      font-size: 20px;
    }
    .room2 {
      font-size: 17px;
      line-height: 40px;
    }
  }
  .tree {
    .btns {
      font-size: 20px;
    }
    .el-tree-node__content {
      padding: 0 !important;
      border-radius: 5px;
      border: 1px rgb(161, 160, 160) dashed;
      margin-top: 15px;
      text-align: left;
      font-size: 17px;
      height: 40px;
      width: 80%;
    }
    .el-tree-node__content:hover {
      border: 1px #f26a4f dashed;
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
      background-color: #82c6fbbe;
      color: #000000 !important;
      font-size: 15px;
    }
  }

  ::v-deep {
    .el-alert {
      padding: $base-padding;

      &--info.is-light {
        min-height: 82px;
        padding: $base-padding;
        margin-bottom: 15px;
        color: #909399;
        border: 1px solid #ebeef5;
      }
    }

    .el-card__body {
      .echarts {
        width: 100%;
        height: 115px;
      }
    }
  }

  .card {
    ::v-deep {
      .el-card__body {
        .echarts {
          width: 100%;
          height: 305px;
        }
      }
    }
  }

  .bottom {
    padding-top: 20px;
    margin-top: 5px;
    color: #595959;
    text-align: left;
    border-top: 1px solid $base-border-color;
  }

  .table {
    width: 100%;
    color: #666;
    border-collapse: collapse;
    background-color: #fff;

    td {
      position: relative;
      min-height: 20px;
      padding: 9px 15px;
      font-size: 14px;
      line-height: 20px;
      border: 1px solid #e6e6e6;

      &:nth-child(odd) {
        width: 20%;
        text-align: right;
        background-color: #f7f7f7;
      }
    }
  }
}
</style>
