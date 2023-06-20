<template>
  <div class="index-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="10" :lg="4" :xl="4">
        <el-card class="all1" shadow="never">
          <el-tree
            class="left"
            :data="data"
            node-key="areaId"
            :default-expanded-keys="[1]"
            :props="defaultProps"
            @node-click="handleNodeClick"
          >
            <span
              slot-scope="{ data }"
              class="custom-tree-node"
              :class="data.class"
            >
              <span>
                <i :class="data.icon"></i>
                {{ data.areaName }}
              </span>
            </span>
          </el-tree>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
        <el-card class="all1" shadow="never" style="height: 800px">
          <div class="grid-content bg-purple">
            <div class="right">
              <div class="btntotal">
                <el-button
                  icon="el-icon-plus"
                  type="primary"
                  @click="handleyuanqu"
                >
                  园区
                </el-button>
                <el-button
                  icon="el-icon-plus"
                  type="primary"
                  @click="handleloudong"
                >
                  楼栋
                </el-button>
                <el-button
                  icon="el-icon-plus"
                  type="primary"
                  @click="handlelouceng"
                >
                  楼层
                </el-button>
                <el-button
                  icon="el-icon-plus"
                  type="primary"
                  @click="handleAdd"
                >
                  单个房间
                </el-button>
                <el-button icon="el-icon-plus" type="primary" @click="batchAdd">
                  批量创建房间
                </el-button>
              </div>

              <div class="inputtotal">
                <el-form ref="form" :model="queryForm" :inline="true">
                  <el-form-item>
                    <label class="lb">房间名称:</label>
                    <el-input
                      v-model="queryForm.title"
                      class="ei"
                      placeholder="姓名"
                    />
                  </el-form-item>
                  <el-form-item>
                    <label class="lb">门锁标识:</label>
                    <el-input
                      v-model="queryForm.title"
                      class="ei"
                      placeholder="手机号码"
                    />
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
                  </el-form-item>
                </el-form>
              </div>
              <el-table
                ref="tableSort"
                border
                :data="list"
                :element-loading-text="elementLoadingText"
                :header-cell-style="{
                  'text-align': 'left',
                  background: '#f5f7fa',
                }"
                :cell-style="{ 'text-align': 'left' }"
                style="width: 100%"
                @selection-change="setSelectRows"
                @sort-change="tableSortChange"
              >
                <el-table-column
                  min-width="110px"
                  show-overflow-tooltip
                  prop="floorno"
                  label="楼栋"
                ></el-table-column>
                <el-table-column
                  min-width="110px"
                  show-overflow-tooltip
                  prop="iotName"
                  label="房间名称"
                ></el-table-column>
                <el-table-column
                  show-overflow-tooltip
                  prop="keyCount"
                  label="钥匙数"
                >
                  <template #default="{ row }">
                    <el-button type="primary" plain @click="setKey(row)">
                      {{ row.keyCount }}
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  min-width="120px"
                  show-overflow-tooltip
                  prop="iotTag"
                  label="门锁标识"
                ></el-table-column>
                <el-table-column
                  min-width="110px"
                  show-overflow-tooltip
                  prop=""
                  label="锁报警"
                ></el-table-column>
                <el-table-column
                  min-width="110px"
                  show-overflow-tooltip
                  prop=""
                  label="锁电压"
                ></el-table-column>
                <el-table-column
                  min-width="110px"
                  show-overflow-tooltip
                  prop=""
                  label="锁状态"
                ></el-table-column>
                <el-table-column
                  min-width="110px"
                  show-overflow-tooltip
                  prop=""
                  label="联网时间"
                ></el-table-column>
                <el-table-column
                  min-width="110px"
                  show-overflow-tooltip
                  prop=""
                  label="最后开门时间"
                ></el-table-column>
                <el-table-column
                  min-width="110px"
                  show-overflow-tooltip
                  prop=""
                  label="电表"
                ></el-table-column>
                <el-table-column
                  min-width="110px"
                  show-overflow-tooltip
                  prop=""
                  label="水表"
                ></el-table-column>
                <el-table-column
                  min-width="110px"
                  show-overflow-tooltip
                  prop=""
                  label="操作员"
                ></el-table-column>
                <el-table-column
                  min-width="110px"
                  show-overflow-tooltip
                  label="操作"
                  width="220px"
                  fixed="right"
                >
                  <template #default="{ row }">
                    <el-button
                      type="primary"
                      style="margin-right: 10px"
                      size="mini"
                      plain
                      @click="handleEdit(row)"
                    >
                      编辑
                    </el-button>
                    <el-dropdown split-button type="primary" size="mini">
                      更多操作
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                          <el-button type="text">远程开锁</el-button>
                        </el-dropdown-item>
                        <el-dropdown-item>
                          <el-button type="text" @click="handleDelete(row)">
                            取临时密码
                          </el-button>
                        </el-dropdown-item>
                        <el-dropdown-item>
                          <el-button type="text" @click="record(row)">
                            开门记录
                          </el-button>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination
                :background="background"
                :current-page="queryForm.pageNo"
                :layout="layout"
                :page-size="queryForm.pageSize"
                :total="total"
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
              ></el-pagination>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <table-edit ref="edit" @fetchData="fetchData"></table-edit>
    <open-door-record ref="record" @fetchData="fetchData"></open-door-record>
    <batch-build ref="batch" @fetchData="fetchData"></batch-build>
    <el-dialog
      v-dialogDrag
      title="取临时密码"
      size="small"
      :visible.sync="linshidialogVisible"
      width="35%"
      append-to-body
      @close="handleClose"
    >
      <div class="contents">
        <div class="top">4818662</div>
        <div class="botm">
          <ul>
            <li class="room">
              <i class="el-icon-s-home" style="color: #409eff"></i>
              &nbsp;房间: &nbsp;11
            </li>
            <li class="room2">
              <i class="el-icon-time" style="color: green"></i>
              &nbsp;密码有效时间(开始): &nbsp;2023-06-1009:50:00
            </li>
            <li class="room2">
              <i class="el-icon-time" style="color: green"></i>
              &nbsp;密码有效时间(结束): &nbsp;2023-06-1010:20:00
            </li>
            <li class="room2">
              <i
                class="el-icon-key"
                style="color: #66b1ff; font-size: 20px"
              ></i>
              &nbsp;密码多次有效
            </li>
          </ul>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="linshidialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="linshidialogVisible = false">
          确 定
        </el-button>
      </span>
    </el-dialog>
    <keys ref="keys" @fetchData="fetchData"></keys>
    <yuanquAdd ref="yuanqu" @fetchData="fetchData"></yuanquAdd>
    <loudongAdd ref="loudong" @fetchData="fetchData"></loudongAdd>
    <loucengAdd ref="louceng" @fetchData="fetchData"></loucengAdd>
  </div>
