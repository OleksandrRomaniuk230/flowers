<template>
  <div class="catalog-card">
    <div class="catalog-card__body">
      <div class="catalog-card__body-wrapper">
        <div class="catalog-card__body-img">
          <img
            v-if="data.photo_url"
            class="w-100"
            style="object-fit: contain"
            :src="data.photo_url"
            alt
          />
          <img
            v-else
            class="w-100"
            style="object-fit: contain"
            src="/img/1.jpg"
            alt
          />
        </div>
        <div class="pl-0 p-r-5 catalog__line-bg">
          <div
            class="
              d-flex
              m-b-25
              flex-wrap
              align-items-center
              justify-content-between
              catalog__title
            "
          >
            <h5 class="mb-0">{{ data.name }}</h5>
            <a
              href="#"
              @click.prevent="addFavorites"
              class="d-flex align-items-center mb-0 text-body"
            >
              <feather
                :fill="favorites ? '#eb2067' : '#ffffff00'"
                stroke="#eb2067"
                class="catalog__like-icon"
                type="heart"
              />
              {{ favorites ? "В избранном" : "В избранное" }}
            </a>
          </div>

          <div class="row mx-0 py-2">
            <div class="catalog__line-item">{{ "Поставщик" }}:</div>
            <div class="col d-flex align-items-center">
              <div class="mr-2">{{ data.plantation.provider.name }}</div>
              <img
                class="icon-flag"
                :src="`../img/flag-icon/${data.plantation.provider.country_code.toLowerCase()}.svg`"
                alt
              />
            </div>
          </div>
          <div class="row mx-0 py-2">
            <div class="catalog__line-item">{{ "Плантация" }}:</div>
            <div class="col d-flex">
              <div class="mr-2">
                {{ data.plantation.name }}
              </div>
              <span class="catalog__rating">
                {{ formatRating(data.plantation.rating) }}
              </span>
            </div>
          </div>
          <div class="row mx-0 py-2 align-items-center">
            <div class="catalog__line-item">{{ "Цвет" }}:</div>
            <div v-if="data.color" class="col color-probe catalog__color">
              <div
                :style="
                  data.color.color === 'mix'
                    ? { backgroundImage: 'url(/img/mix.svg)' }
                    : { backgroundColor: data.color.color }
                "
                class="catalog__color"
              ></div>
              {{ data.color.name }}
            </div>
          </div>
          <div class="row mx-0 py-2">
            <div class="catalog__line-item">{{ "Высота" }}:</div>
            <div class="col">{{ data.height }}</div>
          </div>
          <div v-if="data.quality" class="row mx-0 py-2">
            <div class="catalog__line-item">{{ "Качество" }}:</div>
            <div class="col">{{ data.quality.name }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="catalog__footer">
      <div class="catalog-header__info">
        <h6 class="mb-0">
          <strong class="catalog-price">
            {{ "Цена закупочная " }}{{ formatPrice(data.price) }}
          </strong>
        </h6>
      </div>
      <div class="card-body">
        <form>
          <label>{{ "Укажите количество" }}</label>
          <div class="d-flex m-b-10 flex-sm-wrap flex-md-nowrap catalog-count">
            <div class="d-flex m-r-20">
              <b-button
                class="order__remove"
                @click="removeOrder()"
                size="sm"
                text="Button"
                variant="success"
                >-</b-button
              >
              <b-form-input
                v-model="form.quantity"
                class="f-16 text-center rounded-0"
                :min="data.multiplicity"
                :step="data.multiplicity"
                placeholder
                @input="qualityVal"
              ></b-form-input>
              <b-button
                class="order__add"
                @click="addOrder()"
                size="sm"
                text="Button"
                variant="success"
                >+</b-button
              >
            </div>
            <span class="text-secondary">
              {{ "Кратность заказа" }} {{ data.multiplicity }}
              {{ "шт" }}
            </span>
          </div>
          <strong class="mt-2">
            {{ "Доступно для заказа:" }} {{ data.remaining }}{{ "шт" }}
          </strong>
        </form>
      </div>
      <div class="catalog-footer__info">
        <b-button
          variant="outline-success"
          class="w-100 m-t-10"
          style="white-space: nowrap"
        >
          {{ "В торгах" }}
        </b-button>
        <b-button
          variant="outline-success"
          class="w-100 m-t-10"
          style="white-space: nowrap"
        >
          {{ "Торговаться" }}
        </b-button>
      </div>
    </div>
  </div>
</template>
<script>
import _ from "lodash";
export default {
  props: {
    data: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      form: {
        quantity: this.data.multiplicity,
      },
      favorites: this.data.states.in_favorites,
    };
  },
  methods: {
    
    async addOrder() {
      if (this.form.quantity <= this.data.remaining-this.data.multiplicity) {
        this.form.quantity = +this.form.quantity + +this.data.multiplicity;
      }
    },
    qualityVal(e) {
      this.debounceQuality(this, e, this.data.multiplicity);
    },
    debounceQuality: _.debounce((vm, e, multi) => {
      if (multi >= e) {
        vm.form.quantity = multi;
      } else if (e > vm.data.remaining) {
        vm.form.quantity = Math.trunc(vm.data.remaining / multi) * multi;
      } else {
        vm.form.quantity = Math.trunc(e / multi) * multi;
      }
    }, 1000),
    async removeOrder() {
      if (
        this.data.multiplicity >=
        this.form.quantity - this.data.multiplicity
      ) {
        this.form.quantity = this.data.multiplicity;
      } else {
        this.form.quantity = this.form.quantity - this.data.multiplicity;
      }
    },

    async addFavorites() {
      try {
        let { value } = await this.$store.dispatch(
          "server/catalog/addFavorites",
          this.data.id
        );
        this.favorites = value;
      } catch (e) {
        console.log(e);
      }
    },

    formatPrice(number) {
      let price = new Intl.NumberFormat("ru-RU", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(number);
      return price;
    },
    formatRating(rating) {
      switch (rating) {
        case 0:
          return "—";
          break;
        case 4:
          return "Standart";
          break;
        case 5:
          return "Premium";
          break;
      }
    },
  },
};
</script>