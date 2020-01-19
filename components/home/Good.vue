<template>
  <div class="good">
    <div class="good__image">
      <img src="/alfredo.jpg" alt="alfredo" />
    </div>

    <div class="good__name">
      {{ good.name }}
    </div>

    <div class="good__ingredients">
      {{ good.description }}
    </div>

    <div class="good__bottom">
      <div class="good__price">
        <div class="good__from">from</div>

        {{ good.price || 100 }}<span class="good__currency">rub.</span>
      </div>

      <BuyButton />
    </div>
  </div>
</template>

<script>
import BuyButton from '@/components/home/BuyButton'

export default {
  components: {
    BuyButton
  },
  props: {
    good: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss">
@import '~assets/styles/variables.scss';

.good {
  width: 33.3%;
  padding: 0 7% 6% 7%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: 0.4s ease transform;
  &:hover {
    transform: translateY(-20px);
  }
  &__ingredients {
    min-height: 130px;
    padding-top: 15px;
  }
  &__name {
    line-height: 25px;
    padding-top: 18px;
    text-align: center;
    font-family: Unkempt, Helvetica, sans-serif;
    font-size: 36px;
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
</style>
