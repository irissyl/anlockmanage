<template>
  <div class="index-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
        <el-card class="all1" shadow="hover">
          <p class="p1">总人数</p>
          <img src="../../assets/comparison/zongrenshu.png" class="imgs" />
          <div class="p3">
            {{ analyseCountDatas.hostelCount + analyseCountDatas.officeCount }}
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
        <el-card class="all2" shadow="hover">
          <p class="p1">设备数量</p>
          <img
            src="../../assets/comparison/shebeishuliangico.png"
            class="imgs"
          />
          <div class="p2">{{ analyseCountDatas.lockCount }}</div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
        <el-card class="all3" shadow="hover">
          <p class="p1">宿舍人员总数</p>
          <img src="../../assets/comparison/sushejilu.png" class="imgs" />
          <div class="p2">{{ analyseCountDatas.hostelCount }}</div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
        <el-card class="all4" shadow="hover">
          <p class="p1">办公室人员总数</p>
          <img
            src="../../assets/comparison/bangongshirenyuan.png"
            class="imgs"
          />
          <div class="p2">{{ analyseCountDatas.officeCount }}</div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-card shadow="hover" style="height: 590px">
          <div slot="header">
            <span>人员数量统计图</span>
          </div>
          <div
            id="chart_line_one"
            :style="{ width: '100%', height: '400px' }"
          ></div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="13" :lg="12" :xl="12">
        <el-card class="card" shadow="hover" style="height: 590px">
          <div slot="header">
            <span>设备报警记录</span>
          </div>
          <el-timeline :reverse="reverse">
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="activity.timestamp"
              :color="activity.color"
            >
              {{ activity.content }}
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import * as echarts from 'echarts'
  import { dependencies, devDependencies } from '../../../package.json'
  import { getList } from '@/api/changeLog'
  import { getNoticeList } from '@/api/notice'
  import { analyseCount } from '@/api/table'

  export default {
    name: 'Index',

    data() {
      return {
        timer: 0,
        updateTime: process.env.VUE_APP_UPDATE_TIME,
        nodeEnv: process.env.NODE_ENV,
        dependencies: dependencies,
        devDependencies: devDependencies,
        //更新日志
        reverse: true,
        activities: [
          {
            content: '电池电压:0.00V',
            timestamp: '2020-04-18',
            color: '#209cff',
          },
          {
            content: '测试房1002: 设备在5个心跳周期内未上线',
            timestamp: '2020-04-19',
            color: '#209cff',
          },
          {
            content: '测试房1003: 电池电压:0.00V',
            timestamp: '2020-04-20',
            color: '#209cff',
          },
          {
            content: '测试房10054: 设备5个心跳周期未上线',
            timestamp: '2020-04-25',
            color: '#209cff',
          },
          {
            content: '测试房1005: 设备5个心跳周期未上线',
            timestamp: '2020-04-26',
            color: '#209cff',
          },
          {
            content: '测试房1005: 设备5个心跳周期未上线',
            timestamp: '2020-04-27',
            color: '#209cff',
          },
        ],
        noticeList: [],
        //其他信息
        userAgent: navigator.userAgent,
        //卡片图标
        analyseCountDatas: {},
        flag: false,
      }
    },
    created() {
      // this.fetchData()
      this.getanalyseCount()
    },
    beforeDestroy() {
      clearInterval(this.timer)
    },
    mounted() {},
    methods: {
      async getanalyseCount() {
        let analyseCountData = await analyseCount()
        if (analyseCountData.resultCode == 0) {
          this.analyseCountDatas = analyseCountData.data
          this.initChart()
          console.log('analyseCount:', this.analyseCountDatas)
        }
      },
      initChart(name, xData, yData) {
        let getchart = echarts.init(document.getElementById('chart_line_one'))
        console.log(this.analyseCountDatas, 'this.analyseCountData')
        var data = [
          {
            name: '宿舍人数',
            value: this.analyseCountDatas.hostelCount,
          },
          {
            name: '办公室人数',
            value: this.analyseCountDatas.officeCount,
          },
        ]

        var option = {
          color: [
            '#315f97',
            '#005fa6',
            '#86c9f4',
            '#4da8ec',
            '#315f97',
            'rgba(250,250,250,0.3)',
          ],
          // backgroundColor: '#86c9f4',
          title: {
            text: '总数',
            subtext:
              this.analyseCountDatas.hostelCount +
              this.analyseCountDatas.officeCount,
            textStyle: {
              color: '#000',
              fontSize: 20,
              // align: 'center'
            },
            subtextStyle: {
              fontSize: 20,
              color: ['#ff9d19'],
            },
            x: 'center',
            y: 'center',
          },
          grid: {
            bottom: 150,
            left: 100,
            right: '10%',
            color: '#000',
          },
          legend: {
            orient: 'vertical',
            top: '2%',
            right: '5%',
            textStyle: {
              color: '#000',
              fontSize: 15,
            },
            icon: 'roundRect',
            data: data,
          },
          tooltip: [
            {
              //提示框
              trigger: 'item', //触发方式
              axisPointer: {
                type: 'shadow',
                textStyle: {
                  color: '#000',
                },
              },
            },
          ],
          series: [
            // 主要展示层的
            {
              radius: ['30%', '61%'],
              center: ['50%', '50%'],
              type: 'pie',
              label: {
                normal: {
                  show: true,
                  formatter: '{c}人',
                  textStyle: {
                    fontSize: 20,
                  },
                  position: 'outside',
                },
                emphasis: {
                  show: true,
                },
              },
              labelLine: {
                normal: {
                  show: true,
                  length: 30,
                  length2: 55,
                },
                emphasis: {
                  show: true,
                },
              },
              name: '人数总量',
              data: data,
            },
            // 边框的设置
            {
              radius: ['30%', '34%'],
              center: ['50%', '50%'],
              type: 'pie',
              label: {
                normal: {
                  show: false,
                },
                emphasis: {
                  show: false,
                },
              },
              labelLine: {
                normal: {
                  show: false,
                },
                emphasis: {
                  show: false,
                },
              },
              animation: false,
              tooltip: {
                show: false,
              },
              data: [
                {
                  value: 1,
                  itemStyle: {
                    color: 'rgba(250,250,250,0.3)',
                  },
                },
              ],
            },
            {
              name: '外边框',
              type: 'pie',
              clockWise: false, //顺时加载
              hoverAnimation: false, //鼠标移入变大
              center: ['50%', '50%'],
              radius: ['65%', '65%'],
              label: {
                normal: {
                  show: false,
                },
              },
              data: [
                {
                  value: 9,
                  name: '',
                  itemStyle: {
                    normal: {
                      borderWidth: 2,
                      borderColor: '#0b5263',
                    },
                  },
                },
              ],
            },
          ],
        }
        getchart.setOption(option)
        //随着屏幕大小调节图表
        window.addEventListener('resize', () => {
          getchart.resize()
        })
      },
      handleClick(e) {
        this.$baseMessage(`点击了${e.name},这里可以写跳转`)
      },
      handleZrClick(e) {},
      handleChangeTheme() {
        this.$baseEventBus.$emit('theme')
      },
      async fetchData() {
        const { data } = await getList()
        data.map((item, index) => {
          if (index === data.length - 1) {
            item.color = '#0bbd87'
          }
        })
        this.activities = data
        const res = await getNoticeList()
        this.noticeList = res.data
      },
    },
  }
