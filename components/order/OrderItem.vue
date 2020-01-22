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

<style lang="scss">
@import '~assets/styles/_core.scss';

.order-item {
  position: relative;
  padding: 15px;
  align-items: center;
  &:last-child {
    &::after {
      display: none;
    }
  }
  @include media-breakpoint-down('xs') {
    text-align: center;
  }
  span {
    font-family: WorkSansRegular, Helvetica, sans-serif;
    font-size: 0.6em;
  }
  &::after {
    right: 0;
    left: 0;
    bottom: 0;
    position: absolute;
    margin: auto;
    height: 1px;
    background: $light-gray-color;
    content: '';
    width: 50%;
  }
  &__date {
    font-family: Unkempt, Helvetica, sans-serif;
    font-size: 25px;
  }
  &__count-goods,
  &__amount {
    font-size: 24px;
    text-align: center;
  }
  &__amount {
    text-align: right;
    @include media-breakpoint-down('xs') {
      text-align: center;
    }
  }
}
</style>
