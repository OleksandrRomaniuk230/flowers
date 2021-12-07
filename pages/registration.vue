<template>
  <div class="registration">
    <div class="default-form">
      <h4 class="default__form-title">Регистрация</h4>
      <h6 class="default__form-subtitle">Придумайте логин и пароль</h6>
      <b-tabs class="registration-tabs" @input="$event ? form.role = 'provider' : form.role = 'buyer' ">
        <b-tab title="Покупатель" active>  
           <ValidationObserver ref="form" >
          <b-form @submit.prevent="onSubmit">
            <AppInput label="Имя" inputName="name" v-model="form.name"  placeholder="Укажите имя"/>
            <AppInput label="Номер телефона" inputName="phone" v-model="form.phone"  placeholder="Номер телефона"/>
            <AppInput label="E-mail" inputName="email"   v-model="form.email"  placeholder="Укажите почту"/>
            <AppInput label="Пароль" inputName="password" v-model="form.password" type="password"  placeholder="**********"/>
            <AppInput label="Повторить пароль" inputName="passwordRepeat" v-model="form.password_confirmation" type="password"  placeholder="**********"/>
            <AppCheckbox  label="С условиями ознакомился" inputName="accept" @change="form.accept = $event" />
            <button class="default-btn">Зарегистрироваться</button>
            <div class="login-link__wrapper">
              <span class="login-link__title">Есть аккаунт? </span>
              <nuxt-link class="default-link" to="/login">Войти</nuxt-link>
            </div>
          </b-form>
          </ValidationObserver>
        </b-tab>
        <b-tab title="Продавец">
            <ValidationObserver ref="formProvider" >
          <b-form  @submit.prevent="onSubmit">
          <AppInput label="Имя"   inputName="company.name" v-model="form.company.name"  placeholder="Укажите имя"/>
          <AppInput label="Номер телефона" inputName="phone" v-model="form.phone"  placeholder="Номер телефона"/>
           <AppInput label="E-mail" inputName="email"   v-model="form.email"  placeholder="Укажите почту"/>
            <AppSelect  v-model="form.company.country_code"
             inputName="company.country_code"
                          id="code"
                          placeholder="Страна"
                          label="Страна"
                          name="country"
                          label-name="name"
                          selectOptions="country"
                          :reduce="region => region.code"
                          action="main/getCountries"
                          actionVuex="main/countries"/>
            <AppSelect  v-model="form.company.city"
                          inputName="company.city"
                          id="city"
                          name="city"
                          placeholder="Укажите город"
                          label="Город"
                          label-name="name"
                          selectOptions="city"
                          :reduce="region => region.name"
                          autocomplite
                          action="main/getCities" 
                          @search:val="$event ? form.company.city = $event : null"
                       />
          <AppInput label="Пароль" inputName="password" v-model="form.password" type="password"  placeholder="**********"/>
            <AppInput label="Повторить пароль" inputName="passwordRepeat" v-model="form.password_confirmation" type="password"  placeholder="**********"/><AppCheckbox  label="С условиями ознакомился" inputName="accept" @change="form.accept = $event" />
          <button class="default-btn">Зарегистрироваться</button>
          <div class="login-link__wrapper">
            <span class="login-link__title">Есть аккаунт? </span>
            <nuxt-link class="default-link" to="/login">Войти</nuxt-link>
          </div>
          </b-form>
          </ValidationObserver>
        </b-tab>
      </b-tabs>
    </div>
  </div>
</template>
<script>

import _ from "lodash";
export default {
    data() {
        return {
            form: {
                role: "",
                email: "",
                phone: "",
                password: "",
                password_confirmation: "",
                accept: false,
                person: {
                    name: ""
                },
                company: {
                    name: "",
                    country_code: "",
                    city: ""
                }
            },
        };
    },
    methods: {
        async onSubmit() {
            try {
                await this.$store.dispatch("main/register", this.form);
            }
            catch (e) {
                if (this.form.role === "buyer") {

                    this.$refs.form.setErrors(e.errors);
                }
                else {
                    this.$refs.formProvider.setErrors(e.errors);
                }
            }
        },
    },

};
</script>