<template>
  <button
    :class="{ 'buy-button_in-cart': isAddedToCart }"
    class="buy-button"
    @click="$emit('clicked')"
  >
    <span v-show="isAddedToCart" class="buy-button__in-cart-text">
      already in cart
    </span>

    <span class="buy-button__text">
      {{ isAddedToCart ? 'add' : 'select' }}
    </span>

    <img
      src="~/assets/images/icons/buy_arrow.svg"
      alt=""
      class="buy-button__arrow"
    />

    <img
      src="~/assets/images/icons/buy_cart.svg"
      alt=""
      class="buy-button__cart"
    />
  </button>
</template>

<script>
export default {
  name: 'BuyButton',
  props: {
    isAddedToCart: {
      type: Boolean,
      default: false
    }
  }
}
</script>
