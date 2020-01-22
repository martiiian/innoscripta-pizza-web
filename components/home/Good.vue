<template>
  <div class="good">
    <div class="good__image">
      <ProductImage :product="good" />
    </div>

    <div class="good__name">
      {{ good.name }}
    </div>

    <div class="good__description">
      {{ good.description }}
    </div>

    <div class="good__ingredients">
      <ul class="ingredients">
        <Ingredient
          v-for="ingredient in good.ingredients"
          :key="ingredient.id"
          :ingredient="ingredient"
        />
      </ul>
    </div>

    <div class="good__bottom">
      <div class="good__price">
        <div class="good__from">from</div>

        {{ defaultPrice }}<span class="good__currency">{{ currency }}</span>
      </div>

      <BuyButton :is-added-to-cart="good.isAddedToCart" @clicked="openPopup" />
    </div>

    <ToCartPopup
      :is-open="popupIsOpen"
      :good="good"
      @popup-canceled="closePopup"
      @ok-clicked="addToCart"
    />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { currency } from '@/data/common'
import BuyButton from '@/components/home/BuyButton'
import Ingredient from '@/components/home/Ingredient'
import ProductImage from '@/components/ProductImage'
import ToCartPopup from '@/components/home/ToCartPopup'

export default {
  name: 'Good',
  components: {
    BuyButton,
    Ingredient,
    ProductImage,
    ToCartPopup
  },
  props: {
    good: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      popupIsOpen: false,
      currency
    }
  },
  computed: {
    defaultPrice() {
      try {
        return this.good.sizes[0].price
      } catch (e) {
        return 0
      }
    }
  },
  methods: {
    ...mapActions({
      ADD_TO_CART: 'cart/add'
    }),
    openPopup() {
      this.popupIsOpen = true
    },
    closePopup() {
      this.popupIsOpen = false
    },
    addToCart(productData) {
      this.ADD_TO_CART({
        ...productData,
        productId: this.good.id
      })
      this.popupIsOpen = false
    }
  }
}
</script>
