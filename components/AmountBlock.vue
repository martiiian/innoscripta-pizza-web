<template>
  <div class="row">
    <div class="summary-block__text summary-block__text_big col-xs-6">
      Amount
    </div>

    <div class="summary-block__value summary-block__value_big col-xs-6">
      {{ sum }}<span>{{ currency }}</span>
    </div>
  </div>
</template>

<script>
import { currency } from '@/data/common'

export default {
  name: 'AmountBlock',
  props: {
    sum: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      currency
    }
  }
}
</script>
