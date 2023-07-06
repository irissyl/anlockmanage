<template>
  <el-dialog v-dialogDrag :title="title" :visible.sync="dialogFormVisible" width="600px" @close="close">

    <el-tabs v-model="activeName2" style="width: 550px; margin: 0 auto" @tab-click="handleClick">
      <el-tab-pane label="单个添加房间" name="first">
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
          <el-form-item label="选择楼栋:" prop="title">
            <el-select v-model.trim="form.areaId" autocomplete="off" style="width: 300px">
              <el-option v-for="item in Campuslistdata" :key="item.areaId" :label="item.areaName" :value="item.areaId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择楼层:" prop="title">
            <el-input-number v-model="form.nums" controls-position="right" :min="1" :max="100"></el-input-number>
          </el-form-item>
          <el-form-item label="房间名称:" prop="title">
            <el-input v-model.trim="form.roomName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="房间别名:" prop="title">
            <el-input v-model.trim="form.room" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="可容纳人数:" prop="title">
            <el-input-number v-model="form.num" controls-position="right" :min="1" :max="1000"></el-input-number>
          </el-form-item>
          <el-form-item label="入住性别:" prop="title">
            <el-radio-group v-model.trim="form.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
              <el-radio :label="3">中性</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="房间类型:" prop="title">
            <el-select v-model.trim="form.sceneType" placeholder="请选择房间类别">
              <el-option label="办公室" value="办公室"></el-option>
              <el-option label="宿舍" value="宿舍"></el-option>
              <el-option label="预约" value="预约"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排序:" prop="title">
            <el-input-number v-model="form.sort" controls-position="right" :min="1" :max="99" class="inpsty1" placeholder="请输入整数"></el-input-number>
          </el-form-item>
          <el-form-item prop="title">
            <el-button type="primary" @click="save">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="批量添加房间" name="second">
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
          <el-form-item label="选择楼栋:" prop="title">
            <el-select v-model.trim="form.areaId" autocomplete="off" style="width: 300px">
              <el-option v-for="item in Campuslistdata" :key="item.areaId" :label="item.areaName" :value="item.areaId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="房间开始名称:" prop="title">
            <el-input v-model.trim="form.roomName" autocomplete="off" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="房间个数:" prop="title">
            <el-input v-model.trim="form.roomNo" autocomplete="off" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="可容纳人数:" prop="title">
            <el-input-number v-model="form.num" controls-position="right" :min="1" :max="1000"></el-input-number>
          </el-form-item>
          <el-form-item label="楼层:" prop="title">
            <el-input-number v-model="form.floorStart" controls-position="right" :min="1" :max="99" class="inpsty1"></el-input-number>
            <el-input-number v-model="form.floorEnd" class="inpsty1" controls-position="right" :min="1" :max="99"></el-input-number>
          </el-form-item>
          <el-form-item label="房号:" prop="title">
            <el-input-number v-model="form.roomStart" controls-position="right" :min="1" :max="99" class="inpsty1"></el-input-number>
            <el-input-number v-model="form.roomEnd" class="inpsty1" controls-position="right" :min="1" :max="99"></el-input-number>
          </el-form-item>
          <el-form-item label="入住性别:" prop="title">
            <el-radio-group v-model.trim="form.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
              <el-radio :label="3">中性</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="排序:" prop="title">
            <el-input-number v-model="form.sort" controls-position="right" :min="1" :max="99" class="inpsty1" placeholder="请输入整数"></el-input-number>
          </el-form-item>
          <el-form-item prop="title">
            <el-button type="primary" @click="save">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'TableEdit',
  data () {
    return {
      form: {
        sex: 1,
        author: '',
        sceneType: '',
        num: 1,
        room: '',
        roomName: '',
        roomNo: '',
        sort: '',
        areaId: '',
        nums: 1,
        roomStart:1,
        roomEnd:1,
        floorStart:1,
        floorEnd:1
      },
      rules: {},
      title: '',
      times: '',
      radio: '1',
      dialogFormVisible: false,
      activeName2: 'first',
      Campuslistdata: []
    }
  },
  created () { },
  methods: {
    showEdit (row) {
      if (!row) {
        this.title = '添加房间'
      } else {
        this.title = '编辑房间'
        this.form = Object.assign({}, row)
      }
      this.dialogFormVisible = true
    },
    handleClick (tab, event) {
      console.log(tab, event)
      if (tab.label == '楼层') {
        this.activeName = 'first'
      }
    },
    close () {
      this.dialogFormVisible = false
    },
    save () {
      this.dialogFormVisible = false
    },
  },
}
</script>
<style lang="scss" scoped>
.inpsty1 {
  margin-right: 20px;
  // float: right;
}
</style>