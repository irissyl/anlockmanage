<template>
  <div class="locks">
    <el-dialog
      v-dialogDrag
      title="门锁设置"
      :visible.sync="dialogTableVisible"
      width="1100px"
    >
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="设备基本信息" name="first">
          <el-descriptions class="des" :column="1">
            <el-descriptions-item
              label="状态名称"
              label-class-name="my-label"
              content-class-name="my-content"
            >
              状态值
            </el-descriptions-item>
            <el-descriptions-item
              label="设备名称"
              label-class-name="my-label1"
              content-class-name="my-content1"
            >
              1128996937
            </el-descriptions-item>
            <el-descriptions-item
              label="最后通信时间"
              label-class-name="my-label1"
              content-class-name="my-content1"
            >
              12/24/2021 8:40:16AM
            </el-descriptions-item>
            <el-descriptions-item
              label="最后开锁时间"
              label-class-name="my-label1"
              content-class-name="my-content1"
            >
              12/24/2021 8:40:16AM
            </el-descriptions-item>
            <el-descriptions-item
              label="ROM版本号"
              label-class-name="my-label1"
              content-class-name="my-content1"
            >
              1006km210318
            </el-descriptions-item>
            <el-descriptions-item
              label="心跳间隔"
              label-class-name="my-label1"
              content-class-name="my-content1"
            >
              300秒
            </el-descriptions-item>
            <el-descriptions-item
              label="设备电量"
              label-class-name="my-label1"
              content-class-name="my-content1"
            >
              5.10V
            </el-descriptions-item>
            <el-descriptions-item
              label="锁内用户"
              label-class-name="my-label1"
              content-class-name="my-content1"
            >
              0
            </el-descriptions-item>
            <el-descriptions-item
              label="报警状态"
              label-class-name="my-label1"
              content-class-name="my-content1"
            ></el-descriptions-item>
            <el-descriptions-item
              label="音量大小"
              label-class-name="my-label1"
              content-class-name="my-content1"
            >
              0
            </el-descriptions-item>
          </el-descriptions>
          <div class="btngroup">
            <el-button type="primary">远程开锁(5分钟内有效)</el-button>
            <el-button type="primary">修改心跳参数(需硬件支持)</el-button>
            <el-button type="primary">修改音量大小(需硬件支持)</el-button>
            <el-button type="primary">设置常开参数</el-button>
            <el-button type="primary">设置读卡参数</el-button>
            <el-button type="primary">设置蓝牙遥控器</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="心跳记录" name="second">
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
        </el-tab-pane>
        <el-tab-pane label="下发指令" name="third">
          <div class="top">
            <el-form
              ref="form"
              :model="queryForm"
              :inline="true"
              @submit.native.prevent
            >
              <el-form-item>
                <el-date-picker
                  v-model="datavalue1"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button
                  icon="el-icon-search"
                  type="primary"
                  native-type="submit"
                >
                  查询时间段日志
                </el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="bottom" style="height: 500px">
            <el-table :data="tableData" width="500px">
              <el-table-column prop="sid" label="sid"></el-table-column>
              <el-table-column prop="iotTag" label="设备标识"></el-table-column>
              <el-table-column prop="age" label="操作指令"></el-table-column>
              <el-table-column prop="age" label="操作状态"></el-table-column>
              <el-table-column prop="age" label="指令详情"></el-table-column>
              <el-table-column prop="age" label="设备回应"></el-table-column>
              <el-table-column prop="age" label="发送时间"></el-table-column>
              <el-table-column prop="age" label="回应时间"></el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="开锁日志" name="fourth">
          <div class="top">
            <el-form
              ref="form"
              :model="queryForm"
              :inline="true"
              @submit.native.prevent
            >
              <el-form-item>
                <el-date-picker
                  v-model="datavalue1"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button
                  icon="el-icon-search"
                  type="primary"
                  native-type="submit"
                >
                  查询时间段开锁日志
                </el-button>
                <el-button icon="el-icon-search" type="primary">
                  导出表格
                </el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="bottom" style="height: 500px">
            <el-table :data="tableData" width="500px">
              <el-table-column prop="sid" label="序号"></el-table-column>
              <el-table-column prop="iotTag" label="门锁名称"></el-table-column>
              <el-table-column prop="age" label="命令"></el-table-column>
              <el-table-column prop="age" label="卡片类型"></el-table-column>
              <el-table-column
                prop="age"
                label="卡号/用户名/密码时间"
              ></el-table-column>
              <el-table-column prop="age" label="开锁时间"></el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'AnlockmanageLockSet',

    data() {
      return {
        dialogTableVisible: false,
        activeName: 'first',
        dates: new Date(),
        queryForm: {
          pageNo: 1,
          pageSize: 10,
          title: '',
        },
        tableData: [],
        calendarConfig: {
          width: '200px',
          height: '250px',
        },
        datavalue1: [
          new Date(2000, 10, 10, 10, 10),
          new Date(2000, 10, 11, 10, 10),
        ],
      }
    },

    mounted() {},

    methods: {
      showEdit(row) {
        console.log(row, 'row')
        this.dialogTableVisible = true
      },
      handleClick(tab, event) {
        console.log(tab, event)
      },
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

<style lang="scss">
  .locks {
    .des {
      width: 80%;
      // float: left;
    }
    .my-label {
      font-size: 15px;
    }

    .my-content {
      font-size: 15px;
    }
    .my-label1 {
      font-size: 15px;
    }

    .my-content1 {
      font-size: 15px;
    }
    .btngroup {
      margin-top: 20px;
    }
    .box-card {
      width: 380px;
      float: left;
    }
    .cans {
      background-color: rgb(255, 255, 255);
    }
    .el-calendar-table .el-calendar-day {
      height: 50px;
    }
    .tableDatas {
      width: 60%;
      float: right;

      table {
        width: 100%;
      }
    }
  }
</style>
