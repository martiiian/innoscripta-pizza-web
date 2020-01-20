<template>
  <div class="cart-product">
    <div class="cart-product__image">
      <img src="/alfredo.jpg" alt="alfredo" />

      <div class="cart-product__size">
        {{ product.sizeData.name }} <span>cm</span>
      </div>
    </div>

    <div class="cart-product__description">
      <div class="cart-product__name">
        {{ product.payload.name }}
      </div>

      <ProductCounter
        :product-count="product.count"
        class="cart-product__counter"
        @counter-updated="updateCount"
      />
    </div>

    <div class="cart-product__total">
      <button class="cart-product__delete" @click="deleteProduct">
        <img
          src="~assets/images/icons/cart_delete.svg"
          alt="del"
          width="24"
          height="24"
        />
      </button>
    </div>

    <div class="cart-product__sum">{{ product.sum }}<span>rub.</span></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ProductCounter from '@/components/home/ProductCounter'

export default {
  components: {
    ProductCounter
  },
  props: {
    product: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    ...mapActions({
      UPDATE_PRODUCT: 'cart/update',
      DELETE_PRODUCT: 'cart/delete'
    }),

    deleteProduct() {
      this.DELETE_PRODUCT(this.product.id)
    },

    updateCount(count) {
      this.updateProduct({
        count,
        id: this.product.id,
        productId: this.product.payload.id,
        sizeId: this.product.sizeData.id
      })
    },

    updateProduct(data) {
      this.UPDATE_PRODUCT({
        id: this.product.id,
        data
      })
    }
  }
}
</script>

<style lang="scss">
@import '~assets/styles/variables.scss';

.cart-product {
  display: flex;
  padding: 15px;
  position: relative;
  &__name {
    font-family: Unkempt, Helvetica, sans-serif;
    font-size: 25px;
  }
  &__image {
    width: 140px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    img {
      border-radius: 15px;
      width: auto;
      height: 100%;
    }
  }
  &__description {
    padding-left: 15px;
    position: relative;
    width: 70%;
  }
  &__counter {
    bottom: -1px;
    left: 13px;
  }
  &__size {
    width: 30px;
    height: 30px;
    background: $dark-color;
    border-radius: 50%;
    position: absolute;
    right: -10px;
    top: 0;
    bottom: 0;
    margin: auto;
    color: $white-color;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    line-height: 10px;
    span {
      display: block;
      font-size: 0.8em;
    }
  }
  &__total {
    width: 85px;
    position: relative;
  }
  &__delete {
    cursor: pointer;
    background: none;
    border: none;
    position: absolute;
    right: 20px;
    top: 28px;
  }
  &__sum {
    color: $dark-color;
    position: absolute;
    bottom: 10px;
    right: 25px;
    font-family: WorkSansBold, Helvetica, sans-serif;
    font-size: 24px;
    span {
      font-family: WorkSansRegular, Helvetica, sans-serif;
      font-size: 0.7em;
    }
  }
}
</style>
