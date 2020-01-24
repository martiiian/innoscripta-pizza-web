<template>
  <div class="sign-in right-block">
    <CloseRightBlockButton @clicked="$emit('close')" />

    <div class="right-block__title profile__title">
      Profile
      <a class="profile__orders-link" @click.prevent="toggleProfileContent">
        {{ showInfo ? 'orders' : 'user info' }}
      </a>
      <a class="profile__orders-link" @click.prevent="resetOrders">
        logout
      </a>
    </div>

    <ProfileInfo v-show="showInfo" />

    <ProfileOrders v-show="!showInfo" />

    <div class="right-block__bottom">
      <div class="right-block__bottom-buttons"></div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ProfileInfo from '@/components/user/ProfileInfo'
import ProfileOrders from '@/components/user/ProfileOrders'
import CloseRightBlockButton from '@/components/CloseRightBlockButton'

export default {
  name: 'Profile',
  components: {
    ProfileInfo,
    ProfileOrders,
    CloseRightBlockButton
  },
  data() {
    return {
      showInfo: true
    }
  },
  methods: {
    ...mapActions({
      resetOrders: 'orders/reset'
    }),
    toggleProfileContent() {
      this.showInfo = !this.showInfo
    },
    logout() {
      this.$auth.logout()
      this.resetOrders()
    }
  }
}
</script>
