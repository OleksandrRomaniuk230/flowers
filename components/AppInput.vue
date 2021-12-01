<template>
  <ValidationProvider :vid="inputName" v-slot="{ errors }">
    <div class="form-group" :class="{ hasError: errors.length}">
      <label v-if="label">{{ label }}</label>
      <b-form-input
        :value="value"
        :type="type"
        :placeholder="placeholder"
        @blur="$emit('input', $event.target.value)"
      />
      <template v-if="errors.length && message">
        <span
          v-for="(e, index) in errors"
          class="text-danger"
          :key="index"
          >{{e}}</span
        >
      </template>
    </div>
  </ValidationProvider>
</template>
<script>
export default {
 props: {
    value: {
      type: [String, Number],
      default: "",
    },
    step: {
      type: Number,
      default: null,
    },
    label: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    mask: {
      type: [String, Object, Array],
      default: "",
    },
    message: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: "",
    },
    inputName: {
      type: String,
      default: "",
    },
    inputClass: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      input: this.value,
    };
  },
  methods: {
    handleInput(event) {
      this.$emit("input", event);
    },
  },

};
</script>