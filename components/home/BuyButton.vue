<template>
  <button class="buy-button">
    <span class="buy-button__text">buy</span>
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
export default {}
</script>

<style lang="scss">
@import '~assets/styles/variables.scss';
.buy-button {
  width: 135px;
  height: 55px;
  border: none;
  background: $orange-color;
  box-shadow: 0 4px 0 rgba(0, 0, 0, 0.74);
  border-radius: 10px;
  transition: 0.5s ease box-shadow;
  cursor: pointer;
  position: relative;
  &:hover {
    box-shadow: none;
  }
  &__text {
    font-family: VampiroOne, Helvetica, sans-serif;
    position: absolute;
    left: 30px;
    top: 8px;
    font-size: 24px;
  }
  &__arrow {
    position: absolute;
    bottom: 1px;
    left: 24px;
  }
  &__cart {
    position: absolute;
    top: 0;
    right: 12px;
    width: 45px;
    height: 49px;
  }
}
</style>
