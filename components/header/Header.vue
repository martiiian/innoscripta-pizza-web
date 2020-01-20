<template>
  <header class="header">
    <div class="header__wrapper container-fluid">
      <div class="header__content">
        <div class="header__logo">
          <img src="~/assets/images/pizza-logo.png" alt="" />
        </div>

        <div class="header__site-name">
          <h1 class="header__title">Crazy <span> &nbsp;&nbsp;Pizza!</span></h1>
        </div>
      </div>
    </div>
    <div class="header__icons">
      <button
        :class="{ 'header-icon_animated': cartIconAnimate }"
        class="header-icon header-icon_type_cart"
        @click="toggleCartVisibility"
      >
        <img
          v-show="!cartIsVisible"
          width="24"
          height="24"
          src="~assets/images/icons/cart.svg"
          alt="cart"
        />

        <img
          v-show="cartIsVisible"
          width="24"
          height="24"
          src="~assets/images/icons/close_white.svg"
          alt="cart"
        />

        <span
          v-show="countProductsInCart > 0 && !cartIsVisible"
          class="header-icon__cart-sum"
        >
          {{ countProductsInCart }}
        </span>
      </button>

      <button class="header-icon header-icon_type_login">
        <img src="~assets/images/icons/login.svg" alt="login" />
      </button>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      cartIconAnimate: false
    }
  },
  computed: {
    ...mapGetters({
      countProductsInCart: 'cart/count',
      cartIsVisible: 'cart/isVisible'
    })
  },
  watch: {
    countProductsInCart(val, oldVal) {
      if (val > oldVal) {
        this.cartIconAnimate = true
        setTimeout(() => (this.cartIconAnimate = false), 600)
      }
    }
  },
  methods: {
    ...mapActions({
      toggleCartVisibility: 'cart/toggleVisibility'
    })
  }
}
</script>

<style lang="scss">
@import '~assets/styles/variables.scss';

.header {
  background: url('~assets/images/background.jpg') center no-repeat;
  background-size: cover;
  height: 533px;
  &__site-name {
    user-select: none;
    margin-top: -77px;
    margin-left: 93px;
  }
  &__wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  &__content {
    padding-left: 7%;
    width: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  &__icons {
    z-index: 101;
    position: fixed;
    width: 50px;
    height: 200px;
    right: 20px;
    top: 20px;
  }
  &__title {
    font-family: 'VampiroOne', Helvetica, Arial, sans-serif;
    line-height: 92px;
    transform: rotate(-13.17deg);
    span {
      font-family: 'VampiroOne', Helvetica, Arial, sans-serif;
      display: block;
    }
    font-size: 96px;
    color: $white-color;
    text-shadow: 0 10px 0 $dark-color-2;
  }
}
.header-icon {
  width: 50px;
  height: 50px;
  background: none;
  border-radius: 16px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  &:hover {
    opacity: 0.8;
  }
  &_animated {
    img {
      animation: put-to-cart 0.3s ease infinite;
    }
  }
  &__cart-sum {
    position: absolute;
    bottom: -8px;
    padding: 2px 5px;
    background: $dark-color;
    border-radius: 5px;
    font-size: 0.8em;
    color: $white-color;
    font-weight: bold;
  }
  &_type {
    &_cart {
      background: $orange-color;
    }
    &_login {
      border: 1px solid $light-gray-color;
      background: $white-color;
      margin-top: 20px;
    }
  }
}
@keyframes put-to-cart {
  25% {
    transform: rotate(-10deg);
  }
  50% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(10deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
