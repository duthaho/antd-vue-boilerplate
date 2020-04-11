<template>
  <div class="main user-layout-register">
    <a-form ref="formRegister" :form="form" id="formRegister">
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
          placeholder="Email"
          v-decorator="[
            'email',
            {
              rules: [
                {
                  required: true,
                  type: 'email',
                  message: 'Please enter email',
                },
              ],
              validateTrigger: ['change', 'blur'],
            },
          ]"
          ><a-icon
            slot="prefix"
            type="mail"
            :style="{ color: 'rgba(0,0,0,.25)' }"
        /></a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          size="large"
          type="text"
          placeholder="Username"
          v-decorator="[
            'username',
            {
              rules: [{ required: true, message: 'Please enter username' }],
              validateTrigger: ['change', 'blur'],
            },
          ]"
        >
          <a-icon
            slot="prefix"
            type="user"
            :style="{ color: 'rgba(0,0,0,.25)' }"
        /></a-input>
      </a-form-item>

      <a-popover
        placement="rightTop"
        :trigger="['focus']"
        :getPopupContainer="(trigger) => trigger.parentElement"
        v-model="state.passwordLevelChecked"
      >
        <template slot="content">
          <div :style="{ width: '240px' }">
            <div :class="['user-register', passwordLevelClass]"
              >Strength：<span>{{ passwordLevelName }}</span></div
            >
            <a-progress
              :percent="state.percent"
              :showInfo="false"
              :strokeColor="passwordLevelColor"
            />
            <div style="margin-top: 10px;">
              <span>Please do not use passwords that are easy to guess.</span>
            </div>
          </div>
        </template>
        <a-form-item>
          <a-input-password
            size="large"
            @click="handlePasswordInputClick"
            autocomplete="false"
            placeholder="Password"
            v-decorator="[
              'password',
              {
                rules: [{ validator: this.handlePasswordLevel }],
                validateTrigger: ['change', 'blur'],
              },
            ]"
            ><a-icon
              slot="prefix"
              type="lock"
              :style="{ color: 'rgba(0,0,0,.25)' }"
          /></a-input-password>
        </a-form-item>
      </a-popover>

      <a-form-item>
        <a-input-password
          size="large"
          autocomplete="false"
          placeholder="Confirm password"
          v-decorator="[
            'password2',
            {
              rules: [{ validator: this.handlePasswordCheck }],
              validateTrigger: ['change', 'blur'],
            },
          ]"
          ><a-icon
            slot="prefix"
            type="lock"
            :style="{ color: 'rgba(0,0,0,.25)' }"
        /></a-input-password>
      </a-form-item>

      <a-form-item>
        <a-button
          icon="user-add"
          size="large"
          type="primary"
          htmlType="submit"
          class="register-button"
          :loading="registerBtn"
          @click.stop.prevent="handleSubmit"
          :disabled="registerBtn"
          >Register
        </a-button>
        <router-link class="login" :to="{ name: 'Login' }">Log in</router-link>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { mixinDevice } from '@utils/mixin'

const levelNames = {
  0: 'low',
  1: 'low',
  2: 'medium',
  3: 'strong',
}
const levelClass = {
  0: 'error',
  1: 'error',
  2: 'warning',
  3: 'success',
}
const levelColor = {
  0: '#ff0000',
  1: '#ff0000',
  2: '#ff7e05',
  3: '#52c41a',
}
export default {
  name: 'Register',
  components: {},
  mixins: [mixinDevice],
  data() {
    return {
      form: this.$form.createForm(this),
      state: {
        passwordLevel: 0,
        passwordLevelChecked: false,
        percent: 10,
        progressColor: '#FF0000',
      },
      errorMessage: null,
      registerBtn: false,
    }
  },
  computed: {
    passwordLevelClass() {
      return levelClass[this.state.passwordLevel]
    },
    passwordLevelName() {
      return levelNames[this.state.passwordLevel]
    },
    passwordLevelColor() {
      return levelColor[this.state.passwordLevel]
    },
  },
  methods: {
    ...mapActions('user', ['Register']),
    handlePasswordLevel(rule, value, callback) {
      let level = 0

      if (!value) {
        return callback(new Error('Please enter password'))
      }
      if (!value || value.length < 6) {
        return callback(new Error('Password too short'))
      }

      if (/[0-9]/.test(value)) {
        level++
      }
      if (/[a-zA-Z]/.test(value)) {
        level++
      }
      if (/[^0-9a-zA-Z_]/.test(value)) {
        level++
      }
      this.state.passwordLevel = level
      this.state.percent = level * 30
      if (level >= 1) {
        if (level >= 3) {
          this.state.percent = 100
        }
        callback()
      } else {
        if (level === 0) {
          this.state.percent = 10
        }
        callback(new Error('Password strength is not enough'))
      }
    },

    handlePasswordCheck(rule, value, callback) {
      const password = this.form.getFieldValue('password')
      if (value === undefined) {
        callback(new Error('Please enter the password'))
      }
      if (value && password && value.trim() !== password.trim()) {
        callback(new Error('Two passwords are inconsistent'))
      }
      callback()
    },

    handlePasswordInputClick() {
      if (!this.isMobile()) {
        this.state.passwordLevelChecked = true
        return
      }
      this.state.passwordLevelChecked = false
    },

    handleSubmit() {
      const {
        form: { validateFields },
        state,
      } = this
      validateFields({ force: true }, (err, values) => {
        if (!err) {
          this.registerBtn = true
          state.passwordLevelChecked = false
          values.captchar = 'duthaho'
          this.Register(values)
            .then(this.requestSuccess)
            .catch(this.requestFailed)
            .finally(() => {
              this.registerBtn = false
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
<style lang="less">
.user-register {
  &.error {
    color: #ff0000;
  }

  &.warning {
    color: #ff7e05;
  }

  &.success {
    color: #52c41a;
  }
}

.user-layout-register {
  .ant-input-group-addon:first-child {
    background-color: #fff;
  }
}
</style>
<style lang="less" scoped>
.user-layout-register {
  & > h3 {
    font-size: 16px;
    margin-bottom: 20px;
  }

  .register-button {
    width: 50%;
  }

  .login {
    float: right;
    line-height: 40px;
  }
}
</style>
