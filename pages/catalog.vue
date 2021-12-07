    
<template>
  <div class="page-body">
    <client-only>
      <div class="container-fluid">
        <app-page-header page-name="Каталог" />
        <div class="catalog">
          <form @submit.prevent="getCatalogParam()">
            <div class="catalog-header">
              <h5 class="catalog-title">Поиск</h5>
            </div>
            <div class="catalog-body">
              <div class="catalog-form catalog-grid">
                <AppInput
                  class="grig-select"
                  label="Поиск по названию"
                  placeholder="Поиск по названию"
                  v-model="form.q"
                />

                <AppSelect
                  id="kinds"
                   class="grig-select__media"
                  v-model="form.f.kinds"
                  label="Вид растения"
                  label-name="name"
                  :searchable="false"
                  :reduce="(e) => e.id"
                  action="main/getKind"
                  actionVuex="main/kind"
                  @input="form.f.sorts = null"
                />
                <AppSelect
                  id="sorts" class="grig-select__media"
                  :disabled="
                    form.f.kinds && form.f.kinds.length !== 0 ? false : true
                  "
                  v-model="form.f.sorts"
                  label="Сорт"
                  label-name="name"
                  action="main/getSort"
                  :payload="
                    form.f.kinds && form.f.kinds.length !== 0
                      ? { parent_id: form.f.kinds }
                      : ''
                  "
                />
                <AppSelect
                  id="colors" class="grig-select__media"
                  v-model="form.f.colors"
                  label="Цвет"
                  label-name="name"
                  :searchable="false"
                  :reduce="(e) => e.id"
                  action="main/getColor"
                  actionVuex="main/color"
                />
                <AppSelect
                  id="qualities"  class="grig-select__media"
                  v-model="form.f.qualities"
                  label="Качество"
                  label-name="name"
                  :searchable="false"
                  :reduce="(e) => e.id"
                  action="main/getQuality"
                  actionVuex="main/quality"
                />
                <AppSelect
                  id="plantations"  class="grig-select__media"
                  v-model="form.f.plantations"
                  label="Плантация"
                  label-name="name"
                  :searchable="false"
                  :reduce="(e) => e.id"
                  action="main/getPlantations"
                />
                <AppSelect
                  id="code"  class="grig-select__media"
                  v-model="form.f.countries"
                  placeholder="Страна"
                  label="Страна"
                  name="country"
                  label-name="name"
                  selectOptions="country"
                  :reduce="(region) => region.code"
                  action="main/getCountriesCompanies"
                  actionVuex="main/countriesCompanies"
                />
                <div class="catalog-form__wrapper-block grig-select__media">
                  <label class="catalog-label">Высота</label>
                  <div class="catalog-select__wrapper">
                    <AppInput placeholder="От" v-model="form.f.height_from" />
                    <AppInput placeholder="До" v-model="form.f.height_to" />
                  </div>
                </div>
                <div class="catalog-form__wrapper-block grig-select__media">
                  <label class="catalog-label">Цена</label>
                  <div class="catalog-select__wrapper">
                    <AppInput placeholder="От" v-model="form.f.price_from" />
                    <AppInput placeholder="До" v-model="form.f.price_to" />
                  </div>
                </div>
              </div>
            </div>
            <div class="catalog-footer">
              <a
                href="#"
                class="catalog-footer__link"
                @click.prevent="saveSearches"
              >
                <feather class="catalog-footer__icon" type="search" />{{
                  "Сохранить поиск"
                }}
              </a>
              <a
                href=""
                class="catalog-footer__link"
                @click.prevent="clearSearch"
              >
                <feather class="catalog-footer__icon" type="refresh-ccw" />{{
                  "Сбросить"
                }}
              </a>
              <b-button type="submit" class="catalog-footer__btn"
                >Найти</b-button
              >
            </div>
          </form>
        </div>
        <div class="catalog__setting col d-flex flex-wrap">
          <a
            href="#"
              v-b-modal.modal-favourite
            class="
              catalog-footer__link
              d-flex
              align-items-center
              mr-4
              ic-success
            "
          >
            <feather class="catalog-footer__icon" type="heart" />
            {{ "Избранное" }} ({{ favorites_count }})
          </a>
              
          <a
            href="#"
            v-b-modal.modal-save-search
            class="catalog-footer__link d-flex align-items-center ic-success"
          >
            <feather class="catalog-footer__icon" type="search" />
            {{ "Сохраненный поиск" }} ({{ searches_count }})
          </a>
        </div>
        <div class="catalog-items">
          <AppCatalogItem v-for="item in data" :key="item.id" :data="item" />
        </div>
        <b-pagination
          v-model="paginations.current_page"
          :total-rows="paginations.total"
          :per-page="paginations.per_page"
          prev-text="Назад"
          next-text="Вперед"
          align="center"
          @input="getCatalogParam"
        ></b-pagination>
      </div>
    </client-only>
    <ModalFavourite/>
    <MadalSaveSearch @search="addSearch" />
  </div>
</template>
<script>
import qs from "qs";
import _ from "lodash";

export default {
  async asyncData({ store }) {
    const { data, meta, favorites_count, searches_count } =
      await store.dispatch("main/getCatalog");
    return {
      data: data,
      paginations: meta,
      favorites_count,
      searches_count,
    };
  },
  data() {
    return {
      form: {
        q: null,
        f: {
          kinds: null,
          sorts: null,
          colors: null,
          qualities: null,
          providers: null,
          plantations: null,
          countries: null,
          height_from: null,
          height_to: null,
          price_from: null,
          price_to: null,
        },
      },
    };
  },
  methods: {
    async getCatalogParam() {
      let payload = this.buildQuery({
        ...this.form,
        page: this.paginations.current_page,
      });
      try {
        let data = await this.$store.dispatch("main/getCatalog", payload);
        this.data = data.data;
        this.paginations = data.meta;
      } catch (e) {
        console.log(e);
      }
    },
    buildQuery(f) {
      return qs.stringify(JSON.parse(JSON.stringify(f)));
    },
    async saveSearches() {
     
      try {
        await this.$store.dispatch("main/saveSearches", this.form);
      } catch (e) {
        console.log(e);
      }
    },
    addSearch(e) {
      this.form.f = e;
      this.getCatalogParam();
    },
    clearSearch() {
      this.form = {
        q: null,
        f: {
          kinds: null,
          sorts: null,
          colors: null,
          qualities: null,
          providers: null,
          plantations: null,
          countries: null,
          height_from: null,
          height_to: null,
          price_from: null,
          price_to: null,
        },
      };
    },
  },
};
</script>