<template>
  <div v-if="isVisible" class="sign-in right-block">
    <CloseRightBlockButton @clicked="closeRightSidebar" />

    <div class="right-block__title">
      Sign in
    </div>

    <div class="right-block__content">
      <div class="row">
        <OrderInput
          v-model="userData.phone"
          class="col-md-6"
          label="Phone(like +79112344565)"
          :errors="validationErrors['phone']"
        />
      </div>

      <div class="row">
        <OrderInput
          v-model="userData.password"
          class="col-md-6"
          label="Password"
          :errors="validationErrors['password']"
        />
      </div>
    </div>

    <div class="right-block__bottom">
      <div class="right-block__bottom-buttons">
        <button
          class="order__send-button right-block__bottom-button"
          @click="signIn"
        >
          Login
          <img
            src="~assets/images/icons/arrow.svg"
            class="order__send-button-icon order__button-icon"
            alt="arrow"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { signInFormValidationRules } from '@/validator/rules/signInForm'
import { validator, hasValidationErrors } from '@/validator/validator'
import OrderInput from '@/components/order/Input'
import CloseRightBlockButton from '@/components/CloseRightBlockButton'

export default {
  name: 'Order',
  components: {
    OrderInput,
    CloseRightBlockButton
  },
  data() {
    return {
      validationErrors: {},
      userData: {
        phone: '',
        password: ''
      },
      status: 'preparing' // loading, fail, success
    }
  },
  computed: {
    ...mapGetters({
      isVisible: 'users/isVisible'
    })
  },
  methods: {
    ...mapActions({
      toggleVisibility: 'users/toggleVisibility',
      signInRequest: 'users/signIn'
    }),

    /**
     * Close right sidebar
     */
    closeRightSidebar() {
      this.toggleCartVisibility()
    },

    /**
     * Validate and signIn
     */
    signIn() {
      this.validationErrors = validator(
        signInFormValidationRules,
        this.userData
      )
      if (hasValidationErrors(this.validationErrors)) return

      this.signInRequest(this.userData)
    }
  }
}
</script>

<style lang="scss">
.sign-in {
  z-index: 9999;
  background: black;
}
</style>
