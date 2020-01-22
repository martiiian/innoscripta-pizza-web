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
        :class="{ 'header-icon_animated': cartIconAnimate && !cartIsVisible }"
        class="header-icon header-icon_type_cart"
        @click="toggleCartVisibility"
      >
        <img
          width="24"
          height="24"
          src="~assets/images/icons/cart.svg"
          alt="cart"
        />

        <span
          v-show="countProductsInCart > 0 && !cartIsVisible"
          class="header-icon__cart-sum"
        >
          {{ countProductsInCart }}
        </span>
      </button>
    </div>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Header',
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
