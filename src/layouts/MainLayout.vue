<template>
  <a-layout :class="['layout', device]">
    <a-layout
      :class="[layoutMode, `content-width-${contentWidth}`]"
      :style="{ minHeight: '100vh' }"
    >
      <Header
        :mode="layoutMode"
        :menus="menus"
        :theme="navTheme"
        :collapsed="collapsed"
        :device="device"
      />
      <a-layout-content
        :style="{
          height: '100%',
          margin: '24px 24px 0',
          paddingTop: '64px',
        }"
      >
        <transition name="page-transition">
          <router-view />
        </transition>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import { mixin, mixinDevice } from '@utils/mixin'
import Header from '@components/Header'
export default {
  mixins: [mixin, mixinDevice],
  components: {
    Header,
  },
  data() {
    return {
      collapsed: false,
      menus: [],
    }
  },
}
</script>
