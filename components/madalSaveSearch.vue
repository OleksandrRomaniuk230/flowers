<template>
  <b-modal
    id="modal-save-search"
    centered
    class="theme-modal modal-save-search"
    size="xl"
    title="Сохраненные поиски"
    hide-footer
  >
    <div class="card mb-0">
      <div class="card-body">
          <b-table hover :fields="fields" tbody-tr-class="c-p" :items="data">
            <template v-slot:cell(kinds)="item">{{ item.value[0] }}</template>
            <template v-slot:cell()="item">
              <span
                v-for="(itemV, main) in item.value"
                :key="main"
              >{{ main === 0 ? itemV : ', ' + itemV }}</span>
            </template>
            <template v-slot:cell(height_from)="item">{{ item.value }} - {{ item.item.height_to }}</template>
            <template v-slot:cell(price_from)="item">{{ item.value }} - {{ item.item.price_to }}</template>
            <template v-slot:cell(action)="item">
              <button class="btn btn-outline-secondary" @click="deleteItem(item.item.id)">
                <feather color="red" class="middle" type="trash-2"></feather>
              </button>
            </template>
          </b-table>
      
      </div>
    </div>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {

      fields: [
        { key: "main", label: "" },
        { key: "kinds", label: "Вид растения" },
        { key: "sorts", label: "Сорт" },
        { key: "colors", label:"Цвет" },
        { key: "qualities", label: "Качество" },
        { key: "height_from", label: "Высота" },
        { key: "price_from", label: "Цена" },
        { key: "plantations", label: "Плантация" },
        { key: "countries", label: "Страна" },
        { key: "action", label: "" }
      ],
      data: null
    };
  },
  methods: {
    async deleteItem(id) {
      try {
        await this.$store.dispatch("main/delSearches", id);
        this.getSearches();
      } catch (e) {
        console.log(e);
      }
    },
    async getSearches() {
      try {
        let { data } = await this.$store.dispatch("main/getSearches");
        this.data = data;
  
      } catch (e) {
        console.log(e);
      } 
    }
  },
  mounted() {
    console.log(this.data)
    this.$root.$on("bv::modal::show", (bvEvent, modalId) => {
      this.getSearches();
    });
  }
};
</script>
