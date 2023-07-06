<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="编号:" prop="roomNO">
          <el-input v-model.trim="form.roomNO" autocomplete="off" placeholder="请输入部门编号"></el-input>
        </el-form-item>
        <el-form-item label="名称:" prop="roomname">
          <el-input v-model.trim="form.roomname" autocomplete="off" placeholder="请输入部门名称"></el-input>
        </el-form-item>
        <!-- <el-form-item label="类型:" prop="sceneType">
        <el-select v-model.trim="form.sceneType" placeholder="请选择部门类型">
          <el-option label="人力资源部" value="3"></el-option>
          <el-option label="行政部" value="1"></el-option>
          <el-option label="财务部" value="2"></el-option>
          <el-option label="研发部" value="7"></el-option>
          <el-option label="测试部" value="9"></el-option>
          <el-option label="生产部" value="4"></el-option>
          <el-option label="采购部" value="5"></el-option>
          <el-option label="销售部" value="8"></el-option>
          <el-option label="客户服务部" value="6"></el-option>
          <el-option label="无" value="10"></el-option>
        </el-select>
      </el-form-item> -->
        <!-- <el-form-item label="层级类型:" prop="title">
        <el-select v-model.trim="form.cengjiType" placeholder="请选择层级类型">
          <el-option label="二级" value="1"></el-option>
          <el-option label="三级" value="2"></el-option>
          <el-option label="四级" value="3"></el-option>
          <el-option label="五级" value="4"></el-option>
          <el-option label="六级" value="5"></el-option>
          <el-option label="七级" value="6"></el-option>
          <el-option label="八级" value="7"></el-option>
          <el-option label="九级" value="8"></el-option>
        </el-select>
      </el-form-item> -->
        <el-form-item label="办公地点:" prop="address">
          <el-input v-model.trim="form.address" autocomplete="off" placeholder="请输入办公地点"></el-input>
        </el-form-item>
        <el-form-item label="描述:" prop="room">
          <el-input type="textarea" v-model.trim="form.room" autocomplete="off" placeholder="请输入部门描述"></el-input>
        </el-form-item>
        <el-form-item label="是否可显示" prop="isShow">
        <el-select v-model.trim="form.isShow" placeholder="请选择区域类型">
          <el-option label="可显示" value="可显示"></el-option>
          <el-option label="不可显示" value="不可显示"></el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="排序:" prop="room">
          <el-input-number v-model="form.sort" controls-position="right" :min="1" :max="1000"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AnlockmanageAddOrganization',

  data () {
    return {
      dialogVisible: false,
      form: {
        roomname: '',
        isShow: '',
        sectionName: '',
        sceneType: '',
        num: 1,
        room: '',
        roomNo: '',
        address: '',
        sort: 1
      },
      rules: {},
      title: '新增'
    };
  },

  mounted () {

  },

  methods: {
    handleChange () { },
    handleClose () { },
    showEdit (row, tableDataid) {
      this.dialogVisible = true
      console.log(row, 'orow')
      if (tableDataid == row.id) {
        this.title = '新增' + row.label + '的上级'
      } else {
        this.title = '新增' + row.label + '的同级'
      }

    },
  },
};
</script>

<style lang="scss" scoped>
</style>