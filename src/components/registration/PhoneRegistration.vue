<template>
      <div class="max-w-md w-auto rounded-3xl shadow bg-gray-50 p-4 space-y-8">
        <div>
          <img class="mx-auto h-12 w-auto fill-current text-green-600" src="../../assets/svg/phone.svg" alt="Телефон">
          <h2 class="mt-6 text-center text-gray-600">
            Телефон
          </h2>
        </div>
        <!--form class="mt-8 space-y-6" action="#" method="POST"-->
        <div class="mt-8 space-y-6">
          <!--input type="hidden" name="remember" value="true"-->
            <div class="rounded-md shadow-sm -space-y-px">
              <!--label for="phone" class="sr-only">Телефон</label-->
              <input id="phone" type="tel" class="appearance-none rounded-none relative block w-full px-3 py-2 rounded-md form-input phone-mark" placeholder="+7**********"
                     :class="((buttonPhoneDirty && minLengthError(phone, 12)) || (buttonPhoneDirty && phoneNumericError))  ? 'is-invalid' : ''"
                      v-model.trim="phoneNo"
              >

              <!--p v-if="$v.phoneForm.phone.$dirty && !$v.phoneForm.phone.required" class="invalid-feedback">
                Обязательное поле
              </p-->
              <p v-if="timeBreakErrorGet" class="text-red-700">Подождите некоторое время</p>
              <p v-else-if="buttonPhoneDirty && minLengthError(phone, 12) ||buttonPhoneDirty && phoneNumericError" class="text-red-700">
                Некорректный номер
              </p>
              <p v-if="phonePostError" class="text-red-700">
                Не удалось позвонить на телефон {{sentPhone}}
              </p>

              <button v-if="pauseTime > 0" v-on:click="phonePost" :disabled="true" class="group relative w-full flex justify-center py-2 px-4 form-button">
                Отправить код подтверждения ещё через {{ pauseTime }}
              </button>
              <button v-else v-on:click="phonePost" :disabled="minLengthError(phone, 12) || phoneNumericError || timeBreakErrorGet" class="group relative w-full flex justify-center py-2 px-4 form-button">
                <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                  <!--svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                  </svg-->
                  <svg class="h-5 w-5 text-secondary-500 group-hover:text-secondary-400" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M14.4142 7L17.7071 3.70711C18.0976 3.31658 18.0976 2.68342 17.7071 2.29289C17.3166 1.90237 16.6834 1.90237 16.2929 2.29289L13 5.58579V4C13 3.44772 12.5523 3 12 3C11.4477 3 11 3.44772 11 4V7.99931C11 8.00031 11 8.002 11 8.003C11.0004 8.1375 11.0273 8.26575 11.0759 8.38278C11.1236 8.49805 11.1937 8.6062 11.2864 8.70055C11.2907 8.70494 11.2951 8.70929 11.2995 8.7136C11.3938 8.80626 11.502 8.87643 11.6172 8.92412C11.7351 8.97301 11.8644 9 12 9H16C16.5523 9 17 8.55228 17 8C17 7.44772 16.5523 7 16 7H14.4142Z"
                          fill="currentColor"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2 3C2 2.44772 2.44772 2 3 2H5.15287C5.64171 2 6.0589 2.35341 6.13927 2.8356L6.87858 7.27147C6.95075 7.70451 6.73206 8.13397 6.3394 8.3303L4.79126 9.10437C5.90756 11.8783 8.12168 14.0924 10.8956 15.2087L11.6697 13.6606C11.866 13.2679 12.2955 13.0492 12.7285 13.1214L17.1644 13.8607C17.6466 13.9411 18 14.3583 18 14.8471V17C18 17.5523 17.5523 18 17 18H15C7.8203 18 2 12.1797 2 5V3Z" fill="currentColor"/>
                  </svg>
                </span>
                Отправить код подтверждения
              </button>
            </div>
          <p v-if="buttonPhoneDirty" class="text-center">Введите последние 4 цифры позвонившего номера</p>
          <p v-if="checkCodeNumberError" class="text-red-700">Попробуйте проверить код позже</p>
            <div v-if="buttonPhoneDirty" class="rounded-md shadow-sm -space-y-px">
              <input type="text" placeholder="****" size="4" maxlength="4" autocomplete="current-password" class="appearance-none rounded-none relative block w-full px-3 py-2 rounded-md form-input"
                     :class="(buttonCodeDirty && minLengthError(clientCode, 4)) ? 'is-invalid' : ''"
                     v-model.trim="clientCode"
              >
              <button v-on:click="checkCode"
                      :disabled="checkCodeNumberError || codeError || codeIsCorrect"
                      class="group relative w-full flex justify-center py-2 px-4 form-button">
                <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                  <!--svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                  </svg-->
                  <svg class="h-5 w-5 text-secondary-500 group-hover:text-secondary-400" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4ZM2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8C14 9.29583 13.5892 10.4957 12.8907 11.4765L17.7071 16.2929C18.0976 16.6834 18.0976 17.3166 17.7071 17.7071C17.3166 18.0976 16.6834 18.0976 16.2929 17.7071L11.4765 12.8907C10.4957 13.5892 9.29583 14 8 14C4.68629 14 2 11.3137 2 8Z" fill="currentColor"/>
                  </svg>
                </span>
                Проверить код подтверждения
              </button>
            </div>
              <!--p>{{code}}</p-->
          <p v-if="codeIsCorrect" class="text-center text-green-700">
            Телефон подтверждён
          </p>
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
      </div>
