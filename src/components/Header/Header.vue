<template>
  <transition name="showHeader">
    <div class="header-animat">
      <a-layout-header class="ant-header-fixedHeader" :style="{ padding: '0' }">
        <div :class="['top-nav-header-index', theme]">
          <div class="header-index-wide">
            <div class="header-index-left">
              <logo class="top-nav-header" :show-title="device !== 'mobile'" />
              <Menu
                v-if="device !== 'mobile'"
                mode="horizontal"
                :menu="menus"
                :theme="theme"
              />
            </div>
            <user-menu class="header-index-right"></user-menu>
          </div>
        </div>
      </a-layout-header>
    </div>
  </transition>
</template>

<script>
import { Menu, UserMenu } from '@components/Menu'
import Logo from '@components/Logo'
export default {
  name: 'Header',
  props: {
    mode: {
      type: String,
      default: 'topmenu',
    },
    menus: {
      type: Array,
      required: true,
    },
    theme: {
      type: String,
      required: false,
      default: 'light',
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false,
    },
    device: {
      type: String,
      required: false,
      default: 'desktop',
    },
  },
  components: { Menu, UserMenu, Logo },
}
</script>

<style lang="less">
@import '../index.less';

.header-animat {
  position: relative;
  z-index: @ant-global-header-zindex;
}
.showHeader-enter-active {
  transition: all 0.25s ease;
}
.showHeader-leave-active {
  transition: all 0.5s ease;
}
.showHeader-enter,
.showHeader-leave-to {
  opacity: 0;
}
</style>
