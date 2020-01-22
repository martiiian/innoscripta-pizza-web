<template>
  <div class="home__content good-list">
    <Good v-for="good in goods" :key="good.id" :good="good" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Good from '@/components/home/Good'

export default {
  name: 'Content',
  components: {
    Good
  },

  computed: {
    ...mapGetters({
      goods: 'goods/allWithData'
    })
  }
}
</script>
