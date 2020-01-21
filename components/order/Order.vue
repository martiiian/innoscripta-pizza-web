<template>
  <div v-if="isVisible" class="order">
    <div class="order__close" @click="closeRightSidebar">
      <img
        src="~assets/images/icons/close_white.svg"
        width="24"
        height="24"
        alt="close"
      />
    </div>

    <div class="order__title">
      Order information
    </div>

    <div class="order__content">
      <div class="row">
        <OrderInput
          v-model="name"
          class="col-md-6"
          label="Name"
          :errors="validationErrors['name']"
        />
      </div>

      <div class="row">
        <OrderInput
          v-model="phone"
          class="col-md-6"
          label="Phone(like +79112344565)"
          :errors="validationErrors['phone']"
        />
      </div>

      <div class="row">
        <OrderInput
          v-model="email"
          class="col-md-6"
          label="Email"
          :errors="validationErrors['email']"
        />
      </div>

      <div class="order__delivery-delimeter col-md-12">
        <hr />
        <span>delivery info</span>
        <hr />
      </div>

      <div class="row">
        <OrderInput
          v-model="city"
          class="col-md-6"
          label="City"
          :errors="validationErrors['city']"
        />
      </div>

      <div class="row">
        <OrderInput
          v-model="address"
          class="col-md-6"
          label="Address"
          :errors="validationErrors['address']"
        />
      </div>
    </div>

    <div v-if="goodsSum" class="order-summary">
      <div class="row">
        <span class="order-summary__text col-md-6">
          goods
        </span>

        <span class="order-summary__value col-md-6">
          {{ goodsSum }}<span>rub</span>
        </span>
      </div>

      <div class="row">
        <span class="order-summary__text col-md-6">
          delivery
        </span>

        <span class="order-summary__value col-md-6">
          {{ deliveryPrice }}<span>rub</span>
        </span>
      </div>

      <div class="row">
        <span class="order-summary__text order-summary__text_big col-md-6">
          Amount
        </span>

        <span class="order-summary__value order-summary__value_big col-md-6">
          {{ sum }}<span>rub</span>
        </span>
      </div>
    </div>

    <div class="order__buttons">
      <div
        v-if="status === 'success'"
        class="order__success-block order__button"
      >
        <span>Success!</span>
        <button>to orders</button>
        <img
          src="~assets/images/icons/success.svg"
          class="order__button-icon"
          alt="success icon"
          width="24"
          height="24"
        />
      </div>

      <button
        v-if="status !== 'success'"
        class="order__to-cart-button order__button"
        @click="toggleOrderVisibility"
      >
        Cart
        <img
          src="~assets/images/icons/arrow.svg"
          class="order__to-cart-button-icon order__button-icon"
          alt="arrow"
        />
      </button>

      <button
        v-if="status !== 'success'"
        class="order__send-button order__button"
        :disabled="status === 'loading'"
        :class="{ 'order__send-button_sending': status === 'loading' }"
        @click="sendOrder"
      >
        {{ status === 'loading' ? 'Sending...' : 'Send' }}
        <img
          v-show="status === 'preparing' || status === 'fail'"
          src="~assets/images/icons/arrow.svg"
          class="order__send-button-icon order__button-icon"
          alt="arrow"
        />
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { mapPropsModels } from '@/helpers/mapPropsModelsHelper'
import { orderFormValidationRules } from '@/validator/rules/orderForm'
import { validator, hasValidationErrors } from '@/validator/validator'
import OrderInput from '@/components/order/Input'

export default {
  components: {
    OrderInput
  },
  data() {
    return {
      validationErrors: {},
      status: 'preparing' // loading, fail, success
    }
  },
  computed: {
    ...mapGetters({
      isVisible: 'orders/isVisible',
      currentOrder: 'orders/current',
      deliveryPrice: 'orders/deliveryPrice',
      goods: 'cart/all',
      goodsSum: 'cart/sum'
    }),

    ...mapPropsModels(['phone', 'name', 'email', 'city', 'address']),

    sum() {
      return this.deliveryPrice + this.goodsSum
    },

    userData() {
      return {
        phone: this.phone,
        name: this.name,
        email: this.email,
        city: this.city,
        address: this.address
      }
    }
  },
  methods: {
    ...mapActions({
      updateOrderItem: 'orders/updateCurrentItem',
      toggleOrderVisibility: 'orders/toggleVisibility',
      toggleCartVisibility: 'cart/toggleVisibility',
      sendToServer: 'orders/send',
      resetCart: 'cart/reset'
    }),

    closeRightSidebar() {
      this.toggleCartVisibility()
      this.toggleOrderVisibility()
      this.setStatus('preparing')
    },

    /**
     *
     */
    setStatus(status) {
      this.status = status
    },

    /**
     * Validate and send order to server
     */
    async sendOrder() {
      this.validationErrors = validator(orderFormValidationRules, this.userData)
      if (hasValidationErrors(this.validationErrors)) return

      this.setStatus('loading')
      const { status, result } = await this.sendToServer({
        ...this.userData,
        goods: this.goods
      })

      if (!status) {
        this.validationErrors = result
        // todo make state for fail
        this.setStatus('fail')
      } else {
        this.setStatus('success')
        this.resetCart()
      }
    }
  }
}
</script>

