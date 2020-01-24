<template>
  <div class="cart__products right-block__content_white right-block__content">
    <OrderItem v-for="order in orders" :key="order.id" :order="order" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import OrderItem from '@/components/order/OrderItem'

export default {
  name: 'ProfileOrders',
  components: { OrderItem },
  computed: {
    ...mapGetters({
      orders: 'orders/all',
      sum: 'orders/sum'
    })
  }
}
</script>
