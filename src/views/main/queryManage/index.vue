<template>
  <div class="author-container">
    <el-tabs :tab-position="tabPosition" class="tabsty" @tab-click="handleClick" @tab-remove="handleremoveClick">
      <el-tab-pane class="">
        <span slot="label" class="pans3 labspan">
          <img src="../../../assets/query/openinfo.png" v-if="gateway0 == false" class="gateway" alt="" srcset="">
          <img src="../../../assets/query/openinfo1.png" v-if="gateway0 == true" class="gateway" alt="" srcset="">
          <H5>开门记录查询</H5>
        </span>
        <div>
          <el-button class="btnpr" type="primary" icon="el-icon-plus" @click="addlock()">导出</el-button>
        </div>
        <div class="formbtn">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
              <el-input v-model="formInline.id" placeholder="请输入用户ID "  style="width: 150px;"></el-input>
            </el-form-item>
            <el-form-item >
              <el-input v-model="formInline.id" placeholder="请输入用户姓名 "  style="width: 150px;"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="quyuvalue1" placeholder="请选择片区" style="width: 160px;margin: 0 10px 0 0;">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="quyuvalue2" placeholder="请选择楼栋" style="width: 160px;margin: 0 10px 0 0;">
                <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="quyuvalue3" placeholder="请选择楼层" style="width: 160px;margin: 0 10px 0 0;">
                <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="quyuvalue4" placeholder="请选择房间" style="width: 160px;margin: 0 10px 0 0;">
                <el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="时间：">
              <el-date-picker v-model="pickertime" style="width: 350px;" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table :data="tableData" style="width: 100%;margin-top: 10px;margin-left: 20px;">
          <el-table-column prop="" label="用户ID"></el-table-column>
          <el-table-column prop="" label="用户姓名"></el-table-column>
          <el-table-column prop="" label="所属部门"></el-table-column>
          <el-table-column prop="" label="性别"></el-table-column>
          <el-table-column prop="" label="时间"></el-table-column>
          <el-table-column prop="" label="开启房间"></el-table-column>
          <el-table-column prop="" label="开门方式"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template #default="{ row }">
              <el-button type="text" icon="el-icon-edit" @click="handleEdit(row)"></el-button>
              <el-button type="text" icon="el-icon-delete" @click="handleDelete(row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane class="">
        <span slot="label" class="pans3">
          <img src="../../../assets/query/rusu.png" v-if="changeshow == false" class="gateway" alt="" srcset="">
          <img src="../../../assets/query/rusu1.png" v-if="changeshow == true" class="gateway" alt="" srcset="">
          <h5>房间入住查询</h5>
        </span>
        <div class="formbtn">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
              <el-input v-model="formInline.id" placeholder="请输入用户ID "  style="width: 150px;"></el-input>
            </el-form-item>
            <el-form-item >
              <el-input v-model="formInline.id" placeholder="请输入用户姓名 "  style="width: 150px;"></el-input>
            </el-form-item>
            <el-form-item label="调整时间：">
              <el-date-picker v-model="pickertime" style="width: 350px;" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table :data="navtableData" style="margin-top: 10px;margin-left: 20px;">
          <el-table-column prop="menuType" label="房间名称">
          </el-table-column>
          <el-table-column prop="menuUrl" label="入住天数">
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane class="">
        <span slot="label" class="pans3">
          <img src="../../../assets/query/yidong.png" v-if="gateway2 == false" class="gateway" alt="" srcset="">
          <img src="../../../assets/query/yidong1.png" v-if="gateway2 == true" class="gateway" alt="" srcset="">
          <h5>异动信息查询</h5>
        </span>
          <div class="formbtn">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
              <el-input v-model="formInline.id" placeholder="请输入用户ID "  style="width: 150px;"></el-input>
            </el-form-item>
            <el-form-item >
              <el-input v-model="formInline.id" placeholder="请输入用户姓名 "  style="width: 150px;"></el-input>
            </el-form-item>
            <el-form-item label="时间：">
              <el-date-picker v-model="pickertime" style="width: 350px;" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table :data="tableData" style="width: 100%;margin-top: 10px;margin-left: 20px;">
          <el-table-column prop="" label="用户ID"></el-table-column>
          <el-table-column prop="" label="用户姓名"></el-table-column>
          <el-table-column prop="" label="性别"></el-table-column>
          <el-table-column prop="" label="原房间"></el-table-column>
          <el-table-column prop="" label="现房间"></el-table-column>
          <el-table-column prop="" label="调整时间"></el-table-column>
          <el-table-column prop="" label="异动类型"></el-table-column>
          <el-table-column prop="" label="电话号码"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane class="">
        <span slot="label" class="pans3">
          <img src="../../../assets/query/date.png" v-if="gateway3 == false" class="gateway" alt="" srcset="">
          <img src="../../../assets/query/date1.png" v-if="gateway3 == true" class="gateway" alt="" srcset="">
          <h5>入住天数查询</h5>
        </span>
        <div class="formbtn">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
              <el-select v-model="quyuvalue1" placeholder="请选择片区" style="width: 160px;margin: 0 10px 0 0;">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="quyuvalue2" placeholder="请选择楼栋" style="width: 160px;margin: 0 10px 0 0;">
                <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="quyuvalue3" placeholder="请选择楼层" style="width: 160px;margin: 0 10px 0 0;">
                <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="quyuvalue4" placeholder="请选择房间" style="width: 160px;margin: 0 10px 0 0;">
                <el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="时间：">
              <el-date-picker v-model="pickertime" style="width: 350px;" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table :data="tableData" style="width: 100%;margin-top: 10px;margin-left: 20px;">
          <el-table-column prop="" label="用户ID"></el-table-column>
          <el-table-column prop="" label="用户姓名"></el-table-column>
          <el-table-column prop="" label="房间名称"></el-table-column>
          <el-table-column prop="" label="入住天数"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template #default="{ row }">
              <el-button type="text" icon="el-icon-edit" @click="handleEdit(row)"></el-button>
              <el-button type="text" icon="el-icon-delete" @click="handleDelete(row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane class="">
        <span slot="label" class="pans3">
          <img src="../../../assets/query/zhusuyichang.png" v-if="gateway4 == false" class="gateway" alt="" srcset="">
          <img src="../../../assets/query/zhusuyichang1.png" v-if="gateway4 == true" class="gateway" alt="" srcset="">
          <h5>住宿异常查询</h5>
        </span>
        <div class="formbtn">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
              <el-select v-model="quyuvalue1" placeholder="请选择片区" style="width: 160px;margin: 0 10px 0 0;">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="quyuvalue2" placeholder="请选择楼栋" style="width: 160px;margin: 0 10px 0 0;">
                <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="quyuvalue3" placeholder="请选择楼层" style="width: 160px;margin: 0 10px 0 0;">
                <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="quyuvalue4" placeholder="请选择房间" style="width: 160px;margin: 0 10px 0 0;">
                <el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table :data="tableData" style="width: 100%;margin-top: 10px;margin-left: 20px;">
          <el-table-column prop="" label="用户姓名"></el-table-column>
          <el-table-column prop="" label="房间名称"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template #default="{ row }">
              <el-button type="text" icon="el-icon-edit" @click="handleEdit(row)"></el-button>
              <el-button type="text" icon="el-icon-delete" @click="handleDelete(row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane class="">
        <span slot="label" class="pans3">
          <img src="../../../assets/query/yidong.png" v-if="gateway8 == false" class="gateway" alt="" srcset="">
          <img src="../../../assets/query/yidong1.png" v-if="gateway8 == true" class="gateway" alt="" srcset="">
          <h5>房间异常查询</h5>
        </span>
         <div class="formbtn">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
              <el-input v-model="formInline.id" placeholder="请输入用户ID "  style="width: 150px;"></el-input>
            </el-form-item>
            <el-form-item >
              <el-input v-model="formInline.id" placeholder="请输入用户姓名 "  style="width: 150px;"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="quyuvalue1" placeholder="请选择片区" style="width: 160px;margin: 0 10px 0 0;">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="quyuvalue2" placeholder="请选择楼栋" style="width: 160px;margin: 0 10px 0 0;">
                <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="quyuvalue3" placeholder="请选择楼层" style="width: 160px;margin: 0 10px 0 0;">
                <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="quyuvalue4" placeholder="请选择房间" style="width: 160px;margin: 0 10px 0 0;">
                <el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="时间：">
              <el-date-picker v-model="pickertime" style="width: 350px;" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table :data="tableData" style="width: 100%;margin-top: 10px;margin-left: 20px;">
          <el-table-column prop="" label="锁号"></el-table-column>
          <el-table-column prop="" label="片区"></el-table-column>
          <el-table-column prop="" label="楼栋"></el-table-column>
          <el-table-column prop="" label="房间"></el-table-column>
          <el-table-column prop="" label="实时电量"></el-table-column>
          <el-table-column prop="" label="信号强度"></el-table-column>
          <el-table-column prop="" label="是否休眠"></el-table-column>
          <el-table-column prop="" label="上报时间"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane class="">
        <span slot="label" class="pans3">
          <img src="../../../assets/query/data.png" v-if="gateway5 == false" class="gateway" alt="" srcset="">
          <img src="../../../assets/query/data1.png" v-if="gateway5 == true" class="gateway" alt="" srcset="">
          <h5>指令日志查询</h5>
        </span>
        <el-table :data="tableData" style="width: 100%;margin-top: 10px;margin-left: 20px;">
          <el-table-column prop="sid" label="sid"></el-table-column>
          <el-table-column prop="iotTag" label="设备标识"></el-table-column>
          <el-table-column prop="" label="操作指令"></el-table-column>
          <el-table-column prop="" label="操作状态"></el-table-column>
          <el-table-column prop="" label="指令详情"></el-table-column>
          <el-table-column prop="" label="设备回应"></el-table-column>
          <el-table-column prop="" label="发送时间"></el-table-column>
          <el-table-column prop="" label="回应时间"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane class="">
        <span slot="label" class="pans3">
          <img src="../../../assets/query/shuaka.png" v-if="gateway6 == false" class="gateway" alt="" srcset="">
          <img src="../../../assets/query/shuaka1.png" v-if="gateway6 == true" class="gateway" alt="" srcset="">
          <h5>刷卡流水查询</h5>
        </span>
         <div class="formbtn">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
              <el-input v-model="formInline.id" placeholder="请输入用户ID "  style="width: 150px;"></el-input>
            </el-form-item>
            <el-form-item >
              <el-input v-model="formInline.id" placeholder="请输入用户姓名 "  style="width: 150px;"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="quyuvalue1" placeholder="请选择片区" style="width: 160px;margin: 0 10px 0 0;">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="quyuvalue2" placeholder="请选择楼栋" style="width: 160px;margin: 0 10px 0 0;">
                <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="quyuvalue3" placeholder="请选择楼层" style="width: 160px;margin: 0 10px 0 0;">
                <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="quyuvalue4" placeholder="请选择房间" style="width: 160px;margin: 0 10px 0 0;">
                <el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="时间：">
              <el-date-picker v-model="pickertime" style="width: 350px;" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table :data="tableData" style="width: 100%;margin-top: 10px;margin-left: 20px;">
          <el-table-column prop="" label="用户ID"></el-table-column>
          <el-table-column prop="" label="用户姓名"></el-table-column>
          <el-table-column prop="" label="所属部门"></el-table-column>
          <el-table-column prop="" label="性别"></el-table-column>
          <el-table-column prop="" label="时间"></el-table-column>
          <el-table-column prop="" label="开启房间"></el-table-column>
          <el-table-column prop="" label="开门方式"></el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane class="">
        <span slot="label" class="pans3">
          <img src="../../../assets/query/dianliang.png" v-if="gateway7 == false" class="gateway" alt="" srcset="">
          <img src="../../../assets/query/dianliang1.png" v-if="gateway7 == true" class="gateway" alt="" srcset="">
          <h5>电量异常查询</h5>
        </span>
        <div class="formbtn">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item>
              <el-select v-model="quyuvalue1" placeholder="请选择片区" style="width: 160px;margin: 0 10px 0 0;">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="quyuvalue2" placeholder="请选择楼栋" style="width: 160px;margin: 0 10px 0 0;">
                <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="quyuvalue3" placeholder="请选择楼层" style="width: 160px;margin: 0 10px 0 0;">
                <el-option v-for="item in options4" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-select v-model="quyuvalue4" placeholder="请选择房间" style="width: 160px;margin: 0 10px 0 0;">
                <el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table :data="tableData" style="width: 100%;margin-top: 10px;margin-left: 20px;">
          <el-table-column prop="" label="锁号"></el-table-column>
          <el-table-column prop="" label="片区"></el-table-column>
          <el-table-column prop="" label="楼栋"></el-table-column>
          <el-table-column prop="" label="房间"></el-table-column>
          <el-table-column prop="" label="实时电量"></el-table-column>
          <el-table-column prop="" label="信号强度"></el-table-column>
          <el-table-column prop="" label="是否休眠"></el-table-column>
          <el-table-column prop="" label="上报时间"></el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <nav-edit ref="navedit"></nav-edit>
    <table-edit ref="edit"></table-edit>
    <role-edit ref="roleedit" :navtableData="navtableData"></role-edit>
  </div>
