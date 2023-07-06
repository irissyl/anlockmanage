<template>
  <div>
    <div class="grid-content bg-purple">
      <div class="right">
        <div class="inputtotal topform">
          <el-form ref="form" :model="queryForm" :inline="true" class="forms">
            <el-form-item>
              <label class="lb">编号:</label>
              <el-input v-model="queryForm.roomName" class="ei" placeholder="学号" style="width: 160px;margin: 0 10px 0 0;" />
            </el-form-item>
            <el-form-item>
              <label class="lb">区域:</label>
              <el-select v-model="quyuvalue1" placeholder="请选择片区" style="width: 160px;margin: 0 10px 0 0;">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              <el-select v-model="quyuvalue2" placeholder="请选择楼栋" style="width: 160px;margin: 0 10px 0 0;">
                <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              <el-select v-model="quyuvalue3" placeholder="请选择楼层" style="width: 160px;margin: 0 10px 0 0;">
                <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              <el-select v-model="quyuvalue4" placeholder="请选择房间" style="width: 160px;margin: 0 10px 0 0;">
                <el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              <el-select v-model="quyuvalue5" placeholder="请选择权限" style="width: 160px;margin: 0 10px 0 0;">
                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button icon="el-icon-search" type="info" native-type="submit">
                查询
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="inputtotal centerform">
          <el-form ref="form" :model="queryForm" :inline="true" class="forms">
            <el-form-item>
              <label class="lb">权限控制:</label>
              <el-select v-model="quyuvalue6" placeholder="请选择权限" style="width: 160px;margin: 0 10px 0 0;">
                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="checked" class="lb checked" @change="checkchange">区域设置</el-checkbox>
              <el-button type="danger" v-show="setshow" native-type="submit" size="mini" plain>
                设置
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table ref="tableSort" :data="tablelist" :element-loading-text="elementLoadingText" :header-cell-style="{'text-align': 'left'
              }" :cell-style="{ 'text-align': 'left' }" style="width: 100%" @selection-change="setSelectRows" @sort-change="tableSortChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column min-width="110px" show-overflow-tooltip prop="roomNO" label="住户ID"></el-table-column>
          <el-table-column min-width="110px" show-overflow-tooltip prop="roomName" label="住户姓名"></el-table-column>
          <el-table-column show-overflow-tooltip prop="sex" label="性别"></el-table-column>
          <el-table-column min-width="110px" show-overflow-tooltip prop="dan" label="所属单位"></el-table-column>
          <el-table-column min-width="110px" show-overflow-tooltip prop="" label="远程开门权限">
            <template #default="{ row }">
              <i class="el-icon-success" v-if="row"></i>
              <i class="el-icon-error" v-if="!row"></i>
            </template>
          </el-table-column>
          <el-table-column min-width="110px" show-overflow-tooltip prop="" label="自助录入指纹权限">
            <template #default="{ row }">
              <i class="el-icon-success" v-if="row"></i>
              <i class="el-icon-error" v-if="!row"></i>
            </template>
          </el-table-column>
          <el-table-column min-width="110px" show-overflow-tooltip prop="" label="临时密码权限">
            <template #default="{ row }">
              <i class="el-icon-success" v-if="row"></i>
              <i class="el-icon-error" v-if="!row"></i>
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