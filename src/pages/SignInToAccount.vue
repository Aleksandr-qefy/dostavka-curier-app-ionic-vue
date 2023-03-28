<template>
  <ion-page>
    <div class="h-screen w-screen p-10 background-image">
      <div class="bg-transparent w-full h-full grid grid-cols-1 justify-items-center">
        <div></div>
        <div v-if="codeIsCorrect == false">
          <div class="grid justify-items-stretch space-y-6">
            <input type="tel" class="phone-mark"
                   :class="((buttonPhoneDirty && minLengthError(phone, 11)) || (buttonPhoneDirty && phoneNumericError))  ? 'is-invalid' : ''"
                   v-model.trim="phoneNo"
            >
            <button v-if="pauseTime > 0" :disabled="true" class="dis-button form-button justify-self-center w-8/12"
                    v-on:click="phonePost"
            >Отправить код ещё через {{ pauseTime }}</button>
            <button v-else :disabled="minLengthError(phone, 12) || phoneNumericError || timeBreakErrorGet" class="button form-button justify-self-center"
                    v-on:click="phonePost"
            >Отправить код</button>
            <button class="button form-button justify-self-center"
                    v-on:click="deleteUserCountry"
            >deleteUserCountry</button>
            <!--button class="button form-button justify-self-center"
                    v-on:click="getGoogleAccountID"
            >getGoogleAccountID</button>
            <a class="m-4 p-3 rounded-full text-center bg-gray-50 font-medium"
                v-if="googleAccountCallbackUrl" :href="googleAccountCallbackUrl"></a>
            <button class="button form-button justify-self-center"
                    v-on:click="getCookies"
            >getCookies</button-->

            <GoogleSignInButton :class="'mx-auto'" />

            <div v-if="phonePostError === 'no courier' || timeBreakErrorGet || buttonPhoneDirty && minLengthError(phone, 12) ||buttonPhoneDirty && phoneNumericError"
                class="m-4 p-3 rounded-full text-center bg-gray-50 font-medium">
                <p v-if="timeBreakErrorGet" class="text-red-700">Подождите некоторое время</p>
                <p v-else-if="buttonPhoneDirty && minLengthError(phone, 12) ||buttonPhoneDirty && phoneNumericError" class="text-red-700">
                  Некорректный номер
                </p>
              <p v-if="phonePostError === 'no courier'" class="text-red-700">Не существует пользователя с таким телефоном</p>
            </div>
          </div>
          <div v-if="buttonPhoneDirty" class="mt-6 grid justify-items-stretch space-y-6">
            <div class="m-4 p-3 pb-0 rounded-full text-center bg-gray-50 font-medium">
              <p>Введите последние 4 цифры позвонившего номера</p>
              <p v-if="checkCodeNumberError" class="text-red-700">Попробуйте проверить код позже</p>
              <p v-else-if="codePostError === 'no code'" class="text-center text-red-700">
                    Повторите отправку кода
              </p>
              <p v-else-if="codePostError === 'incorrect code'" class="text-center text-red-700">
                    Неправильный код
              </p>
              <p v-else-if="codeWasSent" class="text-center text-gray-700">
                    Код отправлен на номер {{sentPhone}}
              </p>
            </div>
            <input type="" maxlength="4" class="" placeholder="****"
                       :class="(buttonCodeDirty && minLengthError(clientCode, 4)) ? 'is-invalid' : ''"
                       v-model.trim="clientCode"
            >
            <button class="button form-button justify-self-center"
                    v-on:click="checkCode"
                    :disabled="checkCodeNumberError || codeError"
            >Проверить код</button>
          </div>
        </div>
        <div v-else-if="codeIsCorrect == true" class="space-y-6 grid justify-items-stretch">
          <div class="m-4 p-3 pb-0 rounded-full text-center bg-gray-50 font-medium">
            <p>Вы вошли под номером {{sentPhone}}</p>
            <p>Введите серию и номер документа личности</p>
          </div>
          <input type="" class="" placeholder="Серия и номер слитно"
                 v-model.trim="documentNumber"
          >
          <button class="button form-button justify-self-center"
                  v-on:click="checkDocument"
                  :disabled="documentNumber.length == 0"
          >Проверить</button>
        </div>
        <div v-if="documentError === 'incorrect data'"
                class="m-4 p-3 rounded-full text-center bg-gray-50 font-medium">
          <p v-if="documentError === 'incorrect data'" class="text-red-700">Неправильные серия и номер</p>
        </div>
        <div></div>
        <div class="h-20 grid justify-items-stretch self-end">
          <p class="text-lg text-gray-600 text-center">
            Нет регистрации?
            <span>
              <router-link class="text-primary" :to="{ path: 'registration' }">Зарегистрироваться</router-link>
            </span>
          </p>
        </div>
      </div>
    </div>
  </ion-page>
