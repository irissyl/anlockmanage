<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible2" width="40%" :before-close="handleClose">
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
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AnlockmanageAddOrganization',

  data () {
    return {
      dialogVisible2:false,
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
      title: '新增',
      titles:'',
      lists: [
        {
          id: 2,
          label: '部门列表',
          children: [
            {
              id: 1,
              label: '人事部门',
              children: [],
            },
          ],
        },
      ],
    };
  },

  mounted () {

  },

  methods: {
    handleClose () { 
        this.dialogVisible2 = false
    },
    showEdit (row, tableDataid) {
      this.dialogVisible2 = true
      this.title = '新增'
      console.log(row,tableDataid, 'orow')
      if (tableDataid == row.id) {
        this.title = '新增' + row.label + '的上级'
      } else {
        this.title = '新增' + row.label + '的同级'
      }

    },
    handleClick (row) {
      console.log(this.lists[0].id,row.id,'tableData')
      // this.$refs['organization'].showEdit(row,this.lists[0].id)
    },
    handleEdit (row) {
      console.log(row, 'row')
      this.$refs['edit'].showEdit(row)
    },
    handleDelete (row) {
      console.log(row, 'rowd')
    },
  },
};
</script>

<style lang="scss" scoped>
</style>