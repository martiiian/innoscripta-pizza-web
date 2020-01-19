<template>
  <div class="home container-fluid">
    <Header />
    <Content />
  </div>
</template>

<script>
import Header from '@/components/header/Header'
import Content from '@/components/home/Content'

export default {
  components: {
    Header,
    Content
  },
  async fetch({ store }) {
    await store.dispatch('goods/LOAD_GOODS')
  }
}
</script>

<style lang="scss">
.home {
  padding: 0;
}
</style>
