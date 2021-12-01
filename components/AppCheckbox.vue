<template>
  <ValidationProvider :vid="inputName" v-slot="{ errors }">
    <div  :class="{ hasError: errors.length }">
      <label class="checkbox-label">
        <input
          type="checkbox"
           class="checkbox_animated"
          v-model="val"
          @change="$emit('input', val)"
        >
        <span v-if="label">{{ label }}</span>
      </label>
       <template v-if="errors.length">
        <span v-for="(e, index) in errors"    class="text-danger" :key="index">{{ e }} </span>
      </template>
    </div>
  </ValidationProvider>
</template>

<script>
  export default {
    props: {
      valChange: {
        type: Boolean,
        default: false
      },
      label: String,
       inputName: {
        type: String,
        default: ''
      },
      customClass: String
    },
    data() {
      return {
        val: this.valChange || null
      }
    },watch: {
      valChange: {
        handler(bef) {
          this.val = bef
        }
      },
      val: {
        handler(bef) {
          this.$emit('change', bef)
        }
      }
    }
  }
</script>
