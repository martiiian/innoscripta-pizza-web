<template>
  <div class="home container-fluid">
    <Header />
    <Content />
    <Cart />
  </div>
</template>

<script>
import Header from '@/components/header/Header'
import Cart from '@/components/cart/Cart'
import Content from '@/components/home/Content'

export default {
  components: {
    Header,
    Content,
    Cart
  },
  async fetch({ store }) {
    await store.dispatch('goods/load')
  }
}
</script>

<style lang="scss">
.home {
  padding: 0;
}
</style>
