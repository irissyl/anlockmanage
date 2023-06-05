<template>
  <div class="index-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
        <el-card class="all1" shadow="never">
          <p class="p1">总人数</p>
          <img src="../../assets/comparison/zongrenshu.png" class="imgs" />
          <div class="p3">300</div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
        <el-card class="all2" shadow="never">
          <p class="p1">设备数量</p>
          <img
            src="../../assets/comparison/shebeishuliangico.png"
            class="imgs"
          />
          <div class="p2">30</div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
        <el-card class="all3" shadow="never">
          <p class="p1">宿舍人员总数</p>
          <img src="../../assets/comparison/sushejilu.png" class="imgs" />
          <div class="p2">300</div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
        <el-card class="all4" shadow="never">
          <p class="p1">办公室人员总数</p>
          <img
            src="../../assets/comparison/bangongshirenyuan.png"
            class="imgs"
          />
          <div class="p2">300</div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-card shadow="never" style="height: 590px">
          <div slot="header">
            <span>人员数量统计图</span>
          </div>
          <BareChart ref="chart_line_one"></BareChart>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="13" :lg="12" :xl="12">
        <el-card class="card" shadow="never" style="height: 590px">
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

      <!-- <el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
        <el-card shadow="never">
          <div slot="header">
            <span>授权数</span>
          </div>
          <vab-chart autoresize :options="sqs" />
          <div class="bottom">
            <span>
              总授权数:
              {{ config2.endVal }}
            </span>
          </div>
        </el-card>
      </el-col> -->

      <!-- <el-col
        v-for="(item, index) in iconList"
        :key="index"
        :xs="12"
        :sm="6"
        :md="3"
        :lg="3"
        :xl="3"
      >
        <router-link :to="item.link" target="_blank">
          <el-card class="icon-panel" shadow="never">
            <vab-icon
              :style="{ color: item.color }"
              :icon="['fas', item.icon]"
            ></vab-icon>
            <p>{{ item.title }}</p>
          </el-card>
        </router-link>
      </el-col> -->

      <!-- <el-col :xs="24" :sm="24" :md="24" :lg="11" :xl="11">
        <el-card class="card" shadow="never">
          <div slot="header">
            <span>依赖信息</span>
            <div style="float: right">部署时间:{{ updateTime }}</div>
          </div>
        </el-card>

        <el-card shadow="never">
          <div slot="header">
            <span>其他信息</span>
          </div>
          <br />
        </el-card>
      </el-col> -->
    </el-row>
  </div>
</template>

<script>
  // import VabChart from '@/plugins/echarts'
  import { dependencies, devDependencies } from '../../../package.json'
  import { getList } from '@/api/changeLog'
  import { getNoticeList } from '@/api/notice'
  import { getRepos, getStargazers } from '@/api/github'
  import BareChart from './components/barechart.vue'
  // import VersionInformation from './components/VersionInformation'

  export default {
    name: 'Index',
    components: {
      // VabChart,
      BareChart,
      // Plan,
      // VersionInformation,
    },
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
      }
    },
    created() {
      // this.fetchData()
    },
    beforeDestroy() {
      clearInterval(this.timer)
    },
    mounted() {
      this.$refs.chart_line_one.initChart()
    },
    methods: {
      initChart(name, xData, yData) {
        let getchart = echarts.init(document.getElementById('echart-line'))
        var option = {}
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
