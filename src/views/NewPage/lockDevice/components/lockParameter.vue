<template>
  <el-dialog
    v-dialogDrag
    :title="title"
    width="1300px"
    :visible.sync="dialogFormVisible"
    append-to-body
    @close="close"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label-width="120px" label="楼栋" prop="builds" class="fi">
        <el-select v-model.trim="form.builds" multiple placeholder="请选择">
          <el-option
            v-for="item in Builddata"
            :key="item.value"
            :label="item.buildName"
            :value="item.buildId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label-width="120px" label="楼层" prop="builds" class="fi">
        <el-select v-model.trim="form.builds" multiple placeholder="请选择">
          <el-option
            v-for="item in Builddata"
            :key="item.value"
            :label="item.buildName"
            :value="item.buildId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label-width="120px" class="f2">
        <el-button icon="el-icon-search" type="primary" native-type="submit">
          查询
        </el-button>
        <el-button
          icon="el-icon-search"
          type="primary"
          native-type="submit"
          :disabled="btndisabled"
          @click="daochu"
        >
          设备导出
        </el-button>
        <el-button
          icon="el-icon-search"
          class="f2"
          type="primary"
          native-type="submit"
          :disabled="btndisabled"
          @click="setWIFI"
        >
          设置wifi
        </el-button>
        <el-dropdown split-button type="primary">
          更多设置
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <el-button
                type="text"
                :disabled="btndisabled"
                @click="guanliyuan"
              >
                设置管理员密码
              </el-button>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-button type="text" :disabled="btndisabled" @click="zhongzhi">
                设置终止时间
              </el-button>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-button type="text" :disabled="btndisabled" @click="changkai">
                设置常开参数
              </el-button>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-button type="text" :disabled="btndisabled" @click="duka">
                设置读卡参数
              </el-button>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-button type="text" :disabled="btndisabled" @click="xintiao">
                设置心跳参数
              </el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-form-item>
    </el-form>
    <div>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="floorno"
          label="楼栋"
          width="110"
        ></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="floorno"
          label="楼层"
          width="110"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="所属房间"
          width="180"
        ></el-table-column>
        <el-table-column prop="address" label="设备标识"></el-table-column>
        <el-table-column prop="address" label="设备名称"></el-table-column>
        <el-table-column prop="设备名称" label="设备类型"></el-table-column>
        <el-table-column show-overflow-tooltip label="协议" width="110">
          <template #default="{ row }">
            <span v-if="row.procotol == 0">433无线</span>
            <span v-if="row.procotol == 1">NBIOT</span>
            <span v-if="row.procotol == 2">WIFI</span>
            <span v-if="row.procotol == 3">LORA</span>
            <span v-if="row.procotol == 4">BLEA</span>
            <span v-if="row.procotol == 5">BLEB</span>
            <span v-if="row.procotol == 15">BLEB</span>
            <span v-if="row.procotol == 6">电信NBIOT</span>
            <span v-if="row.procotol == 7">电信NBIOT-ZF</span>
            <!-- {{ row.procotol == 1 ? '门锁' : '无' }} -->
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="date"
          width="110"
          label="最后一次心跳"
        ></el-table-column>
      </el-table>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
    <!-- 设备导出 -->
    <el-dialog
      append-to-body
      title="设备导出到其他账号"
      width="500px"
      :visible.sync="daochuVisible"
    >
      <el-form :model="form">
        <el-form-item label-width="120px" label="appld:">
          <el-input v-model="form.appld" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label-width="120px" label="appSecret:">
          <el-input v-model="form.appSecret" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="daochuVisible = false">取 消</el-button>
        <el-button type="primary" @click="daochuVisible = false">
          确认导出数据
        </el-button>
      </div>
    </el-dialog>
    <!-- 设置wifi -->
    <el-dialog
      append-to-body
      title="设置wifi用户名密码"
      width="500px"
      :visible.sync="WIFIVisible"
    >
      <el-form :model="form">
        <el-form-item label-width="120px" label="Wifi连接用户名:">
          <el-input v-model="form.appld" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label-width="120px" label="Wifi连接密码:">
          <el-input v-model="form.appSecret" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="WIFIVisible = false">取 消</el-button>
        <el-button type="primary" @click="WIFIVisible = false">
          确认导出数据
        </el-button>
      </div>
    </el-dialog>
    <!-- 设置管理员密码 -->
    <el-dialog
      append-to-body
      title="设置管理员密码"
      width="500px"
      :visible.sync="glyVisible"
    >
      <el-form :model="form">
        <el-form-item label-width="120px" label="管理员类型:">
          <el-select v-model="managevalue" placeholder="请选择管理员类型">
            <el-option
              v-for="item in manageoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="120px" label="管理员密码:">
          <el-input
            v-model="form.appSecret"
            autocomplete="off"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="lifespan" @change="lifespanChange">
            设置有效期
          </el-checkbox>
          <el-input-number
            v-show="lifespan"
            v-model="num3"
            controls-position="right"
            style="width: 250px; margin-left: 5px"
            :min="1"
            :max="10"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="glyVisible = false">取 消</el-button>
        <el-button type="primary" @click="glyVisible = false">
          确认下发指令
        </el-button>
      </div>
    </el-dialog>
    <!-- 设置终止时间 -->
    <el-dialog
      append-to-body
      title="设置终止时间"
      width="500px"
      :visible.sync="zhongzhiVisible"
    >
      <el-form :model="form">
        <el-form-item label-width="120px" label="终止类型:">
          <el-select v-model.trim="form.builds" placeholder="请选择终止类型">
            <el-option
              label="宾客卡终止时间"
              value="宾客卡终止时间"
            ></el-option>
            <el-option
              label="楼层卡终止时间"
              value="楼层卡终止时间"
            ></el-option>
            <el-option
              label="楼栋卡终止时间"
              value="楼栋卡终止时间"
            ></el-option>
            <el-option
              label="总卡卡终止时间"
              value="总卡卡终止时间"
            ></el-option>
            <el-option
              label="短信密码终止时间"
              value="短信密码终止时间"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label-width="120px" label="终止时间:">
          <el-date-picker
            v-model="value1"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="zhongzhiVisible = false">取 消</el-button>
        <el-button type="primary" @click="zhongzhiVisible = false">
          确认下发指令
        </el-button>
      </div>
    </el-dialog>
    <!-- 设置常开参数 -->
    <el-dialog
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
    <!-- 设置读卡参数 -->
    <el-dialog
      append-to-body
      title="设置读卡参数"
      width="500px"
      :visible.sync="dkVisible"
    >
      <el-form :model="form">
        <el-form-item label-width="120px">
          <el-checkbox v-model="checked">读取M1卡</el-checkbox>
        </el-form-item>
        <el-form-item label-width="120px">
          <el-checkbox v-model="checked2" @change="checked2Change">
            读取CPU卡
          </el-checkbox>
          <label v-show="cpushow">CPU卡文件名:</label>
          <el-input
            v-show="cpushow"
            v-model="form.appld"
            style="width: 200px"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dkVisible = false">取 消</el-button>
        <el-button type="primary" @click="dkVisible = false">
          确认下发指令
        </el-button>
      </div>
    </el-dialog>
    <!-- 设置心跳参数 -->
    <el-dialog
      append-to-body
      title="设置心跳参数"
      width="500px"
      :visible.sync="xtVisible"
    >
      <el-form :model="form">
        <el-form-item label-width="140px" label="设备心跳时间范围：">
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
        <el-form-item label-width="140px" label="心跳间隔(小时)：">
          <el-input-number
            v-model="num5"
            controls-position="right"
            style="width: 160px"
            :min="1"
            :max="10"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="xtVisible = false">取 消</el-button>
        <el-button type="primary" @click="xtVisible = false">
          确认导出数据
        </el-button>
      </div>
    </el-dialog>
  </el-dialog>
