<template>
  <div class="personalCenter-container">
    <el-tabs :tab-position="tabPosition" class="tabsty" @tab-click="handleClick" @tab-remove="handleremoveClick">
      <el-tab-pane class="">
        <span slot="label" class="pans3 labspan">
          <img src="../../../assets/query/xungeng.png" v-if="gateway0 == false" class="gateway" alt="" srcset="">
          <img src="../../../assets/query/xungeng1.png" v-if="gateway0 == true" class="gateway" alt="" srcset="">
          <h5 style="margin-right:0px;">巡更设置</h5>
        </span>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>巡更参数设置</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          </div>
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="巡更开始时间">
              <el-date-picker v-model="value1" type="datetime" placeholder="巡更开始时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="巡更间隔">
              <el-input v-model="formInline.user" placeholder="巡更间隔"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">更新</el-button>
            </el-form-item>
          </el-form>
        </el-card>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>巡更路线设置（默认楼栋的巡栖顺序为每层楼的单数号房间）</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
          </div>
          <el-table :data="xtableData" style="width: 100%;margin-top: 10px;margin-left: 20px;">
            <el-table-column prop="" label="楼梯" width="210"></el-table-column>
            <el-table-column prop="" label="巡更路线" width="210"></el-table-column>
            <el-table-column prop="name" label="巡更卡" width="210"></el-table-column>
            <el-table-column fixed="right" label="操作" width="210">
              <template #default="{ row }">
                <el-button type="text" icon="el-icon-edit" @click="handleEdit(row)"></el-button>
                <el-button type="text" icon="el-icon-delete" @click="handleDelete(row)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-tab-pane>
      <el-tab-pane class="">
        <span slot="label" class="pans3">
          <img src="../../../assets/query/xungengset.png" v-if="changeshow == false" class="gateway" alt="" srcset="">
          <img src="../../../assets/query/xungengset1.png" v-if="changeshow == true" class="gateway" alt="" srcset="">
          <h5>巡更卡管理</h5>
        </span>
        <div class="formbtn">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="卡号">
              <el-input v-model="formInline.user" placeholder="请输入卡号"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="formInline.user" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
            <el-form-item class="rightbtn">
              <el-button type="primary" @click="createdCard">添加巡更卡</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table :data="tableData" style="width: 100%;margin-top: 10px;margin-left: 20px;">
          <el-table-column prop="" label="卡号" width="210"></el-table-column>
          <el-table-column prop="" label="巡更名称" width="210"></el-table-column>
          <el-table-column prop="name" label="卡有效截至日期" width="210"></el-table-column>
          <el-table-column fixed="right" label="操作" width="210">
            <template #default="{ row }">
              <el-button type="text" icon="el-icon-edit" @click="handleEdit(row)"></el-button>
              <el-button type="text" icon="el-icon-delete" @click="handleDelete(row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane class="">
        <span slot="label" class="pans3">
          <img src="../../../assets/query/xungengjilu.png" v-if="gateway2 == false" class="gateway" alt="" srcset="">
          <img src="../../../assets/query/xungengjilu1.png" v-if="gateway2 == true" class="gateway" alt="" srcset="">
          <h5>巡更记录查询</h5>
        </span>
        <div class="formbtn">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="姓名">
              <el-input v-model="formInline.user" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="quyuvalue1" placeholder="请选择片区" style="width: 160px;margin: 0 10px 0 0;">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="quyuvalue2" placeholder="请选择楼栋" style="width: 160px;margin: 0 10px 0 0;">
                <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="quyuvalue3" placeholder="请选择巡更状态" style="width: 160px;margin: 0 10px 0 0;">
                <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-date-picker v-model="value2" type="datetimerange" :picker-options="pickerOptions" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" align="right">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table :data="tableDatas" style="width: 100%;margin-top: 10px;margin-left: 20px;">
          <el-table-column prop="address" label="楼栋"></el-table-column>
          <el-table-column prop="" label="巡更人员"></el-table-column>
          <el-table-column prop="" label="巡更状态"></el-table-column>
          <el-table-column prop="" label="结束巡更时间"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <table-edit ref="edit"></table-edit>
    <add-card ref="addgatewayset"></add-card>
  </div>
</template>

<script>
import TableEdit from './components/TableEdit.vue'
import addCard from './components/addCard.vue'
export default {
  components: { addCard, TableEdit, },
  name: '',
  data () {
    return {
      quyuvalue1: '',
      quyuvalue2: '',
      quyuvalue3: '',
      quyuvalue4: '',
      value2:'',
      tabPosition: 'left',
      xtableData: [{ name: 'anlock', }],
      tableData: [{ name: '王小虎', }],
      tableDatas: [{ address: '测试D59-2层-206', }],
      formInline: {
        user: '',
        ip: '',
        duank: '',
        remark: ''
      },
      value3: '',
      tabs: 'left',
      changeshow: false,
      gateway0: true,
      gateway2: false,
      gateway3: false,
      options: [{
        value: '选项1',
        label: 'anlock片区'
      }],
      options3: [{
        value: '选项2',
        label: 'B1栋'
      }],
      options4: [{
        value: '选项1',
        label: '1层'
      }],
      options4: [{
        value: '选项1',
        label: '1层'
      }],
      options5: [{
        value: '选项1',
        label: '101房'
      }],

    }
  },
  created () { },
  methods: {
    handleEdit (row) {
      this.$refs['edit'].showEdit(row)
    },
    handleClick (tab, event) {
      if (tab.active == true && tab.paneName == "1") {
        this.changeshow = true
      } else {
        this.changeshow = false
      }
      if (tab.active == true && tab.paneName == "2") {
        this.gateway2 = true
      } else {
        this.gateway2 = false
      }
      if (tab.active == true && tab.paneName == "3") {
        this.gateway3 = true
      } else {
        this.gateway3 = false
      }
      if (tab.active == true && tab.paneName == "0") {
        this.gateway0 = true
      } else {
        this.gateway0 = false
      }
    },
    handleremoveClick (tab, event) {
    },
    handleDelete (row) {
    },
    handlelockEdit (row) {
      this.$refs['edit'].showEdit(row)
    },
    addlock () {
      this.$refs['edit'].showEdit()
    },
    addlockbatch () {
      this.$refs['batchedit'].showEdit()
    },
    createdCard (row) {
      this.$refs['addgatewayset'].showEdit()
    },
    registrat (row) {
      this.$refs['addcard'].showEdit()
    },
    onSubmit () {
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

.pans3 {
  width: 150px;
  height: 100px;
  .el-icon-office-building {
    font-size: 70px;
    margin-top: 10px;
    margin-right: 10px;
  }
  .el-icon-lock {
    margin-right: 0px;
    font-size: 70px;
  }
  .gateway {
    margin-top: 10px;
    width: 60px;
    height: 60px;
  }

  h5 {
    margin-right: 5px;
    margin-top: -18px;
  }
}
.formbtn1 {
  width: 29%;
  height: 550px;
  margin-left: 100px;

  .tt {
    font-size: 29px;
    height: 30px;
  }
  .demo-form-inline {
    margin-top: 30px;
  }
}
.formbtn {
  width: 100%;
  height: 50px;
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
.btnpr {
  float: right;
  margin-bottom: 20px;
  margin-right: 10px;
}
</style>