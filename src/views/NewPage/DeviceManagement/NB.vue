<template>
  <div class="personalCenter-container">
    <el-tabs :tab-position="tabPosition" class="tabsty" @tab-click="handleClick" @tab-remove="handleremoveClick">
      <el-tab-pane class="">
        <span slot="label" class="pans3 labspan">
          <img src="../../../assets/floor.png" v-if="gateway0 == false" class="gateway" alt="" srcset="">
          <img src="../../../assets/floor1.png" v-if="gateway0 == true" class="gateway" alt="" srcset="">
          <h5 style="margin-right:0px;">智能采集平台</h5>
        </span>
        <div class="formbtn1">
          <!-- <el-card class="box-card" header="添加智能采集平台"> -->
            <h4 class="tt">添加智能采集平台</h4>
            <el-form :inline="true" :model="formInline" class="demo-form-inline" label-width="120px">
              <el-form-item label="前置机名称：">
                <el-input v-model="formInline.user" placeholder="请输入前置机名称" style="width: 260px;"></el-input>
              </el-form-item>
              <el-form-item label="前置机IP：">
                <el-input v-model="formInline.ip" placeholder="请输入前置机名称" style="width: 260px;"></el-input>
              </el-form-item>
              <el-form-item label="端口：">
                <el-input v-model="formInline.duank" placeholder="请输入前置机名称" style="width: 260px;"></el-input>
              </el-form-item>
              <el-form-item label="备注：">
                <el-input v-model="formInline.remark" placeholder="请输入前置机名称" style="width: 260px;"></el-input>
              </el-form-item>
              <el-form-item label="前置机位置：">
                <el-button type="primary" @click="onSubmit"  style="width: 260px;" plain>点击选择</el-button>
              </el-form-item>
              <el-form-item style="width:160px; margin:10px 0 0 50px;">
                <el-button type="primary" @click="onSubmit">取消</el-button>
                <el-button type="primary" @click="onSubmit">确认</el-button>
              </el-form-item>
            </el-form>
          <!-- </el-card> -->
        </div>
      </el-tab-pane>
      <el-tab-pane class="">
        <span slot="label" class="pans3">
          <img src="../../../assets/gateway.png" v-if="changeshow == false" class="gateway" alt="" srcset="">
          <img src="../../../assets/gateway12.png" v-if="changeshow == true" class="gateway" alt="" srcset="">
          <h5>智能网关</h5>
        </span>
        <div class="formbtn">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
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
              <el-select v-model="quyuvalue3" placeholder="请选择楼层" style="width: 160px;margin: 0 10px 0 0;">
                <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
            <el-form-item class="rightbtn">
              <el-button type="primary" @click="registrat">下发智能网关指令</el-button>
            </el-form-item>
            <el-form-item class="rightbtn">
              <el-button type="primary" @click="createdCard">添加智能网关</el-button>
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
      <el-tab-pane class="">
        <span slot="label" class="pans3">
          <img src="../../../assets/gateway2.png" v-if="gateway2 == false" class="gateway" alt="" srcset="">
          <img src="../../../assets/gateway21.png" v-if="gateway2 == true" class="gateway" alt="" srcset="">
          <h5>智能门禁</h5>
        </span>
      </el-tab-pane>
      <el-tab-pane class="">
        <span slot="label" class="pans3">
          <img src="../../../assets/lock.png" v-if="gateway3 == false" class="gateway" alt="" srcset="">
          <img src="../../../assets/lock1.png" v-if="gateway3 == true" class="gateway" alt="" srcset="">
          <h5>智能门锁</h5>
        </span>
        <div class="formbtn">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
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
              <el-select v-model="quyuvalue3" placeholder="请选择楼层" style="width: 160px;margin: 0 10px 0 0;">
                <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="quyuvalue4" placeholder="请选择房间" style="width: 160px;margin: 0 10px 0 0;">
                <el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div>
           <el-button class="btnpr" type="primary" icon="el-icon-plus" @click="addlock()">添加门锁</el-button>
           <el-button class="btnpr" type="primary" icon="el-icon-plus" @click="addlockbatch()">门锁批量导入</el-button>
        </div>
        <el-table :data="tableDatas" style="width: 100%;margin-top: 10px;margin-left: 20px;">
          <el-table-column prop="address" label="门锁位置"></el-table-column>
          <el-table-column prop="" label="所属中继"></el-table-column>
          <el-table-column prop="" label="IMEI"></el-table-column>
          <el-table-column prop="" label="实时电量"></el-table-column>
          <el-table-column prop="" label="程序版本"></el-table-column>
          <el-table-column prop="" label="所类型"></el-table-column>
          <el-table-column prop="" label="状态"></el-table-column>
          <el-table-column prop="" label="开门方式"></el-table-column>
          <el-table-column prop="" label="更新时间"></el-table-column>
          <el-table-column fixed="right" label="操作" width="220">
            <template #default="{ row }">
              <el-button type="primary" plain  icon="el-icon-edit" @click="handlelockEdit(row)"></el-button>
              <el-button type="danger" plain icon="el-icon-delete" @click="handleDelete(row)"></el-button>
              <el-button  icon="el-icon-download"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <table-edit ref="edit"></table-edit>
    <add-card ref="addgatewayset"></add-card>
    <batch-import ref="batchedit"></batch-import>
  </div>
</template>

<script>
import TableEdit from './components/TableEdit.vue'
import addCard from './components/gatewayset.vue'
import BatchImport from './components/batchImport.vue'
export default {
  components: { addCard, TableEdit, BatchImport },
  name: '',
  data () {
    return {
      quyuvalue1: '',
      quyuvalue2: '',
      quyuvalue3: '',
      quyuvalue4:'',
      tabPosition: 'left',
      tableData: [{ name: '王小虎', }],
      tableDatas: [{ address: '测试D59-2层-206', }],
      formInline: {
        user: '',
        ip:'',
        duank:'',
        remark: ''
      },
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
      options5:[{
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
    handlelockEdit(row){
      this.$refs['edit'].showEdit(row)
    },
    addlock(){
      this.$refs['edit'].showEdit()
    },
    addlockbatch(){
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
.formbtn1{
  width: 29%;
  height: 550px;
  margin-left: 100px;

  .tt{
    font-size: 29px;
    height: 30px;
  }
  .demo-form-inline{
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
.btnpr{
  float: right;
  margin-bottom: 20px;
  margin-right: 10px;
}
</style>