</script>
<style lang="scss" scoped>
  @import './css';
  .index-container {
    padding: 0 !important;
    margin: 0 !important;
    background: #f5f7f8 !important;

    ::v-deep {
      .el-alert {
        padding: $base-padding;

        &--info.is-light {
          min-height: 82px;
          padding: $base-padding;
          margin-bottom: 15px;
          color: #909399;
          background-color: $base-color-white;
          border: 1px solid #ebeef5;
        }
      }

      .el-card__body {
        .echarts {
          width: 100%;
          height: 115px;
        }
      }
    }

    .card {
      ::v-deep {
        .el-card__body {
          .echarts {
            width: 100%;
            height: 305px;
          }
        }
      }
    }

    .bottom {
      padding-top: 20px;
      margin-top: 5px;
      color: #595959;
      text-align: left;
      border-top: 1px solid $base-border-color;
    }

    .table {
      width: 100%;
      color: #666;
      border-collapse: collapse;
      background-color: #fff;

      td {
        position: relative;
        min-height: 20px;
        padding: 9px 15px;
        font-size: 14px;
        line-height: 20px;
        border: 1px solid #e6e6e6;

        &:nth-child(odd) {
          width: 20%;
          text-align: right;
          background-color: #f7f7f7;
        }
      }
    }
  }
  .imgs {
    float: right;
    width: 55px;
    height: 55px;
    margin-top: 35px;
  }
</style>