</template>

<script>
  import { updateArea, getBuildList, doAddCampus } from '@/api/table'

  export default {
    name: 'LockParameter',
    data() {
      return {
        form: {
          appld: '',
          appSecret: '',
          builds: '',
        },
        manageoptions: [
          {
            value: '选项1',
            label: '管理员密码1',
          },
          {
            value: '选项2',
            label: '管理员密码2',
          },
          {
            value: '选项3',
            label: '管理员密码3',
          },
          {
            value: '选项4',
            label: '管理员密码4',
          },
          {
            value: '选项5',
            label: '管理员密码5',
          },
        ],
        managevalue: '',
        num: 1,
        num3: 1,
        num5: 1,
        lifespan: false,
        startTime: '',
        cpushow: false,
        checked: false,
        checked2: false,
        endTime: '',
        value1: '',
        xtVisible: false,
        dkVisible: false,
        ckVisible: false,
        zhongzhiVisible: false,
        glyVisible: false,
        daochuVisible: false,
        WIFIVisible: false,
        btndisabled: true,
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '1',
          },
        ],
        radio: 1,
        buildObjs: [],
        Builddata: '',
        rules: {},
        title: '',
        dialogFormVisible: false,
        Edit: false,
        lockchecked: false,
        lockshow: false,
      }
    },
    mounted() {},
    methods: {
      lockcheckedChange(val) {
        if (val == true) {
          this.lockshow = true
        } else {
          this.lockshow = false
        }
      },
      showEdit(row, Builddata) {
        this.title = '门锁参数批量设置'
        this.dialogFormVisible = true
        console.log(this.dialogFormVisible, '')
      },
      handleSelectionChange(row) {
        console.log(row, row.length, 'row')
        if (row.length > 0) {
          this.btndisabled = false
        }
        if (row.length == 0) {
          this.btndisabled = true
        }
      },
      lifespanChange(val) {
        if (val == true) {
          this.lifespan = true
        } else {
          this.lifespan = false
        }
      },
      checked2Change(val) {
        if (val == true) {
          this.cpushow = true
        } else {
          this.cpushow = false
        }
      },
      daochu() {
        this.daochuVisible = true
      },
      setWIFI() {
        this.WIFIVisible = true
      },
      guanliyuan() {
        this.glyVisible = true
        console.log(this.glyVisible, 'this.glyVisible')
      },
      zhongzhi() {
        this.zhongzhiVisible = true
      },
      changkai() {
        this.ckVisible = true
      },
      duka() {
        this.dkVisible = true
      },
      xintiao() {
        this.xtVisible = true
      },
      close() {
        this.$refs['form'].resetFields()
        this.form = this.$options.data().form
        this.dialogFormVisible = false
        this.$emit('fetch-data')
      },
      save() {
        this.$refs['form'].validate(async (valid) => {
          if (valid) {
            if (this.Edit == true) {
              let builds = this.form.builds.join(',')
              let formdata = {
                name: this.form.areaName,
                address: this.form.areaAddress,
                builds: builds,
                areaid: this.form.areaId,
              }
              console.log(formdata, this.Edit, 'valid')

              let data = await updateArea(formdata)
              console.log(data, builds, 'success')
              if (data.resultCode == 0) {
                this.$message('修改成功')
              }
            } else {
              let builds = this.form.builds.join(',')
              let formdata = {
                name: this.form.areaName,
                address: this.form.areaAddress,
                builds: builds,
              }
              console.log(formdata, this.Edit, 'valid')

              let data = await doAddCampus(formdata)
              console.log(data, builds, 'success')
              if (data.resultCode == 0) {
                this.$message('添加成功')
              }
            }

            this.$refs['form'].resetFields()
            this.form = this.$options.data().form
            this.dialogFormVisible = false
            this.$emit('fetchData')
            // this.$parent.fetchData();
          } else {
            return false
          }
        })
      },
    },
  }
</script>
<style lang="scss" scoped>
  .fi {
    float: left;
    margin-right: 10px;
  }
  .f2 {
    margin-right: 10px;
  }
  .tabss {
    width: 700px;
    height: 700px;
  }
</style>
