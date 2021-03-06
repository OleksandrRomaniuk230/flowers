import Vue from 'vue'
import vSelect from 'vue-select/dist/vue-select';
import 'vue-select/dist/vue-select.css';
const VueSelect = {
  install(Vue, options) {
    if(process.client) {
      Vue.component('v-select', vSelect)
    }
  }
};
Vue.use(VueSelect);
export default VueSelect;
