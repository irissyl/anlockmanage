<template>
  <div class="personalCenter-container">
    <el-tabs :tab-position="tabPosition" class="tabsty" @tab-click="handleClick" @tab-remove="handleremoveClick">
      <el-tab-pane class="">
        <span slot="label" class="pans3 labspan">
          <img src="../../../assets/query/baoxiu.png" v-if="gateway0 == false" class="gateway" alt="" srcset="">
          <img src="../../../assets/query/baoxiu1.png" v-if="gateway0 == true" class="gateway" alt="" srcset="">
          <h5 style="margin-right:0px;">所有报修</h5>
        </span>
        <el-card class="box-card">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
              <el-input v-model="formInline.user" placeholder="姓名" style="width: 150px;"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="quyuvalue1" placeholder="园区" style="width: 160px;margin: 0 10px 0 0;">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="quyuvalue2" placeholder="楼栋" style="width: 160px;margin: 0 10px 0 0;">
                <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="quyuvalue3" placeholder="楼层" style="width: 160px;margin: 0 10px 0 0;">
                <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="quyuvalue4" placeholder="房间" style="width: 160px;margin: 0 10px 0 0;">
                <el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="quyuvalue4" placeholder="状态" style="width: 160px;margin: 0 10px 0 0;">
                <el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="报修时间">
              <el-date-picker v-model="value1" type="datetimerange" style="width: 350px;" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="修复时间">
              <el-date-picker v-model="value3" type="datetimerange" style="width: 350px;" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-select v-model="quyuvalue4" placeholder="报修等级" style="width: 160px;margin: 0 10px 0 0;">
                <el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">导出</el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="addCard">添加报修</el-button>
            </el-form-item>
          </el-form>
        </el-card>
        <el-card class="box-card">
          <el-table :data="tableData" style="width: 100%;margin-top: 10px;margin-left: 20px;">
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
          <img src="../../../assets/query/baoxiu.png" v-if="gateway1 == false" class="gateway" alt="" srcset="">
          <img src="../../../assets/query/baoxiu1.png" v-if="gateway1 == true" class="gateway" alt="" srcset="">
          <h5 style="margin-right:0px;">维修统计</h5>
        </span>
        <el-table :data="tableData" style="width: 100%;margin-top: 10px;margin-left: 20px;">
          <el-table-column prop="" label="楼栋" width="210"></el-table-column>
          <el-table-column prop="" label="今日报修" width="210"></el-table-column>
          <el-table-column prop="name" label="今日维修" width="210"></el-table-column>
          <el-table-column prop="name" label="今日未修" width="210"></el-table-column>
          <el-table-column prop="name" label="历史遗留" width="210"></el-table-column>
          <el-table-column fixed="right" label="报修总量" width="210"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane class="">
        <span slot="label" class="pans3 ">
          <img src="../../../assets/query/baoxiu.png" v-if="gateway2 == false" class="gateway" alt="" srcset="">
          <img src="../../../assets/query/baoxiu1.png" v-if="gateway2 == true" class="gateway" alt="" srcset="">
          <h5 style="margin-right:0px;">维修类型统计</h5>
        </span>
        <div class="formbtn">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
              <el-select v-model="quyuvalue1" placeholder="请选择园区" style="width: 160px;margin: 0 10px 0 0;">
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
              <el-select v-model="quyuvalue3" placeholder="楼层" style="width: 160px;margin: 0 10px 0 0;">
                <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="quyuvalue4" placeholder="房间" style="width: 160px;margin: 0 10px 0 0;">
                <el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value">
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
        <div>
          <div id="echartstu" style="width:1000px;height:200px"></div>
        </div>
      </el-tab-pane>
      <el-tab-pane class="">
        <span slot="label" class="pans3">
          <img src="../../../assets/query/baoxiu.png" v-if="gateway3 == false" class="gateway" alt="" srcset="">
          <img src="../../../assets/query/baoxiu1.png" v-if="gateway3 == true" class="gateway" alt="" srcset="">
          <h5 style="margin-right:0px;">维修人员查询</h5>
        </span>
        <div>
           <el-button class="btnpr" type="primary" icon="el-icon-plus" @click="add()">添加报修人员</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%;margin-top: 10px;margin-left: 20px;">
          <el-table-column prop="" label="楼栋" width="210"></el-table-column>
          <el-table-column prop="" label="今日报修" width="210"></el-table-column>
          <el-table-column prop="name" label="今日维修" width="210"></el-table-column>
          <el-table-column prop="name" label="今日未修" width="210"></el-table-column>
          <el-table-column prop="name" label="历史遗留" width="210"></el-table-column>
          <el-table-column fixed="right" label="报修总量" width="210"></el-table-column>
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
import * as echarts from 'echarts'
export default {
  components: { addCard, TableEdit, },
  name: '',
  data () {
    return {
      quyuvalue1: '',
      quyuvalue2: '',
      quyuvalue3: '',
      quyuvalue4: '',
      value2: '',
      value1: '',
      value3: '',
      percentage: 100,
      tabPosition: 'left',
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
      gateway1: false,
      gateway3: false,
      options: [{
        value: '选项1',
        label: 'anlock园区'
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
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
    }
  },
  mounted () {
    this.initChart()
  },
  methods: {
    handleEdit (row) {
      this.$refs['edit'].showEdit(row)
    },
    initChart () {
      let getchart = echarts.init(document.getElementById('echartstu'))
      var data = [100, 100]
      var titlename = ['刷卡无反应/不亮灯', '被反锁屋内'];
      var valdata = [1, 1]
      var myColor = ['#1089E7', '#F57474'];
      var option = {
        xAxis: {
          show: false
        },
        yAxis: [{
          show: true,
          data: titlename,
          inverse: true,
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: function (value, index) {
                var num = myColor.length;
                return myColor[index % num]
              }
            },
            formatter: function (value, index) {
              return [
                '{title|' + value + '} '
              ].join('\n')
            },
            rich: {}
          },

        }, {
          show: true,
          inverse: true,
          data: valdata,
          axisLabel: {
            textStyle: {
              color: function (value, index) {
                var num = myColor.length;
                return myColor[index % num]
              }
            }
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },

        }],
        series: [{
          name: '条',
          type: 'bar',
          yAxisIndex: 0,
          data: data,
          barWidth: 20,
          itemStyle: {
            normal: {
              barBorderRadius: 30,
              color: function (params) {
                var num = myColor.length;
                return myColor[params.dataIndex % num]
              },
            }
          },
          label: {
            normal: {
              show: true,
              position: 'inside',
              formatter: '{c}%'
            }
          },
        }]
      };
      getchart.setOption(option)
        //随着屏幕大小调节图表
        window.addEventListener('resize', () => {
          getchart.resize()
        })
    },
    handleClick (tab, event) {
      console.log(tab.paneName,'tab.paneName')
      if (tab.active == true && tab.paneName == "1") {
        this.gateway1 = true
      } else {
        this.gateway1 = false
      }
      if (tab.active == true && tab.paneName == "2") {
        this.gateway2 = true
        this.initChart()
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
    addCard () {
      this.$refs['edit'].showEdit()
    },
    add (row) {
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