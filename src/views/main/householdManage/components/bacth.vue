<template>
  <div>
    <div class="grid-content bg-purple">
      <div class="right">
        <div class="inputtotal topform">
          <el-form ref="form" :model="queryForm" :inline="true" class="forms">
            <el-form-item>
              <label class="lb">住户类型:</label>
              <el-select  v-model.trim="quyuvalue2"  placeholder="请选择住户类型" class="ei">
                <el-option label="本科" value="本科"></el-option>
                <el-option label="专科" value="专科"></el-option>
                <el-option label="研究生" value="研究生"></el-option>
             </el-select>
            </el-form-item>
            <el-form-item>
              <label class="lb">编号:</label>
              <el-input v-model="queryForm.roomName" class="ei" placeholder="学号" style="width: 160px;margin: 0 10px 0 0;" />
            </el-form-item>
            <el-form-item>
              <label class="lb">姓名:</label>
              <el-input v-model="queryForm.quyuvalue1" class="ei" placeholder="学号" style="width: 160px;margin: 0 10px 0 0;" />
            </el-form-item>
            <el-form-item>
              <el-button icon="el-icon-search" type="info" native-type="submit">
                查询
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
          <el-table-column min-width="110px" show-overflow-tooltip prop="" label="更新时间"></el-table-column>
          <el-table-column min-width="110px" show-overflow-tooltip prop="dan" label="所属单位"></el-table-column>
          <el-table-column show-overflow-tooltip prop="" label="住户标记"></el-table-column>
          <el-table-column min-width="110px" show-overflow-tooltip prop="" label="是否在宿"></el-table-column>
          <el-table-column min-width="110px" show-overflow-tooltip prop="" label="联系电话"></el-table-column>
          <el-table-column min-width="110px" show-overflow-tooltip label="操作" width="280px" fixed="right">
            <template #default="{ row }">
              <el-button type="primary" style="margin-right: 10px" size="mini" plain @click="handleEdit(row)">
                  入住
              </el-button>
            </template>
        </el-table-column>
        </el-table>
      </div>
    </div>
    <batchEdit ref="printfinger"></batchEdit>
  </div>
</template>

<script>
import batchEdit from './batchEdit.vue'

export default {
  name: 'AnlockmanageRemote',
  components:{batchEdit},
  data () {
    return {
      form: {
        appld: '',
        appSecret: '',
        builds: '',
      },
      checked: false,
      options3: [{
        value: '选项2',
        label: 'B1栋'
      }],
      tablelist: [{roomNO:2321,roomName:'雷诗云',sex:'左拇指',dan:'anlock有限公司'}],
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
    handleEdit (row) {
      this.$refs['printfinger'].showEdit(row)
    },
    handleDelete (row) {
      console.log(row, 'rowd')
      this.ckVisible = true
    },
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