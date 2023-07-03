<template>
  <div class="personalCenter-container">
    <el-tabs :tab-position="tabPosition" class="tabsty">
      <el-tab-pane class="pans1">
        <span slot="label" class="pans1"><i class="el-icon-date"></i>
          <h5>门卡信息维护</h5>
        </span>
        <div class="formbtn">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="姓名">
              <el-input v-model="formInline.user" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
            <el-form-item >
              <div class="types">
                <el-radio-group v-model="tabs" style="margin-bottom: 30px;" class="rad">
                  <el-radio-button label="top">全部</el-radio-button>
                  <el-radio-button label="right">已发卡</el-radio-button>
                  <el-radio-button label="bottom">未发卡</el-radio-button>
                  <el-radio-button label="left">临时卡</el-radio-button>
                </el-radio-group> 
              </div>
            </el-form-item>
            <el-form-item class="rightbtn">
              <el-button type="primary" @click="registrat">授权注册</el-button>
            </el-form-item>
            <el-form-item class="rightbtn">
              <el-button type="primary" @click="createdCard">创建门卡</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table :data="tableData" style="width: 100%;margin-top: 10px;margin-left: 20px;">
          <el-table-column prop="" label="门卡ID" width="210"></el-table-column>
          <el-table-column prop="" label="持卡人ID" width="210"></el-table-column>
          <el-table-column prop="name" label="持卡人姓名" width="210"></el-table-column>
          <el-table-column prop="" label="门卡类型" width="210"></el-table-column>
          <el-table-column prop="" label="门卡状态" width="210"></el-table-column>
          <el-table-column prop="" label="注册时间" width="210"></el-table-column>
          <el-table-column fixed="right" label="操作" width="210">
            <template #default="{ row }">
              <el-button type="text" icon="el-icon-edit" @click="handleEdit(row)"></el-button>
            <el-button type="text" icon="el-icon-delete" @click="handleDelete(row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="基本设置" class="pans1">
        <span slot="label" class="pans1"> <i class="el-icon-bank-card"></i>
          <h5>通卡信息维护</h5>
        </span>
      </el-tab-pane>
      <el-tab-pane label="安全设置" class="pans1">
        <span slot="label" class="pans1"><i class="el-icon-set-up"></i>
          <h5>管理卡信息维护</h5>
        </span>
      </el-tab-pane>
    </el-tabs>
    <table-edit  ref="edit"></table-edit>
    <add-card ref="addcard"></add-card>
  </div>
</template>

<script>
import TableEdit from './components/TableEdit.vue'
import addCard from './components/addCard.vue'
export default {
  components: { addCard, TableEdit },
  name: '',
  data () {
    return {
      tabPosition: 'left',
      tableData: [{ name: '王小虎', }],
      formInline: {
          user: '',
          region: ''
        },
        tabs:'left'
    }
  },
  created () { },
  methods: {
    handleEdit (row) {
      this.$refs['edit'].showEdit(row)
    },
    handleDelete (row) {
    },
    createdCard (row) {
      this.$refs['addcard'].showEdit()
    },
    registrat (row) {
      this.$refs['addcard'].showEdit()
    },
    onSubmit() {
        console.log('submit!');
    }
  },
}
</script>
<style lang="scss" >
.tabsty {
  height: 800px;

  .el-tabs__item {
    height: 120px;
  }
}
.pans1 {
  padding: 0px;
  margin: 0px;
  .el-icon-date {
    font-size: 70px;
    margin-right: 0px;
  }
  .el-icon-set-up {
    margin-right: 0px;
    font-size: 70px;
  }
  .el-icon-bank-card {
    margin-right: 0px;
    font-size: 70px;
  }
  h5 {
    margin-top: -10px;
    margin-left: -30px;
  }
}
.formbtn {
  width: 100%;
  height: 50px;
}
.types{
  width: 350px;
  height: 30px;
  line-height: 30px;
  border-radius: 10px;
  // margin-top: 5px;
  text-align: center;
  
  .rad{
    // border-radius: 15px;
  }
}
.rightbtn{
  float: right;
}
</style>