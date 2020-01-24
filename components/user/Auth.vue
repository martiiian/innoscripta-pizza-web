<template>
  <transition name="fade">
    <SignIn v-if="!$auth.loggedIn && isVisible" @close="toggleVisibility" />

    <Profile v-if="$auth.loggedIn && isVisible" @close="toggleVisibility" />
  </transition>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Profile from '@/components/user/Profile'
import SignIn from '@/components/user/SignIn'

export default {
  name: 'Auth',
  components: {
    Profile,
    SignIn
  },
  computed: {
    ...mapGetters({
      isVisible: 'users/isVisible'
    })
  },
  methods: {
    ...mapActions({
      toggleVisibility: 'users/toggleVisibility'
    })
  }
}
</script>
