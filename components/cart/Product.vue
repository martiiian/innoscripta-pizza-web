<template>
  <div class="cart-product">
    <div class="cart-product__image">
      <ProductImage :product="product.payload" />

      <div class="cart-product__size">
        {{ product.sizeData.name }} <span>cm</span>
      </div>
    </div>

    <div class="row cart-product__content">
      <div class="cart-product__description col-xs-12">
        <div class="cart-product__name">
          {{ product.payload.name }}
        </div>

        <button class="cart-product__delete" @click="deleteProduct">
          <img
            src="~assets/images/icons/cart_delete.svg"
            alt="del"
            width="24"
            height="24"
          />
        </button>
      </div>

      <div class="cart-product__total col-xs-12">
        <div v-if="product.count > 1" class="cart-product__price">
          {{ product.sizeData.price }}<span>{{ currency }} x </span>
        </div>

        <ProductCounter
          :product-count="product.count"
          class="cart-product__counter"
          @counter-updated="updateCount"
        />

        <div class="cart-product__sum">
          {{ product.sum }}<span>{{ currency }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { currency } from '@/data/common'
import ProductCounter from '@/components/home/ProductCounter'
import ProductImage from '@/components/ProductImage'

export default {
  name: 'Product',
  components: {
    ProductCounter,
    ProductImage
  },
  props: {
    product: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      currency
    }
  },
  methods: {
    ...mapActions({
      updateProduct: 'cart/update',
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
    }
  }
}
</script>
