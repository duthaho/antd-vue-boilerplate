<template>
  <div class="main">
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :form="form"
      @submit="handleSubmit"
    >
      <a-alert
        v-if="isLoginError"
        type="error"
        showIcon
        style="margin-bottom: 24px;"
        message="Incorrect username or password"
      />
      <a-form-item>
        <a-input
          size="large"
          type="text"
          placeholder="Username"
          v-decorator="[
            'username',
            {
              rules: [{ required: true, message: 'Please enter username' }],
              validateTrigger: 'change',
            },
          ]"
        >
          <a-icon
            slot="prefix"
            type="user"
            :style="{ color: 'rgba(0,0,0,.25)' }"
          />
        </a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          size="large"
          type="password"
          autocomplete="false"
          placeholder="Password"
          v-decorator="[
            'password',
            {
              rules: [{ required: true, message: 'Please enter password' }],
              validateTrigger: 'blur',
            },
          ]"
        >
          <a-icon
            slot="prefix"
            type="lock"
            :style="{ color: 'rgba(0,0,0,.25)' }"
          />
        </a-input>
      </a-form-item>

      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="loginBtn"
          :disabled="loginBtn"
          >Login</a-button
        >
      </a-form-item>

      <div class="user-login-other">
        <router-link :to="{ name: 'Recover' }" class="forge-password"
          >Forgot Password</router-link
        >
        <router-link class="register" :to="{ name: 'Register' }"
          >Register</router-link
        >
      </div>
    </a-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      loginBtn: false,
      isLoginError: false,
      form: this.$form.createForm(this),
    }
  },
  methods: {
    ...mapActions(['Login']),
    handleSubmit(e) {
      e.preventDefault()
      const {
        form: { validateFields },
        Login,
      } = this

      validateFields({ force: true }, (err, values) => {
        if (!err) {
          this.loginBtn = true

          Login(values)
            .then(this.loginSuccess)
            .catch(this.requestFailed)
            .finally(() => {
              this.loginBtn = false
            })
        }
      })
    },
    loginSuccess() {
      this.$router.push({ path: '/' })
      this.isLoginError = false
    },
    requestFailed() {
      this.isLoginError = true
    },
  },
}
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .forge-password {
      float: left;
    }

    .register {
      float: right;
    }
  }
}
</style>