</template>

<script>

import {getItem, removeItem, setItem} from "@/scripts/Storage";
import sendSMS from "@/scripts/sendSMS";
import timeBreakPostError from "@/scripts/timeBreakPostError";
import axios from '@/scripts/axios'

export default {
  props: ['pageTitle', 'stopIn'],
  components: {

  },
  data() {
    return {
      phone: '+7',
      sentPhone: null,
      pauseTime: 0,

      code: '',
      clientCode: '',
      //serverCode: '',
      buttonPhoneDirty: false,
      buttonCodeDirty: false,
      postNumber: 0,
      postNumberError: false,
      codeIsCorrect: false,

      checkCodeNumberError: false,

      phonePostError: false,
      codePostError: null,
      codeWasSent: false,

      interval: null
    }
  },
  mounted() {
    const that = this;
    //console.log('hi!');
    this.interval = setInterval(async () => {
      that.checkCodeNumberError = await timeBreakPostError.get('checkCode1');
      //console.log(await that.checkCodeNumberError);
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
    stopInterval () {
      console.log('stopInterval')
      clearInterval(this.interval);
    },
    minLengthError(str, count) {
      return !(str.length >= count)
    },
    async checkCode () {
      this.codePostError = null;
      this.codeIsCorrect = false;
      this.buttonCodeDirty = 'true';
      await timeBreakPostError.set('checkCode1', 4,10);
      //console.log(await timeBreakPostError.get('checkCode'));
      this.checkCodeNumberError = await timeBreakPostError.get('checkCode1');
      if (!this.checkCodeNumberError) {
        this.codeWasSent = true;
        const codePostResult = await axios.checkCode({
          code: this.clientCode,
          phone: this.sentPhone
        })
        this.codeWasSent = false;
        if(typeof codePostResult.status !== "undefined"){
          this.codePostError = null;
          console.log('correct code')
          this.codeIsCorrect = true;

          this.$store.dispatch('SET_PHONE', this.sentPhone);
          await timeBreakPostError.remove('checkCode1');
          this.$emit('phone-checked');
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
            //console.log('+');
            //this.$emit('phone-post', this.phone);
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

      this.codePostError = null;
      this.buttonPhoneDirty = true;


      await this.timeBreakErrorSet();

      if (!this.timeBreakErrorGet) {
        this.sentPhone = this.phone;
        this.codeIsCorrect = false;
        this.clientCode = '';
        console.log(this.sentPhone);
          //this.code =
        const json = await sendSMS(this.sentPhone, this.code);
        this.phonePostError = typeof json.error !== 'undefined';
      }
    }
  }
};
</script>

<style scoped>

</style>