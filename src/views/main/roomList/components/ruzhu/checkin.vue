<template>
  <el-dialog v-dialogDrag title="办理入住" :visible.sync="checkindialogVisible" width="900px" destroy-on-close @close="close">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="长期入住" name="first">
        <tree-transfer ref="treeTransfer" class="transtransfer" :titles="['未入住:', '已入住:']" :button-texts="['删除', '添加人员']" :data-source.sync="dataSource" :default-checked-keys="defaultValue" :is-radio="false" :filterable="true" :father-choose="false"
          @left-check-change="handleLeftCheckChange" @right-check-change="handleRightCheckChange" @change="handleChange"></tree-transfer>
      </el-tab-pane>
      <el-tab-pane label="临时入住" name="second">

      </el-tab-pane>
    </el-tabs>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
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
      this.$refs['form'].validate(async (valid) => {
        if (valid) {

          // this.$refs['form'].resetFields()
          // this.form = this.$options.data().form
          // this.checkindialogVisible = false
          // this.$emit('fetchData')
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
