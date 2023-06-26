<template>
  <el-dialog
    v-dialogDrag
    :title="title"
    :visible.sync="dialogFormVisible"
    width="700px"
    destroy-on-close
    @close="close"
  >
    <div>
      <div class="demo-input-suffix">
        房号前缀 :
        <el-input v-model="formdata.prefix" class="inpsty"></el-input>
      </div>
      <div class="demo-input-suffix">
        房间类型 :
        <el-select
          v-model.trim="formdata.sceneType"
          placeholder="请选择房间类别"
          class="inpsty"
        >
          <el-option label="办公室" value="办公室"></el-option>
          <el-option label="宿舍" value="宿舍"></el-option>
          <el-option label="预约" value="预约"></el-option>
        </el-select>
      </div>
      <div class="demo-input-suffix">
        <label class="la" for="">楼 层 :</label>
        <el-input-number
          v-model="formdata.floorStart"
          controls-position="right"
          :min="1"
          :max="99"
          class="inpsty1"
        ></el-input-number>
        <el-input-number
          v-model="formdata.floorEnd"
          class="inpsty1"
          controls-position="right"
          :min="1"
          :max="99"
        ></el-input-number>
      </div>
      <div class="demo-input-suffix">
        <label class="la" for="">房 号 :</label>
        <el-input-number
          v-model="formdata.roomStart"
          controls-position="right"
          :min="1"
          :max="99"
          class="inpsty1"
        ></el-input-number>
        <el-input-number
          v-model="formdata.roomEnd"
          class="inpsty1"
          controls-position="right"
          :min="1"
          :max="99"
        ></el-input-number>
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
        <el-table
          highlight-current-row
          class="tb-edit"
          :data="batchdata"
          style="width: 100%"
          @row-click="handleCurrentChange"
        >
          <el-table-column prop="roomNO" label="房间编号">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.roomNO"
                size="small"
                placeholder="请输入内容"
                @change="handleEdit(scope.$index, scope.row)"
              ></el-input>
              <span>{{ scope.row.roomNO }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="roomName" label="房间名称">
            <template slot-scope="scope">
              <span>{{ scope.row.roomName }}</span>
              <el-input
                v-model="scope.row.roomName"
                size="small"
                placeholder="请输入内容"
                @change="handleEdit(scope.$index, scope.row)"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="floorKey" label="楼层">
            <template slot-scope="scope">
              <span>{{ scope.row.floorKey }}</span>
              <el-input-number
                v-model="scope.row.floorKey"
                :min="1"
                :max="40"
                controls-position="right"
                @change="handleEdit(scope.$index, scope.row)"
              ></el-input-number>
            </template>
          </el-table-column>
          <el-table-column prop="lockKey" label="钥匙数">
            <template slot-scope="scope">
              <el-button type="success" plain @click="setKey(row)">
                {{ scope.row.lockKey }}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column prop="roomType" label="房型">
            <template slot-scope="scope">
              <span>{{ scope.row.roomType }}</span>
              <el-input
                v-model="scope.row.roomType"
                size="small"
                placeholder="请输入内容"
                @change="handleEdit(scope.$index, scope.row)"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="iotTag" label="门锁编号">
            <template slot-scope="scope">
              <span>{{ scope.row.iotTag }}</span>
              <el-input
                v-model="scope.row.iotTag"
                size="small"
                placeholder="请输入内容"
                @change="handleEdit(scope.$index, scope.row)"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="roomInfo" label="房间信息">
            <template slot-scope="scope">
              <span>{{ scope.row.roomInfo }}</span>
              <el-input
                v-model="scope.row.roomInfo"
                size="small"
                placeholder="请输入内容"
                @change="handleEdit(scope.$index, scope.row)"
              ></el-input>
            </template>
          </el-table-column>
          1
          <!-- <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="small" class="btn bg_green" @click="handleEdit(scope.$index, scope.row)">{{scope.row.showEdit?'保存':"修改"}}</el-button>
            </template>
          </el-table-column> -->
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="linshidialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="close">确 定</el-button>
      </span>
    </el-dialog>
  </el-dialog>
</template>

<script>
  import veditBath from './veditBath.vue'
  import {
    addSingleRoom,
    listRoom,
    addBatchRoom,
    delRoom,
    updateRoom,
  } from '@/api/api'
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
        formdata: {
          buildId: '',
          prefix: '',
          sceneType: '',
          floorStart: '',
          floorEnd: '',
          roomStart: '',
          roomEnd: '',
        },
        createVisible: false,
        batchdata: [],
      }
    },
    mounted() {
      // this.getlistSection()
    },
    methods: {
      showEdit(buildId) {
        this.title = '批量创建房间'
        this.dialogFormVisible = true
        this.formdata.buildId = buildId
      },
      edit(row) {
        this.$refs['editbath'].showEdit(row)
      },
      close() {
        this.dialogFormVisible = false
        this.createVisible = false
        this.formdata = {
          buildId: '',
          prefix: '',
          sceneType: '',
          floorStart: '',
          floorEnd: '',
          roomStart: '',
          roomEnd: '',
        }
        this.$emit('fetchData')
      },
      async save() {
        this.createVisible = true
        let data = this.formdata
        let res = await addBatchRoom(data)
        this.batchdata = res.data
        console.log(res, this.batchdata, 'success')
        // if (res.resultCode == 0) {
        //   this.$message('批量创建成功')
        // }
      },
      async handleEdit(index, row) {
        console.log(index, row)
        console.log('提交')
        let data = {
          floorKey: row.floorKey,
          roomId: row.roomId,
          roomInfo: row.roomInfo,
          roomNO: row.roomNO,
          roomName: row.roomName,
          roomType: row.roomType,
        }
        let res = await updateRoom(data)
        if (res.resultCode == 0) {
          this.$message('修改成功')
        }
      },
      handleCurrentChange(row, event, column) {
        console.log(row, event, column)
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
    line-height: 30px;
  }
  .tb-edit .el-input {
    display: none;
  }
  .tb-edit .current-row .el-input {
    display: block;
  }
  .tb-edit .current-row .el-input + span {
    display: none;
  }
</style>
