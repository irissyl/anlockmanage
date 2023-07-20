<template>
  <div class="indexroomlist">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :lg="5" :xl="5">
        <el-card class="treeall71" shadow="never">
          <el-tree class="tree" :data="treedata" :props="defaultProps" node-key="id" :default-expanded-keys="[1, 2, 3]" @node-click="handleNodeClick">
            <span slot-scope="{ node, data }">
              <i :class="data.icon" :style="`color: ${data.color}`"></i>
              <span style="padding-left: 4px">{{ node.label }}</span>
            </span>
          </el-tree>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="19" :xl="19" style="color: #fff;background-color: #fff;">
        <div class="topcontent">
          <div class="inputsty" style="float:left;">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="房间:">
                <el-select v-model="formInline.region">
                  <el-option label="测试一" value="shanghai"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="房号:">
                <el-input v-model="formInline.user"></el-input>
              </el-form-item>
              <el-form-item label="楼层:">
                <el-input-number v-model="form.floor" controls-position="right" :min="1" :max="10"></el-input-number>
              </el-form-item>
              <el-form-item>
                <el-button icon="el-icon-search" @click="onSubmit"></el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="r4">停用</div>
          <div class="r3">满人</div>
          <div class="r2">在住</div>
          <div class="r1">空房</div>
        </div>
        <!-- <div style="color:#000;float:right;height: 80px;line-height: 25px;margin: 0 20px 0 0;font-size:15px;">颜色提示：</div> -->
        <div class="bottomsty">
          <el-col style="margin: 20px 0 0 0;" v-for="(item,index) in list" :key="index" :xs="24" :sm="8" :md="8" :lg="8" :xl="3">
            <el-card :style="{
      backgroundColor: item.roomStatus === '空房' ? '#6fbbed' :
                      item.roomStatus === '在住' ? '#7fb383' :
                      item.roomStatus === '满人' ? '#d3705a' :
                      item.roomStatus === '停用' ? '#a7a7a7' : '','border-radius': '10px',}"  shadow="hover">
              <div class="goods-list-card-body" @click="drawer = true">
                <div class="goods-list-tag-group">
                  <!-- <el-tag  type="info">{{item.roomStatus}}</el-tag> -->
                  <img v-if="item.lock" src="../../assets/lock.png" class="imgs" alt="">
                </div>
                <div class="goods-list-title"><i class="el-icon-s-home"></i>101房</div>
                <div class="goods-list-description">标准单人房</div>
                <div class="goods-list-price">
                  <span>（0卡/0人）</span>
                </div>
              </div>
            </el-card>
          </el-col>
        </div>
        <div class="pages1" >
          <el-pagination background :current-page="queryForm.pageNo" :layout="layout" :page-size="queryForm.pageSize" :total="total" @current-change="handleCurrentChange" @size-change="handleSizeChange"></el-pagination>
        </div>
      </el-col>
    </el-row>
    <el-drawer title="房态设置" :visible.sync="drawer" size="40%" :with-header="false">
      <div class="drawersty">
        <div>
          <el-button type="primary" @click="addOrder">添加订单</el-button>
          <el-button type="warning">清除卡片</el-button>
        </div>
        <div class="tabsty">
          <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="订单" name="first">
              <el-radio-group v-model="radio" class="radiosty" @change="agreeChange">
                <el-radio :label="1">卡片</el-radio>
                <el-radio :label="2">脱机密码</el-radio>
                <el-radio :label="3">微信</el-radio>
                <el-radio :label="4">联网卡密</el-radio>
              </el-radio-group>
              <div class="formtab">
                <el-form ref="form" :model="form" label-width="100px" v-show="show1">
                  <el-form-item label="开始时间:">
                    <el-date-picker v-model="form.date1" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="结束时间:">
                    <el-date-picker v-model="form.date2" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="姓 名:">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                  <el-form-item label="房间发卡数:">
                    <div>0</div>
                  </el-form-item>
                  <el-form-item label="入住天数:">
                    <el-input-number v-model="form.desc" controls-position="right" :min="1" :max="10"></el-input-number>
                  </el-form-item>
                  <el-form-item label="金额">
                    <el-input-number v-model="form.delivery" controls-position="right" :min="1" :max="10"></el-input-number>
                  </el-form-item>
                  <el-form-item label="手机号码:">
                    <el-input type="number" v-model="form.mobile"></el-input>
                  </el-form-item>
                  <el-form-item label="证件号码:">
                    <el-input type="number" v-model="form.resource"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-checkbox v-model="form.checked1">终止旧卡</el-checkbox>
                    <el-checkbox v-model="form.checked2">退卡退单</el-checkbox>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onSubmit" plain>发卡</el-button>
                    <el-button type="primary" plain>退卡</el-button>
                    <el-button type="primary" plain>续卡</el-button>
                  </el-form-item>
                </el-form>
                <el-form ref="form" :model="form" label-width="100px" v-show="show2">
                  <el-form-item label="开始时间:">
                    <el-date-picker v-model="form.date1" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="结束时间:">
                    <el-date-picker v-model="form.date2" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="姓 名:">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                  <el-form-item label="房间发卡数:">
                    <div>0</div>
                  </el-form-item>
                  <el-form-item label="入住天数:">
                    <el-input-number v-model="form.desc" controls-position="right" :min="1" :max="10"></el-input-number>
                  </el-form-item>
                  <el-form-item label="金额">
                    <el-input-number v-model="form.delivery" controls-position="right" :min="1" :max="10"></el-input-number>
                  </el-form-item>
                  <el-form-item label="手机号码:">
                    <el-input type="number" v-model="form.mobile"></el-input>
                  </el-form-item>
                  <el-form-item label="证件号码:">
                    <el-input type="number" v-model="form.resource"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-checkbox v-model="form.checked1">临时密码开门即失效</el-checkbox>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onSubmit" plain>发送短信</el-button>
                    <el-button type="primary" plain>提取密码</el-button>
                    <el-button type="primary" plain>提取临时密码</el-button>
                  </el-form-item>
                </el-form>
                <el-form ref="form" :model="form" label-width="100px" v-show="show3">
                  <el-form-item label="开始时间:">
                    <el-date-picker v-model="form.date1" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="结束时间:">
                    <el-date-picker v-model="form.date2" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="姓 名:">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                  <el-form-item label="房间发卡数:">
                    <div>0</div>
                  </el-form-item>
                  <el-form-item label="入住天数:">
                    <el-input-number v-model="form.desc" controls-position="right" :min="1" :max="10"></el-input-number>
                  </el-form-item>
                  <el-form-item label="金额">
                    <el-input-number v-model="form.delivery" controls-position="right" :min="1" :max="10"></el-input-number>
                  </el-form-item>
                  <el-form-item label="手机号码:">
                    <el-input type="number" v-model="form.mobile"></el-input>
                  </el-form-item>
                  <el-form-item label="证件号码:">
                    <el-input type="number" v-model="form.resource"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onSubmit" plain>保存订单</el-button>
                    <el-button type="primary" plain>清空</el-button>
                  </el-form-item>
                </el-form>
                <el-form ref="form" :model="form" label-width="100px" v-show="show4">
                  <el-form-item label="开始时间:">
                    <el-date-picker v-model="form.date1" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="结束时间:">
                    <el-date-picker v-model="form.date2" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="姓 名:">
                    <el-input v-model="form.name"></el-input>
                  </el-form-item>
                  <el-form-item label="房间发卡数:">
                    <div>0</div>
                  </el-form-item>
                  <el-form-item label="入住天数:">
                    <el-input-number v-model="form.desc" controls-position="right" :min="1" :max="10"></el-input-number>
                  </el-form-item>
                  <el-form-item label="金额">
                    <el-input-number v-model="form.delivery" controls-position="right" :min="1" :max="10"></el-input-number>
                  </el-form-item>
                  <el-form-item label="手机号码:">
                    <el-input type="number" v-model="form.mobile"></el-input>
                  </el-form-item>
                  <el-form-item label="证件号码:">
                    <el-input type="number" v-model="form.resource"></el-input>
                  </el-form-item>
                  <el-form-item label="联网卡号:">
                    <el-input type="number" v-model="form.resource"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onSubmit" plain>采集指纹</el-button>
                    <el-button type="primary" plain>保存订单</el-button>
                    <el-button type="primary" plain>清空</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-tab-pane>
            <el-tab-pane label="订单列表" name="second">
              <el-card :style="{'border-radius': '5px'}" :body-style="{ padding: '0px',margin: '0px' }" shadow="hover">
                <div class="goods-list-card-body" @click="drawer = true">
                  <div class="goods-list-tag-group">
                    <img src="../../assets/nan.png" class="imgs" alt="">
                  </div>
                  <div class="description1">姓名:<span style="margin:0 0 0 20px"> </span>建信测试</div>
                  <div class="description1">证件号码:<span style="margin:0 0 0 20px"> </span>67643688889756429</div>
                  <div class="description1">手机:<span style="margin:0 0 0 20px"> </span>1507333233</div>
                  <div class="description1">租金:<span style="margin:0 0 0 20px"> </span>$0.00</div>
                  <div class="description1">押金:<span style="margin:0 0 0 20px"> </span>$0.00</div>
                  <div class="description1">押付模式:<span style="margin:0 0 0 20px"> </span>押1付1</div>
                  <div class="description1">订单类型:<span style="margin:0 0 0 20px"> </span>联网密码</div>
                  <div class="description1">租期: 2023-02-03 09:07至2023-06-03 09:04</div>
                  <div class="description1">
                    <el-button type="primary" style="margin:0 0 0 1px" plain>退房</el-button>
                  </div>
                </div>
              </el-card>
            </el-tab-pane>
            <el-tab-pane label="智能设备" name="three">
              <el-card :style="{'border-radius': '5px'}" :body-style="{ padding: '0px',margin: '0px' }" shadow="hover">
                <div class="goods-list-card-body" @click="drawer = true">
                  <div class="goods-list-tag-group">
                    <img src="../../assets/lock1.png" class="imgs" alt="">
                  </div>
                  <div class="description1">设备标识:<span style="margin:0 0 0 20px"> </span>2000035041 </div>
                  <div class="description1">设备名称:<span style="margin:0 0 0 20px"> </span>门锁 联网锁 N07</div>
                  <div class="description1">联网类型:<span style="margin:0 0 0 20px"> </span>WIFI</div>
                  <div class="description1">电压:<span style="margin:0 0 0 20px"> </span>5.00V</div>
                  <div class="description1">电压强度:<span style="margin:0 0 0 20px"> </span>68</div>
                  <div class="description1">已使用:<span style="margin:0 0 0 20px"> </span>1</div>
                  <div class="description1">心跳时间:<span style="margin:0 0 0 20px"> </span>2023-07-15 08:17:34</div>
                  <div class="description1">
                    <el-button type="primary" style="margin:0 0 0 1px" @click="opendoor" plain>开锁记录</el-button>
                    <el-button type="primary" style="margin:0 0 0 10px" plain>门锁设置</el-button>
                  </div>
                </div>
              </el-card>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </el-drawer>
    <open-door-record ref="record"></open-door-record>
    <add-order ref="order"></add-order>
  </div>
