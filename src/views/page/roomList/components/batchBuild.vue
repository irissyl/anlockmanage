<template>
  <el-dialog
    v-dialogDrag
    :title="title"
    :visible.sync="dialogFormVisible"
    width="800px"
    destroy-on-close
    @close="close"
  >
    <div style="height: 550px">
      <el-divider content-position="left">门锁功能</el-divider>
      <el-checkbox-group v-model="checkList" style="margin: 0px 0 30px 0">
        <el-checkbox label="卡片" disabled></el-checkbox>
        <el-checkbox label="密码"></el-checkbox>
        <el-checkbox label="蓝牙" disabled></el-checkbox>
        <el-checkbox label="指纹"></el-checkbox>
        <el-checkbox label="套房"></el-checkbox>
      </el-checkbox-group>
      <el-divider content-position="left">房间属性</el-divider>
      <el-radio-group v-model="radio" style="margin: 0px 0 10px 0">
        <el-radio :label="9">办公室</el-radio>
      </el-radio-group>
      <el-divider></el-divider>
      <div class="demo-input-suffix">
        房号前缀 :
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
        <label class="la" for="">楼 层 :</label>
        <el-input-number
          v-model="num2"
          controls-position="right"
          :min="1"
          :max="10"
          class="inpsty1"
        ></el-input-number>
        <el-input-number
          v-model="num4"
          class="inpsty1"
          controls-position="right"
          :min="1"
          :max="10"
        ></el-input-number>
      </div>
      <div class="demo-input-suffix">
        <label class="la" for="">房 号 :</label>
        <el-input-number
          v-model="num3"
          controls-position="right"
          :min="1"
          :max="10"
          class="inpsty1"
        ></el-input-number>
        <el-input-number
          v-model="num5"
          class="inpsty1"
          controls-position="right"
          :min="1"
          :max="10"
        ></el-input-number>
      </div>
      <div class="ra">
        <label class="la" for="">房号规则 :</label>
        <el-checkbox-group v-model="checkList">
          <el-checkbox label="房号避4"></el-checkbox>
          <el-checkbox label="房号避7"></el-checkbox>
          <el-checkbox label="锦江规则"></el-checkbox>
        </el-checkbox-group>
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
    <veditBath ref="editbath"></veditBath>
    <el-dialog
      v-dialogDrag
      title="确认批量创建房间"
      size="small"
      :visible.sync="createVisible"
      width="69%"
      append-to-body
      @close="handleClose"
    >
      <div class="contents">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="date" label="房号"></el-table-column>
          <el-table-column prop="" label="楼栋" width="100"></el-table-column>
          <el-table-column prop="" label="楼层号" width="100"></el-table-column>
          <el-table-column prop="" label="锁内号" width="100"></el-table-column>
          <el-table-column
            prop=""
            label="默认价格"
            width="100"
          ></el-table-column>
          <el-table-column
            prop=""
            label="房间信息"
            width="100"
          ></el-table-column>
          <el-table-column
            prop=""
            label="联网方式"
            width="100"
          ></el-table-column>
          <el-table-column label="门锁功能">
            <el-table-column
              prop="province"
              label="卡片"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="city"
              label="密码"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="address"
              label="蓝牙"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="address"
              label="套房"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="address"
              label="指纹"
              width="100"
            ></el-table-column>
          </el-table-column>
          <el-table-column show-overflow-tooltip label="操作" width="190px">
            <template #default="{ row }">
              <el-button
                type="primary"
                style="margin-right: 10px"
                size="mini"
                plain
                @click="edit(row)"
              >
                详情
              </el-button>
              <el-button
                type="primary"
                style="margin-right: 10px"
                size="mini"
                plain
                @click="del(row)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="linshidialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="linshidialogVisible = false">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </el-dialog>
</template>

<script>
  import veditBath from './veditBath.vue'
  export default {
    name: 'TableEdit2',
    components: {
      veditBath,
    },
    data() {
      return {
        radio: 9,
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
        this.title = '批量创建房间'
        this.dialogFormVisible = true
      },
      edit(row) {
        this.$refs['editbath'].showEdit(row)
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
