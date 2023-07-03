<template>
  <div class="personalCenter-container">
    <el-tabs :tab-position="tabPosition" class="tabsty">
      <el-tab-pane class="pans2">
        <span slot="label" class="pans2"><i class="el-icon-bank-card"></i>
          <h5>补卡下发状态</h5>
        </span>
        <div class="formbtn">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="编号：">
              <el-input v-model="formInline.id" placeholder="请输入持卡人ID "  style="width: 150px;"></el-input>
            </el-form-item>
            <el-form-item label="姓名：">
              <el-input v-model="formInline.cardid" placeholder="请输入持卡人ID "  style="width: 150px;"></el-input>
            </el-form-item>
            <el-form-item  label="房间：">
              <el-input v-model="formInline.cardid" placeholder="请输入房间" @click="choseRoom"  style="width: 150px;">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-date-picker v-model="formInline.time" style="width: 350px;" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="类型：">
              <el-select v-model.trim="formInline.status" placeholder="请选择门卡状态" style="width: 150px;">
                <el-option label="添加卡" value="1"></el-option>
                <el-option label="补卡" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态：">
              <el-select v-model.trim="formInline.type" placeholder="请选择门卡状态" style="width: 150px;">
                <el-option label="未成功" value="1"></el-option>
                <el-option label="成功" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table :data="tableData" style="width: 100%;margin-top: 10px;margin-left: 20px;">
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="id" label="编号"></el-table-column>
          <el-table-column prop="time" label="补卡时间"></el-table-column>
          <el-table-column prop="room" label="宿舍号"></el-table-column>
          <el-table-column prop="type" label="类型"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template #default="{ row }">
              <el-button type="text" @click="handleEdit(row)">手动下发</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane class="pans2">
        <span slot="label" class="pans2"> <i class="el-icon-bank-card"></i>
          <h5>调宿下发状态</h5>
        </span>
        <div class="formbtn">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="编号：">
              <el-input v-model="formInline.id" placeholder="请输入持卡人ID "  style="width: 150px;"></el-input>
            </el-form-item>
            <el-form-item label="姓名：">
              <el-input v-model="formInline.cardid" placeholder="请输入持卡人ID "  style="width: 150px;"></el-input>
            </el-form-item>
            <el-form-item  label="房间：">
              <el-input v-model="formInline.cardid" placeholder="请输入房间" @click="choseRoom"  style="width: 150px;">
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-date-picker v-model="formInline.time" style="width: 350px;" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="类型：">
              <el-select v-model.trim="formInline.status" placeholder="请选择门卡状态" style="width: 150px;">
                <el-option label="退房" value="1"></el-option>
                <el-option label="调宿" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态：">
              <el-select v-model.trim="formInline.type" placeholder="请选择门卡状态" style="width: 150px;">
                <el-option label="未成功" value="1"></el-option>
                <el-option label="成功" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table :data="tableData2" style="width: 100%;margin-top: 10px;margin-left: 20px;">
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="id" label="编号"></el-table-column>
          <el-table-column prop="time" label="操作时间"></el-table-column>
          <el-table-column prop="room" label="原房间号"></el-table-column>
          <el-table-column prop="target" label="目标房间号"></el-table-column>
          <el-table-column prop="type" label="类型"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template #default="{ row }">
              <el-button type="text" @click="handleEdit(row)">手动下发</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <table-edit ref="edit"></table-edit>
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
      tableData: [{ name: '王小虎',id:'567823',time:'2023-04-08 18:03:43',room:'宿舍101',type:'添加卡',status:'成功' }],
      tableData2: [{ name: '王小虎',id:'567823',time:'2023-06-08 13:07:13',room:'宿舍102',target:"-",type:'退房',status:'成功' }],
      formInline: {
        id:'',
        cardid:'',
        user: '',
        region: '',
        time:'',
        type:'',
        status:''
      },
      tabs: 'left'
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
    onSubmit () {
      console.log('submit!');
    },
    choseRoom() {
      console.log('ddddd')
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
.pans2 {
  padding: 0px;
  margin: 0px;

  .el-icon-bank-card {
    font-size: 70px;
  }
  h5 {
    padding: 0px;
    margin-top: -10px;
    // margin-right: 15px;
  }
}
.formbtn {
  width: 100%;
  height: 50px;
  margin-left: 20px;
}
.types {
  width: 350px;
  height: 30px;
  line-height: 30px;
  border-radius: 10px;
  text-align: center;

  .rad {
    // border-radius: 15px;
  }
}
.rightbtn {
  float: right;
}
</style>