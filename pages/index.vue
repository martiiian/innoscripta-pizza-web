<template>
  <div class="hello">
    {{ result }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      result: ''
    }
  },
  async mounted() {
    const { data: result } = await this.$axios.get('/test')
    this.result = result
  }
}
</script>
