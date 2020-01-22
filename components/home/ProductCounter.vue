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
      @input="updateCounterValue($event.target.value)"
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

<style lang="scss">
@import '~assets/styles/variables.scss';

.product-counter {
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &__input {
    width: 40px;
    height: 33px;
    border: 1px solid $light-gray-color;
    border-radius: 5px;
    text-align: center;
    font-weight: bold;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    &[type='number'] {
      -moz-appearance: textfield;
    }
  }
  &__button {
    margin: 5px;
    width: 22px;
    height: 22px;
    background: $dark-color;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    color: $white-color;
    font-weight: bold;
    &_plus {
    }
    &_minus {
    }
  }
}
</style>
