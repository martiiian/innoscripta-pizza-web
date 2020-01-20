<template>
  <div class="size-selector">
    <button
      v-for="sizeItem in sizes"
      :key="sizeItem.id"
      :class="{ 'size-selector__item_active': activeId === sizeItem.id }"
      class="size-selector__item"
      @click="setSizeActive(sizeItem.id)"
    >
      {{ sizeItem.name }} <span>cm.</span>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    sizes: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      activeId: null
    }
  },
  computed: {
    defaultSizeId() {
      return this.sizes[0] && this.sizes[0].id
    }
  },
  created() {
    this.setSizeActive(this.defaultSizeId)
  },
  methods: {
    setSizeActive(id) {
      this.activeId = id
      this.$emit('size-updated', id)
    }
  }
}
</script>

<style lang="scss">
@import '~assets/styles/variables.scss';

.size-selector {
  position: absolute;
  display: flex;
  left: 5px;
  top: 5px;
  &__item {
    outline: none;
    position: relative;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    padding: 5px;
    margin: 5px;
    cursor: pointer;
    user-select: none;
    border: 3px solid transparent;
    background: $dark-color;
    color: $white-color;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      color: $dark-color;
      position: absolute;
      font-size: 0.7em;
      bottom: -14px;
      left: 4px;
    }
    &_active {
      border: 3px solid gray;
    }
  }
}
</style>
