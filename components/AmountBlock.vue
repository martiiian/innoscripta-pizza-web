<template>
  <div class="row">
    <div class="summary-block__text summary-block__text_big col-md-6">
      Amount
    </div>

    <div class="summary-block__value summary-block__value_big col-md-6">
      {{ sum }}<span>rub.</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AmountBlock',
  props: {
    sum: {
      type: Number,
      default: 0
    }
  }
}
</script>
