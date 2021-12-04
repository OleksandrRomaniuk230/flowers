<template>
  <div class="login">
    <ValidationObserver class="default-form" ref="form">
      <form class="default-form" @submit.prevent="loginSubmit()">
        <h4 class="default__form-title">Войти</h4>
        <h6 class="default__form-subtitle">Введите логин и пароль</h6>
        <AppInput label="Логин" inputName="login" v-model="form.login" />
        <AppInput
          label="Пароль"
          inputName="password"
          type="password"
          v-model="form.password"
        />
        <div class="login-info">
          <b-form-group id="input-group-3" class="cheackbox">
            <b-form-checkbox-group id="checkboxes-4">
              <b-form-checkbox>Запомнить меня </b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
          <nuxt-link class="default-link" to="/">Забыли пароль?</nuxt-link>
        </div>
        <button class="default-btn">Войти</button>
        <div class="login-link__wrapper">
          <span class="login-link__title">Нет аккаунта? </span>
          <nuxt-link class="default-link" to="/registration"
            >Зарегистрироваться</nuxt-link
          >
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>
<script>
import _ from "lodash";
export default {
  data() {
    return {
      form: {
        password: "",
        login: "",
      },
    };
  },
  methods: {
    async loginSubmit() {
      try {
        await this.$store.dispatch("Auth/login", this.form);
      } catch (e) {
        if (e.status === 422) {
          this.$refs.form.setErrors(e.errors);
        } else if (e.status === 403 || 401) {
          console.log(e);
        }
      }
    },
  },
};
</script>