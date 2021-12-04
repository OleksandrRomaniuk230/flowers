    
<template>
  <div class="page-body">
    <client-only>
      <div class="container-fluid">
        <app-page-header page-name="Каталог" />
        <div class="catalog">
          <form>
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
                  v-model="form.f.kinds"
                  label="Вид растения"
                  label-name="name"
                  :searchable="false"
                  :reduce="(e) => e.id"
                  action="Auth/getKind"
                  actionVuex="Auth/kind"
                  @input="form.f.sorts = null"
                />
                <AppSelect
                  id="sorts"
                  :disabled="
                    form.f.kinds && form.f.kinds.length !== 0 ? false : true
                  "
                  v-model="form.f.sorts"
                  label="Сорт"
                  label-name="name"
                  action="Auth/getSort"
                  :payload="
                    form.f.kinds && form.f.kinds.length !== 0
                      ? { parent_id: form.f.kinds }
                      : ''
                  "
                />
                <AppSelect
                  id="colors"
                  v-model="form.f.colors"
                  label="Цвет"
                  label-name="name"
                  :searchable="false"
                  :reduce="(e) => e.id"
                  action="Auth/getColor"
                  actionVuex="Auth/color"
                />
                <AppSelect
                  id="qualities"
                  v-model="form.f.qualities"
                  label="Качество"
                  label-name="name"
                  :searchable="false"
                  :reduce="(e) => e.id"
                  action="Auth/getQuality"
                  actionVuex="Auth/quality"
                />
                <AppSelect
                  id="plantations"
                  v-model="form.f.plantations"
                  label="Плантация"
                  label-name="name"
                  :searchable="false"
                  :reduce="(e) => e.id"
                  action="Auth/getPlantations"
                />
                <AppSelect
                  id="code"
                  placeholder="Страна"
                  label="Страна"
                  name="country"
                  label-name="name"
                  selectOptions="country"
                  :reduce="(region) => region.code"
                  action="Auth/getCountries"
                  actionVuex="Auth/countries"
                />
                <div class="catalog-form__wrapper-block">
                  <label class="catalog-label">Высота</label>
                  <div class="catalog-select__wrapper">
                    <AppInput placeholder="От" v-model="form.f.height_from" />
                    <AppInput placeholder="До" v-model="form.f.height_to" />
                  </div>
                </div>
                <div class="catalog-form__wrapper-block">
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
            class="
              catalog-footer__link
              d-flex
              align-items-center
              mr-4
              ic-success
            "
          >
            <feather class="catalog-footer__icon" type="heart" />
            {{ "Избранное" }}
            ({{}})
          </a>
          <a
            href="#"
            class="catalog-footer__link d-flex align-items-center ic-success"
          >
            <feather class="catalog-footer__icon" type="search" />
            {{ "Сохраненный поиск" }}
            ({{}})
          </a>
          <a
            @click.prevent="getCatalogParam('sort')"
            href="#"
            variant="link"
            class="
              catalog-footer__link
              d-flex
              ml-auto
              align-items-center
              ic-success
            "
          >
            <feather class="catalog-footer__icon" type="filter" />{{
              "Сортировать по цене"
            }}
          </a>
        </div>
      </div>
    </client-only>
  </div>
</template>
<script>
import _ from "lodash";
export default {
  // async asyncData({ store }) {
  //   const { data, meta, favorites_count, searches_count } =
  //     await store.dispatch("server/catalog/getCatalog");
  //   return {
  //     data: data,
  //     paginations: meta,
  //     favorites_count,
  //     searches_count,
  //   };
  // },
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
    async saveSearches() {
      try {
        await this.$store.dispatch("Auth/saveSearches", this.form);
      } catch (e) {
        console.log(e);
      }
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