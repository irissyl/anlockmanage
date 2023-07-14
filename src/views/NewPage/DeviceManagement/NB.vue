<template>
  <div class="personalCenter-container">
    <el-tabs :tab-position="tabPosition" class="tabsty" @tab-click="handleClick" @tab-remove="handleremoveClick">
      <el-tab-pane class="">
        <span slot="label" class="pans3">
          <img src="../../../assets/lock.png" v-if="gateway0 == false" class="gateway" alt="" srcset="">
          <img src="../../../assets/lock1.png" v-if="gateway0 == true" class="gateway" alt="" srcset="">
          <h5 style="margin-right:10px;">NB门锁</h5>
        </span>
        <div class="formbtn1">
          <h4 class="tt">NB门锁</h4>
          <div style="float: right;margin-bottom:20px">
            <el-button type="primary">添加</el-button>
            <el-button type="primary">批量导出</el-button>
          </div>
          <el-table ref="tableSort" :data="tableData" :header-cell-style="{ 'text-align': 'center'}" :cell-style="{ 'text-align': 'center' }" style="width: 100%"  @selection-change="setSelectRows"
          @sort-change="tableSortChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column show-overflow-tooltip prop="iotTag" label="门锁编号"></el-table-column>
            <el-table-column show-overflow-tooltip prop="" label="房间编号"></el-table-column>
            <el-table-column show-overflow-tooltip prop="" label="电池电压"></el-table-column>
            <el-table-column show-overflow-tooltip prop="" label="固件版本"></el-table-column>
            <el-table-column show-overflow-tooltip prop="" label="IMEI"></el-table-column>
            <el-table-column show-overflow-tooltip prop="" label="NB卡号"></el-table-column>
            <el-table-column show-overflow-tooltip prop="name" label="运营商"></el-table-column>
            <el-table-column show-overflow-tooltip prop="" label="年费到期日"></el-table-column>
            <el-table-column show-overflow-tooltip prop="" label="账号"></el-table-column>
            <el-table-column show-overflow-tooltip label="操作" width="180px">
              <template #default="{ row }">
                <el-button type="primary" plain icon="el-icon-edit" @click="handlelockEdit(row)"></el-button>
              <el-button type="danger" plain icon="el-icon-delete" @click="handleDelete(row)"></el-button>
              <el-button icon="el-icon-download"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>

      <el-tab-pane class="">
        <span slot="label" class="pans3">
          <img src="../../../assets/lock.png" v-if="gateway1 == false" class="gateway" alt="" srcset="">
          <img src="../../../assets/lock1.png" v-if="gateway1 == true" class="gateway" alt="" srcset="">
          <h5>WIFI门锁</h5>
        </span>
        <div style="float: right;margin-bottom:20px">
          <el-button type="primary">添加</el-button>
          <el-button type="primary">批量导出</el-button>
        </div>
        <el-table ref="tableSort" :data="tableData" :element-loading-text="elementLoadingText" :header-cell-style="{ 'text-align': 'center'}" :cell-style="{ 'text-align': 'center' }" style="width: 100%" @selection-change="setSelectRows"
          @sort-change="tableSortChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column show-overflow-tooltip prop="iotTag" label="门锁编号"></el-table-column>
          <el-table-column show-overflow-tooltip prop="" label="房间编号"></el-table-column>
          <el-table-column show-overflow-tooltip prop="" label="电池电压"></el-table-column>
          <el-table-column show-overflow-tooltip prop="" label="固件版本"></el-table-column>
          <el-table-column show-overflow-tooltip prop="" label="MAC"></el-table-column>
          <el-table-column show-overflow-tooltip prop="name" label="Wifi账号1"></el-table-column>
          <el-table-column show-overflow-tooltip prop="" label="Wifi密码1"></el-table-column>
          <el-table-column show-overflow-tooltip prop="" label="IP地址">
            <template>本地部署</template>
          </el-table-column>
          <el-table-column show-overflow-tooltip label="操作" width="180px">
            <template #default="{ row }">
              <el-button type="primary" plain icon="el-icon-edit" @click="handlelockEdit(row)"></el-button>
              <el-button type="danger" plain icon="el-icon-delete" @click="handleDelete(row)"></el-button>
              <el-button icon="el-icon-download"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane class="">
        <span slot="label" class="pans3">
          <img src="../../../assets/lock.png" v-if="gateway2 == false" class="gateway" alt="" srcset="">
          <img src="../../../assets/lock1.png" v-if="gateway2 == true" class="gateway" alt="" srcset="">
          <h5>Lora门锁</h5>
        </span>
        <div>
          <el-button class="btnpr" type="primary" icon="el-icon-plus" @click="addlock()">添加</el-button>
          <el-button class="btnpr" type="primary" icon="el-icon-plus" @click="addlockbatch()">批量导入</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%;margin-top: 10px;margin-left: 20px;"  @selection-change="setSelectRows"
          @sort-change="tableSortChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column show-overflow-tooltip prop="" label="网关编号"></el-table-column>
          <el-table-column show-overflow-tooltip prop="" label="固件版本"></el-table-column>
          <el-table-column show-overflow-tooltip prop="" label="信道"></el-table-column>
          <el-table-column show-overflow-tooltip prop="" label="通讯方式">
            <template>4G/RJ45</template>
          </el-table-column>
          <el-table-column show-overflow-tooltip prop="name" label="Wifi账号1"></el-table-column>
          <el-table-column show-overflow-tooltip prop="" label="Wifi密码1"></el-table-column>
          <el-table-column show-overflow-tooltip prop="" label="4G卡号"></el-table-column>
          <el-table-column show-overflow-tooltip prop="" label="运营商"></el-table-column>
          <el-table-column show-overflow-tooltip prop="" label="年费到期日"></el-table-column>
          <el-table-column show-overflow-tooltip prop="" label="IP地址"></el-table-column>
          <el-table-column show-overflow-tooltip prop="" label="操作" width="230">
            <template #default="{ row }">
              <el-button type="primary" plain icon="el-icon-edit" @click="handlelockEdit(row)"></el-button>
              <el-button type="danger" plain icon="el-icon-delete" @click="handleDelete(row)"></el-button>
              <el-button icon="el-icon-download"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane class="">
        <span slot="label" class="pans3">
          <img src="../../../assets/gateway.png" v-if="gateway3 == false" class="gateway" alt="" srcset="">
          <img src="../../../assets/gateway12.png" v-if="gateway3 == true" class="gateway" alt="" srcset="">
          <h5>水表采集器</h5>
        </span>
         <div>
          <el-button class="btnpr" type="primary" icon="el-icon-plus" @click="addlock()">添加</el-button>
          <el-button class="btnpr" type="primary" icon="el-icon-plus" @click="addlockbatch()">批量导入</el-button>
        </div>
        <el-table :data="tableData" style="width: 100                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         %;margin-top: 10px;margin-left: 20px;" @selection-change="setSelectRows"
          @sort-change="tableSortChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column show-overflow-tooltip prop="iotTag" label="水表采集器编号"></el-table-column>
          <el-table-column show-overflow-tooltip prop="" label="电池电压"></el-table-column>
          <el-table-column show-overflow-tooltip prop="" label="固件版本"></el-table-column>
          <el-table-column show-overflow-tooltip prop="" label="水表采集器信道"></el-table-column>
          <el-table-column show-overflow-tooltip prop="" label="水表编号"></el-table-column>
          <el-table-column  label="操作" >
            <template #default="{ row }">
              <el-button type="primary" plain icon="el-icon-edit" @click="handlelockEdit(row)"></el-button>
              <el-button type="danger" plain icon="el-icon-delete" @click="handleDelete(row)"></el-button>
              <el-button icon="el-icon-download"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane class="">
        <span slot="label" class="pans3">
          <img src="../../../assets/gateway2.png" v-if="gateway4 == false" class="gateway" alt="" srcset="">
          <img src="../../../assets/gateway21.png" v-if="gateway4 == true" class="gateway" alt="" srcset="">
          <h5>网关匹配</h5>
        </span>
        <div style="float: right;margin-bottom:20px">
          <el-button type="primary">添加</el-button>
          <el-button type="primary">批量导出</el-button>
        </div>
        <el-table ref="tableSort" :data="tableData" :element-loading-text="elementLoadingText" :header-cell-style="{ 'text-align': 'center'}" :cell-style="{ 'text-align': 'center' }" style="width: 100%" @selection-change="setSelectRows"
          @sort-change="tableSortChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column show-overflow-tooltip prop="name" label="网关编号"></el-table-column>
          <el-table-column show-overflow-tooltip prop="" label="网关信道"></el-table-column>
          <el-table-column show-overflow-tooltip prop="" label="门锁编号"></el-table-column>
          <el-table-column show-overflow-tooltip prop="" label="门锁信道"></el-table-column>
          <el-table-column show-overflow-tooltip prop="" label="水表采集器编号"></el-table-column>
          <el-table-column show-overflow-tooltip prop="" label="水表采集器信道"></el-table-column>
          <el-table-column show-overflow-tooltip prop="" label="电表编号"></el-table-column>
          <el-table-column show-overflow-tooltip label="操作" width="180px">
            <template #default="{ row }">
              <el-button type="primary" plain icon="el-icon-edit" @click="handlelockEdit(row)"></el-button>
              <el-button type="danger" plain icon="el-icon-delete" @click="handleDelete(row)"></el-button>
              <el-button icon="el-icon-download"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <table-edit ref="edit" @fetchData="fetchData"></table-edit>
    <add-card ref="addgatewayset" @fetchData="fetchData"></add-card>
    <batch-import ref="batchedit" @fetchData="fetchData"></batch-import>
    <PermissionPopup ref="gatewayset" @fetchData="fetchData"></PermissionPopup>
  </div>
