<template>
  <el-dialog v-dialogDrag title="办理入住" :visible.sync="checkindialogVisible" width="50%"  @close="close">
    <el-tabs v-model="activeName" @tab-click="handleClick" style="height:500px">
      <el-tab-pane label="常规人员" name="first">
        <tree-transfer ref="treeTransfer" class="transtransfer" :titles="['房间待入住人员:', '房间已入住人员:']" :button-texts="['删除', '添加人员']" :data-source.sync="dataSource" :default-checked-keys="defaultValue" :is-radio="false" :filterable="true" :father-choose="false"
          @left-check-change="handleLeftCheckChange" @right-check-change="handleRightCheckChange" @change="handleChange"></tree-transfer>
      </el-tab-pane>
      <el-tab-pane label="临时人员" name="second">
        <el-form  label-width="120px" :model="formLabelAlign">
          <el-form-item label="住户名称">
            <el-input v-model="formLabelAlign.name" style="width:400px"></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="formLabelAlign.region" style="width:400px"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model.trim="formLabelAlign.type">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
              <el-radio :label="3">中性</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="身份证号码">
            <el-input v-model="formLabelAlign.idcard" style="width:400px"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取消入住</el-button>
      <el-button type="primary" @click="save">确定入住</el-button>
    </div>
  </el-dialog>
</template>

<script>
import TreeTransfer from '@/components/tree-transfer.vue';

export default {
  name: 'TableEdit',
  components: { TreeTransfer },
  data () {
    TreeTransfer
    return {
      title: '',
      checkindialogVisible: false,
      Edit: false,
      activities: [],
      activeName: 'first',
      dataSource: [
        {
          label: 'A部门',
          id: '1',
          children: [
            {
              label: '小明',
              children: [],
              id: '1-1',
            },
            {
              label: '小红',
              children: [],
              id: '1-2',
            },
            {
              label: '小刚',
              children: [],
              id: '1-3',
            },
          ],
        },
      ],
      formLabelAlign: {
          name: '',
          region: '',
          type: 3,
          idcard:''
        },
      defaultValue: [],
    }
  },
  mounted () {

  },
  methods: {
    handleClick (tab, event) {
      // console.log(tab, event);
    },
    showEdit (row) {
      this.checkindialogVisible = true
    },
    handleLeftCheckChange (value, currentKeys) {
      // console.log('handleLeftCheckChange:', value, currentKeys)
    },
    handleRightCheckChange (value, currentKeys) {
      // console.log('handleRightCheckChange:', value, currentKeys)
    },
    handleChange (value, direction, currentKeys) {
      // console.log('handleChange', value, direction, currentKeys)
    },
    close () {
      this.checkindialogVisible = false
    },
    save () {
      this.checkindialogVisible = false
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
