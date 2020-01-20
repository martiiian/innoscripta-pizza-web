<template>
  <div class="home__content good-list">
    <Good v-for="good in goods" :key="good.id" :good="good" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Good from '@/components/home/Good'

export default {
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

<style lang="scss">
.good-list {
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: -60px;
  display: flex;
  flex-wrap: wrap;
}
</style>
