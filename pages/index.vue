<template>
  <div class="home container-fluid">
    <Header />
    <Content />
  </div>
</template>

<script>
import Header from '@/components/header/Header'
import Content from '@/components/home/Content'

export default {
  components: {
    Header,
    Content
  }
}
</script>

<style lang="scss">
.home {
  padding: 0;
}
</style>
