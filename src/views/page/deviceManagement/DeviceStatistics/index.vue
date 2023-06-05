<template>
  <div class="index-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <div v-for="(item, index) in iconList" :key="index">
          <el-card class="icon-panel" shadow="never">
            <h1>{{ item.count }}</h1>
            <p>{{ item.title }}</p>
          </el-card>
        </div>
      </el-col>

      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-descriptions class="margin-top" :column="1" size="medium" border>
          <!-- <template slot="extra">
            <el-button type="primary" size="small">操作</el-button>
          </template> -->
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              最近联网门锁
            </template>
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-mobile-phone"></i>
              最近联网网关
            </template>
            <!-- 18100000000 -->
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              最近联网电表
            </template>
            <!-- kooriookami -->
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              最近联网水表
            </template>
            <!-- kooriookami -->
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              断闸水电表
            </template>
            <!-- kooriookami -->
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              低电压门锁数量
            </template>
            <!-- kooriookami -->
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              设备报警事件数
            </template>
            <!-- kooriookami -->
          </el-descriptions-item>
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              数据统计时间
            </template>
            <el-button style="float: right" round>刷新统计数据</el-button>
            <!-- kooriookami -->
          </el-descriptions-item>
        </el-descriptions>
      </el-col>

      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-table :data="tableData" style="width: 100%">
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
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { listOfficeDevice, listOfficeDevicePage } from '@/api/table'

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
        iconList: [
          {
            icon: 'video',
            title: '门锁总数量',
            count: '21',
          },
          {
            icon: 'video',
            title: '网关数量',
            count: '1',
          },
          {
            icon: 'table',
            count: '11',
            title: '电表总数量',
          },
          {
            icon: 'table',
            count: '1',
            title: '水表总数量',
          },
          {
            icon: 'table',
            count: '0',
            title: '门锁在线数量',
          },
          {
            icon: 'laptop-code',
            count: '0',
            title: '网关在线数量',
          },
          {
            icon: 'table',
            count: '0',
            title: '电表在线数量',
          },
          {
            icon: 'book',
            count: '0',
            title: '水表在线数量',
          },
          {
            icon: 'bullhorn',
            count: '30%',
            title: '门锁在线率',
          },
          {
            icon: 'gift',
            count: '2%',
            title: '电表在线率',
          },

          {
            icon: 'balance-scale-left',
            count: '0%',
            title: '水表在线率',
          },
          {
            icon: 'coffee',
            count: '23%',
            title: '网关在线率',
          },
        ],
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
        let datas = {
          buildKeys: '',
          pageNumber: 1,
          pageSize: 10,
        }
        let listOfficedatas = await listOfficeDevicePage(datas, {})
        console.log(listOfficedatas, 'listOfficeDevice')
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
    background: #f5f7f8 !important;

    .icon-panel {
      height: 105px;
      width: 24%;
      float: left;
      text-align: center;

      // cursor: pointer;
      margin-right: 5px;
      // border: 1px solid firebrick;

      h1 {
        float: left;
        font-size: 30px;
        width: 100%;
        padding: 0 !important;
        margin: 0 !important;
        color: #16b7fb;
        // border: 1px solid firebrick;
      }

      p {
        float: left;
        width: 100%;
        // border: 1px solid firebrick;
      }
    }
  }
</style>
