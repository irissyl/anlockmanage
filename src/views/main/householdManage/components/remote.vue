<template>
  <div>
    <div class="grid-content bg-purple">
      <div class="right">
        <el-table ref="tableSort" :data="tablelist" :element-loading-text="elementLoadingText" :header-cell-style="{'text-align': 'left'
              }" :cell-style="{ 'text-align': 'left' }" style="width: 100%" @selection-change="setSelectRows" @sort-change="tableSortChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column  show-overflow-tooltip prop="roomName" label="姓名"></el-table-column>
          <el-table-column  show-overflow-tooltip prop="" label="职务"></el-table-column>
          <el-table-column show-overflow-tooltip prop="" label="证件号"></el-table-column>
          <el-table-column  show-overflow-tooltip prop="" label="手机"></el-table-column>
          <el-table-column  show-overflow-tooltip prop="" label="性别"></el-table-column>
          <el-table-column  show-overflow-tooltip prop="" label="房间数">
            <template>可开门数</template>
          </el-table-column>
          <el-table-column  show-overflow-tooltip prop="" label="微信"></el-table-column>
          <el-table-column  show-overflow-tooltip prop="" label="左指纹"></el-table-column>
          <el-table-column  show-overflow-tooltip prop="" label="右指纹"></el-table-column>
          <el-table-column  show-overflow-tooltip prop="" label="卡号"></el-table-column>
          <el-table-column  show-overflow-tooltip prop="" label="密码"></el-table-column>
          <el-table-column  show-overflow-tooltip prop="" label="备注"></el-table-column>
          <el-table-column width="220" show-overflow-tooltip prop="" label="操作">
            <template #default="{ row }">
                <el-button type="primary" icon="el-icon-edit" @click="handleEdit(row)" plain></el-button>
                <el-button type="primary" icon="el-icon-delete" @click="handleDelete(row)" plain></el-button>
                <el-button type="primary" @click="openRecord(row)" plain>开锁记录</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnlockmanageRemote',

  data () {
    return {
      form: {
        appld: '',
        appSecret: '',
        builds: '',
      },
      checked: false,
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
      options5: [{
        value: '选项1',
        label: '101宿舍'
      }],
      options2: [{
        value: '1',
        label: '开启远程开门'
      },{
        value: '2',
        label: '关闭远程开门'
      },{
        value: '3',
        label: '开启自助录入指纹'
      },{
        value: '4',
        label: '关闭自助录入指纹'
      },{
        value: '5',
        label: '开启临时密码'
      },{
        value: '6',
        label: '关闭临时密码'
      },],
      tablelist: [{roomNO:2321,roomName:'雷诗云',sex:'女',dan:'anlock有限公司'}],
      quyuvalue1: '',
      quyuvalue2: '',
      quyuvalue3: '',
      quyuvalue4: '',
      quyuvalue5: '',
      quyuvalue6: '',
      setshow:false,
      total: 0,
      selectRows: '',
      elementLoadingText: '正在加载...',
      queryForm: {
        pageNo: 1,
        pageSize: 10,
        roomName: '',
        roomNO: '',
        buildId: '',
      },
    };
  },

  mounted () {

  },

  methods: {
    openRecord(row){
      this.$refs['record'].showEdit()
    },
    handleEdit (row) {
      console.log(row, 'row')
      this.$refs['edit'].showEdit(row)
    },
    handleDelete (row) {
      console.log(row, 'rowd')
    },
    setSelectRows () { },
    tableSortChange () { },
    checkchange(e){
      console.log(e,'e')
      if(e == true){
        this.setshow = true
      }else{
        this.setshow = false

      }
    }
  },
};
</script>

<style lang="scss" scoped>
.btntotal {
  float: right;
  margin-bottom: 20px;
}
.inputtotal {
  width: 100%;
  float: left;
  // border: 1px solid saddlebrown;

  .ei {
    float: right;
    width: 200px;
  }
  .lb {
    // border: 1px solid saddlebrown;
    float: left;
    margin-right: 10px;
  }
  .checked{
    color: black;
  }
}

.topform {
  background-color: #ffffff;

  .forms {
    padding-top: 20px;
    margin-left: 10px;
  }
}
.centerform {
  .forms {
    padding-top: 10px;
    margin-left: 10px;
  }
}
</style>