</template>

<script>
import TableEdit from './components/TableEdit.vue'
import addCard from './components/gatewayset.vue'
import PermissionPopup from './components/PermissionPopup.vue'
import BatchImport from './components/batchImport.vue'
export default {
  components: { addCard, TableEdit, BatchImport, PermissionPopup },
  name: '',
  data () {
    return {
      selectRows: '',
      elementLoadingText: '正在加载...',
      quyuvalue1: '',
      quyuvalue2: '',
      quyuvalue3: '',
      quyuvalue4: '',
      tabPosition: 'left',
      tableData: [{ name: '王小虎', }],
      tabs: 'left',
      gateway0: true,
      gateway1: true,
      gateway2: false,
      gateway3: false,
      gateway4: false
    }
  },
  created () { },
  methods: {
    handleEdit (row) {
      this.$refs['edit'].showEdit(row)
    },
    fetchData () {

    },
    setSelectRows (val) {
      this.selectRows = val
    },
    tableSortChange () {
      const imageList = []
      this.$refs.tableSort.tableData.forEach((item, index) => {
        imageList.push(item.img)
      })
      this.imageList = imageList
    },
    handleClick (tab, event) {
      console.log(tab,'tab')
      if (tab.active == true && tab.paneName == "0") {
        this.gateway0 = true
      } else {
        this.gateway0 = false
      }
      if (tab.active == true && tab.paneName == "1") {
        this.gateway1 = true
      } else {
        this.gateway1 = false
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
      if (tab.active == true && tab.paneName == "4") {
        this.gateway4 = true
      } else {
        this.gateway4 = false
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
  width: 90%;
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