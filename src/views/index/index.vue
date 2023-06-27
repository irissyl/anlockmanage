<template>
  <div class="index-containers">
    <el-row :gutter="20">
      <!-- <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="18">
        <el-col :span="3">
          <el-card shadow="hover">鼠标悬浮时显示2</el-card>
        </el-col>
      </el-col> -->
    </el-row>
  </div>
</template>

<script>
  import { listRoom, getNoticeList } from '@/api/api'
  import { getBuildList } from '@/api/table'

  export default {
    name: 'Index',

    data() {
      return {
        buildData: [],
        floor: [],
      }
    },
    created() {
      this.fetchData()
    },
    beforeDestroy() {
      clearInterval(this.timer)
    },
    mounted() {},
    methods: {
      async fetchData() {
        let data = await getBuildList()
        this.buildData = data.data
        console.log(data, 'getBuildList')
      },
      async handleClick(tab, event) {
        let builds = parseInt(tab.name)
        let data = await listRoom({ buildId: builds })

        console.log(tab.name, data.data.datas)
      },
    },
  }
</script>
<style lang="scss">
  .index-containers {
    .left {
      width: 300px;
      height: 800px;
      overflow-y: auto;
    }

    .el-tabs--left .el-tabs__item.is-active::after {
      height: 2px;
      background-color: #ffffff;
      bottom: 0px;
    }

    .el-tabs__active-bar {
      background-color: transparent !important;
    }

    .loudong {
      width: 120px;
      height: auto;
      border-radius: 10px;
    }

    .btnrow {
      height: 600px;
      width: 60px;

      button {
        float: right;
        margin-top: 20px;
      }
    }

    .imgs {
      width: 90px;
      height: 70px;
      float: left;
      margin-top: 15px;
      margin-left: 15px;
    }

    .font1 {
      float: left;
      font-size: 14px;
      text-align: center;
      margin: 0 0 0 30px;
    }

    div::-webkit-scrollbar {
      width: 1px;
    }
    div::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      opacity: 0.1;
    }
    div::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      border-radius: 0;
    }
  }
</style>
