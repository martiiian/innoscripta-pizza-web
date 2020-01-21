<template>
  <div v-if="isVisible" class="order right-block">
    <CloseRightBlockButton @clicked="closeRightSidebar" />

    <div class="right-block__title">
      Order information
    </div>

    <div class="order__content right-block__content">
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

    <div class="right-block__bottom">
      <div v-if="goodsSum" class="order-summary right-block__bottom-text">
        <div class="row">
          <span class="summary-block__text col-md-6">
            goods
          </span>

          <span class="summary-block__value col-md-6">
            {{ goodsSum }}<span>rub</span>
          </span>
        </div>

        <div class="row">
          <span class="summary-block__text col-md-6">
            delivery
          </span>

          <span class="summary-block__value col-md-6">
            {{ deliveryPrice }}<span>rub</span>
          </span>
        </div>

        <AmountBlock :sum="sum"></AmountBlock>
      </div>

      <OrderBottomButtons :status="status" @send-clicked="sendOrder" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { mapPropsModels } from '@/helpers/mapPropsModelsHelper'
import { orderFormValidationRules } from '@/validator/rules/orderForm'
import { validator, hasValidationErrors } from '@/validator/validator'
import AmountBlock from '@/components/AmountBlock'
import OrderBottomButtons from '@/components/order/OrderBottomButtons'
import OrderInput from '@/components/order/Input'
import CloseRightBlockButton from '@/components/CloseRightBlockButton'

export default {
  components: {
    AmountBlock,
    OrderInput,
    OrderBottomButtons,
    CloseRightBlockButton
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
  background: $dark-color;
  z-index: 102;
  &__content {
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
    background: $green-color;
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
  color: $white-color;
}
</style>
