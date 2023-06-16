<template>
  <div>
    <el-dialog
      v-dialogDrag
      title="房间匹配"
      :visible.sync="dialogVisible"
      width="70%"
      destroy-on-close
      @close="handleClose"
    >
      <el-row :gutter="10">
        <el-col
          :xs="24"
          :sm="24"
          :md="24"
          :lg="22"
          :xl="22"
          style="margin-left: 0px"
        >
          <el-transfer
            v-model="generatevalue"
            class="trans"
            :titles="['未分配:', '已分配:']"
            :button-texts="['删除', '添加房间']"
            filterable
            :filter-method="filterMethod"
            filter-placeholder="请输入房间信息"
            :data="generateData"
          ></el-transfer>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getCampusList } from '@/api/table'
  export default {
    name: 'AnlockmanagePermissionPopup',
    data() {
      const generateData = (_) => {
        const data = []
        const cities = ['房1', '房2', '房3']
        const pinyin = ['zhangsan', 'lisi', 'wangwu']
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
        areaId: '',
        departdatalist: [],
        data: [
          {
            areaId: 1,
            areaName: '房间',
            children: [],
          },
        ],
        defaultProps: {
          children: 'children',
          label: 'areaName',
        },
        dialogVisible: false,
        personChoose: false,
      }
    },

    mounted() {
      this.getdepartmemtData()
    },

    methods: {
      showEdit() {
        this.dialogVisible = true
      },
      save() {
        this.dialogVisible = false
      },
      handleClose() {
        this.dialogVisible = false
      },
      handleSelectChange(data) {
        this.section = data.sectionName
        if (data) {
          this.personChoose = true
        }
        console.log(data)
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
        this.departdatalist = departdatalist.data

        console.log(departdatalist.data, this.data, 'getCampusList')
      },
    },
  }
</script>

<style lang="scss">
  .trans {
    float: left;
    height: 400px;
    margin-left: 160px;
    .el-transfer-panel {
      width: 270px;
      height: 400px;
    }
    .el-transfer-panel__list.is-filterable {
      height: 400px;
    }
  }
</style>