</template>

<script>
import TableEdit from './components/TableEdit.vue'
import { getCampusList, listMenuItem } from '@/api/table'
import NavEdit from './components/navEdit.vue'
import RoleEdit from './components/roleEdit.vue'

export default {
  components: { TableEdit, NavEdit, RoleEdit },
  name: '',
  data () {
    return {
      quyuvalue1: '',
      quyuvalue2: '',
      quyuvalue3: '',
      quyuvalue4: '',
      pickertime: '',
      options: [{
        value: '选项1',
        label: 'anlock片区'
      }],
      options3: [{
        value: '选项2',
        label: 'B1栋'
      }],
      options4: [{
        value: '选项1',
        label: '1层'
      }],
      options4: [{
        value: '选项1',
        label: '1层'
      }],
      options5: [{
        value: '选项1',
        label: '101房'
      }],
      tabPosition: 'left',
      tableData: [{ name: '王小虎', }],
      navtableData: [],
      tableDatas: [{ address: '测试D59-2层-206', }],
      formInline: {
        user: '',
        ip: '',
        duank: '',
        remark: ''
      },
      tabs: 'left',
      changeshow: false,
      gateway0: true,
      gateway2: false,
      gateway3: false,
      gateway4: false,
      gateway5: false,
      gateway6: false,
      gateway7: false,
      gateway8: false,
    }
  },
  mounted () {
    // this.getnavtableData()
  },
  methods: {
    handleEdit (row) {
      this.$refs['edit'].showEdit(row)
    },
    async getnavtableData () {
      let nav = await listMenuItem()
      this.navtableData = nav.data
      console.log(nav.data, 'nav')
    },
    handleClick (tab, event) {
      console.log(tab.active == true ,tab.paneName,'sss')
      if (tab.active == true && tab.paneName == "1") {
        this.changeshow = true
      } else {
        this.changeshow = false
      }
      if (tab.active == true && tab.paneName == "2") {
        this.gateway2 = true
      } else {
        this.gateway2 = false
      }
      if (tab.active == true && tab.paneName == "3") {
        this.gateway3 = true
      } else {
        this.gateway3 = false
      }
      if (tab.active == true && tab.paneName == "4") {
        this.gateway4 = true
      } else {
        this.gateway4 = false
      }
       if (tab.active == true && tab.paneName == "5") {
        this.gateway8 = true
      } else {
        this.gateway8 = false
      }
      if (tab.active == true && tab.paneName == "6") {
        this.gateway5 = true
      } else {
        this.gateway5 = false
      }
      if (tab.active == true && tab.paneName == "7") {
        this.gateway6 = true
      } else {
        this.gateway6 = false
      }
      if (tab.active == true && tab.paneName == "8") {
        this.gateway7 = true
      } else {
        this.gateway7 = false
      }
     
      if (tab.active == true && tab.paneName == "0") {
        this.gateway0 = true
      } else {
        this.gateway0 = false
      }
    },
    handleremoveClick (tab, event) {
    },
    handleDelete (row) {
    },
    handlerole () {
      this.$refs['roleedit'].showEdit()
    },
    handleroleEdit (row) {
      this.$refs['roleedit'].showEdit(row)
    },
    addnavlock () {
      this.$refs['navedit'].showEdit()
    },
    handlenavEdit (row) {
      this.$refs['navedit'].showEdit(row)
    },
    handlelockEdit (row) {
      this.$refs['edit'].showEdit(row)
    },
    addlock () {
      this.$refs['edit'].showEdit()
    },
    addlockbatch () {
      this.$refs['batchedit'].showEdit()
    },
    createdCard (row) {
      this.$refs['addgatewayset'].showEdit()
    },
    registrat (row) {
      this.$refs['addcard'].showEdit()
    },
    onSubmit () {
      console.log('submit!');
    }
  },
}
</script>
<style lang="scss" >
.author-container {
  .tabsty {
    height: 900px;

    .el-tabs__item {
      height: 89px;
    }
  }

  .pans3 {
    .el-icon-lock {
      margin-right: 0px;
      font-size: 40px;
    }
    .gateway {
      margin-right: 20px;
      // margin-top: 10px;
      width: 50px;
      height: 50px;
    }

    h5 {
      margin-right: 10px;
      margin-top: -18px;
    }
  }
  .formbtn1 {
    width: 29%;
    height: 550px;
    margin-left: 100px;

    .tt {
      font-size: 29px;
      height: 30px;
    }
    .demo-form-inline {
      margin-top: 30px;
    }
  }
  .formbtn {
    width: 100%;
    height: 50px;
  }
  .types {
    width: 350px;
    height: 30px;
    line-height: 30px;
    border-radius: 10px;
    text-align: center;
  }
  .rightbtn {
    float: right;
  }
  .btnpr {
    float: right;
    margin-bottom: 20px;
    margin-right: 10px;
  }
}
</style>