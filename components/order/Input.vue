<template>
  <label class="input__label">
    {{ label }}

    <input
      :value="value"
      :type="type"
      class="input__input"
      :class="{ input__input_errored: errors.length }"
      @input="$emit('input', $event.target.value)"
    />

    <span class="input__error">
      <span v-if="errors && errors[0]">
        {{ error }}
      </span>
    </span>
  </label>
</template>

<script>
export default {
  name: 'Input',
  props: {
    label: {
      type: String,
      default: ''
    },
    errors: {
      type: Array,
      default: () => []
    },
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  computed: {
    error() {
      if (typeof this.errors[0] === 'string') return this.errors[0]

      return this.errors[0].data
        ? this.errors[0].data.text
        : this.errors[0].name
    }
  }
}
</script>
