<template>
  <el-dialog v-dialogDrag :title="title" :visible.sync="dialogFormVisible" width="900px" @close="close">
    <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" row-key="id" border :tree-props="{children: 'children'}" max-height="300px">
      <el-table-column prop="id" label="层级编号">
      </el-table-column>
      <el-table-column prop="label" label="层级名称" sortable>
      </el-table-column>
      <el-table-column prop="name" label="建筑名称" sortable>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="操作" fixed="right">
        <template #default="{ row }">
          <el-button type="text" icon="el-icon-circle-plus-outline" @click="handleClick(row)"></el-button>
          <el-button type="text" icon="el-icon-edit" @click="editlevel(row)"></el-button>
          <el-button type="text" icon="el-icon-delete" @click="handleDelete(row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="添加片区" :visible.sync="pianqudialogVisible" width="30%" :before-close="handleClose" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="片区编号:" prop="title">
          <el-input v-model.trim="form.num" autocomplete="off" placeholder="请输入片区编号"></el-input>
        </el-form-item>
        <el-form-item label="片区名称:" prop="title">
          <el-input v-model.trim="form.roomname" autocomplete="off" placeholder="请输入片区名称"></el-input>
        </el-form-item>
        <el-form-item label="排序:" prop="title">
          <el-input-number v-model="form.sort" controls-position="right" @change="handleChange" :min="1" :max="1000"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="pianqudialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="pianqudialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="新增层级" :visible.sync="cengjidialogVisible" width="30%" :before-close="handleClose" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="层级编号:">
          <el-input v-model.trim="form.num" autocomplete="off" placeholder="请输入层级编号"></el-input>
        </el-form-item>
        <el-form-item label="层级名称:">
          <el-input v-model.trim="form.roomname" autocomplete="off" placeholder="请输入层级名称"></el-input>
        </el-form-item>
        <el-form-item prop="title">
          <el-button type="primary" @click="save">确 定</el-button>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cengjidialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="cengjidialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="添加楼栋" :visible.sync="loudongdialogVisible" width="30%" :before-close="handleClose" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="楼栋编号:" prop="title">
          <el-input v-model.trim="form.num" autocomplete="off" placeholder="请输入楼栋编号"></el-input>
        </el-form-item>
        <el-form-item label="楼栋名称:" prop="title">
          <el-input v-model.trim="form.roomname" autocomplete="off" placeholder="请输入楼栋编号"></el-input>
        </el-form-item>
        <el-form-item label="楼栋类型:" prop="title">
          <el-select v-model.trim="form.sceneType" placeholder="请选择建筑类型">
            <el-option label="办公楼" value="办公楼"></el-option>
            <el-option label="宿舍楼" value="宿舍楼"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序:" prop="title">
          <el-input-number v-model="form.sort" controls-position="right" @change="handleChange" :min="1" :max="1000"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="loudongdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="loudongdialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="添加楼层" :visible.sync="loucengdialogVisible" width="30%" :before-close="handleClose" append-to-body>
      <el-tabs v-model="activeName2">
        <el-tab-pane label="单个添加" name="first1">
          <el-form ref="form" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="楼层编号:" prop="title">
              <el-input v-model.trim="form.num" autocomplete="off" placeholder="请输入楼层编号"></el-input>
            </el-form-item>
            <el-form-item label="楼层名称:" prop="title">
              <el-input v-model.trim="form.roomname" autocomplete="off" placeholder="请输入楼层名称"></el-input>
            </el-form-item>
            <el-form-item label="排序:" prop="title">
              <el-input-number v-model="form.sort" controls-position="right" @change="handleChange" :min="1" :max="1000"></el-input-number>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="批量添加" name="second1">
          <el-form ref="form" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="楼层开始名称:" prop="title">
              <el-input v-model.trim="form.startname" autocomplete="off" placeholder="请输入楼层开始名称"></el-input>
            </el-form-item>
            <el-form-item label="楼层数量:" prop="title">
              <el-input-number v-model="form.lcnum" controls-position="right" :min="1" :max="50"></el-input-number>
            </el-form-item>
            <el-form-item label="楼层模型:" prop="title">
              <el-input v-model.trim="form.sceneType" autocomplete="off" placeholder="请输入楼层模型"></el-input>
            </el-form-item>
            <el-form-item label="排序:" prop="title">
              <el-input-number v-model="form.sort" controls-position="right" @change="handleChange" :min="1" :max="1000"></el-input-number>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="loucengdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="loucengdialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">关闭</el-button>
    </div>
    <level ref="level"></level>
  </el-dialog>
</template>

<script>
import { doEdit } from '@/api/table'
import level from './level.vue'

export default {
  components: { level },
  name: 'TableEdit',
  data () {
    return {
      form: {
        roomname: '',
        sort: '',
        num: '',
        lcnum: '',
        sceneType: '',
        startname: '',
        cengjiType: '三级'
      },
      pianqudialogVisible: false,
      cengjidialogVisible: false,
      loudongdialogVisible: false,
      loucengdialogVisible: false,
      rules: {},
      title: '',
      times: '',
      radio: '1',
      dialogFormVisible: false,
      activeName: 'first',
      activeName2: 'first1',
      tableData: [
        {
          id: 3,
          label: '片区',
          children: [
            {
              id: 2,
              label: '楼栋',
              parent: null,
              children: [
                {
                  id: 1,
                  label: '楼层',
                  parent: null,
                },
              ],
            },
          ],
        }
      ]
    }
  },
  mounted () { },
  methods: {
    showEdit (row) {
      if (!row) {
        this.title = '添加建筑'
      } else {
        this.title = '编辑建筑'
        this.form = Object.assign({}, row)
      }
      this.dialogFormVisible = true
    },
    editlevel () {
      this.$refs['level'].showEdit()
    },
    handleDelete () { },

    handleClick (row) {
      console.log(this.tableData[0].id,row.id,'tableData')
      if(row.label == '片区' && row.label != '楼栋' && row.label == '楼层' && this.tableData[0].id == row.id){
        this.pianqudialogVisible = true
      }
       if(row.label == '楼栋'){
        this.loudongdialogVisible = true
      }
       if(row.label == '楼层'){
        this.loucengdialogVisible = true
      }
      if(this.tableData[0].id == row.id){
       this.cengjidialogVisible = true
      }
    },
    handleChange () { },
    handleClose () { },
    close () {
      this.dialogFormVisible = false
    },
    save () {
      this.cengjidialogVisible = false
    },
  },
}
</script>
