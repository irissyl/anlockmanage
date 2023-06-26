<template>
  <div class="table-container">
    <div class="inputtotal">
      <el-form ref="form" :model="queryForm" :inline="true">
        <el-form-item class="ir">
          <label class="lb">姓名:</label>
          <el-input v-model="queryForm.title" class="ei" placeholder="姓名" />
        </el-form-item>
        <el-form-item class="ir">
          <label class="lb">手机号码:</label>
          <el-input
            v-model="queryForm.title"
            class="ei"
            placeholder="手机号码"
          />
        </el-form-item>
        <el-form-item class="ir">
          <label class="lb">证件号码:</label>
          <el-input
            v-model="queryForm.title"
            class="ei"
            placeholder="证件号码"
          />
        </el-form-item>
        <el-form-item>
          <el-button icon="el-icon-search" type="primary" native-type="submit">
            查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      ref="tableSort"
      border
      :data="list"
      :element-loading-text="elementLoadingText"
      :header-cell-style="{ 'text-align': 'center', background: '#f5f7fa' }"
      :cell-style="{ 'text-align': 'center' }"
      style="width: 100%"
    >
      <el-table-column prop="date" label="sid"></el-table-column>
      <el-table-column prop="name" label="设备标识"></el-table-column>
      <el-table-column prop="age" label="操作指令"></el-table-column>
      <el-table-column prop="age" label="操作状态"></el-table-column>
      <el-table-column prop="age" label="指令详情"></el-table-column>
      <el-table-column prop="age" label="设备回应"></el-table-column>
      <el-table-column prop="age" label="发送时间"></el-table-column>
      <el-table-column prop="age" label="回应时间"></el-table-column>
    </el-table>
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
        queryForm: {
          title: '',
        },
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
  .inputtotal {
    float: left;
    margin-bottom: 20px;
    width: 100%;
  }
  .ir {
    width: 280px;
  }
  .lb {
    float: left;
  }
  .ei {
    float: right;
    width: 190px;
    margin-left: 10px;
  }
  .box-card {
    width: 480px;
    float: left;
    margin-right: 20px;
  }
</style>
