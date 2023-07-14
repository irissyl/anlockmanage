<template>
  <div class="bcontainer">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="24" :lg="5" :xl="5">
        <el-card class="all1" shadow="never">
          <el-tree class="tree" :data="treedata" :props="defaultProps" node-key="id" :default-checked-keys="[1]" :default-expanded-keys="[1, 2, 3]" @node-click="handleNodeClick">
            <span slot-scope="{ node, data }">
              <i :class="data.icon" :style="`color: ${data.color}`"></i>
              <span style="padding-left: 4px;">{{ node.label }}</span>
            </span>
          </el-tree>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="19" :xl="19">
        <el-card class="all1" shadow="never" style="height: 300px">
          <el-table ref="tableSort" :data="tableData" :header-cell-style="{'text-align': 'left'
              }" :cell-style="{ 'text-align': 'left' }" style="width: 100%" >
          <el-table-column  show-overflow-tooltip prop="name" label="姓名"></el-table-column>
          <el-table-column  show-overflow-tooltip prop="" label="职务"></el-table-column>
          <el-table-column show-overflow-tooltip prop="" label="证件号"></el-table-column>
          <el-table-column  show-overflow-tooltip prop="" label="手机"></el-table-column>
          <el-table-column  show-overflow-tooltip prop="" label="性别"></el-table-column>
          <el-table-column  show-overflow-tooltip prop="" label="房间数">
            <template>可开门数</template>
          </el-table-column>
          <el-table-column  show-overflow-tooltip prop="" label="微信"></el-table-column>
          <el-table-column  show-overflow-tooltip prop="" label="左指纹"></el-table-column>
          <el-table-column  show-overflow-tooltip prop="" label="右指纹"></el-table-column>
          <el-table-column  show-overflow-tooltip prop="" label="卡号"></el-table-column>
          <el-table-column  show-overflow-tooltip prop="" label="密码">
            <template>有/无</template>
          </el-table-column>
          <el-table-column  show-overflow-tooltip prop="" label="租期"></el-table-column>
          <el-table-column min-width="210px" show-overflow-tooltip prop="" label="操作">
            <template #default="{ row }">
                <el-button type="primary" icon="el-icon-edit" @click="handleEdit(row)" plain>续租</el-button>
                <el-button type="primary" icon="el-icon-delete" @click="handleDelete(row)" plain>调宿</el-button>
                <el-button type="primary" @click="openRecord(row)" plain>退宿</el-button>
            </template>
          </el-table-column>
          </el-table>
        </el-card>
        <el-card class="cardsty" v-for="(items,index) in cardData" :key="index">
          <div class="hanbao">
            <span>{{items.room}}房间</span>
            <div class="center">
              <el-tooltip content="调整人员" placement="bottom" effect="light">
                <img src="../../../../assets/add.png" @click="addPerson(items)" alt="" class="addclass" srcset="">
              </el-tooltip>
              <div class="tou" v-for="(item,index) in personData" :key="index">
                <img src="../../../../assets/undraw_pic.png" alt="" v-if="item.sex == '男'" srcset="">
                <img src="../../../../assets/undraw.png" alt="" v-if="item.sex == '女'" srcset="">
              </div>
            </div>
            <div class="bottom clearfix">
              <img src="../../../../assets/dianliang.png" alt="" class="dianliang" srcset="">
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <table-edit ref="edit" @fetchData="fetchData"></table-edit>
    <householdManange ref="hold"></householdManange>
    <findpeople ref="addPerson" @fetchData="fetchData"></findpeople>
  </div>
</template>

<script>
import householdManange from './zaizhu/householdManange.vue';
import TableEdit from './zaizhu/TableEdit.vue';
import findpeople from './findpeople.vue';
export default {
  components: { TableEdit, householdManange, findpeople },
  name: 'AnlockmanageBrowseRoom',

  data () {
    return {
      treedata: [
        {
          id: 1,
          label: '狐狸片区',
          children: [
            {
              id: 3,
              label: 'anlock办公楼',
              children: [
                {
                  id: 4,
                  label: '1层',
                },
                {
                  id: 5,
                  label: '2层',
                  disabled: true,
                },
              ],
            },
            {
              id: 2,
              label: 'anlock研发楼',
              disabled: true,
              children: [
                {
                  id: 6,
                  label: '1层',
                },
                {
                  id: 7,
                  label: '2层',
                  disabled: true,
                },
              ],
            },
          ],
        },
      ],
      cardData: [{ room: 101 }, { room: 102 }],
      personData: [
        { sex: '男' }, { sex: '女' }, { sex: '男' }, { sex: '男' }, { sex: '女' },
      ],
      tableData: [{ name: '雷诗云' }, { name: '李工' }, { name: '杨环' },],
      defaultProps: {
        children: 'children',
        label: 'label',
        icon: 'icon',
      },
    };
  },

  mounted () {

  },

  methods: {
    showEdit () { },
    fetchData () { },
    handleNodeClick (data) {
      console.log(data, 'data1')
    },
    addPerson (data) {
      this.$refs['addPerson'].showEdit(data)
    },
    handleEdit (row) {
      this.$refs['edit'].showEdit(row)
    },
    handlehold (row) {
      this.$refs['hold'].showEdit(row)
    },
    handleDelete (row) {
      console.log(row, 'rowd')
      this.ckVisible = true
    },
  },
};
</script>

