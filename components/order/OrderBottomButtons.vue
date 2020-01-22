<template>
  <div class="right-block__bottom-buttons">
    <div
      v-if="status === 'success'"
      class="order__success-block right-block__bottom-button"
    >
      <span>Success!</span>
      <button @click="toggleOrdersVisibility">to orders</button>
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
      class="order__to-cart-button right-block__bottom-button"
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
      class="order__send-button right-block__bottom-button"
      :disabled="status === 'loading'"
      :class="{ 'order__send-button_sending': status === 'loading' }"
      @click="$emit('send-clicked')"
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
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'OrderBottomButtons',
  props: {
    status: {
      type: String,
      default: 'preparing'
    }
  },
  methods: {
    ...mapActions({
      toggleOrderVisibility: 'orders/toggleVisibility',
      toggleOrdersVisibility: 'orders/toggleOrdersVisibility'
    })
  }
}
</script>
