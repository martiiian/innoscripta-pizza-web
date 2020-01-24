<template>
  <div class="home container-fluid">
    <Header />
    <Content />
    <Cart />
    <Order />
    <Orders />
    <SignIn />
  </div>
</template>

<script>
import Cart from '@/components/cart/Cart'
import Content from '@/components/home/Content'
import Header from '@/components/header/Header'
import Order from '@/components/order/Order'
import Orders from '@/components/order/Orders'
import SignIn from '@/components/user/Auth'

export default {
  components: {
    Content,
    Cart,
    Header,
    Order,
    Orders,
    SignIn
  },
  async fetch({ store, $auth }) {
    await store.dispatch('goods/load')
    $auth.loggedIn && (await store.dispatch('orders/load'))
  }
}
</script>

<style lang="scss">
.home {
  padding: 0 !important;
}
</style>
