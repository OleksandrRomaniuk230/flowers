<template>
  <div class="page-header pt-0">
    <div class="row">
      <div class="col d-flex flex-wrap page-wrapper">
        <h3>{{ title }}</h3>
        <ol class="default-breadcrumb">
          <li class="breadcrumb-item">
            <nuxt-link to="/">
              <feather class="icon-home" type="home"></feather>
            </nuxt-link>
          </li>
          <li class="breadcrumb-item default-breadcrumb__item">{{ title }}</li>
        </ol>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  props: {
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

};
</script>
