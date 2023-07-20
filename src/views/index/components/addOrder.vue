<template>
  <el-dialog v-dialogDrag :title="title" :visible.sync="dialogFormVisible" width="50%" @close="close">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="订单信息" name="first">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="姓名：" style="float:left">
            <el-input v-model="form.username" style="width: 220px;"></el-input>
          </el-form-item>
          <el-form-item label="证件号码：" style="float:left">
            <el-input v-model="form.idcard" style="width: 220px;"></el-input>
          </el-form-item>
          <el-form-item label="手机号：" >
            <el-input v-model="form.mobile" style="width: 220px;"></el-input>
          </el-form-item>
          <el-form-item label="合约租金：" style="float:left">
            <el-input-number v-model="form.num1" style="width: 220px;" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number>
          </el-form-item>
          <el-form-item label="合约押金：">
            <el-input-number v-model="form.num2" style="width: 220px;" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number>
          </el-form-item>
          <el-form-item label="电表初值：" style="float:left">
            <el-input-number v-model="form.num3" style="width: 220px;" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number>
          </el-form-item>
          <el-form-item label="水表初值:">
            <el-input-number v-model="form.num4" style="width: 220px;" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number>
          </el-form-item>
          <el-form-item label="押付模式：">
            押：<el-input-number v-model="form.num5" style="width: 220px;margin-right:35px;" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number>
            付：<el-input-number v-model="form.num6" style="width: 220px;" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number>
          </el-form-item>
          <el-form-item label="租期：">
            <el-date-picker v-model="form.ztime" type="datetimerange" style="margin-right:20px;" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
            合：<el-input-number v-model="form.num7" controls-position="right" @change="handleChange" :min="1" :max="10"></el-input-number> 月
          </el-form-item>
          <el-form-item label="租住详情:">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item >
            <el-checkbox-group v-model="form.checkList" >
              <el-checkbox label="发送密码入住短" ></el-checkbox>
              <el-checkbox label="卡号入住" @change="checkChange"  style="margin-right:30px;"> </el-checkbox>
              <el-input v-show="cardshow" placeholder="请输入卡号" v-model="form.card" style="width: 220px;"></el-input>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <!-- <el-tab-pane label="费用清单" name="second">费用清单</el-tab-pane> -->
    </el-tabs>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="save">提交订单</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { updateArea, getBuildList, doAddCampus } from '@/api/table'

export default {
  name: 'TableEdit',
  data () {
    return {
      form: {
        username: '',
        idcard: '',
        delivery: false,
        type: 'type1',
        checkList:['发送密码入住短'],
        card: '',
        desc: '',
        num1: 1,
        num2: 1,
        num3: 1,
        num4: 1,
        num5: 1,
        num6: 1,
        num7: 1,
        ztime:''
      },
      cardshow:false,
      activeName: 'first',
      dialogFormVisible: false,
      title: ''
    }
  },
  mounted () {
  },
  methods: {
    showEdit (row) {
      if (!row) {
        this.title = '添加订单'
        this.Edit = false
      } else {
        this.title = '编辑订单'
        this.Edit = true

        console.log(this.form, row, 'row2')
      }
      this.dialogFormVisible = true
    },
    checkChange(e) {
      console.log(e,'checkChange')
      if(e == true) {
        this.cardshow = true
      }else {
        this.cardshow = false

      }
    },
    onSubmit () {
      console.log('submit!');
    },
    handleChange(e){

    },
    handleClick (tab, event) {
      console.log(tab, event);
    },
    close () {
      // this.$refs['form'].resetFields()
      this.form = this.$options.data().form
      this.dialogFormVisible = false
      this.$emit('fetch-data')
    },

    save () {
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

          // this.$refs['form'].resetFields()
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
.lists {
  height: 200px;

  overflow: scroll;
  border: 1px solid #ececec;

  div {
    border-bottom: 1px solid #ececec;
    // background-color: rgb(23, 84, 63);

    span {
      padding-left: 15px;
    }
  }
}
</style>
