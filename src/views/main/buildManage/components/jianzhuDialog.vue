<template>
  <el-dialog
    v-dialogDrag
    :title="title"
    :visible.sync="dialogFormVisible"
    width="700px"
    @close="close"
  >
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="园区" name="first">
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
          <el-form-item label="园区名称:" prop="title">
            <el-input v-model.trim="form.roomname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="编号:" prop="title">
            <el-input v-model.trim="form.num" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="排序:" prop="title">
            <el-input v-model.trim="form.sort" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="title">
            <el-button type="primary" @click="save">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="楼栋" name="second">
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
          <el-form-item label="楼栋名称:" prop="title">
            <el-input v-model.trim="form.roomname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="入住性别:" prop="title">
            <el-radio-group v-model.trim="form.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="建筑类型:" prop="title">
            <el-select
              v-model.trim="form.sceneType"
              placeholder="请选择建筑类型"
            >
              <el-option label="房间" value="房间"></el-option>
              <el-option label="楼层" value="楼层"></el-option>
              <el-option label="宿舍楼" value="宿舍楼"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="编号:" prop="title">
            <el-input v-model.trim="form.num" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="排序:" prop="title">
            <el-input v-model.trim="form.sort" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="title">
            <el-button type="primary" @click="save">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="楼层" name="third">
        <el-tabs
          v-model="activeName2"
          style="width: 600px; margin: 0 auto"
          @tab-click="handleClick"
        >
          <el-tab-pane label="单个添加" name="first1">
            <el-form
              ref="form"
              :model="form"
              :rules="rules"
              label-width="120px"
            >
              <el-form-item label="楼栋名称:" prop="title">
                <el-input
                  v-model.trim="form.roomname"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="入住性别:" prop="title">
                <el-radio-group v-model.trim="form.sex">
                  <el-radio :label="1">男</el-radio>
                  <el-radio :label="2">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="楼层模型:" prop="title">
                <el-input
                  v-model.trim="form.sceneType"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="编号:" prop="title">
                <el-input
                  v-model.trim="form.num"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="排序:" prop="title">
                <el-input
                  v-model.trim="form.sort"
                  autocomplete="off"
                  placeholder="请输入整数"
                ></el-input>
              </el-form-item>
              <el-form-item prop="title">
                <el-button type="primary" @click="save">确 定</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="批量添加" name="second1">
            <el-form
              ref="form"
              :model="form"
              :rules="rules"
              label-width="120px"
            >
              <el-form-item label="楼层开始名称:" prop="title">
                <el-input
                  v-model.trim="form.startname"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="楼层个数:" prop="title">
                <el-input
                  v-model.trim="form.num"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="楼层模型:" prop="title">
                <el-input
                  v-model.trim="form.sceneType"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="入住性别:" prop="title">
                <el-radio-group v-model.trim="form.sex">
                  <el-radio :label="1">男</el-radio>
                  <el-radio :label="2">女</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="排序:" prop="title">
                <el-input
                  v-model.trim="form.sort"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item prop="title">
                <el-button type="primary" @click="save">确 定</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
    </el-tabs>

    <div slot="footer" class="dialog-footer">
      <el-button @click="close">关闭</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { doEdit } from '@/api/table'

  export default {
    name: 'TableEdit',
    data() {
      return {
        form: {
          roomname:'',
          sort:'',
          sex: 1,
          sceneType: '',
          startname:''
        },
        rules: {},
        title: '',
        times: '',
        radio: '1',
        dialogFormVisible: false,
        activeName: 'first',
        activeName2: 'first1',
      }
    },
    created() {},
    methods: {
      showEdit(row) {
        if (!row) {
          this.title = '添加'
        } else {
          this.title = '编辑'
          this.form = Object.assign({}, row)
        }
        this.dialogFormVisible = true
      },
      handleClick(tab, event) {
        console.log(tab, event)
        this.form = {}
        // if (tab.label == "楼层") {
        //   this.activeName = 'first'
        // }
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
            const { msg } = await doEdit(this.form)
            this.$baseMessage(msg, 'success')
            this.$refs['form'].resetFields()
            this.dialogFormVisible = false
            this.$emit('fetch-data')
            this.form = this.$options.data().form
          } else {
            return false
          }
        })
      },
    },
  }
</script>
