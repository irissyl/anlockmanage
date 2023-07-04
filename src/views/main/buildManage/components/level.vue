<template>
  <div>
    <el-table :data="navtableData" row-key="menuId" border :tree-props="{children: 'childs'}">
      <el-table-column prop="menuName" label="菜单名称" sortable >
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
    <role-edit ref="navedit"></role-edit>
  </div>
</template>

<script>
import roleEdit from './roleEdit.vue';
export default {
  components: { roleEdit },
  name: 'AnlockmanageLevel',

  data () {
    return {
      navtableData: [
        {
          "menuId": 140,
          "menuName": "房间",
          "parentNode": 0,
          "menuType": "dic",
          "menuSort": 13,
          "menuUrl": "info",
          "menuIcon": "info",
          "childs": [
            {
              "menuId": 178,
              "menuName": "楼层",
              "parentNode": 140,
              "menuType": "node",
              "menuSort": 0,
              "menuUrl": "DeviceManagement",
              "menuIcon": "",
              "childs": [
                {
                  "menuId": 179,
                  "menuName": "楼栋",
                  "parentNode": 178,
                  "menuType": "node",
                  "menuSort": 0,
                  "menuUrl": "DeviceManagement/NB",
                  "menuIcon": "",
                  "childs": [
                    {
                      "menuId": 180,
                      "menuName": "片区",
                      "parentNode": 178,
                      "menuType": "node",
                      "menuSort": 0,
                      "menuUrl": "DeviceManagement/NB",
                      "menuIcon": "",
                      "childs": [
                        {
                          "menuId": 181,
                          "menuName": "区/县",
                          "parentNode": 178,
                          "menuType": "node",
                          "menuSort": 0,
                          "menuUrl": "DeviceManagement/NB",
                          "menuIcon": "",
                          "childs": [
                            {
                              "menuId": 182,
                              "menuName": "市",
                              "parentNode": 178,
                              "menuType": "node",
                              "menuSort": 0,
                              "menuUrl": "DeviceManagement/NB",
                              "menuIcon": "",
                              "childs": [
                                {
                                  "menuId": 183,
                                  "menuName": "省",
                                  "parentNode": 178,
                                  "menuType": "node",
                                  "menuSort": 0,
                                  "menuUrl": "DeviceManagement/NB",
                                  "menuIcon": "",
                                  "childs": []
                                },
                              ]
                            },
                          ]
                        },
                      ]
                    },
                  ]
                },
              ]
            },
          ]
        }
      ]
    };
  },

  mounted () {

  },

  methods: {
    addnavlock () {
      this.$refs['navedit'].showEdit()
    },
    handlenavEdit (row) {
      this.$refs['navedit'].showEdit(row)
    },
  },
};
</script>

<style lang="scss" scoped>
</style>