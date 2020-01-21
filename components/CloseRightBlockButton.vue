<template>
  <button class="close-right-block-button" @click="$emit('clicked')">
    <img
      src="~assets/images/icons/close_white.svg"
      width="24"
      height="24"
      alt="close"
    />
  </button>
</template>

<script>
export default {
  name: 'CloseRightBlockButton'
}
</script>

<style lang="scss">
.close-right-block-button {
  background: none;
  border: none;
  cursor: pointer;
  position: fixed;
  right: 23px;
  top: 23px;
  padding: 10px;
}
</style>
