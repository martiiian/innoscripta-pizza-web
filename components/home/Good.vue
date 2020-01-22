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

<style lang="scss">
@import '~assets/styles/variables.scss';

.good {
  width: 33.3%;
  padding: 0 7% 100px 7%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  transition: 0.2s ease transform;
  &:hover {
    transform: translateY(-5px);
  }
  &__ingredients {
    padding-top: 15px;
  }
  &__name {
    line-height: 25px;
    padding-top: 18px;
    text-align: center;
    font-family: Unkempt, Helvetica, sans-serif;
    font-size: 36px;
  }
  &__description {
    padding-top: 15px;
    text-align: center;
  }
  &__price {
    color: $dark-color;
    font-family: WorkSansBold, Helvetica, sans-serif;
    font-style: normal;
    font-size: 36px;
    line-height: 21px;
    font-weight: bold;
  }
  &__from {
    font-family: WorkSansBold, Helvetica, sans-serif;
    font-size: 14px;
    font-weight: normal;
  }
  &__currency {
    font-family: WorkSansRegular, Helvetica, sans-serif;
    font-size: 14px;
    font-weight: normal;
  }
  &__image {
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.12);
    border-radius: 15px;
    overflow: hidden;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      border-radius: 15px;
      width: 100%;
      height: auto;
    }
  }
  &__bottom {
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
  }
}
.ingredients {
  color: $dark-color;
  padding: 10px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
