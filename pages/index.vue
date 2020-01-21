<template>
  <div class="home container-fluid">
    <Header />
    <Content />
    <Cart />
    <Order />
  </div>
</template>

<script>
import Cart from '@/components/cart/Cart'
import Content from '@/components/home/Content'
import Header from '@/components/header/Header'
import Order from '@/components/order/Order'

export default {
  components: {
    Content,
    Cart,
    Header,
    Order
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