<style lang="scss" >
.bcontainer {
  .all1 {
    .tree {
      .btns {
        font-size: 20px;
      }
      .el-tree-node__content {
        padding: 0 !important;
        border-radius: 5px;
        border: 1px rgb(161, 160, 160) dashed;
        margin-bottom: 15px;
        text-align: left;
        font-size: 17px;
        height: 40px;
      }
      .el-tree-node__content:hover {
        border: 1px #00b2e8 dashed;
      }
      .el-tree-node {
        position: relative;
        padding-left: 15px;
      }
      .el-tree-node__children {
        padding-left: 15px;
      }

      // 竖线
      .el-tree-node::before {
        content: '';
        height: 100%;
        width: 1px;
        position: absolute;
        left: -3px;
        top: -26px;
        border-width: 1px;
        border-left: 1px dashed #a9aeb6;
      }

      .el-tree-node:last-child::before {
        height: 38px;
      }

      // 横线
      .el-tree-node::after {
        content: '';
        width: 20px;
        height: 20px;
        position: absolute;
        left: -3px;
        top: 12px;
        border-width: 1px;
        border-top: 1px dashed #848d9c;
      }

      & > .el-tree-node::after {
        border-top: none;
      }
      & > .el-tree-node::before {
        border-left: none;
      }

      .el-tree-node__expand-icon {
        font-size: 16px;
      }
      .el-tree-node__expand-icon.expanded {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      .el-tree-node__expand-icon.expanded {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      /* //有子节点 且未展开 */
      .el-icon-caret-right:before {
        content: url('../../../../assets/erji.png');
        display: block;
        width: 20px;
        height: 20px;
        font-size: 16px;
        background-size: 16px;
      }
      /* //有子节点 且已展开 */
      .el-tree-node__expand-icon.expanded.el-icon-caret-right:before {
        content: url('../../../../assets/yiji.png');
        display: block;
        width: 20px;
        height: 20px;
        font-size: 16px;
        background-size: 16px;
      }
      /* //没有子节点 */
      .el-tree-node__expand-icon.is-leaf::before {
        content: '';
        display: block;
        width: 0px;
        height: 0px;
        font-size: 16px;
        background-size: 16px;
      }
      /* //高亮字体颜色 */
      .el-tree-node.is-current > .el-tree-node__content {
        background-color: #ff06061d;
        color: #000000 !important;
        font-size: 15px;
      }
    }
  }

  .cardsty {
    width: 200px;
  }
  .hanbao {
    width: 100%;
    text-align: center;
    margin: 0 auto;
  }
  .bottom {
    margin-top: 13px;
    // line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: '';
  }

  .clearfix:after {
    clear: both;
  }
  .cardsty {
    float: left;
    background-color: #c9e3fddc;
    margin-top: 35px;
    border-radius: 15px;
    margin-left: 10px;
    margin-right: 40px;
  }
  .center {
    width: 100%;
    overflow-y: scroll;
    max-height: 140px;
    &::-webkit-scrollbar {
      width: 2px;
      height: 2px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
    }

    &::-webkit-scrollbar-track {
      border-radius: 5px;
    }

    .tou {
      img {
        width: 65px;
        height: 65px;
        float: left;
        margin-top: 5px;
        margin-left: 10px;
      }
    }
    .addclass {
      width: 65px;
      height: 65px;
      float: left;
      margin-top: 5px;
      // margin-right: 1px;
      margin-left: 10px;
    }
  }
  .dianliang {
    width: 40px;
    height: 25px;
    margin-right: 20px;
    float: right;
  }
}
</style>