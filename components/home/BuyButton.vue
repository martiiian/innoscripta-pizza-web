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
  props: {
    isAddedToCart: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss">
@import '~assets/styles/variables.scss';
.buy-button {
  width: 135px;
  height: 55px;
  border: none;
  background: $orange-color;
  box-shadow: 0 4px 0 rgba(189, 16, 16, 0.74);
  border-radius: 10px;
  transition: 0.5s ease box-shadow;
  cursor: pointer;
  position: relative;
  &_in-cart {
    color: white;
    background: #4ebf4e;
    box-shadow: 0 4px 0 green;
    .buy-button__text {
      left: 42px;
    }
  }
  &:hover {
    box-shadow: none;
  }
  &__in-cart-text {
    color: $dark-color;
    position: absolute;
    top: -13px;
    width: 100%;
    left: 0;
    font-size: 0.7em;
  }
  &__text {
    font-family: VampiroOne, Helvetica, sans-serif;
    position: absolute;
    left: 25px;
    top: 11px;
    font-size: 19px;
    color: $white-color;
  }
  &__arrow {
    position: absolute;
    bottom: 1px;
    left: 24px;
  }
  &__cart {
    transform: rotate(-40deg);
    position: absolute;
    top: 3px;
    right: 6px;
    width: 45px;
    height: 49px;
  }
}
</style>
