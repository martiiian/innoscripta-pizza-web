<template>
  <div class="sign-in right-block">
    <CloseRightBlockButton @clicked="$emit('close')" />

    <div class="right-block__title">
      {{ title }}
      <a class="profile__orders-link" @click.prevent="toggleSignInMode">
        {{ signInActive ? 'sign up' : 'sign in' }}
      </a>
    </div>

    <div class="right-block__content right-block__content_with-padding">
      <div v-if="!signInActive" class="row">
        <Input
          v-model="userData.name"
          class="col-md-6"
          label="Name"
          :errors="validationErrors.name"
        />
      </div>

      <div class="row">
        <Input
          v-model="userData.phone"
          class="col-md-6"
          label="Phone(like +79112344565)"
          :errors="validationErrors.phone"
        />
      </div>

      <div class="row">
        <Input
          v-model="userData.password"
          class="col-md-6"
          label="Password"
          type="password"
          :errors="validationErrors.password"
        />
      </div>
      <div v-if="validationErrors.wrong" class="row">
        <span class="input__error col-md-6">
          <span>
            {{ validationErrors.wrong }}
          </span>
        </span>
      </div>
    </div>

    <div class="right-block__bottom">
      <div class="right-block__bottom-buttons">
        <button
          class="right-block__bottom-button right-block__bottom-button_green right-block__bottom-button_wide"
          @click="sendHandler"
        >
          Send
          <img
            src="~assets/images/icons/arrow.svg"
            class="right-block__bottom-button-arrow"
            alt="arrow"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { signInFormValidationRules } from '@/validator/rules/signInForm'
import { validator, hasValidationErrors } from '@/validator/validator'
import Input from '@/components/order/Input'
import CloseRightBlockButton from '@/components/CloseRightBlockButton'

export default {
  name: 'Order',
  components: {
    Input,
    CloseRightBlockButton
  },
  data() {
    return {
      signInActive: true,
      validationErrors: {},
      userData: {
        name: '',
        phone: '',
        password: ''
      },
      status: 'preparing' // loading, fail, success
    }
  },
  computed: {
    title() {
      return this.signInActive ? 'Sign in' : 'Sign up'
    }
  },
  methods: {
    ...mapActions({
      signInRequest: 'users/signIn',
      signUpRequest: 'users/signUp',
      loadOrders: 'orders/load'
    }),

    /**
     * Close right sidebar
     */
    closeRightSidebar() {
      this.toggleCartVisibility()
    },

    toggleSignInMode() {
      this.signInActive = !this.signInActive
    },

    async sendHandler() {
      this.validationErrors = validator(
        signInFormValidationRules,
        this.userData
      )
      if (hasValidationErrors(this.validationErrors)) return

      if (this.signInActive) {
        this.validationErrors = await this.signInRequest(this.userData)
      } else {
        this.validationErrors = await this.signUpRequest(this.userData)
      }

      if (!Object.keys(this.validationErrors).length) {
        await this.loadOrders()
      }
    }
  }
}
</script>
