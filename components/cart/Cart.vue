<template>
  <div v-show="isVisible" class="cart right-block">
    <CloseRightBlockButton @clicked="closeRightSidebar" />

    <h2 class="right-block__title">
      Your cart
    </h2>

    <div class="cart__products right-block__content_white right-block__content">
      <Product
        v-for="(product, index) in products"
        :key="index"
        :product="product"
      />
    </div>

    <div class="right-block__bottom">
      <div class="cart-amount right-block__bottom-text">
        <AmountBlock :sum="sum"></AmountBlock>
      </div>

      <div class="right-block__buttom-buttons">
        <button
          :disabled="sum === 0"
          class="cart__order-button right-block__bottom-button"
          @click="showOrder"
        >
          Order
          <img
            src="~assets/images/icons/arrow.svg"
            class="right-block__bottom-button-arrow"
            alt="arrow"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import AmountBlock from '@/components/AmountBlock'
import CloseRightBlockButton from '@/components/CloseRightBlockButton'
import Product from '@/components/cart/Product'

export default {
  components: {
    AmountBlock,
    CloseRightBlockButton,
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
      showOrder: 'orders/toggleVisibility',
      toggleCartVisibility: 'cart/toggleVisibility'
    }),

    closeRightSidebar() {
      this.toggleCartVisibility()
    }
  }
}
</script>

<style lang="scss">
@import '~assets/styles/variables.scss';

.cart {
  background: $orange-color;
  &__order-button {
    width: 100%;
    background: $dark-color;
    color: $white-color;
    &:hover {
      .right-block__bottom-button-arrow {
        transform: rotate(90deg) translateY(-6px);
      }
    }
    &[disabled] {
      cursor: default;
      background: #9b9b9b;
      &:hover {
        .right-block__bottom-button-arrow {
          transform: translateX(0px) rotate(90deg);
        }
      }
    }
  }
}

.cart-amount {
  color: $dark-color;
}
</style>
