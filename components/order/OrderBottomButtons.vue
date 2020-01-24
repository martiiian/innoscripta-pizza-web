<template>
  <div class="right-block__bottom-buttons">
    <button
      class="order__to-cart-button right-block__bottom-button"
      @click="$emit('to-cart-clicked')"
    >
      Cart
      <img
        src="~assets/images/icons/arrow.svg"
        class="order__to-cart-button-icon order__button-icon"
        alt="arrow"
      />
    </button>

    <button
      class="order__send-button right-block__bottom-button"
      :disabled="status === 'loading'"
      :class="{
        'order__send-button_sending': status === 'loading',
        'order__send-button_success': status === 'success'
      }"
      @click="sendButtonHandler"
    >
      <span>{{ buttonText }}</span>

      <img
        v-show="status === 'preparing' || status === 'fail'"
        src="~assets/images/icons/arrow.svg"
        class="order__send-button-icon order__button-icon"
        alt="arrow"
      />

      <a
        v-show="status === 'success'"
        @click.prevent="$emit('to-orders-clicked')"
      >
        to orders
      </a>

      <img
        v-show="status === 'success'"
        src="~assets/images/icons/success.svg"
        class="order__button-icon"
        alt="success icon"
        width="24"
        height="24"
      />
    </button>
  </div>
</template>

<script>
export default {
  name: 'OrderBottomButtons',
  props: {
    status: {
      type: String,
      default: 'preparing'
    }
  },
  computed: {
    buttonText() {
      return this.status === 'loading'
        ? 'Sending...'
        : this.status === 'success'
        ? 'Success'
        : 'Send'
    }
  },
  methods: {
    sendButtonHandler() {
      if (this.status === 'success') return

      this.$emit('send-clicked')
    }
  }
}
</script>
