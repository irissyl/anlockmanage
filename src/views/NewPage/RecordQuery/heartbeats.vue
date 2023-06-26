<template>
  <div class="table-container">
    <div class="can">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <i class="el-icon-info fon"></i>
          <span class="fon" style="font-size: 15px">心跳统计图表</span>
        </div>
        <el-calendar
          v-model="dates"
          class="cans"
          @change="getDateData"
        ></el-calendar>
      </el-card>
    </div>
    <div class="tableDatas">
      <el-card class="box-card2">
        <el-table :data="tableData" width="500px">
          <el-table-column prop="date" label="心跳时间"></el-table-column>
          <el-table-column prop="name" label="设备状态"></el-table-column>
          <el-table-column prop="age" label="心跳值"></el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Satisfies',
    data() {
      return {
        list: [],
        imageList: [],
        listLoading: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        background: true,
        selectRows: '',
        elementLoadingText: '正在加载...',
        Builddata: [],
        buildObjs: [],
        tableData: [],
        dates: new Date(),
      }
    },
    methods: {
      getDateData() {
        // 根据选中的日期获取表格数据
        const dateStr = this.formatDate(this.date, 'yyyy-MM-dd')
        // 这里可以根据需要发送请求获取数据
        // 模拟数据
        this.tableData = [
          { date: dateStr, name: '张三', age: 20 },
          { date: dateStr, name: '李四', age: 25 },
          { date: dateStr, name: '王五', age: 30 },
        ]
      },
      formatDate(date, fmt) {
        // 格式化日期
        const o = {
          'M+': date.getMonth() + 1, // 月份
          'd+': date.getDate(), // 日
          'h+': date.getHours(), // 小时
          'm+': date.getMinutes(), // 分
          's+': date.getSeconds(), // 秒
          'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
          S: date.getMilliseconds(), // 毫秒
        }
        if (/(y+)/.test(fmt)) {
          fmt = fmt.replace(
            RegExp.$1,
            (date.getFullYear() + '').substr(4 - RegExp.$1.length)
          )
        }
        for (const k in o) {
          if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(
              RegExp.$1,
              RegExp.$1.length === 1
                ? o[k]
                : ('00' + o[k]).substr(('' + o[k]).length)
            )
          }
        }
        return fmt
      },
    },
  }
</script>

<style lang="scss" scoped>
  .btntotal {
    float: right;
    margin-bottom: 20px;
  }
  .box-card {
    width: 480px;
    float: left;
    margin-right: 20px;
  }
</style>
