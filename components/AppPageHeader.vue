<template>
  <div class="page-header pt-0">
    <div class="row">
      <div class="col d-flex flex-wrap align-items-center">
        <h3 v-if="two">{{ two }}</h3>
        <h3 v-else>{{ title }}</h3>
        <ol class="breadcrumb mt-2 mt-sm-0">
          <li class="breadcrumb-item">
            <nuxt-link to="/">
              <feather class="icon-home" type="home"></feather>
            </nuxt-link>
          </li>
          <li class="breadcrumb-item">{{ title }}</li>
          <li v-if="two" class="breadcrumb-item">{{ two }}</li>
        </ol>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    two: String,
    pageName: {
      type: String,
      default: "",
    },
  },
  head() {
    return {
      title: this.title,
    };
  },
  data() {
    return {
      title: this.pageName,
    };
  },
  mounted() {
    // console.log(this.$route)
  },
  computed: {
    ...mapGetters({
      data: "server/profile/items",
    }),
  },
};
</script>
