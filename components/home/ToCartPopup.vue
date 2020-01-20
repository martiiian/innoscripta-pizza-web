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
      {{ sum }}<span class="good__currency">rub.</span>
    </div>

    <button
      class="to-cart-popup__ok-button"
      @click="$emit('ok-clicked', productData)"
    >
      ok
    </button>
  </div>
</template>

<script>
import ProductCounter from '@/components/home/ProductCounter'
import SizeSelector from '@/components/home/SizeSelector'

export default {
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

<style lang="scss">
@import '~assets/styles/variables.scss';

.to-cart-popup {
  width: 58%;
  height: 100px;
  background: $white-color;
  border-radius: 15px;
  position: absolute;
  bottom: 96px;
  border: 3px solid $orange-color;
  &__counter {
    right: 100px;
    top: 10px;
  }

  &__price {
    position: absolute;
    bottom: 5px;
    left: 10px;
  }

  &__close-button {
    position: absolute;
    border: none;
    background: none;
    width: 20px;
    height: 20px;
    right: 10px;
    top: 10px;
    cursor: pointer;
  }
  &__ok-button {
    position: absolute;
    right: 10px;
    bottom: 10px;
    background: $orange-color;
    border-radius: 5px;
    border: none;
    width: 41px;
    height: 28px;
    cursor: pointer;
    font-weight: bold;
    color: $white-color;
  }
}
</style>
