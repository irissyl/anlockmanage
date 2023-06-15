<template>
  <div>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="待审核预约" name="first">
        <el-table :data="tableData" style="width: 98%; margin-left: 1%" border>
          <el-table-column
            prop="date"
            label="预约号"
            width="130"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="预约人"
            width="130"
          ></el-table-column>
          <el-table-column
            prop="address"
            label="手机"
            width="130"
          ></el-table-column>
          <el-table-column
            prop="date"
            label="预约类型"
            width="130"
          ></el-table-column>
          <el-table-column
            prop="date"
            label="楼栋"
            width="130"
          ></el-table-column>
          <el-table-column
            prop="date"
            label="预约房间"
            width="130"
          ></el-table-column>
          <el-table-column
            prop="date"
            label="设备标识"
            width="130"
          ></el-table-column>
          <el-table-column
            prop="date"
            label="申请时间"
            width="130"
          ></el-table-column>
          <el-table-column
            prop="date"
            label="申请说明"
            width="130"
          ></el-table-column>
          <el-table-column
            prop="date"
            label="预约时段开始"
            width="130"
          ></el-table-column>
          <el-table-column
            prop="date"
            label="预约时段结束"
            width="130"
          ></el-table-column>
          <el-table-column
            prop="date"
            label="状态"
            width="130"
          ></el-table-column>
          <el-table-column prop="date" label="操作" width="150" fixed="right">
            <template #default="{ row }">
              <el-button type="primary" size="mini" @click="handleEdit(row)">
                审核
              </el-button>
              <el-button type="primary" size="mini" @click="handleOpen(row)">
                拒绝
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="已审核预约" name="second">
        <div class="top" style="margin-left: 1%">
          <el-form
            ref="form"
            :model="queryForm"
            :inline="true"
            @submit.native.prevent
          >
            <el-form-item>
              <label class="lb">查询时间段：&ensp;&ensp;</label>
              <el-date-picker
                v-model="value1"
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
                查询
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="btm">
          <el-table :data="[]" style="width: 99%" border>
            <el-table-column
              prop="date"
              label="预约号"
              width="130"
            ></el-table-column>
            <el-table-column
              prop="name"
              label="预约人"
              width="130"
            ></el-table-column>
            <el-table-column
              prop="address"
              label="手机"
              width="130"
            ></el-table-column>
            <el-table-column
              prop="date"
              label="预约类型"
              width="130"
            ></el-table-column>
            <el-table-column
              prop="date"
              label="楼栋"
              width="130"
            ></el-table-column>
            <el-table-column
              prop="date"
              label="预约房间"
              width="130"
            ></el-table-column>
            <el-table-column
              prop="date"
              label="设备标识"
              width="130"
            ></el-table-column>
            <el-table-column prop="date" label="申请时间"></el-table-column>
            <el-table-column
              prop="date"
              label="申请说明"
              width="130"
            ></el-table-column>
            <el-table-column
              prop="date"
              label="预约时段开始"
              width="130"
            ></el-table-column>
            <el-table-column
              prop="date"
              label="预约时段结束"
              width="130"
            ></el-table-column>
            <el-table-column
              prop="date"
              label="状态"
              width="130"
            ></el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: 'AnlockmanageIndex',

    data() {
      return {
        activeName: 'first',
        queryForm: {
          pageNo: 1,
          pageSize: 20,
          title: '',
        },
        tableData: [{ date: 1 }],
        value1: [
          new Date(2000, 10, 10, 10, 10),
          new Date(2000, 10, 11, 10, 10),
        ],
      }
    },

    mounted() {},

    methods: {
      handleClick(tab, event) {
        console.log(tab, event)
      },
    },
  }
</script>

<style lang="scss" scoped></style>
