<template>
  <div class="form-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          class="demo-ruleForm"
          label-position="right"
        >
          <el-form-item>
            <el-divider content-position="left">
              <span class="fengexian">系统警告值设置</span>
            </el-divider>
          </el-form-item>
          <el-form-item label-width="150px" label="门锁电压报警值" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label-width="150px" label="未开门报警值" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label-width="150px" prop="name">
            <el-checkbox v-model="checked">门锁报警语音播报</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-divider content-position="left">
              <span class="fengexian">订单相关设置</span>
            </el-divider>
          </el-form-item>
          <el-form-item label-width="150px" label="订单逾期阀值" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label-width="150px" label="名单分页大小" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label-width="150px" label="默认有效期:" prop="name">
            <el-input-number
              v-model="num"
              style="width: 450px"
              controls-position="right"
              :min="1"
              :max="1000"
            ></el-input-number>
            <el-select
              v-model="ruleForm.region"
              style="margin: 0 0 0 10px; width: 140px"
              placeholder="请选择时间单位"
            >
              <el-option label="年" value="year"></el-option>
              <el-option label="月" value="month"></el-option>
              <el-option label="日" value="day"></el-option>
              <el-option label="时" value="hour"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label-width="150px" prop="name">
            <el-checkbox v-model="checked">固定退房时间</el-checkbox>
            <el-date-picker
              v-model="value3"
              style="margin: 0 0 0 10px"
              type="datetime"
              placeholder="选择日期时间"
              default-time="12:00:00"
            ></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-divider content-position="left">
              <span class="fengexian">联网卡号设置</span>
            </el-divider>
          </el-form-item>
          <el-form-item label-width="150px" prop="name">
            <el-checkbox v-model="checked">设备小端字节序</el-checkbox>
          </el-form-item>
          <el-form-item label-width="150px" prop="name">
            <el-checkbox v-model="checked">十六进制输入输出</el-checkbox>
          </el-form-item>

          <el-form-item style="float: right">
            <el-button type="primary" @click="submitForm('ruleForm')">
              注册发卡机
            </el-button>
            <el-button @click="resetForm('ruleForm')">保存修改</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'Form',
    data() {
      return {
        ruleForm: {
          name: '',
          region: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          checked: false,
        },
        value3: '',
        rules: {},
        num: '1',
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
          } else {
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
    },
  }
</script>
<style lang="scss" scoped>
  .fengexian {
    font-size: 15px;
    color: #3fa2ff;
    font-family: '微软雅黑';
  }
</style>
