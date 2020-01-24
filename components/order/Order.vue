<template>
  <transition name="fade">
    <div v-if="isVisible" class="order right-block">
      <CloseRightBlockButton @clicked="closeRightSidebar" />

      <div class="right-block__title">
        Order information
      </div>

      <div
        class="order__content right-block__content right-block__content_with-padding"
      >
        <div class="row">
          <OrderInput
            v-model="name"
            class="col-lg-6 col-xs-12"
            label="Name"
            :errors="validationErrors['name']"
          />
        </div>

        <div class="row">
          <OrderInput
            v-model="phone"
            class="col-lg-6 col-xs-12"
            label="Phone(like +79112344565)"
            :errors="validationErrors['phone']"
          />
        </div>

        <div class="row">
          <OrderInput
            v-model="email"
            class="col-lg-6 col-xs-12"
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
            class="col-lg-6 col-xs-12"
            label="City"
            :errors="validationErrors['city']"
          />
        </div>

        <div class="row">
          <OrderInput
            v-model="address"
            class="col-lg-6 col-xs-12"
            label="Address"
            :errors="validationErrors['address']"
          />
        </div>
      </div>

      <div class="right-block__bottom">
        <div v-if="goodsSum" class="order-summary right-block__bottom-text">
          <div class="row">
            <span class="summary-block__text col-xs-6">
              goods
            </span>

            <span class="summary-block__value col-xs-6">
              {{ goodsSum }}<span>{{ currency }}</span>
            </span>
          </div>

          <div class="row">
            <span class="summary-block__text col-xs-6">
              delivery
            </span>

            <span class="summary-block__value col-xs-6">
              {{ deliveryPrice }}<span>{{ currency }}</span>
            </span>
          </div>

          <AmountBlock :sum="sum"></AmountBlock>
        </div>

        <OrderBottomButtons
          :status="status"
          @send-clicked="sendOrder"
          @to-orders-clicked="toOrderHandler"
          @to-cart-clicked="toCartHandler"
        />
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { mapPropsModels } from '@/helpers/mapPropsModelsHelper'
import { orderFormValidationRules } from '@/validator/rules/orderForm'
import { validator, hasValidationErrors } from '@/validator/validator'
import { currency } from '@/data/common'
import AmountBlock from '@/components/AmountBlock'
import CloseRightBlockButton from '@/components/CloseRightBlockButton'
import OrderBottomButtons from '@/components/order/OrderBottomButtons'
import OrderInput from '@/components/order/Input'

export default {
  name: 'Order',
  components: {
    AmountBlock,
    CloseRightBlockButton,
    OrderInput,
    OrderBottomButtons
  },
  data() {
    return {
      validationErrors: {},
      currency,
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
  beforeMount() {
    if (!this.$auth.loggedIn) return

    this.phone = this.$auth.user.phone
    this.email = this.$auth.user.email
    this.name = this.$auth.user.name
  },
  methods: {
    ...mapActions({
      updateOrderItem: 'orders/updateCurrentItem',
      toggleOrderVisibility: 'orders/toggleVisibility',
      toggleOrdersVisibility: 'orders/toggleOrdersVisibility',
      toggleCartVisibility: 'cart/toggleVisibility',
      sendToServer: 'orders/send',
      resetCart: 'cart/reset'
    }),

    toCartHandler() {
      this.toggleOrderVisibility()
      this.setStatus('preparing')
    },

    toOrderHandler() {
      this.toggleOrdersVisibility()
      this.setStatus('preparing')
    },

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
