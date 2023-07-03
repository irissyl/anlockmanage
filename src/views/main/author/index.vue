<template>
  <div class="author-container">
    <el-tabs :tab-position="tabPosition" class="tabsty" @tab-click="handleClick" @tab-remove="handleremoveClick">
      <el-tab-pane class="">
        <span slot="label" class="pans6 labspan">
          <img src="../../../assets/user11.png" v-if="gateway0 == false" class="gateway" alt="" srcset="">
          <img src="../../../assets/user1.png" v-if="gateway0 == true" class="gateway" alt="" srcset="">
          <H5>用户管理</H5>
        </span>
        <div>
          <el-button class="btnpr" type="primary" icon="el-icon-info" @click="addlockbatch()">功能帮助</el-button>
          <el-button class="btnpr" type="primary" icon="el-icon-plus" @click="addlock()">创建用户</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%;margin-top: 10px;margin-left: 20px;">
          <el-table-column prop="" label="用户ID"></el-table-column>
          <el-table-column prop="" label="用户账户"></el-table-column>
          <el-table-column prop="name" label="用户姓名"></el-table-column>
          <el-table-column prop="" label="所属部门"></el-table-column>
          <el-table-column prop="" label="联系电话"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template #default="{ row }">
              <el-button type="text" icon="el-icon-edit" @click="handleEdit(row)"></el-button>
              <el-button type="text" icon="el-icon-delete" @click="handleDelete(row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane class="">
        <span slot="label" class="pans6">
          <img src="../../../assets/caidan.png" v-if="changeshow == false" class="gateway" alt="" srcset="">
          <img src="../../../assets/caidan1.png" v-if="changeshow == true" class="gateway" alt="" srcset="">
          <h5>菜单管理</h5>
        </span>
        <div>
          <el-button class="btnpr" type="primary" icon="el-icon-plus" @click="addnavlock()">添加菜单</el-button>
        </div>
        <el-table :data="navtableData"  row-key="menuId" border  :tree-props="{children: 'childs'}">
          <el-table-column prop="menuName" label="菜单名称" sortable width="180">
          </el-table-column>
          <el-table-column prop="menuType" label="菜单级别">
          </el-table-column>
          <el-table-column prop="menuUrl" label="菜单URL">
          </el-table-column>
          <el-table-column prop="menuIcon" label="菜单图标">
          </el-table-column>
          <el-table-column prop="menuSort" label="排序">
          </el-table-column>
          <el-table-column fixed="right" label="操作">
            <template #default="{ row }">
              <el-button type="text" icon="el-icon-edit" @click="handlenavEdit(row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane class="">
        <span slot="label" class="pans6">
          <img src="../../../assets/juese.png" v-if="gateway2 == false" class="gateway" alt="" srcset="">
          <img src="../../../assets/juese1.png" v-if="gateway2 == true" class="gateway" alt="" srcset="">
          <h5>角色管理</h5>
        </span>
        <div>
          <el-button class="btnpr" type="primary" icon="el-icon-info" @click="addlockbatch()">功能帮助</el-button>
          <el-button class="btnpr" type="primary" icon="el-icon-plus" @click="handlerole()">添加角色</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%;margin-top: 10px;margin-left: 20px;">
          <el-table-column prop="" label="角色名称"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template #default="{ row }">
              <el-button type="text" icon="el-icon-edit" @click="handleroleEdit(row)"></el-button>
              <el-button type="text" icon="el-icon-delete" @click="handleDelete(row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane class="">
        <span slot="label" class="pans6">
          <img src="../../../assets/caozuo.png" v-if="gateway3 == false" class="gateway" alt="" srcset="">
          <img src="../../../assets/caozuo1.png" v-if="gateway3 == true" class="gateway" alt="" srcset="">
          <h5>操作管理</h5>
        </span>
      </el-tab-pane>
    </el-tabs>
    <nav-edit ref="navedit"></nav-edit>
    <table-edit ref="edit"></table-edit>
    <role-edit ref="roleedit" :navtableData="navtableData"></role-edit>
  </div>
