<template>
  <div class="order-item row">
    <div class="order-item__date col-sm-4">
      {{ date }}
    </div>

    <div class="order-item__count-goods col-sm-4">
      {{ count }} <span>pizza</span>
    </div>

    <div class="order-item__amount col-sm-4">
      {{ sum }}<span>{{ currency }}</span>
    </div>
  </div>
</template>

<script>
import {
  getOrderCount,
  getOrderDate,
  getOrderSum
} from '@/helpers/store/orders'
import { currency } from '@/data/common'

export default {
  name: 'Orderitem',
  props: {
    order: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      currency
    }
  },
  computed: {
    sum() {
      return getOrderSum(this.order)
    },
    count() {
      return getOrderCount(this.order)
    },
    date() {
      return getOrderDate(this.order)
    }
  }
}
</script>
