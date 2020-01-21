<template>
  <div v-show="isVisible" class="cart">
    <h2 class="cart__title">
      Your cart
    </h2>

    <div class="cart__products">
      <Product
        v-for="(product, index) in products"
        :key="index"
        :product="product"
      />
    </div>

    <div class="cart-amount">
      <div class="cart-amount__text">Amount:</div>
      <div class="cart-amount__sum">{{ sum }}<span>rub.</span></div>
    </div>

    <button
      :disabled="sum === 0"
      class="cart__order-button"
      @click="showOrders"
    >
      Order
      <img
        src="~assets/images/icons/arrow.svg"
        class="cart__order-arrow"
        alt="arrow"
      />
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Product from '@/components/cart/Product'

export default {
  components: {
    Product
  },
  computed: {
    ...mapGetters({
      products: 'cart/allWithData',
      isVisible: 'cart/isVisible',
      sum: 'cart/sum'
    })
  },
  methods: {
    ...mapActions({
      showOrders: 'orders/toggleVisibility'
    })
  }
}
</script>

<style lang="scss">
@import '~assets/styles/variables.scss';

.cart {
  padding: 20px;
  position: fixed;
  width: 35%;
  height: 100vh;
  background: $orange-color;
  right: 0;
  z-index: 100;
  top: 0;
  &__title {
    color: $white-color;
    font-family: WorkSansBold, Helvetica, sans-serif;
    font-weight: normal;
    font-size: 36px;
  }
  &__order-arrow {
    transform: rotate(90deg);
    transition: 0.4s ease transform;
    position: absolute;
    right: 40px;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  &__order-button {
    cursor: pointer;
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 57px;
    border: none;
    background: $dark-color;
    color: $white-color;
    font-family: WorkSansBold, Helvetica, sans-serif;
    font-size: 36px;
    text-align: left;
    padding-left: 20px;
    &:hover {
      .cart__order-arrow {
        transform: rotate(90deg) translateY(-20px);
      }
    }
    &[disabled] {
      cursor: default;
      background: #9b9b9b;
      &:hover {
        .cart__order-arrow {
          transform: translateX(0px) rotate(90deg);
        }
      }
    }
  }
  &__products {
    position: relative;
    margin-top: 27px;
    overflow-y: auto;
    padding-top: 10px;
    width: 90%;
    background: $white-color;
    border-radius: 20px;
    height: calc(100vh - 210px);
    padding-bottom: 40px;
  }
  &__amount {
  }
}
.cart-amount {
  position: absolute;
  bottom: 70px;
  font-size: 30px;
  display: flex;
  justify-content: space-between;
  width: 93%;
  left: 22px;
  color: $dark-color;
  &__text {
    font-family: WorkSansBold, Helvetica, sans-serif;
  }
  &__sum {
    font-family: WorkSansBold, Helvetica, sans-serif;
    span {
      font-family: WorkSansRegular, Helvetica, sans-serif;
      font-size: 0.7em;
    }
  }
}
</style>
