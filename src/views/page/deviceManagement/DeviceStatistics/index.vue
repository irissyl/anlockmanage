<template>
  <div class="index-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <i class="el-icon-info fon"></i>
            <span class="fon" style="font-size: 15px">设备数据统计</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
          </div>
          <div class="text item">
            <el-card class="icon-panel" shadow="never">
              <h1>{{ analyseCountdatas.lockCount }}</h1>
              <p>门锁总数量</p>
            </el-card>
            <el-card class="icon-panel" shadow="never">
              <h1>{{ analyseCountdatas.gatewayCount }}</h1>
              <p>网关总数量</p>
            </el-card>
            <el-card class="icon-panel" shadow="never">
              <h1>{{ analyseCountdatas.gatewayCount }}</h1>
              <p>电表总数量</p>
            </el-card>
            <el-card class="icon-panel" shadow="never">
              <h1>{{ analyseCountdatas.gatewayCount }}</h1>
              <p>水表总数量</p>
            </el-card>
            <el-card class="icon-panel" shadow="never">
              <h1>{{ analyseCountdatas.lockOnlineCount }}</h1>
              <p>门锁在线数量</p>
            </el-card>
            <el-card class="icon-panel" shadow="never">
              <h1>{{ analyseCountdatas.gatewayOnlineCount }}</h1>
              <p>网关在线数量</p>
            </el-card>
            <el-card class="icon-panel" shadow="never">
              <h1>{{ analyseCountdatas.lockOnlineCount }}</h1>
              <p>电表在线数量</p>
            </el-card>
            <el-card class="icon-panel" shadow="never">
              <h1>{{ analyseCountdatas.gatewayOnlineCount }}</h1>
              <p>水表在线数量</p>
            </el-card>
            <el-card class="icon-panel" shadow="never">
              <h1>{{ analyseCountdatas.lockCount }}</h1>
              <p>门锁在线率</p>
            </el-card>
            <el-card class="icon-panel" shadow="never">
              <h1>{{ analyseCountdatas.lockCount }}</h1>
              <p>网关在线率</p>
            </el-card>
            <el-card class="icon-panel" shadow="never">
              <h1>--</h1>
              <p>电表在线率</p>
            </el-card>
            <el-card class="icon-panel" shadow="never">
              <h1>--</h1>
              <p>水表在线率</p>
            </el-card>
          </div>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <i class="el-icon-info fon"></i>
            <span class="fon" style="font-size: 15px">最近设备信息</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
          </div>
          <el-descriptions class="margin-top" :column="1" size="medium" border>
            <el-descriptions-item label-class-name="mylabel">
              <template slot="label">
                <!-- <i class="el-icon-user"></i> -->
                最近联网门锁
              </template>
            </el-descriptions-item>
            <el-descriptions-item label-class-name="mylabel">
              <template slot="label">
                <!-- <i class="el-icon-net"></i> -->
                最近联网网关
              </template>
              <!-- 18100000000 -->
            </el-descriptions-item>
            <el-descriptions-item label-class-name="mylabel">
              <template slot="label">
                <!-- <i class="el-icon-user"></i> -->
                最近联网电表
              </template>
              <!-- kooriookami -->
            </el-descriptions-item>
            <el-descriptions-item label-class-name="mylabel">
              <template slot="label">
                <!-- <i class="el-icon-user"></i> -->
                最近联网水表
              </template>
              <!-- kooriookami -->
            </el-descriptions-item>
            <el-descriptions-item label-class-name="mylabel">
              <template slot="label">
                <!-- <i class="el-icon-user"></i> -->
                断闸水电表
              </template>
              <!-- kooriookami -->
            </el-descriptions-item>
            <el-descriptions-item label-class-name="mylabel">
              <template slot="label">
                <!-- <i class="el-icon-user"></i> -->
                低电压门锁数量
              </template>
              <!-- kooriookami -->
            </el-descriptions-item>
            <el-descriptions-item label-class-name="mylabel">
              <template slot="label">
                <!-- <i class="el-icon-user"></i> -->
                设备报警事件数
              </template>
              <!-- kooriookami -->
            </el-descriptions-item>
            <el-descriptions-item label-class-name="mylabel">
              <template slot="label">
                <!-- <i class="el-icon-user"></i> -->
                数据统计时间
              </template>
              <el-button style="float: right" round>刷新统计数据</el-button>
              <!-- kooriookami -->
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>

      <el-col :xs="24" :sm="24" ::md="24" :lg="24" :xl="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <i class="el-icon-info fon"></i>
            <span class="fon" style="font-size: 15px">设备报警记录</span>
            <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
          </div>
          <el-table :data="[]" border style="width: 100%; margin-top: 25px">
            <el-table-column
              prop="name"
              label="楼栋"
              width="180"
            ></el-table-column>
            <el-table-column prop="address" label="设备名称"></el-table-column>
            <el-table-column prop="address" label="设备标识"></el-table-column>
            <el-table-column prop="address" label="设备类型"></el-table-column>
            <el-table-column prop="address" label="报警项目"></el-table-column>
            <el-table-column prop="address" label="报警内容"></el-table-column>
            <el-table-column
              prop="date"
              label="联网时间"
              width="180"
            ></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { analyseCount } from '@/api/table'

  export default {
    name: 'Index',
    data() {
      return {
        timer: 0,
        //更新日志
        reverse: true,
        activities: [],
        noticeList: [],
        //其他信息
        userAgent: navigator.userAgent,
        //卡片图标
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '1518 弄',
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            address: '1517 弄',
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            address: '1519 弄',
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '1516 弄',
          },
        ],
        analyseCountdatas: {},
      }
    },

    beforeDestroy() {
      clearInterval(this.timer)
    },
    mounted() {
      this.getlistOfficeDevice()
    },
    methods: {
      async getlistOfficeDevice() {
        let analyseCountdata = await analyseCount()
        if (analyseCountdata.resultCode == 0) {
          this.analyseCountdatas = analyseCountdata.data
          console.log('analyseCount:', this.analyseCountdatas)
        }
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
        /* getRepos({
      token: "1061286824f978ea3cf98b7b8ea26fe27ba7cea1",
    }).then((res) => {
      const per_page = Math.ceil(res.data.stargazers_count / 100);
      alert(per_page);
      getStargazers({
        token: "1061286824f978ea3cf98b7b8ea26fe27ba7cea1",
        page: 1,
        per_page: res.per_page,
      }).then((res) => {
        alert(JSON.stringify(res));
      });
    }); */
      },
    },
  }
</script>
<style lang="scss" scoped>
  .index-container {
    padding: 0 !important;
    margin: 0 !important;
    .box-card {
      // background: linear-gradient(to top, #1e66ac, #bce5fffd);
    }
    .fon {
      font-size: 17px;
      font-family: 'Microsoft YaHei', sans-serif;
      // color: aliceblue;
      margin-right: 5px;
    }

    .icon-panel {
      height: 106px;
      width: 145px;
      float: left;
      text-align: center;
      margin-right: 5px;
      // margin-left: 20px;
      border-radius: 5px;
      h1 {
        float: left;
        font-size: 25px;
        width: 100%;
        padding: 0 !important;
        margin: 0 !important;
        color: #2e2d2d;
        font-family: 'Microsoft YaHei', sans-serif;
        // border: 1px solid firebrick;
      }

      p {
        float: left;
        color: #0a0a0a;
        font-family: 'Microsoft YaHei', sans-serif;
        width: 100%;
        // border: 1px solid firebrick;
      }
    }
  }
</style>
