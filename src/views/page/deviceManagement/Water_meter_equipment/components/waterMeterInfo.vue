<template>
  <div>
    <el-dialog
      custom-class="my-dialog"
      title="表计设置"
      :visible.sync="dialogFormVisible"
      width="1200px"
      append-to-body
      @close="close"
      @open="open"
    >
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
          <div class="grid-content bg-purple">
            <img
              src="../../../../../assets/shuibiao.jpg"
              alt=""
              class="shuib"
            />
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
          <div class="grid-content bg-purple">
            <el-row :gutter="12">
              <el-col :span="24">
                <el-card shadow="hover">
                  <div class="count">累计总用量</div>
                  <div class="num">10.62 kW.h</div>
                </el-card>
              </el-col>
              <el-col :span="24">
                <el-card shadow="hover">
                  <div class="count">本月用量</div>
                  <div class="num">0.00 kwh</div>
                </el-card>
              </el-col>
              <el-col :span="24">
                <el-card shadow="hover">
                  <div class="count">最近抄表时间</div>
                  <div class="num">2023-06-08 11:02:03</div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="9" :lg="9" :xl="9">
          <div class="grid-content bg-purple">
            <el-descriptions class="des" :column="1" size="mini" border>
              <el-descriptions-item
                label="产品信息"
                label-class-name="my-label"
                content-class-name="my-content"
              >
                RS85单相2P轨表
              </el-descriptions-item>
              <el-descriptions-item
                label="设备编号"
                label-class-name="my-label1"
                content-class-name="my-content1"
              >
                510300036081
              </el-descriptions-item>
              <el-descriptions-item
                label="网关编号"
                label-class-name="my-label1"
                content-class-name="my-content1"
              >
                4A1070300001061
              </el-descriptions-item>
              <el-descriptions-item
                label="录入时间"
                label-class-name="my-label1"
                content-class-name="my-content1"
              >
                2023-06-08 08:12:14
              </el-descriptions-item>
              <el-descriptions-item
                label="设备状态"
                label-class-name="my-label1"
                content-class-name="my-content1"
              >
                离线
              </el-descriptions-item>
              <el-descriptions-item
                label="通断状态"
                label-class-name="my-label1"
                content-class-name="my-content1"
              >
                通
              </el-descriptions-item>
              <el-descriptions-item
                label="操作"
                label-class-name="my-label1"
                content-class-name="my-content1"
              >
                <el-button type="primary" size="mini" plain>合 闸</el-button>
                <el-button type="primary" size="mini" plain>断 闸</el-button>
                <el-button type="primary" size="mini" plain>抄 表</el-button>
              </el-descriptions-item>
            </el-descriptions>
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <div class="grid-content bg-purple">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="用量月报表" name="first">
                <div
                  id="report"
                  :style="{ width: '100%', height: '400px' }"
                ></div>
              </el-tab-pane>
              <el-tab-pane label="抄表_操作记录" name="second">
                <div class="top">
                  <el-form
                    ref="form"
                    :model="queryForm"
                    :inline="true"
                    @submit.native.prevent
                  >
                    <el-form-item
                      label-width="120px"
                      label="选择年份"
                      prop="floorno"
                    >
                      <el-date-picker
                        v-model="value1"
                        type="year"
                        placeholder="选择年"
                      ></el-date-picker>
                    </el-form-item>
                    <el-form-item
                      label-width="120px"
                      label="选择月份"
                      prop="floorno"
                    >
                      <el-date-picker
                        v-model="value2"
                        type="month"
                        placeholder="选择月"
                      ></el-date-picker>
                    </el-form-item>
                    <el-form-item>
                      <el-button
                        icon="el-icon-search"
                        type="primary"
                        native-type="submit"
                      >
                        查询
                      </el-button>
                    </el-form-item>
                  </el-form>
                </div>
                <div class="bottom" style="height: 400px">
                  <el-table :data="tableData">
                    <el-table-column
                      prop="age"
                      label="抄表时间"
                    ></el-table-column>
                    <el-table-column
                      prop="age"
                      label="抄表类型"
                    ></el-table-column>
                    <el-table-column prop="age" label="读数"></el-table-column>
                  </el-table>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
  import * as echarts from 'echarts'
  export default {
    name: 'AnlockmanageWaterMeterInfo',

    data() {
      return {
        dialogFormVisible: false,
        activeName: 'first',
        value1: '',
        value2: '',
        tableData: [],
        queryForm: {},
      }
    },
    created() {},
    mounted() {},

    methods: {
      open(val) {
        console.log(val, 'open')
        this.$nextTick(() => {
          this.initChart()
        })
      },
      showEdit(row) {
        this.dialogFormVisible = true
      },
      handleClick(tab, event) {},
      close() {},
      save() {},
      initChart(name, xData, yData) {
        let getchart = echarts.init(document.getElementById('report'))
        var option = {
          // backgroundColor: '#00265f',
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
          },
          grid: {
            top: '15%',
            right: '3%',
            left: '5%',
            bottom: '12%',
          },
          legend: {
            itemGap: 50,
            top: '3%',
            right: '11%',
            data: ['2023-06用量'],
            textStyle: {
              color: '#000',
              borderColor: '#fff',
            },
          },
          xAxis: [
            {
              type: 'category',
              data: ['0', '5', '10', '15', '20', '25', '30'],
              axisLine: {
                lineStyle: {
                  color: '#cdcdcd',
                },
              },
              axisLabel: {
                margin: 10,
                color: '#000',
                textStyle: {
                  fontSize: 14,
                },
              },
            },
          ],
          yAxis: [
            {
              axisLabel: {
                formatter: '{value}',
                color: '#000',
              },
              axisLine: {
                show: false,
              },
              splitLine: {
                lineStyle: {
                  color: '#ededed',
                },
              },
            },
          ],
          series: [
            {
              name: '2023-06用量',
              type: 'bar',
              data: [300, 450, 370, 203, 255, 188, 156],
              barWidth: '20px',
              itemStyle: {
                normal: {
                  color: new echarts.graphic.LinearGradient(
                    0,
                    0,
                    0,
                    1,
                    [
                      {
                        offset: 0,
                        color: 'rgba(0,244,255,1)', // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: 'rgba(0,77,167,1)', // 100% 处的颜色
                      },
                    ],
                    false
                  ),
                  barBorderRadius: [30, 30, 30, 30],
                  shadowColor: 'rgba(0,160,221,1)',
                  shadowBlur: 4,
                },
              },
              label: {
                normal: {
                  show: true,
                  lineHeight: 30,
                  width: 80,
                  height: 30,
                  backgroundColor: 'rgba(0,160,221,0.1)',
                  borderRadius: 200,
                  position: ['-8', '-60'],
                  distance: 1,
                  formatter: ['    {d|●}', ' {a|{c}}     \n', '    {b|}'].join(
                    ','
                  ),
                  rich: {
                    d: {
                      color: '#3CDDCF',
                    },
                    a: {
                      color: '#000',
                      align: 'center',
                    },
                    b: {
                      width: 1,
                      height: 30,
                      borderWidth: 1,
                      borderColor: '#234e6c',
                      align: 'left',
                    },
                  },
                },
              },
            },
          ],
        }
        getchart.setOption(option)
        //随着屏幕大小调节图表
        window.addEventListener('resize', () => {
          getchart.resize()
        })
      },
    },
  }
</script>

<style lang="scss">
  .shuib {
    height: 200px;
    width: 200px;
    margin-left: 40px;
    // background-color: #ededed;
    // margin: 0 auto;
  }
  .count {
    font-size: 15px;
    font-family: '微软雅黑';
    margin-right: 30px;
    float: left;
    height: 45px;
    line-height: 20px;
  }
  .num {
    font-size: 18px;
    font-family: '微软雅黑';
    float: right;
    // margin-top: 15px;
    color: #0d6eff;
    font-weight: 500;
  }
  .my-dialog {
    top: -60px;
    left: 50px;
  }
</style>
