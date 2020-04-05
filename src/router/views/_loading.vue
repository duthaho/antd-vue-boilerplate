<template>
  <Layout>
    <Transition appear>
      <div>Loading</div>
    </Transition>
  </Layout>
</template>

<script>
import Layout from '@layouts/main.vue'
export default {
  components: { Layout },
}
</script>
