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
        v-if="errorMessage"
        type="error"
        showIcon
        style="margin-bottom: 24px;"
        :message="errorMessage"
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
        <a-input-password
          size="large"
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
        </a-input-password>
      </a-form-item>

      <a-form-item>
        <a-checkbox v-decorator="['rememberMe', { valuePropName: 'checked' }]"
          >Remember me</a-checkbox
        >
        <router-link class="register" :to="{ name: 'Register' }"
          >Register</router-link
        >
      </a-form-item>

      <a-form-item style="margin-top:24px">
        <a-button
          icon="login"
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="loginBtn"
          :disabled="loginBtn"
          >Login</a-button
        >
      </a-form-item>
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
      errorMessage: '',
      form: this.$form.createForm(this),
    }
  },
  methods: {
    ...mapActions('user', ['Login']),
    handleSubmit(e) {
      e.preventDefault()
      const {
        form: { validateFields },
        Login,
      } = this

      validateFields({ force: true }, (err, values) => {
        if (!err) {
          this.loginBtn = true
          values.captchar = 'duthaho'
          Login(values)
            .then(this.requestSuccess)
            .catch(this.requestFailed)
            .finally(() => {
              this.loginBtn = false
            })
        }
      })
    },
    requestSuccess() {
      this.$router.push({ path: '/' })
      this.errorMessage = null
    },
    requestFailed(err) {
      this.errorMessage = 'Something wrong'
      if (err.response) {
        const { data = {} } = err.response
        this.errorMessage = Object.keys(data)
          .map((k) => data[k])
          .join(' ')
      } else if (err.message) {
        this.errorMessage = err.message
      }
    },
  },
}
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .forget-password {
    font-size: 14px;
  }

  .register {
    float: right;
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

    .forget-password {
      float: left;
    }

    .register {
      float: right;
    }
  }
}
</style>
