<template>
  <div>
    <el-dialog
      v-dialogDrag
      title="人员入住"
      :visible.sync="dialogVisible"
      width="50%"
      destroy-on-close
      @close="handleClose"
    >
      <div class="trans">
        <tree-transfer
          ref="treeTransfer"
          class="transtransfer"
          :titles="['待入住人员:', '已入住人员:']"
          :button-texts="['删除', '人员入住']"
          :data-source.sync="dataSource"
          :default-checked-keys="defaultValue"
          :is-radio="false"
          :filterable="true"
          :father-choose="false"
          @left-check-change="handleLeftCheckChange"
          @right-check-change="handleRightCheckChange"
          @change="handleChange"
        ></tree-transfer>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getCampusList } from '@/api/table'
  import treeTransfer from '@/components/tree-transfer.vue'
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
  ]
  export default {
    name: 'AnlockmanagePermissionPopup',
    components: {
      treeTransfer,
    },
    data() {
      const generateData = (_) => {
        const data = []
        const cities = ['张三', '李四', '王五']
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
        departname: '',
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
        dataSource: tree,
        defaultValue: [],
      }
    },

    mounted() {
      this.getdepartmemtData()
      this.defaultValue = ['']
    },

    methods: {
      showEdit() {
        this.dialogVisible = true
      },
      handleClose() {
        this.dialogVisible = false
      },
      handleChange(value, direction, currentKeys) {
        console.log('handleChange', value, direction, currentKeys)
      },
      handleLeftCheckChange(value, currentKeys) {
        console.log('handleLeftCheckChange:', value, currentKeys)
      },
      handleRightCheckChange(value, currentKeys) {
        console.log('handleRightCheckChange:', value, currentKeys)
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
    width: 90%;
    margin: 0 auto;
    .transtransfer {
    }
    .transfer-center {
      // width: 270px;
    }
  }
</style>