<style lang="scss">
@import '~assets/styles/variables.scss';

.order {
  // todo copypaste
  padding: 0;
  position: fixed;
  width: 35%;
  height: 100vh;
  background: $dark-color;
  right: 0;
  z-index: 102;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &__close {
    cursor: pointer;
    position: fixed;
    right: 23px;
    top: 23px;
    padding: 10px;
  }
  &__content {
    flex-grow: 10;
    overflow-y: auto;
    overflow-x: hidden;
    padding-left: 20px;
  }
  &__delivery-delimeter {
    display: flex;
    justify-content: space-around;
    padding: 18px 18px 10px 18px;
    align-items: center;
    span {
      color: $white-color;
      font-size: 13px;
      padding: 0 30px;
      width: 30%;
      text-align: center;
    }
    hr {
      width: 30%;
      border: 0;
      height: 1px;
      background: white;
    }
  }
  &__title {
    padding-top: 20px;
    padding-left: 15px;
    margin-bottom: 18px;
    color: $white-color;
    font-family: WorkSansBold, Helvetica, sans-serif;
    font-weight: normal;
    font-size: 36px;
  }
  &__buttons {
    z-index: 120;
    width: 100%;
    bottom: 0;
    right: 0;
    height: 57px;
    display: flex;
  }
  &__button {
    color: $white-color;
    font-family: WorkSansBold, Helvetica, sans-serif;
    font-size: 36px;
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    align-items: center;
  }
  &__to-cart-button {
    width: 30%;
    min-width: 60px;
    background: $orange-color;
    border: none;
    position: relative;
    cursor: pointer;
    flex-direction: row-reverse;
    &:hover {
      .order__to-cart-button-icon {
        transform: rotate(-90deg) translateY(-6px);
      }
    }
  }
  &__to-cart-button-icon {
    transform: rotate(-90deg);
  }
  &__button-icon {
    transition: 0.3s ease transform;
  }
  &__success-block {
    width: 100%;
    height: 57px;
    background: $green-color;
    span {
      flex-grow: 10;
      font-family: WorkSansBold, Helvetica, sans-serif;
    }
    button {
      cursor: pointer;
      padding: 0 10px;
      color: $white-color;
      border: none;
      text-decoration: underline;
      background: none;
    }
  }
  &__send-button {
    width: 70%;
    height: 57px;
    cursor: pointer;
    border: none;
    background: $green-color;
    text-align: left;
    &:hover {
      .order__send-button-icon {
        transform: rotate(90deg) translateY(-6px);
      }
    }
    &_sending {
      cursor: default;
      animation: sending 1s ease-in-out infinite;
      .order__send-button-icon {
        display: none;
      }
      @keyframes sending {
        50% {
          background: green;
        }
        100% {
          background: $green-color;
        }
      }
    }
    &[disabled] {
      cursor: default;
      background: #9b9b9b;
    }
  }
  &__send-button-icon {
    transform: rotate(90deg);
  }
}

.order-summary {
  flex-grow: 1;
  margin-top: 20px;
  color: $white-color;
  width: calc(100% - 32px);
  padding-bottom: 9px;
  padding-left: 15px;
  .row {
    justify-content: space-between;
  }
  &__text,
  &__value {
    font-size: 24px;
    &_big {
      font-family: WorkSansBold, Helvetica, sans-serif;
      font-size: 30px;
    }
  }
  &__value {
    text-align: right;
    font-family: WorkSansBold, Helvetica, sans-serif;
    span {
      font-family: WorkSansRegular, Helvetica, sans-serif;
      font-size: 0.6em;
    }
  }
}
</style>
