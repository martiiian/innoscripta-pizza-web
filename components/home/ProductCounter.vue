<template>
  <div class="product-counter">
    <button
      class="product-counter__button product-counter__button_plus"
      @click="updateCounterValue(productCount - 1)"
    >
      -
    </button>

    <input
      :value="productCount"
      type="number"
      class="product-counter__input"
      @input="updateCounterValue(+$event.target.value)"
    />

    <button
      class="product-counter__button product-counter__button_minus"
      @click="updateCounterValue(productCount + 1)"
    >
      +
    </button>
  </div>
</template>

<script>
export default {
  name: 'ProductCounter',
  props: {
    productCount: {
      type: Number,
      default: 1
    }
  },
  methods: {
    updateCounterValue(value) {
      if (value <= 0) return

      this.$emit('counter-updated', value)
    }
  }
}
</script>
