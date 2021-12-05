<template>
  <ValidationProvider :vid="inputName" v-slot="{ errors }">
    <div class="form-group" :class="{ hasError: errors.length }">
      <label v-if="label">{{ label }}</label>
      <v-select
        v-model="selected"
        :label="id"
        :placeholder="placeholder"
        :disabled="disabled"
        :multiple="multiple"
        :get-option-label="getOptionLabel"
        :options="items"
        :reduce="reduce"
        @input="changeValue"
        @search="onSearch"
        :class="{ multiple: multiple }"
      >
        <template v-if="selectOptions" v-slot:option="option">
          <template v-if="selectOptions === 'country'">
            <img :src="option.flag" alt />
          
            {{ option[labelName] }}
          </template>
        </template>
        <template slot="no-options">{{ noOptionsMessage }}</template>
      </v-select>
      <template v-if="errors.length">
        <span v-for="(e, index) in errors" class="text-danger" :key="index">{{
          e
        }}</span>
      </template>
    </div>
  </ValidationProvider>
</template>

<script>
import qs from "qs";
import _ from "lodash";
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    reduseKey: {
      type: String,
      default: "id",
      required: false,
    },
    value: {
      type: [Number, String, Array, Boolean, Object],
      default: null,
    },
    state: {
      type: Boolean,
      default: false,
    },
    e: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    maxHeight: {
      type: String,
      default: "400px",
    },
    searchable: {
      type: Boolean,
      default: true,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    clearSearchOnSelect: {
      type: Boolean,
      default: true,
    },
    closeOnSelect: {
      type: Boolean,
      default: true,
    },
    labelName: {
      type: String,
      default: "label",
    },
    label: {
      type: String,
      default: "",
    },
    reduce: {
      type: Function,
      default: (option) => option,
    },
    createOption: {
      type: Function,
      default: (items) => items,
    },
    options: {
      type: [Array, Object],
      required: false,
      default() {
        return [];
      },
    },
    action: {
      type: String,
      default: "",
    },
    actionVuex: {
      type: String,
      default: "",
    },
    mask: {
      type: [String, Object, Array],
      default: "",
    },
    selectOptions: {
      type: String,
      default: "",
    },
    selectProduct: {
      type: Boolean,
      default: false,
    },
    taggable: {
      type: Boolean,
      default: false,
    },
    inputName: {
      type: String,
      default: "",
    },
    autocomplite: {
      type: Boolean,
      default: false,
    },
    filters: {
      type: [Array, Object],
    },
    payload: {
      type: [Number, String, Array, Object],
      default: null,
    },
  },
  data() {
    return {
      selected: this.value,
      items: this.options,
      noOptionsMessage: "Для выбора параметров введите несколько букв...",
    };
  },
  methods: {
    changeValue() {
      this.$emit("input", this.selected);
      this.$emit(
        "change",
        this.items.find((item) => item[this.reduseKey] === this.selected)
      );
    },
    async getOption(e) {
    
      let payload;
      if (e) {
        payload = this.buildQuery(e);
      }
      try {
        let { data } = await this.$store.dispatch(this.action, payload);
        this.items = data;
      } catch (e) {
        console.log(e);
      } finally {
      }
    },
    onSearch(search) {
      if (this.action !== "" && this.autocomplite) {
        this.search(search, this);
      }
    },
    search: _.debounce(async (search, vm) => {
      vm.$emit("search:val", search);
      let payload = { q: search };
      if (vm.filters) {
        payload = vm.buildQuery({ q: search, f: vm.filters });
      }
      try {
        let response = await vm.$store.dispatch(vm.action, payload);
        vm.items = response.data;
        if (search) {
          vm.noOptionsMessage = "ничего не найдено";
        } else {
          vm.noOptionsMessage =
            "Для выбора параметров введите несколько букв...";
        }
      } catch (e) {
        console.log(e);
      }
    }, 350),

    getOptionLabel(option) {
      if (typeof option === "object") {
        if (!option.hasOwnProperty(this.labelName)) {
          return console.warn(
            `[vue-select warn]: Label key "option.${this.labelName}" does not` +
              ` exist in options object ${JSON.stringify(option)}.\n` +
              "http://sagalbot.github.io/vue-select/#ex-labels"
          );
        }
        return option[this.labelName];
      }
      return option;
    },
    buildQuery(f) {
      return qs.stringify(JSON.parse(JSON.stringify(f)));
    },
  },
  mounted() {
    if (this.action && this.actionVuex) {
      let vuexOptions = this.$store.getters[this.actionVuex].data;
      vuexOptions ? (this.items = vuexOptions) : this.getOption();
    } else if (this.action) {
      if (this.payload) {
        this.getOption(this.payload);
      } else {
        this.getOption({ q: "", f: this.filters });
      }
    }
  },
  watch: {
    options: {
      handler(bef) {
        if (!this.searchable) {
          this.items = bef;
        }
      },
      deep: true,
    },
    value: {
      handler(bef) {
        this.selected = bef;
      },
      deep: true,
    },
    payload: {
      handler(val, oldVal) {
        if (JSON.stringify(val) !== JSON.stringify(oldVal) && val !== "") {
          this.getOption(val);
        }
      },
      deep: true,
    },
  },
};
</script>

<style>
</style>
