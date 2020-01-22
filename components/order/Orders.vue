<template>
  <div v-if="isVisible" class="orders right-block">
    <CloseRightBlockButton @clicked="closeRightSidebar" />

    <div class="right-block__title">
      Orders
    </div>

    <div class="cart__products right-block__content_white right-block__content">
      <OrderItem v-for="order in orders" :key="order.id" :order="order" />
    </div>

    <div class="right-block__bottom">
      <div class="orders__summary right-block__bottom-text">
        <AmountBlock :sum="sum"></AmountBlock>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AmountBlock from '@/components/AmountBlock'
import CloseRightBlockButton from '@/components/CloseRightBlockButton'
import OrderItem from '@/components/order/OrderItem'

export default {
  name: 'Orders',
  components: {
    AmountBlock,
    CloseRightBlockButton,
    OrderItem
  },
  computed: {
    ...mapGetters({
      isVisible: 'orders/ordersIsVisible',
      orders: 'orders/all',
      sum: 'orders/sum'
    })
  },
  methods: {
    ...mapActions({
      toggleOrdersVisibility: 'orders/toggleOrdersVisibility',
      toggleOrderVisibility: 'orders/toggleVisibility',
      toggleCartVisibility: 'cart/toggleVisibility'
    }),
    closeRightSidebar() {
      this.toggleCartVisibility()
      this.toggleOrderVisibility()
      this.toggleOrdersVisibility()
    }
  }
}
</script>
