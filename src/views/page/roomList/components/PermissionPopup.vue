<template>
  <div>
    <el-dialog
      v-dialogDrag
      title="授权人员"
      :visible.sync="dialogVisible"
      width="70%"
      destroy-on-close
      append-to-body
      @close="handleClose"
    >
      <div class="trans">
        <tree-transfer
          ref="treeTransfer"
          class="transtransfer"
          :titles="['未分配:', '已分配:']"
          :button-texts="['取消人员', '添加人员']"
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
      <div class="botm">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <i class="el-icon-info fon"></i>
            <span class="fon" style="font-size: 15px">授权房间：</span>
          </div>
          <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="房名:" prop="customerName">
              <el-input
                v-model.trim="form.customerName"
                autocomplete="off"
                disabled
                style="width: 190px"
              ></el-input>
            </el-form-item>
            <el-form-item label="设备标识:" prop="customerName">
              <el-input
                v-model.trim="form.customerName"
                autocomplete="off"
                disabled
                style="width: 190px"
              ></el-input>
            </el-form-item>
            <el-form-item label="所属楼栋:" prop="customerName">
              <el-input
                v-model.trim="form.customerName"
                autocomplete="off"
                disabled
                style="width: 190px"
              ></el-input>
            </el-form-item>
            <el-form-item label="钥匙数量:" prop="customerName">
              <el-input
                v-model.trim="form.customerName"
                autocomplete="off"
                disabled
                style="width: 190px"
              ></el-input>
            </el-form-item>
            <el-form-item label="授权开始:" prop="customerName">
              <el-date-picker
                v-model="form.rentCardnoHex"
                type="datetime"
                placeholder="选择日期时间"
                style="width: 190px"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="授权结束:" prop="customerName">
              <el-date-picker
                v-model="form.mobile"
                type="datetime"
                placeholder="选择日期时间"
                style="width: 190px"
              ></el-date-picker>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取消退出</el-button>
        <el-button type="primary" @click="handleClose">确定授权</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getCampusList } from '@/api/table'
  import treeTransfer from '@/components/tree-transfer.vue'
  const tree = [
    {
      label: '人事部',
      id: '1',
      children: [
        {
          label: '雷诗云',
          id: '1-1',
          children: [],
        },
      ],
    },
    {
      label: '行政部',
      id: '2',
      children: [
        {
          label: '李工',
          id: '2-1',
          children: [],
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
      return {
        form: {
          customerName: '',
          rentCardnoHex: '',
          content: [],
          idCard: '',
          mobile: '',
          rentDoorPass: '',
          remark: '',
        },
        rules: {},

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
  .botm {
    width: 90%;
    height: 150px;
    margin: 0 auto;
    margin-top: 20px;
    .el-card__header {
      padding: 9px 20px;
      border-bottom: 1px solid #ebeef5;
      box-sizing: border-box;
    }
    .el-form-item {
      width: 32%;
      float: left;
    }
    // label{
    //   float: left;

    // }
    // input{
    //   float: left;
    // }
  }
</style>
