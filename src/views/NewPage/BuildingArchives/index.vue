<template>
  <div class="table-container">
    <div class="btntotal">
      <el-button icon="el-icon-plus" type="primary" @click="handleAdd">
        添加片区
      </el-button>
      <el-button icon="el-icon-plus" type="primary" @click="handleloudong">
        添加楼栋
      </el-button>
      <el-button icon="el-icon-plus" type="primary" @click="handlefangjian">
        添加楼层
      </el-button>
      <el-button icon="el-icon-plus" type="primary">导入表格</el-button>
    </div>
    <el-table
      ref="tableSort"
      v-loading="listLoading"
      border
      :data="lists"
      :element-loading-text="elementLoadingText"
      :header-cell-style="{ 'text-align': 'center'}"
      :cell-style="{ 'text-align': 'center' }"
      style="width: 100%"
      @selection-change="setSelectRows"
      @sort-change="tableSortChange"
    >
      <el-table-column
        show-overflow-tooltip
        prop="areaName"
        label="片区"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop=""
        label="楼栋"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop=""
        label="房间编号"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop=""
        label="房间名称"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop=""
        label="锁状态"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop=""
        label="门状态"
      ></el-table-column>
      <el-table-column show-overflow-tooltip label="操作" fixed="right">
        <template #default="{ row }">
          <el-button type="text" @click="handleEdit(row)">编辑</el-button>
          <el-button type="text" @click="open(row)">开锁记录</el-button>
          <el-button type="text" @click="changkai(row)">常开设置</el-button>
          <el-button type="text" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <table-edit ref="edit" @fetchData="fetchData"></table-edit>
    <fj-table-edit ref="fangjian" @fetchData="fetchData"></fj-table-edit>
    <loudongTableEdit ref="loudong" @fetchData="fetchData"></loudongTableEdit>
    <yuanqu-edit ref="yuanqu" @fetchData="fetchData"></yuanqu-edit>
    <open-door-record ref="open" @fetchData="fetchData"></open-door-record>
    <el-dialog
      v-dialogDrag
      append-to-body
      title="设置常开参数"
      width="500px"
      :visible.sync="ckVisible"
    >
      <el-form :model="form">
        <el-form-item label-width="44px">
          <el-checkbox v-model="lockchecked" @change="lockcheckedChange">
            开启门锁常开功能
          </el-checkbox>
        </el-form-item>

        <el-form-item v-show="lockshow" label-width="120px" label="时间段1：">
          <el-time-select
            v-model="startTime"
            placeholder="起始时间"
            style="width: 140px; margin-right: 5px"
            :picker-options="{
              start: '08:30',
              step: '00:15',
              end: '18:30',
            }"
          ></el-time-select>
          <el-time-select
            v-model="endTime"
            placeholder="结束时间"
            style="width: 140px"
            :picker-options="{
              start: '08:30',
              step: '00:15',
              end: '18:30',
              minTime: startTime,
            }"
          ></el-time-select>
        </el-form-item>
        <el-form-item v-show="lockshow" label-width="120px" label="时间段2：">
          <el-time-select
            v-model="startTime"
            placeholder="起始时间"
            style="width: 140px; margin-right: 5px"
            :picker-options="{
              start: '08:30',
              step: '00:15',
              end: '18:30',
            }"
          ></el-time-select>
          <el-time-select
            v-model="endTime"
            placeholder="结束时间"
            style="width: 140px"
            :picker-options="{
              start: '08:30',
              step: '00:15',
              end: '18:30',
              minTime: startTime,
            }"
          ></el-time-select>
        </el-form-item>
        <el-form-item v-show="lockshow" label-width="120px" label="时间段3：">
          <el-time-select
            v-model="startTime"
            placeholder="起始时间"
            style="width: 140px; margin-right: 5px"
            :picker-options="{
              start: '08:30',
              step: '00:15',
              end: '18:30',
            }"
          ></el-time-select>
          <el-time-select
            v-model="endTime"
            placeholder="结束时间"
            style="width: 140px"
            :picker-options="{
              start: '08:30',
              step: '00:15',
              end: '18:30',
              minTime: startTime,
            }"
          ></el-time-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ckVisible = false">取 消</el-button>
        <el-button type="primary" @click="ckVisible = false">
          确认下发指令
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { getCampusList, deleteCampus } from '@/api/table'
  import TableEdit from './components/TableEdit'
  import FjTableEdit from './components/fjTableEdit.vue'
  import loudongTableEdit from './components/loudongTableEdit.vue'
  import YuanquEdit from './components/yuanquEdit.vue'
  import OpenDoorRecord from './components/openDoorRecord.vue'
  export default {
    name: 'VueAdminBetterIndex',
    components: {
      TableEdit,
      FjTableEdit,
      loudongTableEdit,
      YuanquEdit,
      OpenDoorRecord,
    },
    data() {
      return {
        list: [],
        lists: [{ areaName: '呼呼' }],
        imageList: [],
        form: {
          appld: '',
          appSecret: '',
          builds: '',
        },
        ckVisible: false,
        startTime: '',
        endTime: '',
        value1: '',
        listLoading: true,
        lockshow: false,
        lockchecked: false,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        background: true,
        selectRows: '',
        elementLoadingText: '正在加载...',
        Builddata: [],
        buildObjs: [],
      }
    },
    computed: {
      height() {
        return this.$baseTableHeight()
      },
    },

    created() {
      this.fetchData()
    },

    methods: {
      async fetchData() {
        this.listLoading = true
        const datalist = await getCampusList()
        this.list = datalist.data
        datalist.data.forEach((item) => {
          this.buildObjs = item.buildObjs
        })
        console.log(datalist.data, 'datalist')
        this.listLoading = false
      },
      lockcheckedChange(val) {
        if (val == true) {
          this.lockshow = true
        } else {
          this.lockshow = false
        }
      },
      tableSortChange() {
        const imageList = []
        this.$refs.tableSort.tableData.forEach((item, index) => {
          imageList.push(item.img)
        })
        this.imageList = imageList
      },
      setSelectRows(val) {
        this.selectRows = val
      },
      changkai() {
        this.ckVisible = true
      },
      handleAdd() {
        this.$refs['yuanqu'].showEdit()
      },
      handleEdit(row) {
        console.log(row, 'row')
        this.$refs['edit'].showEdit(row)
      },
      handleloudong() {
        this.$refs['loudong'].showEdit()
      },
      handlefangjian() {
        this.$refs['fangjian'].showEdit()
      },
      open() {
        this.$refs['open'].showEdit()
      },
      handleDelete(row) {
        console.log(row, 'rowd')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .btntotal {
    float: right;
    margin-bottom: 20px;
  }
</style>