</template>

<script>
import { IonPage }from '@ionic/vue';
import GoogleSignInButton from "@/components/registration/GoogleSignInButton";
import {getItem, removeItem, setItem} from "@/scripts/Storage";
//import sendSMS from "@/scripts/sendSMS";
import timeBreakPostError from "@/scripts/timeBreakPostError";
import axios from "@/scripts/axios";
//import BaseLayout from "../components/base/BaseLayout.vue";
//import { add } from "ionicons/icons";

export default {
  props: ['pageTitle'],
  components: {
    IonPage,
    GoogleSignInButton
  },
  data() {
    return {
      //add
      phone: '+7',
      sentPhone: null,
      buttonPhoneDirty: false,
      postNumber: 0,
      postNumberError: false,
      codeIsCorrect: false,
      code: '',
      clientCode: '',
      buttonCodeDirty: false,
      pauseTime: 0,

      documentNumber: '',
      documentError: null,

      checkCodeNumberError: false,
      phonePostError: false,
      codePostError: null,
      codeWasSent: false,

      interval: null,

      googleAccountCallbackUrl: null
    }
  },
  mounted() {
    /*window.gapi.signin2.render('google-signin-button', {
      onsuccess: this.onSignIn,
      scope: 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
        //'onsuccess': onSuccess,
    })*/
    const that = this;
    //console.log('hi!');
    this.interval = setInterval(async () => {
      that.checkCodeNumberError = await timeBreakPostError.get('checkCode');
    }, 2000);
  },
  computed: {
    codeError: function () {
      return !(this.clientCode.length === 4) || !/^\d+$/.test(this.clientCode)
    },
    phoneNo: {
      get: function () {
        const sl1 = this.phone.substring(0,2);
        const sl2 = this.phone.substring(2,5);
        const sl3 = this.phone.substring(5,8);
        const sl4 = this.phone.substring(8,10);
        const sl5 = this.phone.substring(10);
        const string = sl1+' '+sl2+' '+sl3+' '+sl4+' '+sl5
        return string.trim()
      },
      set: function (newStr) {
        //this.documentForm.docno = newStr.replace(/\s+/g, '').trim()
        this.phone = newStr.replace(/[^+\d]/g, '');
        if(this.phone.length > 12) {
          this.phone = this.phone.substring(0,12)
        }
        if(this.phone.length < 3) this.phone = '+7'
        //console.log(this.phone);
      }
    },
    phoneNumericError: function () {
      return !(/^\d+$/.test(this.phone.substring(1)) /* && this.phone[0] == '8'*/)
    },
    timeBreakErrorGet: function () {
      return this.postNumberError;
    },
  },
  methods: {
    /*async onSignIn (googleUser) {
      const profile = googleUser.getBasicProfile();
      console.log("ID: " + profile.getId()); // Don't send this directly to your server!
      console.log('Full Name: ' + profile.getName());
      console.log('Given Name: ' + profile.getGivenName());
      console.log('Family Name: ' + profile.getFamilyName());
      console.log("Image URL: " + profile.getImageUrl());
      console.log("Email: " + profile.getEmail());

      // The ID token you need to pass to your backend:
      const id_token = googleUser.getAuthResponse().id_token;
      console.log("ID Token: " + id_token);

      const result = await axios.verifyGoogleToken({id_token} );
      console.log('verifyGoogleToken', result);
    },
    async getCookies() {
      const result = await axios.getGoogleCookies();
      console.log(result);
    },
    async getGoogleAccountID() {
      const getGoogleAccountCallbackObj = await axios.getGoogleAccountCallbackUrl();
      this.googleAccountCallbackUrl = getGoogleAccountCallbackObj.url
      console.log(this.googleAccountCallbackUrl);
    },*/
    async deleteUserCountry() {
      await removeItem('userCountry');
    },
    async checkDocument() {
      this.documentError = null;
      const savedDocumentNumber = this.documentNumber;
      const json = await axios.login({
        document: savedDocumentNumber,
        phone: this.$store.getters.GET_PHONE
      });
      //if (typeof json.error === "undefined"){
      if (typeof json.success !== "undefined"){
        console.log('success');
        console.log(json);
          //const token = json.token;
          //const tokenParts = token.split('.')
          //const body = JSON.parse(atob(tokenParts[1]).replace(/-/g, "+").replace(/_/g, "/"));
          //console.log(body)
      } else {
        console.log('error');
        console.log(json);
        this.documentError = json.error;
      }

    },
    minLengthError(str, count) {
      return !(str.length >= count)
    },
    async checkCode () {
      this.codePostError = null;
      this.codeIsCorrect = false;
      this.buttonCodeDirty = 'true';
      await timeBreakPostError.set('checkCode', 4,10);
      //console.log(await timeBreakPostError.get('checkCode'));
      this.checkCodeNumberError = await timeBreakPostError.get('checkCode');
      if (!this.checkCodeNumberError) {
        this.codeWasSent = true;
        const codePostResult = await axios.checkCode({
          code: this.clientCode,
          phone: this.sentPhone
        })
        this.codeWasSent = false;
        if(typeof codePostResult.status !== "undefined"){
          this.codePostError = null;
          console.log('correct code');

          this.$store.dispatch('SET_PHONE', this.sentPhone);
          await timeBreakPostError.remove('checkCode');
          clearInterval(this.interval);
          this.codeIsCorrect = true;
        } else {
          console.log(codePostResult);
          this.codePostError = codePostResult.error;
        }
      }
    },
    timeBreakErrorSet: async function () {
      const maxPostNumber = 3;//сколько раз можно отправлять код на телефон без паузы
      const breakTime = 30000; //время задержки в милисекундах
      const storageKey = 'documentPostNumberError';

      this.postNumber = this.postNumber + 1;
      if ( (Date.now() - await getItem(storageKey)) < breakTime ) {
        console.log(1);
        this.postNumber = 0;
        this.postNumberError = true;
        const tau = Date.now() - await getItem(storageKey);
        await setTimeout(async () => {
          console.log(1.2)
          this.postNumberError = false;
          await removeItem(storageKey)
        }, tau)
      } else {
        console.log(2)
        if (this.postNumber > maxPostNumber) {
          console.log(3)
          this.postNumberError = true;
          this.postNumber = 0;
          await setItem(storageKey, Date.now());
          await setTimeout(async () => {
            console.log(5)
            this.postNumberError = false;
            await removeItem(storageKey)
          }, breakTime)
        } else {
          console.log(4)
          this.postNumberError = false;
          await removeItem(storageKey);
        }
      }
    },
    pause: function (pauseTimeSec) {
      const that = this;
      this.pauseTime = pauseTimeSec;
      let interval = setInterval(() => {
        console.log(that.pauseTime);
        that.pauseTime = that.pauseTime - 1;
      }, 1000)

      setTimeout(() => { clearInterval(interval) }, pauseTimeSec * 1000)

    },
    phonePost: async function () { //Отправка телефона и сгенерированного кода
      this.pause(10);
      /*function generateCode() {//генерация рандомного числа
        const min = 1001;
        const max = 9999;
        let rand = min + Math.random() * (max + 1 - min);
        return String(Math.floor(rand));
      }*/
      this.buttonPhoneDirty = true;

      await this.timeBreakErrorSet();

      if (!this.timeBreakErrorGet) {
        this.sentPhone = this.phone;
        this.codeIsCorrect = false;
        this.clientCode = '';
        console.log(this.sentPhone);
          //this.code =
        const json = await axios.phoneCodeRegistered(this.sentPhone);
        console.log(json);
        if (typeof json.error !== 'undefined') this.phonePostError = json.error;
        else this.phonePostError = null;
        console.log(this.phonePostError)
      }
    }
  }
};
</script>

<style scoped>
  .gradient {
    @apply bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500;
  }
  input {
    @apply rounded-full bg-gray-50 font-medium text-lg text-gray-600 h-11 px-10 py-2 text-lg focus:outline-none shadow-md w-full;
  }
  .button {
    @apply w-7/12 h-11 py-2 px-1 rounded-full shadow-md font-normal text-base;
  }
  .dis-button {
    @apply w-7/12 h-16 py-2 px-1 rounded-full shadow-md font-normal text-base;
  }
</style>