</template>

<script>
import TableEdit from './components/TableEdit.vue'
import { getCampusList, listMenuItem } from '@/api/table'
import NavEdit from './components/navEdit.vue'
import RoleEdit from './components/roleEdit.vue'

export default {
  components: { TableEdit, NavEdit, RoleEdit },
  name: '',
  data () {
    return {
      quyuvalue1: '',
      quyuvalue2: '',
      quyuvalue3: '',
      quyuvalue4: '',
      tabPosition: 'left',
      tableData: [{ name: '王小虎', }],
      navtableData: [],
      tableDatas: [{ address: '测试D59-2层-206', }],
      formInline: {
        user: '',
        ip: '',
        duank: '',
        remark: ''
      },
      tabs: 'left',
      changeshow: false,
      gateway0: true,
      gateway2: false,
      gateway3: false,
    }
  },
  mounted () {
      this.getnavtableData()
   },
  methods: {
    handleEdit (row) {
      this.$refs['edit'].showEdit(row)
    },
    async getnavtableData(){
     let nav =  await listMenuItem()
     this.navtableData = nav.data
     console.log(nav.data,'nav')
    },
    handleClick (tab, event) {
      if (tab.active == true && tab.paneName == "1") {
        this.changeshow = true
      } else {
        this.changeshow = false
      }
      if (tab.active == true && tab.paneName == "2") {
        this.gateway2 = true
      } else {
        this.gateway2 = false
      }
      if (tab.active == true && tab.paneName == "3") {
        this.gateway3 = true
      } else {
        this.gateway3 = false
      }
      if (tab.active == true && tab.paneName == "0") {
        this.gateway0 = true
      } else {
        this.gateway0 = false
      }
    },
    handleremoveClick (tab, event) {
    },
    handleDelete (row) {
    },
    handlerole(){
      this.$refs['roleedit'].showEdit()
    },
    handleroleEdit(row){
      this.$refs['roleedit'].showEdit(row)
    },
    addnavlock(){
      this.$refs['navedit'].showEdit()
    },
    handlenavEdit(row) {
      this.$refs['navedit'].showEdit(row)
    },
    handlelockEdit (row) {
      this.$refs['edit'].showEdit(row)
    },
    addlock () {
      this.$refs['edit'].showEdit()
    },
    addlockbatch () {
      this.$refs['batchedit'].showEdit()
    },
    createdCard (row) {
      this.$refs['addgatewayset'].showEdit()
    },
    registrat (row) {
      this.$refs['addcard'].showEdit()
    },
    onSubmit () {
      console.log('submit!');
    }
  },
}
</script>
<style lang="scss" >
.author-container {
  .tabsty {
    height: 800px;

    .el-tabs__item {
      height: 120px;
    }
  }

  .pans6 {
    width: 150px;
    height: 100px;
    .el-icon-office-building {
      font-size: 70px;
      margin-top: 10px;
      margin-right: 10px;
    }
    .el-icon-lock {
      margin-right: 0px;
      font-size: 70px;
    }
    .gateway {
      margin-top: 10px;
      width: 70px;
      height: 60px;
    }

    h5 {
      margin-right: 10px;
      margin-top: -18px;
    }
  }
  .formbtn1 {
    width: 29%;
    height: 550px;
    margin-left: 100px;

    .tt {
      font-size: 29px;
      height: 30px;
    }
    .demo-form-inline {
      margin-top: 30px;
    }
  }
  .formbtn {
    width: 100%;
    height: 50px;
  }
  .types {
    width: 350px;
    height: 30px;
    line-height: 30px;
    border-radius: 10px;
    text-align: center;

    .rad {
      // border-radius: 15px;
    }
  }
  .rightbtn {
    float: right;
  }
  .btnpr {
    float: right;
    margin-bottom: 20px;
    margin-right: 10px;
  }
}
</style>