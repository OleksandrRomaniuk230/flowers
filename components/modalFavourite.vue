<template>
  <b-modal
    id="modal-favourite"
    centered
    class="theme-modal modal-save-search"
    size="xl"
    title="Сохраненные поиски"
    hide-footer
  >
    <div class="card mb-0">
      <div class="card-body">
        <b-table  hover :fields="fields" tbody-tr-class="c-p" :items="data">
            <template v-slot:cell(name)="item">{{ item.value  }}</template>
            <template v-slot:cell(plantation)="item">
              {{item.value.name}}
            </template>
            <template v-slot:cell(color)="item">
              {{item.value.name}}
            </template>
            <template v-slot:cell(quality)="item">
              {{item.value.name}}
            </template>
            <template v-slot:cell(height)="item">
              {{item.value}}
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
        { key: "name", label: "Поставщик" },
        { key: "plantation", label: "Плантация" },
        { key: "color", label: "Цвет" },
        { key: "quality", label: "Качество" },
        { key: "height", label: "Высота" },
      ],
      data: null,
    };
  },
  methods: {
    async getFavorites() {
      try {
        const data = await this.$store.dispatch("main/getFavorites");
        this.data = data.data.data;
        console.log(this.data);
      } catch (e) {
        console.log(e);
      }
    },
  },
  mounted() {
    this.$root.$on("bv::modal::show", () => {
      this.getFavorites();
    });
  },
};
</script>
