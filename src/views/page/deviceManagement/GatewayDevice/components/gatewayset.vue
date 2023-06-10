<template>
  <div>
    <el-dialog
      title="设备基本信息"
      :visible.sync="dialogTableVisible"
      destroy-on-close
      width="600px"
    >
      <el-descriptions class="des" :column="1">
        <el-descriptions-item
          label="状态名称"
          label-class-name="my-label"
          content-class-name="my-content"
        >
          状态值
        </el-descriptions-item>
        <el-descriptions-item
          label="设备名称"
          label-class-name="my-label1"
          content-class-name="my-content1"
        >
          1128996937
        </el-descriptions-item>
        <el-descriptions-item
          label="设备标识"
          label-class-name="my-label1"
          content-class-name="my-content1"
        >
          1000100
        </el-descriptions-item>
        <el-descriptions-item
          label="最后通信时间"
          label-class-name="my-label1"
          content-class-name="my-content1"
        >
          12/24/2021 8:40:16AM
        </el-descriptions-item>
        <el-descriptions-item
          label="ROM版本号"
          label-class-name="my-label1"
          content-class-name="my-content1"
        >
          1006km210318
        </el-descriptions-item>
        <el-descriptions-item
          label="心跳间隔"
          label-class-name="my-label1"
          content-class-name="my-content1"
        >
          300秒
        </el-descriptions-item>
        <el-descriptions-item
          label="网关协议"
          label-class-name="my-label1"
          content-class-name="my-content1"
        >
          WIFIBLE
        </el-descriptions-item>
      </el-descriptions>
      <div class="btngroup">
        <el-button type="primary" @click="handleClick">
          设置WIFI号和密码
        </el-button>
      </div>
    </el-dialog>
    <el-dialog
      append-to-body
      title="设备WIFI号设置"
      :visible.sync="userinfoShow"
      destroy-on-close
      width="600px"
    >
      <div>
        <el-form
          ref="form"
          :model="queryForm"
          :inline="true"
          @submit.native.prevent
        >
          <el-form-item>
            <label class="lb">WIFI账号:</label>
            <el-input
              v-model="queryForm.title"
              class="ei"
              placeholder="请输入WIFI账号"
            />
          </el-form-item>
          <el-form-item>
            <label class="lb">WIFI密码:</label>
            <el-input
              v-model="queryForm.title"
              class="ei"
              placeholder="请输入WIFI密码"
            />
          </el-form-item>
        </el-form>
        <div class="tips" style="color: red">
          *注意：该设置可能造成设备无法联网，请确认wifi参数正确无误设置在设备下次联网后生效
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'Gatewayset',

    data() {
      return {
        dialogTableVisible: false,
        userinfoShow: false,
        queryForm: {
          pageNo: 1,
          pageSize: 10,
          title: '',
        },
      }
    },

    mounted() {},

    methods: {
      showEdit(row) {
        console.log(row, 'row')
        this.dialogTableVisible = true
      },
      handleClick(tab, event) {
        this.userinfoShow = true
      },
      close() {
        this.userinfoShow = false
      },
      save() {},
    },
  }
</script>

<style lang="scss">
  .btntotal {
    float: right;
    margin-bottom: 20px;
  }
  .ei {
    float: right;
    width: 400px;
  }
  .lb {
    // border: 1px solid saddlebrown;
    float: left;
    margin-right: 10px;
  }
</style>
