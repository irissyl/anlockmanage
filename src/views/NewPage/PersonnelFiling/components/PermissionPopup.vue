<template>
  <el-dialog
    title="房间权限"
    :visible.sync="dialogVisible"
    width="70%"
    append-to-body
  >
    <el-row :gutter="10">
      <el-col
        :xs="24"
        :sm="24"
        :md="6"
        :lg="6"
        :xl="6"
        style="margin-left: 0px"
      >
        <el-card class="box-card2">
          <div slot="header" class="clearfix">
            <span>选择园区</span>
          </div>
          <div class="grid-content bg-purple-light">
            <el-tree
              class="left"
              :data="data"
              node-key="areaId"
              :default-expanded-keys="[1]"
              :props="defaultProps"
              @node-click="handleNodeClick"
            ></el-tree>
          </div>
        </el-card>
      </el-col>
      <el-col
        :xs="24"
        :sm="24"
        :md="17"
        :lg="17"
        :xl="17"
        style="margin-left: 0px"
      >
        <el-card class="box-card2">
          <div slot="header" class="clearfix">
            <span>设备授权:</span>
          </div>
          <el-transfer
            v-model="generatevalue"
            :titles="['楼栋设备:', '选中设备:']"
            filterable
            :filter-method="filterMethod"
            filter-placeholder="请输入城市拼音"
            :data="generateData"
          ></el-transfer>
        </el-card>
      </el-col>
      <el-col v-show="false" :xs="24" :sm="24" :md="8" :lg="10" :xl="10">
        <el-card class="box-card2">
          <div slot="header" class="clearfix">
            <span>楼栋设备:</span>
          </div>
          <div class="grid-content bg-purple">
            <el-table :data="[]" style="width: 100%">
              <el-table-column
                prop="date"
                label="楼栋"
                width="130"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="设备名称"
                width="130"
              ></el-table-column>
              <el-table-column
                prop="address"
                label="设备标识"
              ></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)"
                  >
                    选择设备
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
      <el-col v-show="false" :xs="24" :sm="24" :md="8" :lg="10" :xl="10">
        <el-card class="box-card2">
          <div slot="header" class="clearfix">
            <span>选中设备:</span>
          </div>
          <div class="grid-content bg-purple">
            <el-table :data="[]" style="width: 100%">
              <el-table-column
                prop="date"
                label="楼栋"
                width="130"
              ></el-table-column>
              <el-table-column
                prop="name"
                label="设备名称"
                width="130"
              ></el-table-column>
              <el-table-column
                prop="address"
                label="设备标识"
              ></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)"
                  >
                    移除设备
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
      <el-button>取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { getCampusList } from '@/api/table'
  export default {
    name: 'AnlockmanagePermissionPopup',
    data() {
      const generateData = (_) => {
        const data = []
        const cities = [
          '设备: 研发大楼/fd/123123123',
          '设备: 研发大楼/fd/123123123',
          '设备: 研发大楼/fd/123123123',
        ]
        const pinyin = [
          'shebei',
          'beijing',
          'guangzhou',
          'shenzhen',
          'nanjing',
          'xian',
          'chengdu',
        ]
        cities.forEach((city, index) => {
          data.push({
            label: city,
            key: index,
            pinyin: pinyin[index],
          })
        })
        return data
      }
      return {
        generateData: generateData(),
        generatevalue: [],
        filterMethod(query, item) {
          return item.pinyin.indexOf(query) > -1
        },
        data: [
          {
            areaId: 1,
            areaName: '园区',
            children: [],
          },
        ],
        defaultProps: {
          children: 'children',
          label: 'areaName',
        },
        dialogVisible: false,
      }
    },

    mounted() {
      this.getdepartmemtData()
    },

    methods: {
      showEdit() {
        this.dialogVisible = true
      },
      handleClose() {
        this.dialogVisible = false
      },
      handleNodeClick(data) {
        this.section = data.sectionName
        console.log(data)
      },
      async getdepartmemtData() {
        const departdatalist = await getCampusList()
        // let childerendata ={
        //   areaId: departdatalist.data
        //   areaName
        // }
        this.data.map((item) => {
          if (item.areaId === 1) {
            // 找到要合并的元素
            item.children = item.children.concat(departdatalist.data) // 将s数组合并到该元素的children属性中
          }
          return item
        })
        console.log(departdatalist.data, this.data, 'getCampusList')
      },
    },
  }
</script>

<style lang="scss">
  .box-card2 {
    .el-transfer-panel {
      width: 270px;
      height: 300px;
    }
    .el-transfer-panel__list.is-filterable {
      height: 300px;
    }
  }
</style>
