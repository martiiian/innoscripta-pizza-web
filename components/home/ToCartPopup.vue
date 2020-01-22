<template>
  <div v-if="isOpen" class="good__add-to-cart-popup to-cart-popup">
    <SizeSelector
      :sizes="good.sizes"
      class="to-cart-popup__size-selector"
      @size-updated="updateSize"
    />

    <ProductCounter
      :product-count="productData.count"
      class="to-cart-popup__counter"
      @counter-updated="updateCount"
    />

    <button
      class="to-cart-popup__close-button"
      @click="$emit('popup-canceled')"
    >
      <img
        src="~/assets/images/icons/close.svg"
        width="16"
        height="16"
        alt="close"
      />
    </button>

    <div class="good__price to-cart-popup__price">
      {{ sum }}<span class="good__currency">{{ currency }}</span>
    </div>

    <button
      class="to-cart-popup__ok-button"
      @click="$emit('ok-clicked', productData)"
    >
      buy
    </button>
  </div>
</template>

<script>
import { currency } from '@/data/common'
import ProductCounter from '@/components/home/ProductCounter'
import SizeSelector from '@/components/home/SizeSelector'

export default {
  name: 'ToCartPopup',
  components: {
    ProductCounter,
    SizeSelector
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false
    },
    good: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      currency,
      productData: {
        count: 1,
        sizeId: null
      }
    }
  },
  computed: {
    price() {
      try {
        return this.good.sizes.find(
          (item) => item.id === this.productData.sizeId
        ).price
      } catch (e) {
        return 1
      }
    },
    sum() {
      return this.price * this.productData.count
    }
  },
  methods: {
    updateCount(count) {
      this.productData.count = count
    },
    updateSize(sizeId) {
      this.productData.sizeId = sizeId
    }
  }
}
</script>
