<template>
  <el-dialog
    v-dialogDrag
    :title="title"
    :visible.sync="dialogFormVisible"
    width="600px"
    append-to-body
    destroy-on-close
    @close="close"
  >
    <div style="height: 500px">
      <el-divider content-position="left">门锁功能</el-divider>
      <el-checkbox-group v-model="checkList" style="margin: 0px 0 30px 0">
        <el-checkbox label="卡片"></el-checkbox>
        <el-checkbox label="密码"></el-checkbox>
        <el-checkbox label="蓝牙"></el-checkbox>
        <el-checkbox label="指纹"></el-checkbox>
        <el-checkbox label="套房"></el-checkbox>
      </el-checkbox-group>
      <el-divider content-position="left">房间属性</el-divider>
      <el-radio-group v-model="radio" style="margin: 0px 0 10px 0">
        <el-radio :label="5">办公室</el-radio>
      </el-radio-group>
      <el-divider></el-divider>
      <div class="demo-input-suffix">
        房间号 :
        <el-input v-model="input1" class="inpsty"></el-input>
      </div>
      <div class="demo-input-suffix">
        房间类型 :
        <el-input v-model="input2" class="inpsty"></el-input>
      </div>
      <div class="demo-input-suffix">
        默认单价 :
        <el-input-number
          v-model="num"
          controls-position="right"
          :precision="2"
          :step="0.1"
          :max="100000"
          class="inpsty"
        ></el-input-number>
      </div>
      <div class="demo-input-suffix">
        房间状态 :
        <el-input v-model="input2" class="inpsty"></el-input>
      </div>
      <div class="demo-input-suffix">
        房间信息 :
        <el-input v-model="input4" class="inpsty"></el-input>
      </div>
      <div class="demo-input-suffix">
        联网方式 :
        <el-select v-model="svalue" placeholder="请选择" class="inpsty">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: 'EditBath',
    data() {
      return {
        radio: 5,
        checkList: ['卡片', '蓝牙'],
        title: '',
        tableData: [{ date: 1 }],
        dialogFormVisible: false,
        input1: '',
        input2: '',
        input4: '',
        num: '',
        num2: '',
        num3: '',
        num4: '',
        num5: '',
        svalue: '2',
        options: [
          {
            value: '选项1',
            label: '不联网',
          },
          {
            value: '选项2',
            label: '蓝牙网关',
          },
          {
            value: '1',
            label: 'NB',
          },
          {
            value: '2',
            label: 'WiFi',
          },
        ],
        createVisible: false,
      }
    },
    mounted() {
      // this.getlistSection()
    },
    methods: {
      showEdit(row, Builddata) {
        this.title = '房间详情'
        this.dialogFormVisible = true
      },
      edit(row) {
        this.dialogFormVisible = true
      },
      del(row) {},
      close() {
        this.dialogFormVisible = false
      },
      save() {
        this.createVisible = true
      },
      handleClose() {
        this.linshidialogVisible = false
      },
    },
  }
</script>
<style lang="scss" scoped>
  .demo-input-suffix {
    // border: 1px olive solid;
  }
  .inpsty {
    width: 460px;
    margin-left: 10px;
    margin-right: 20px;
    margin-bottom: 20px;
  }
  .inpsty2 {
    width: 300px;
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 20px;
  }
  .inpsty1 {
    width: 200px;
    margin-left: 10px;
    margin-right: 20px;
    margin-bottom: 20px;
    // float: right;
  }
  .ra {
    // border: 1px solid seagreen;
    margin-bottom: 20px;
  }
  .la {
    float: left;
    margin-right: 20px;
  }
</style>
