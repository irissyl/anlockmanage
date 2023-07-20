<template>
  <el-dialog v-dialogDrag :title="title" :visible.sync="dialogFormVisible" width="50%" @close="close">
    <!-- 已入住房间 -->
    <el-divider content-position="left">已入住房间</el-divider>
    <el-table ref="tableSort" height="300" border v-loading="listLoading" style="width: 95%;margin:0 auto;" :data="lists" @selection-change="setSelectRows" @sort-change="tableSortChange">
      <el-table-column show-overflow-tooltip prop="areaName" label="房间名称"></el-table-column>
      <el-table-column show-overflow-tooltip prop="" label="房间编号"></el-table-column>
      <el-table-column show-overflow-tooltip prop="" label="门锁编号"></el-table-column>
      <el-table-column show-overflow-tooltip prop="" label="水表编号"></el-table-column>
      <el-table-column show-overflow-tooltip prop="" label="电表编号"></el-table-column>
      <el-table-column show-overflow-tooltip prop="" label="授权人数">
        <template #default="{ row }">
          <el-tag type="danger">5/100</el-tag>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip width="220px" prop="" label="操作">
        <template #default="{ row }">
          <el-button type="primary"  @click="handleEdit(row)" plain>续租</el-button>
          <!-- <el-button type="primary"  @click="handleDelete(row)" plain>退宿</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <div style="margin:40px 0 0 0; ">
      <el-divider content-position="left" >填写续租信息</el-divider>
    </div>
    <el-form ref="form" v-if="formshow" :model="form" :rules="rules" label-width="100px" style="margin:20px 0 0 0; " >
      <el-form-item label="房间编号">
        <el-input v-model.trim="form.roomNO" autocomplete="off" placeholder="请输入房间编号"></el-input>
      </el-form-item>
      <el-form-item label="房间名称">
        <el-input v-model.trim="form.roomName" autocomplete="off" placeholder="请输入房间名称"></el-input>
      </el-form-item>
      <el-form-item label="时效">
        <el-date-picker v-model="form.times" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {
  updateBuild,
  addOfficeRent,
  addKeyFinger,
  listSection,
} from '@/api/table'
import {
  addSingleRoom,
  listRoom,
  addBatchRoom,
  delRoom,
  updateRoom,
} from '@/api/api'

export default {
  name: 'TableEdit',
  data () {
    return {
      form: {
        floorKey: 1,
        roomNO: '',
        roomName: '',
        roomType: '',
        roomInfo: '',
        iotTag: '',
        sceneType: '',
        buildId: '',
        times: ''
      },
      lists: [{ areaName: '呼呼' }],
      listLoading: false,
      Builddata: [],
      num: 1,
      formshow:false,
      rules: {
        roomname: [
          { required: true, trigger: 'blur', message: '请输入房间名称' },
        ],
      },
      title: '',
      dialogFormVisible: false,
      Edit: false,
      Fingerprint: {
        overdata: '',
      },
      activities: [],
    }
  },
  mounted () {
    // this.getlistSection()
  },
  methods: {
    async getlistSection () {
      let data = await listSection({})
      this.Builddata = data.data
      console.log(data, 'data')
    },
    tableSortChange () {
      const imageList = []
      this.$refs.tableSort.tableData.forEach((item, index) => {
        imageList.push(item.img)
      })
      this.imageList = imageList
    },
    setSelectRows (val) {
      this.selectRows = val
    },
    handleEdit (row) {
      this.formshow = true
    },
    handleDelete (row) {
      console.log(row, 'rowd')
    },
    handlenumChange () { },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
          this.activities = []
        })
        .catch((_) => { })
    },

    showEdit (row) {
      console.log(typeof row === 'object', 'row')
      if ((typeof row === 'object') == false) {
        this.title = '批量续租'
        this.Edit = false
        this.form.buildId = row
      } else {
        this.title = '续租'
        this.Edit = true
        this.form = Object.assign({}, row)
        // this.form.content = row.rentContent.split(',').map((item) => {
        //   return Number(item)
        // })
        // console.log(this.form, row, 'row2')
      }
      this.dialogFormVisible = true
    },
    close () {
      // this.$refs['tableSort'].resetFields()
      // this.form = this.$options.data().form
      this.dialogFormVisible = false
      this.formshow = false
      // this.$emit('fetch-data')
    },
    save () {
      this.$refs['form'].validate(async (valid) => {
        if (valid) {
          if (this.Edit == false) {
            console.log(this.form, 'form')
            let data = await addSingleRoom(this.form)
            if (data.resultCode == 0) {
              this.$message('添加成功')
            }
          } else {
            let data = await updateRoom(this.form)
            if (data.resultCode == 0) {
              this.$message('修改成功')
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

.ie {
  width: 335px;
  margin-right: 10px;
}

.left {
  margin-left: 25%;
  padding-left: 30px;
}
.right {
  text-align: center;

  margin-bottom: 10%;
  img {
    width: 60px;
    height: 60px;
  }
}
</style>
