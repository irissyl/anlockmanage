<template>
  <div class="index-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4" class="left">
        <el-tabs tab-position="left">
          <el-tab-pane v-for="item in buildData" :key="item.buildKey">
            <div slot="label" class="loudong">
              <img
                src="../../assets/loudong.png"
                class="imgs"
                alt=""
                srcset=""
              />
              <div class="font1">{{ item.buildName }}</div>
            </div>
            我的行程
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :xs="24" :sm="18" :md="18" :lg="18" :xl="18">
        <el-col :span="3">
          <el-card shadow="hover">鼠标悬浮时显示2</el-card>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getNoticeList } from '@/api/api'
  import { getBuildList } from '@/api/table'

  export default {
    name: 'Index',

    data() {
      return {
        buildData: [],
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
    },
  }
</script>
<style lang="scss" scoped>
  .left {
    width: 300px;
    height: 880px;
    overflow-y: auto;
  }
  .loudong {
    width: 120px;
    height: auto;
    border-radius: 10px;
  }

  .louceng {
    // width: 150px;
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

  .el-tabs__active-bar {
    height: 40px;
    transform: translateY(469px);
  }
</style>
