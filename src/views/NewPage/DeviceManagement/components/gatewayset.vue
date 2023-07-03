<template>
  <div>
    <el-dialog v-dialogDrag :title="title" :visible.sync="dialogTableVisible" destroy-on-close width="600px">
      <el-form ref="form" :model="queryForm" :inline="true" @submit.native.prevent label-width="120px">
        <el-form-item label="中继器ID">
          <el-input v-model="queryForm.zjid" class="ei" placeholder="请输入中继器ID" />
        </el-form-item>
        <el-form-item label="信道号">
          <el-input v-model="queryForm.title" class="ei" placeholder="请输入信道号" />
        </el-form-item>
        <el-form-item label="中继器名称">
          <el-input v-model="queryForm.name" class="ei" placeholder="请输入中继器名称"></el-input>
        </el-form-item>
        <el-form-item label="网络号">
          <el-input v-model="queryForm.netid" class="ei" placeholder="请输入网络号"></el-input>
        </el-form-item>
        <el-form-item label="中继器IP">
          <el-input v-model="queryForm.ip" class="ei"  placeholder="请输入中继器IP"></el-input>
        </el-form-item>
        <el-form-item label="端口号">
          <el-input v-model="queryForm.duank" class="ei"  placeholder="请输入端口号"></el-input>
        </el-form-item>
        <el-form-item label="中继器位置">
          <el-button type="primary"  class="ei">点击选择...</el-button>
        </el-form-item>
        <el-form-item label="所属前置机">
          <el-input v-model="queryForm.addr" class="ei"  placeholder="请输入所属前置机"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="handleClick">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Gatewayset',

  data () {
    return {
      dialogTableVisible: false,
      userinfoShow: false,
      queryForm: {
        pageNo: 1,
        pageSize: 10,
        title: '',
        duank:'',
        ip:'',
        addr:'',
        netid:'',
        zjid:''
      },
      title: ''
    }
  },

  mounted () { },

  methods: {
    showEdit (row) {
      console.log(row, 'row')
      if (row) {
        this.title = '编辑智能网关'
      } else {
        this.title = "添加智能网关"
      }
      this.dialogTableVisible = true
    },
    handleClick (tab, event) {
      this.dialogTableVisible = false
    },
    close () {
      this.dialogTableVisible = false
    },
    save () { },
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
