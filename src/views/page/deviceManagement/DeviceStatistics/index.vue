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
        <el-card class="card" shadow="never">
          <div slot="header">
            <span>更新日志</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getList } from '@/api/changeLog'
  import { getNoticeList } from '@/api/notice'

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
            count: '23',
          },
          {
            icon: 'table',
            count: '23',
            title: '表格',
          },
          {
            icon: 'laptop-code',
            count: '23',
            title: '源码',
          },
          {
            icon: 'table',
            count: '23',
            title: '表格',
          },
          {
            icon: 'book',
            count: '23',
            title: '书籍',
          },
          {
            icon: 'bullhorn',
            count: '23',
            title: '公告',
          },
          {
            icon: 'gift',
            count: '23',
            title: '礼物',
          },

          {
            icon: 'balance-scale-left',
            count: '23',
            title: '公平的世界',
          },
          {
            icon: 'coffee',
            count: '23',
            title: '休息一下',
          },
        ],
      }
    },

    beforeDestroy() {
      clearInterval(this.timer)
    },

    methods: {
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
      // height: 117px;
      width: 15%;
      float: left;
      text-align: center;
      // cursor: pointer;
      margin-right: 15px;
      // border: 1px solid firebrick;

      h1 {
        float: left;
        font-size: 40px;
        width: 100%;
        // border: 1px solid firebrick;
      }

      p {
        float: left;
        width: 100%;
        // border: 1px solid firebrick;
      }
    }

    .bottom-btn {
      button {
        // margin: 5px 10px 15px 0;
      }
    }
  }
</style>