</template>

<script>
  import {
    listRentCustomerPage,
    deleteBuild,
    getCampusList,
    delOfficeRent,
    listOfficeDevicePage,
  } from '@/api/table'
  import TableEdit from './components/TableEdit'
  import OpenDoorRecord from './components/openDoorRecord.vue'
  import BatchBuild from './components/batchBuild.vue'
  import keys from './components/keys.vue'
  import yuanquAdd from './components/yuanquAdd.vue'
  import loudongAdd from './components/loudongAdd'
  import loucengAdd from './components/loucengAdd'
  export default {
    name: 'VueAdminBetterIndex',
    components: {
      TableEdit,
      OpenDoorRecord,
      BatchBuild,
      keys,
      yuanquAdd,
      loudongAdd,
      loucengAdd,
    },
    data() {
      return {
        list: [],
        imageList: [],
        listLoading: true,
        linshidialogVisible: false,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        background: true,
        selectRows: '',
        elementLoadingText: '正在加载...',
        queryForm: {
          pageNo: 1,
          pageSize: 10,
          title: '',
          buildkey: '',
        },
        Builddata: [],
        buildObjs: [],
        data: [
          {
            areaId: 1,
            areaName: '办公区房间列表',
            icon: 'el-icon-s-data',
            children: [],
          },
        ],
        defaultProps: {
          children: 'children',
          label: 'areaName',
        },
        section: '',
      }
    },
    computed: {
      height() {
        return this.$baseTableHeight()
      },
    },

    created() {
      this.fetchData()
      this.getdepartmemtData()
    },

    methods: {
      handleNodeClick(data) {
        this.section = data.sectionName
        this.queryForm.buildkey = data.buildObjs[0].buildKey
        this.fetchData()
      },
      setKey() {
        this.$refs['keys'].showEdit()
      },
      async getdepartmemtData() {
        const departdatalist = await getCampusList()

        this.data.map((item) => {
          if (item.areaId === 1) {
            // 找到要合并的元素
            item.children = item.children.concat(departdatalist.data) // 将s数组合并到该元素的children属性中
          }
          return item
        })
        console.log(departdatalist.data, this.data, 'getCampusList')
      },
      async fetchData() {
        // this.listLoading = true
        let formdata = {
          buildKeys: this.queryForm.buildkey,
          pageNumber: 1,
          pageSize: 10,
        }
        console.log(formdata, 'formdata')
        if (this.queryForm.buildkey) {
          let listOfficedatas = await listOfficeDevicePage(formdata, {})
          this.list = listOfficedatas.data.datas
        }
        // this.total = datalist.data.dataCount
        // datalist.data.datas.forEach((item) => {
        //   this.buildObjs = item.buildObjs
        // })
        this.listLoading = false
      },
      handleClose() {
        this.linshidialogVisible = false
      },
      handleSizeChange(val) {
        this.queryForm.pageSize = val
        console.log(this.queryForm.pageSize, 'pageSize')
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val
        console.log(this.queryForm.pageNo, 'pageNo')
        this.fetchData()
      },
      handleQuery() {
        this.queryForm.pageNo = 1
        this.fetchData()
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
      record(row) {
        this.$refs['record'].showEdit(row)
      },
      handleyuanqu() {
        this.$refs['yuanqu'].showEdit()
      },
      handleloudong() {
        this.$refs['loudong'].showEdit()
      },
      handlelouceng() {
        this.$refs['louceng'].showEdit()
      },
      batchAdd() {
        this.$refs['batch'].showEdit()
      },
      handleAdd() {
        this.$refs['edit'].showEdit()
      },
      handleImport(row) {
        console.log(row, 'row')
        // this.$refs['edit'].showEdit()
      },
      handleExport(row) {
        console.log(row, 'row')
        // this.$refs['edit'].showEdit()
      },
      handleEdit(row) {
        this.$refs['edit'].showEdit(row)
      },
      handleDelete(row) {
        console.log(row, 'rowd')
        this.linshidialogVisible = true
      },
    },
  }
</script>

<style lang="scss" scoped>
  .btntotal {
    float: right;
    margin-bottom: 20px;
  }
  .inputtotal {
    width: 45%;
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

  .index-container {
    padding: 0 !important;
    margin: 0 !important;
    background: #f5f7f8 !important;

    ::v-deep {
      .el-alert {
        padding: $base-padding;

        &--info.is-light {
          min-height: 82px;
          padding: $base-padding;
          margin-bottom: 15px;
          color: #909399;
          background-color: $base-color-white;
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
