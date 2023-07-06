<template>
  <div>
    <el-dialog
      v-dialogDrag
      title="批量入宿"
      :visible.sync="dialogVisible"
      width="60%"
      destroy-on-close
      @close="handleClose"
    >
      <div class="trans">
        <tree-transfer
          ref="treeTransfer"
          class="transtransfer"
          :titles="['未分配:', '已分配:']"
          :button-texts="['删除', '入宿']"
          :data-source.sync="dataSource"
          :default-checked-keys="defaultValue"
          :is-radio="false"
          :filterable="true"
          :father-choose="false"
          @left-check-change="handleLeftCheckChange"
          @right-check-change="handleRightCheckChange"
          @change="handleChange"
        ></tree-transfer>
        <!-- <el-transfer class="trans" v-model="generatevalue" :titles="['未分配:', '已分配:']" :button-texts="['删除', '添加人员']" filterable :filter-method="filterMethod" filter-placeholder="请输入人员信息" :data="generateData"></el-transfer> -->
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleClose">入 宿</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getCampusList } from '@/api/table'
  import treeTransfer from '@/components/tree-transfer.vue'
  const tree = [
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
                //   disabled: true,
                },
              ],
            },
            {
              id: 2,
              label: 'anlock研发楼',
            //   disabled: true,
              children: [
                {
                  id: 6,
                  label: '1层',
                },
                {
                  id: 7,
                  label: '2层',
                //   disabled: true,
                },
              ],
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
