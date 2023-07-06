<template>
  <div>
    <div class="grid-content bg-purple">
      <div class="right">
        <div class="inputtotal topform">
          <el-form ref="form" :model="queryForm" :inline="true" class="forms">
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
            </el-form-item>
            <el-form-item>
              <el-button icon="el-icon-search" type="info" native-type="submit">
                查询
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <el-tabs class="tabs" v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="中继指令" name="first">
        <div class="inputtotal centerform">
          <el-form ref="form" :model="queryForm" :inline="true" class="forms">
            <el-form-item>
              <label class="lb">网络号:</label>
              <el-select v-model="quyuvalue6" placeholder="请选择权限" style="width: 160px;margin: 0 10px 0 0;">
                <el-option v-for="item in net" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
             <el-form-item>
              <label class="lb">信道号:</label>
              <el-select v-model="quyuvalue6" placeholder="请选择权限" style="width: 160px;margin: 0 10px 0 0;">
                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="checked" class="lb checked" @change="checkchange">区域下发</el-checkbox>
              <el-button type="danger" v-show="setshow" native-type="submit" size="mini" plain>
                下发指令  
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table ref="tableSort" :data="tablelist" :element-loading-text="elementLoadingText" :header-cell-style="{'text-align': 'left'
              }" :cell-style="{ 'text-align': 'left' }" style="width: 100%" @selection-change="setSelectRows" @sort-change="tableSortChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column min-width="110px" show-overflow-tooltip prop="roomNO" label="中继器名称"></el-table-column>
          <el-table-column min-width="110px" show-overflow-tooltip prop="roomName" label="IP地址"></el-table-column>
          <el-table-column show-overflow-tooltip prop="sex" label="中继器位置"></el-table-column>
          <el-table-column min-width="110px" show-overflow-tooltip prop="dan" label="网络地址"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="second">
        <div class="inputtotal centerform">
          <el-form ref="form" :model="queryForm" :inline="true" class="forms">
            <el-form-item>
              <label class="lb">指令:</label>
              <el-select v-model="quyuvalue6" placeholder="请选择权限" style="width: 160px;margin: 0 10px 0 0;">
                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="checked" class="lb checked" @change="checkchange">区域下发</el-checkbox>
              <el-button type="danger" v-show="setshow" native-type="submit" size="mini" plain>
                下发指令  
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table ref="tableSort" :data="tablelist" :element-loading-text="elementLoadingText" :header-cell-style="{'text-align': 'left'
              }" :cell-style="{ 'text-align': 'left' }" style="width: 100%" @selection-change="setSelectRows" @sort-change="tableSortChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column min-width="110px" show-overflow-tooltip prop="roomNO" label="门锁位置"></el-table-column>
          <el-table-column min-width="110px" show-overflow-tooltip prop="roomName" label="网络地址"></el-table-column>
          <el-table-column show-overflow-tooltip prop="sex" label="是否休眠"></el-table-column>
          <el-table-column min-width="110px" show-overflow-tooltip prop="dan" label="状态"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
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
      activeName: 'first',
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
      net:[],
      options2: [{
        value: '1',
        label: '常闭'
      }, {
        value: '2',
        label: '远程开锁'
      }, {
        value: '3',
        label: '删除密码'
      }, {
        value: '4',
        label: '下发用户密码'
      }, {
        value: '5',
        label: '设置心跳时间间隔'
      }, {
        value: '6',
        label: '设置是否休眠'
      },],
      tablelist: [{ roomNO: 2321}],
      quyuvalue1: '',
      quyuvalue2: '',
      quyuvalue3: '',
      quyuvalue4: '',
      quyuvalue5: '',
      quyuvalue6: '',
      setshow: false,
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
    handleClick (tab, event) {
      console.log(tab, event);
    },
    checkchange (e) {
      console.log(e, 'e')
      if (e == true) {
        this.setshow = true
      } else {
        this.setshow = false
      }
    }
  },
};
</script>

<style lang="scss" scoped>

.lb{
  margin-right: 20px;

}
.checked{
  margin-left: 10px;
  margin-right: 20px;
}

</style>