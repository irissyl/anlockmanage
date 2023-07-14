<template>
  <el-dropdown @command="handleCommand">
    <span class="avatar-dropdown">
      <img class="user-avatar" :src="defaultUserPng" alt="" />
      <div class="user-name">
        {{ username }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="changeOffice" divided>切换到办公管理</el-dropdown-item>
      <el-dropdown-item command="changeRoom" divided>切换到宿舍管理</el-dropdown-item>
      <el-dropdown-item command="changeOrder" divided>切换预约管理</el-dropdown-item>
      <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapGetters } from 'vuex'
import { recordRoute } from '@/config'
import UserPng from '@/assets/user.png'
import { listMenuItem, addMenuItem, delMenuItem } from '@/api/table'
export default {
  name: 'VabAvatar',
  computed: {
    ...mapGetters({
      avatar: 'user/avatar',
      username: 'user/username',
    }),
  },
  data () {
    return {
      defaultUserPng: UserPng,
    }
  },
  methods: {
    handleCommand (command) {
      switch (command) {
        case 'logout':
          this.logout()
          break
        case 'changeRoom':
          this.change()
          break
        case 'changeOffice':
          this.changeOffice()
          break
        case 'changeOrder':
          this.changeOrder()
          break
      }
    },
    change () {

    },
    logout () {
      this.$baseConfirm(
        '您确定要退出' + this.$baseTitle + '吗?',
        null,
        async () => {
          try {
            await this.$store.dispatch('user/logout')
            if (recordRoute) {
              const fullPath = this.$route.fullPath
              this.$router.push(`/login?redirect=${fullPath}`)
            } else {
              this.$router.push('/login')
            }
          } catch (error) {
            this.$router.push('/login')
          }
        }
      )
    },
    changeRoom() {
      
    },
    changeOrder() {

    },
    changeOffice () {

    }
  },
}
</script>
<style lang="scss" scoped>
.avatar-dropdown {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  justify-items: center;
  height: 50px;
  padding: 0;

  .user-avatar {
    width: 40px;
    height: 40px;
    cursor: pointer;
    border-radius: 50%;
  }

  .user-name {
    position: relative;
    margin-left: 5px;
    margin-left: 5px;
    cursor: pointer;
  }
}
</style>