</template>

<script>
import OpenDoorRecord from '../main/buildManage/components/openDoorRecord.vue';
import AddOrder from './components/addOrder.vue';

export default {
  name: 'Goods',
  components: {OpenDoorRecord, AddOrder},
  data () {
    return {
      treedata: [
        {
          id: 1,
          label: '狐狸片区',
          children: [
            {
              id: 3,
              label: 'anlock办公楼',
              children: [
                {
                  id: 4,
                  label: '1层',
                },
                {
                  id: 5,
                  label: '2层',
                  disabled: true,
                },
              ],
            },
            {
              id: 2,
              label: 'anlock研发楼',
              disabled: true,
              children: [
                {
                  id: 6,
                  label: '1层',
                },
                {
                  id: 7,
                  label: '2层',
                  disabled: true,
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
        icon: 'icon',
      },
      formInline: {
        user: '',
        region: '',
        floor: 1
      },
      queryForm: {
        pageNo: 1,
        pageSize: 20,
        title: '',
      },
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: '',
        mobile: '',
        resource: '',
        desc: '',
        checked1: '',
        checked2: ''
      },
      show1: true,
      show2: false,
      show3: false,
      show4: false,
      tabPosition: 1,
      radio: 1,
      activeName: 'first',
      drawer: false,
      list: null,
      listLoading: true,
      layout: 'total, sizes, prev, pager, next, jumper',
      total: 0,
      roomStatus: '空房',
      elementLoadingText: '正在加载...',
    }
  },
  created () {
    this.fetchData()
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event);
    },
    handleNodeClick(v){

    },
    addOrder(){
      this.$refs['order'].showEdit()
    },
    opendoor(){
      this.$refs['record'].showEdit()
    },
    agreeChange (val) {
      console.log(val, 'val')
      if (val == 1) this.show1 = true, this.show4 = false, this.show3 = false, this.show2 = false
      if (val == 2) this.show2 = true, this.show1 = false, this.show3 = false, this.show4 = false
      if (val == 3) this.show3 = true, this.show1 = false, this.show2 = false, this.show4 = false
      if (val == 4) this.show4 = true, this.show1 = false, this.show3 = false, this.show2 = false
    },
    onSubmit () {
      console.log('submit!');
    },
    handleSizeChange (val) {
      this.queryForm.pageSize = val
      this.fetchData()
    },
    handleCurrentChange (val) {
      this.queryForm.pageNo = val
      this.fetchData()
    },
    handleQuery () {
      this.queryForm.pageNo = 1
      this.fetchData()
    },
    async fetchData () {
      this.listLoading = true
      this.list = [{ roomStatus: '空房', lock: true }, { roomStatus: '空房' }, { roomStatus: '空房' }, { roomStatus: '空房' }, { roomStatus: '在住' }, { roomStatus: '满人' }, { roomStatus: '停用' },
      { roomStatus: '空房' }, { roomStatus: '在住' }, { roomStatus: '满人' }, { roomStatus: '停用' }]
      this.listLoading = false
    },
  },
}
</script>
<style lang="scss" >
.bottomsty{
  width: 100%;
  height: 600px;
  background-color: #fff;
}
.pages1{
  height: 100px;
    margin-top: -40px;
  }
.topcontent {
  width: 100%;
  height: 80px;
  margin: 20px 0 0 0;
}
.description1 {
  width: 45%;
  text-align: left;
  padding-left: 10px;
  // border: 1px solid darkblue;
  float: left;
  margin-top: 10px;
  margin-bottom: 10px;
}
.drawersty {
  width: 95%;
  margin: 0 auto;
  margin-top: 20px;
  .tabsty {
    margin: 40px 0 0 0px;
  }
  .radiosty {
    margin-top: 20px;
    margin-left: 30px;
  }
  .formtab {
    margin-top: 50px;
  }
}
.indexroomlist {
  .cardxbody {
    background-color: #a7a7a7;
  }
  .goods-list-card-body {
    position: relative;
    text-align: center;
    cursor: pointer;
    height: 120px;

    .goods-list-tag-group {
      position: absolute;
      top: 1px;
      right: 5px;
      z-index: 9;

      .imgs {
        width: 30px;
        height: 30px;
      }
    }

    .goods-list-image-group {
      height: 400px;
      overflow: hidden;
    }

    .goods-list-title {
      margin: 10px 0;
      text-align: left;
      margin-left: 5px;
      font-size: 17px;
      font-weight: bold;
      color: #ffffff;
    }

    .goods-list-description {
      font-size: 16px;
      color: #ffffff;
      margin-top: 40px;
    }

    .goods-list-price {
      margin: 8px 0;
      font-size: 14px;
      color: #ffffff;

      s {
        color: #ffffff;
      }
    }
  }
}

.r1 {
  width: 80px;
  height: 20px;
  padding-top: 5px;
  padding-bottom: 0px;
  text-align: center;
  float: right;
  margin-right: 30px;
  background-color: #6fbbed;
  border-radius: 5px;
}
.r2 {
  width: 80px;
  height: 20px;
  padding-top: 5px;
  padding-bottom: 0px;
  text-align: center;
  float: right;
  margin-right: 30px;
  border-radius: 5px;
  background-color: #7fb383;
}
.r3 {
  width: 80px;
  height: 20px;
  padding-top: 5px;
  padding-bottom: 0px;
  text-align: center;
  float: right;
  margin-right: 30px;
  background-color: #d3705a;
  border-radius: 5px;
}
.r4 {
  width: 80px;
  height: 20px;
  padding-top: 5px;
  padding-bottom: 0px;
  text-align: center;
  float: right;
  margin-right: 30px;
  background-color: #a7a7a7;
  border-radius: 5px;
}

.treeall71 {
  .tree {

  .nodeslot {
    text-align: left;
    width: 100%;
  }
  .el-tree-node__content {
    padding: 0 !important;
    border-radius: 5px;
    border: 1px rgb(161, 160, 160) dashed;
    margin-top: 15px;
    font-size: 15px;
    text-align: right;
    width: 80%;
    height: 40px;
  }
  .el-tree-node__content:hover {
    border: 1px #f26a4f dashed;
    background-color: #fff;
  }
  .el-tree-node {
    position: relative;
    padding-left: 15px;
  }
  .el-tree-node__children {
    padding-left: 15px;
  }

  // 竖线
  .el-tree-node::before {
    content: '';
    height: 100%;
    width: 1px;
    position: absolute;
    left: -3px;
    top: -26px;
    border-width: 1px;
    border-left: 1px dashed #a9aeb6;
  }

  .el-tree-node:last-child::before {
    height: 38px;
  }

  // 横线
  .el-tree-node::after {
    content: '';
    width: 20px;
    height: 20px;
    position: absolute;
    left: -3px;
    top: 12px;
    border-width: 1px;
    border-top: 1px dashed #848d9c;
  }

  & > .el-tree-node::after {
    border-top: none;
  }
  & > .el-tree-node::before {
    border-left: none;
  }

  .el-tree-node__expand-icon {
    font-size: 16px;
  }
  .el-tree-node__expand-icon.expanded {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  .el-tree-node__expand-icon.expanded {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  /* //有子节点 且未展开 */
  .el-icon-caret-right:before {
    content: url('../../assets/erji.png');
    display: block;
    width: 20px;
    height: 20px;
    font-size: 16px;
    background-size: 16px;
  }
  /* //有子节点 且已展开 */
  .el-tree-node__expand-icon.expanded.el-icon-caret-right:before {
    content: url('../../assets/yiji.png');
    display: block;
    width: 20px;
    height: 20px;
    font-size: 16px;
    background-size: 16px;
  }
  /* //没有子节点 */
  .el-tree-node__expand-icon.is-leaf::before {
    
    content: '';
    display: block;
    width: 0px;
    height: 0px;
    font-size: 16px;
    background-size: 16px;
  }
  /* //高亮字体颜色 */
  .el-tree-node.is-current > .el-tree-node__content {
    background-color: #82c6fbbe;
    color: #000000 !important;
    font-size: 15px;
  }
}
}
</style>
