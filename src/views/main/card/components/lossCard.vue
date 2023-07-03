<template>
  <div class="personalCenter-container">
    <el-tabs :tab-position="tabPosition" class="tabsty">
      <el-tab-pane class="pans">
        <span slot="label" class="pans"><i class="el-icon-bank-card"></i>
          <h5>门卡挂失</h5>
        </span>
        <div class="formbtn">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="持卡人ID：">
              <el-input v-model="formInline.user" placeholder="请输入持卡人ID "></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table :data="tableData" style="width: 100%;margin-top: 10px;margin-left: 20px;">
          <el-table-column prop="" label="门卡ID" ></el-table-column>
          <el-table-column prop="" label="持卡人ID" ></el-table-column>
          <el-table-column prop="name" label="持卡人姓名" ></el-table-column>
          <el-table-column prop="" label="注册时间" ></el-table-column>
          <el-table-column fixed="right" label="操作" >
            <template #default="{ row }">
              <el-button type="text" @click="handleEdit(row)">挂失</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <table-edit  ref="edit"></table-edit>
    <add-card ref="addcard"></add-card>
  </div>
</template>

<script>
import TableEdit from './TableEdit.vue'
import addCard from './addCard.vue'
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
.pans {
  padding: 0px;
  margin: 0px;

  .el-icon-bank-card {
    font-size: 70px;
  }
  h5 {
    padding: 0px;
    margin-top: -10px;
    margin-right: 15px;
  }
}
.formbtn {
  width: 100%;
  height: 50px;
  margin-left: 20px;
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