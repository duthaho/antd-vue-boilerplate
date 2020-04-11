<template>
  <div class="user-wrapper">
    <div class="content-box">
      <a-dropdown>
        <span class="action ant-dropdown-link user-dropdown-menu">
          <a-avatar class="avatar" icon="user" size="small" />
          <span>{{ userName }}</span>
        </span>
        <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
          <a-menu-item v-if="userName" key="0">
            <a href="javascript:;" @click="handleLogout">
              <a-icon type="logout" />
              <span>Log out</span>
            </a>
          </a-menu-item>
          <a-menu-item v-else key="0">
            <a href="javascript:;" @click="handeLogin">
              <a-icon type="login" />
              <span>Log in</span>
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'UserMenu',
  computed: {
    ...mapGetters('user', ['userName']),
  },
  methods: {
    ...mapActions('user', ['Logout']),
    handleLogout() {
      this.$confirm({
        content: 'Do you really want to log out?',
        onOk: () => {
          return this.Logout({})
            .then(() => {
              this.$router.replace('/dashboard').catch(() => {})
            })
            .catch((err) => {
              this.$message.error(err.message)
            })
        },
        onCancel() {},
      })
    },
    handeLogin() {
      this.$router.push({ name: 'Login' })
    },
  },
}
</script>
