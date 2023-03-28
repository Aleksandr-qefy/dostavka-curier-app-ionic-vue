<template>
    <!--h2 class="block text-center text-gray-600">Паспортные данные</h2>

    <input type="text" placeholder="Фамилия" class="block form-input rounded-xl">
    <input type="text" placeholder="Имя" class="block form-input rounded-xl">
    <input type="text" placeholder="Отчество (при его наличии)" class="block form-input rounded-xl">
    <input type="birthDate" class="block form-input rounded-xl">

    <div class="form-input">
      <select class="text-base font-normal font-mono">
        <option>Indiana</option>
        <option>Michigan</option>
        <option>Ohio</option>
      </select>
    </div>

    <input type="number" placeholder="Серия и номер (слитно)" class="block form-input rounded-xl">

    <button class="form-button rounded-xl h-16">
      <p>Проверить паспортные данные</p>
    </button-->
    <div class="max-w-md w-auto rounded-3xl shadow bg-gray-50 p-4 space-y-8">
      <div>
        <img class="mx-auto h-12 w-auto fill-current text-green-600" src="../../assets/svg/document-text.svg" alt="Workflow">
        <h2 class="mt-6 text-center text-gray-600">
          Паспортные данные
        </h2>
      </div>
      <!--form class="mt-8 space-y-6" action="#" method="POST"-->
      <!--form @submit.prevent="checkForm" class="mt-8 space-y-6"-->
      <div class="mt-8 space-y-6 bg-transparent">
        <!--input type="hidden" name="remember" value="true"-->
        <!--div class="rounded-md shadow-sm -space-y-px"-->
        <div class="rounded-md -space-y-px bg-transparent">
          <p>* - Обязательные поля</p>
          <div>
            <label for="fam" class="sr-only">Фамилия</label>
            <input v-model.trim="documentForm.fam" id="fam" name="fam" type="text" autocomplete="fam"
                   :class="!(documentForm.fam) && touch? 'is-invalid' : ''"  class="bg-transparent appearance-none rounded-none relative block w-full px-3 py-2 rounded-t-md form-input" placeholder="Фамилия *">
          </div>
          <div>
            <label for="name" class="sr-only">Имя</label>
            <input v-model.trim="documentForm.name" id="name" name="name" type="text" autocomplete="name"
                   :class="!(documentForm.name) && touch? 'is-invalid' : ''" class="bg-transparent appearance-none rounded-none relative block w-full px-3 py-2 form-input" placeholder="Имя *">
          </div>
          <div>
            <label for="och" class="sr-only">Отчество</label>
            <input v-model.trim="documentForm.och" id="och" name="och" type="text" autocomplete="otch"
                   class="bg-transparent appearance-none rounded-none relative block w-full px-3 py-2 form-input" placeholder="Отчество (при его наличии)">
          </div>
          <div class="block w-full px-3 py-2 form-input">
            <ion-label position="fixed">Дата рождения *</ion-label>
            <ion-datetime min="1970-01" :max="ageRestriction"
                          display-format="DD MMM YYYY"
                          month-short-names="Янв, Фев, Мар, Апр, Мая, Июн, Июл, Авг, Сен, Окт, Ноя, Дек"
                          v-model="documentForm.birthDate"
                          v-bind:value="documentForm.birthDate" name="date"
                          v-on:ionInput="documentForm.birthDate=$event.target.value"
            ></ion-datetime>
          </div>
          <!--p>{{ documentForm.birthDate }} {{ Data }} {{ageRestriction}}</p-->
          <div class="flex relative">
            <div class="">
              <select v-model="documentForm.doctype" class="bg-transparent relative appearance-none rounded-none relative block w-full px-3 py-2 form-input">
                <option v-for="option in options" v-bind:value="option.value" v-bind:key="option.id">
                  {{ option.text }}
                </option>
              </select>
            </div>
          </div>
          <div v-if="documentForm.doctype == '21'">
            <label for="docno" class="sr-only">Серия и номер *</label>
            <input v-model.trim="docNo" id="docno" name="docno" type="text" autocomplete="docno"
                   :class="!(documentForm.docno) && touch || !noNumericError(documentForm.docno)? 'is-invalid' : ''" class="bg-transparent appearance-none rounded-none relative block w-full px-3 py-2 form-input" placeholder="Серия и номер *">
          </div>
          <div v-else>
            <label for="docno" class="sr-only">Серия и номер документа *</label>
            <input v-model.trim="documentForm.docno" name="docno" type="text" autocomplete="docno"
                   :class="!(documentForm.docno) && touch? 'is-invalid' : ''" class="bg-transparent appearance-none rounded-none relative block w-full px-3 py-2 form-input" placeholder="Серия и номер документа *">
          </div>
          <div class="block w-full px-3 py-2 rounded-b-md form-input">
            <!--label class="sr-only">Дата рождения</label-->
            <ion-label position="fixed">Дата выдачи документа *</ion-label>
            <ion-datetime min="1990-01"
                          display-format="DD MMM YYYY"
                          month-short-names="Янв, Фев, Мар, Апр, Мая, Июн, Июл, Авг, Сен, Окт, Ноя, Дек"
                          v-model="documentForm.docDate"
                          v-bind:value="documentForm.docDate" name="date"
                          v-on:ionInput="documentForm.docDate=$event.target.value"
            ></ion-datetime>
            <!--input v-model.trim="documentForm.birthDate" id="birthDate" name="birthDate" type="birthDate"
                   :class="!(documentForm.birthDate) && touch? 'is-invalid' : ''" class="appearance-none rounded-none relative block w-full px-3 py-2 form-input" placeholder="Дата рождения"-->
          </div>
          <!--p>{{ documentForm.docDate }} {{ docData }}</p-->
        </div>
        <p v-if="timeBreakErrorGet" class="text-red-700">Подождите некоторое время</p>
        <div>
          <button type="submit" @click="checkForm" :disabled="!noNumericError(documentForm.docno) && documentForm.doctype == '21'" class="group relative w-full flex justify-center py-2 px-4 form-button">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <!--svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg-->
              <svg class="h-5 w-5 text-secondary-500 group-hover:text-secondary-400" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M4 4C4 2.89543 4.89543 2 6 2H10.5858C11.1162 2 11.6249 2.21071 12 2.58579L15.4142 6C15.7893 6.37507 16 6.88378 16 7.41421V16C16 17.1046 15.1046 18 14 18H12.4722C13.4223 16.9385 14 15.5367 14 14C14 10.6863 11.3137 8 8 8C6.46329 8 5.06151 8.57771 4 9.52779V4Z" fill="currentColor"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8 10C5.79086 10 4 11.7909 4 14C4 14.7414 4.20229 15.4364 4.55397 16.0318L3.29289 17.2929C2.90237 17.6834 2.90237 18.3166 3.29289 18.7071C3.68342 19.0976 4.31658 19.0976 4.70711 18.7071L5.96818 17.446C6.56362 17.7977 7.25862 18 8 18C10.2091 18 12 16.2091 12 14C12 11.7909 10.2091 10 8 10ZM6 14C6 12.8954 6.89543 12 8 12C9.10457 12 10 12.8954 10 14C10 15.1046 9.10457 16 8 16C7.44744 16 6.94881 15.7772 6.58579 15.4142C6.22276 15.0512 6 14.5526 6 14Z" fill="currentColor"/>
              </svg>
            </span>
            Проверить паспортные данные
          </button>
        </div>
        <div v-if="checkDocumentResult">
          <p v-if="checkDocumentResult.code === 0" class="text-center text-red-700">Некорректные данные</p>
          <p v-else-if="checkDocumentResult.code === 1" class="text-center text-green-700">Данные проверены</p>
        </div>

      </div>
      <!--/form-->
    </div>
</template>
<script>
import { IonDatetime, IonLabel } from '@ionic/vue';
import { getInn } from '../../scripts/Registration.js';
import { setItem, getItem, removeItem} from '../../scripts/Storage.js';
export default {
  props: {
    msg: String
  },
  components: {
    IonDatetime,
    IonLabel
  },
  data () {
    return {
      //selected: '21',
      options: [
        { text: 'Паспорт гражданина Российской Федерации', value: '21' },
        { text: 'Вид на жительство в Российской Федерации', value: '12' },
        { text: 'Разрешение на временное проживание в Российской Федерации', value: '15' },
        { text: 'Свидетельство о предоставлении временного убежища на территории Российской Федерации', value: '19' },
      ],
      documentForm: {
        fam: '',
        name: '',
        och: '',
        birthDate: '2000-01-01',
        doctype: '21',
        docno: '',
        docDate: '2010-01-01',
      },
      checkDocumentResult: null,

      touch: false,
      postNumber: 0,
      postNumberError: false,
    }
  },
  /*validations: {
    documentForm: {
      fam: { required },
      name: { required },
      birthDate: { required },
      docno: { required, noNumericError() { return (/^\d+$/.test(this.documentForm.docno)) } },
    }
  }, */
  computed: {
    docNo: {
      get: function () {
        if(this.documentForm.docno.length > 4) {
          const sl1 = this.documentForm.docno.substring(0,2);
          const sl2 = this.documentForm.docno.substring(2,4);
          const sl3 = this.documentForm.docno.substring(4);
          return sl1+' '+sl2+' '+sl3;
        } else if(this.documentForm.docno.length == 4) {
          const sl1 = this.documentForm.docno.substring(0,2);
          const sl2 = this.documentForm.docno.substring(2,4);
          return sl1+' '+sl2;
        } else if(this.documentForm.docno.length > 2 && this.documentForm.docno.length < 4) {
          const sl1 = this.documentForm.docno.substring(0,2);
          const sl2 = this.documentForm.docno.substring(2);
          return sl1+' '+sl2;
        } else {
          return this.documentForm.docno;
        }
      },
      set: function (newStr) {
        //this.documentForm.docno = newStr.replace(/\s+/g, '').trim()
        this.documentForm.docno = newStr.replace(/\s+/g, '').trim();
        if(this.documentForm.docno.length > 10) {
          this.documentForm.docno = this.documentForm.docno.substring(0,10)
        }
        //console.log(this.documentForm.docno);
      }
    },
    ageRestriction() {
      const sixteenYearsAgo = new Date( Date.now() - (504576000000 - 1) );
      let day = sixteenYearsAgo.getDate();
      let month = sixteenYearsAgo.getMonth();
      let fullYear = sixteenYearsAgo.getFullYear();
      //console.log(day);
      month = month + 1;
      if (day < 10) day = '0' + day;
      if (month < 10) month = '0' + month;
      return fullYear+'-'+month+'-'+day;
    },
    /*Data () {
      return this.transformDate(this.documentForm.birthDate)
    },
    docData () {
      return this.transformDate(this.documentForm.docDate)
    },*/
    timeBreakErrorGet: function () {
      return this.postNumberError;
    },
    noErrors() {
      if (this.documentForm.doctype == '21') {
        return this.documentForm.fam &&
            this.documentForm.name &&
            this.documentForm.docno &&
            this.noNumericError(this.documentForm.docno)
      } else {
        return this.documentForm.fam &&
            this.documentForm.name &&
            this.documentForm.docno
      }
    },
  },
  methods: {
    async checkDocument() {
      this.checkDocumentResult = null;
      /*if (this.documentForm.och.length != 0) {
        patronymic = this.documentForm.och;
      } else {
        patronymic = 'нет';
      }*/
      const birthdate = this.transformDate(this.documentForm.birthDate);
      const docdata = this.transformDate(this.documentForm.docDate);
      const docnumberSaved = this.documentForm.docno;
      //const docnameSaved = this.documentForm.name;
      const sl1 = this.documentForm.docno.substring(0,2);
      const sl2 = this.documentForm.docno.substring(2,4);
      const sl3 = this.documentForm.docno.substring(4);
      let docnumber = sl1+' '+sl2+' '+sl3;
      if (this.documentForm.doctype != '21') docnumber = this.documentForm.docno;
      /*const obj = {
          1: this.documentForm.fam,
          2: this.documentForm.name,
          3: patronymic,
          4: birthdate,
          5: this.documentForm.doctype,
          6: docnumber,
          7: docdata
      }
      console.log(obj)*/
      const surname = this.documentForm.fam;
      const name = this.documentForm.name;
      const patronymic = this.documentForm.och;

      const response = await getInn(
              surname,
              name,
              patronymic,
              birthdate,
              this.documentForm.doctype,//docnumber
              docnumber,
              docdata
          );/*.then(response => {
          return response.text()
        })
      .then((data) => {
        console.log(data ? JSON.parse(data) : {})
      })*/

          /*.then(response => {
              console.log(response);
              return response.json();
          })*/
          /*.then(response => {
              console.log(response);
              this.checkDocumentResult = JSON.parse(JSON.stringify(response.data));
          });*/
      this.checkDocumentResult = JSON.parse(JSON.stringify(response.data));
      console.log(this.checkDocumentResult);

      if (this.checkDocumentResult.code === 1) {
        /*let fullName;
        if (patronymic === '') {
          fullName = surname+' '+name;
        } else {
          fullName = surname+' '+name+' '+patronymic;
        }
        const documentObj = {
          fullName,
          birthdate,
          document: docnumberSaved.replace(/\s+/g, '').trim(),
        };*/
        //console.log(documentObj);
        this.$store.dispatch('SET_DOCUMENT', docnumberSaved);

        this.$store.dispatch('SET_SURNAME', surname);
        this.$store.dispatch('SET_NAME', name);
        this.$store.dispatch('SET_PATRONYMIC', patronymic);
        console.log( this.$store.getters.GET_DOCUMENT,
            this.$store.getters.GET_SURNAME,
            this.$store.getters.GET_NAME,
            this.$store.getters.GET_PATRONYMIC );
      }
    },
    transformDate(oldFormatDate) {
      const ms = new Date( Date.parse(oldFormatDate) );
      let day = ms.getDate();
      let month = ms.getMonth();
      let fullYear = ms.getFullYear();
      //console.log(day);
      month = month + 1;
      if (day < 10) day = '0' + day;
      if (month < 10) month = '0' + month;
      //console.log(day+'.'+month+'.'+fullYear);
      return day+'.'+month+'.'+fullYear;
    },
    timeBreakErrorSet: async function () {
      const maxPostNumber = 5;//сколько раз можно отправлять код на телефон без паузы
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
    noNumericError(str) {
      if (!str) {
        return true
      } else {
        return (/^\d+$/.test(str))
      }
    },
    /*checkForm() {
      this.$v.documentForm.$touch()
      if (!this.$v.documentForm.$error) {
        console.log('Валидация прошла успешно')
        this.$emit('document-post', this.documentForm)
      }
    },*/
    checkForm: function () { //Отправка телефона и сгенерированного кода
      /* function getCookie(name) {
        let value = "; " + document.cookie;
        let parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
      } */
      this.touch = true;
      if (this.noErrors) {
        this.timeBreakErrorSet();
        //if ( getCookie('document_post_break') ) this.postNumberError = true;
        ////this.postNumber = this.postNumber + 1;
        //if (!this.code) this.code = randomInteger();// генерируем случайное число для кода, если код не генерировался прежде
        /*if (this.postNumberError) {
            setTimeout(() => {//если чел вышел и зашёл, phonePostNumberError примет значение true при существовании куки
            document.cookie = "document_post_break=true; max-age=0";
            this.postNumberError = false;
            this.postNumber = 0;
            }, breakTime/2);
        } else if ( this.postNumber > maxPostNumber ) {
          this.postNumberError = true; //запрещаем на время отправку кодов на телефон, если сделано более 3х попыток
          document.cookie = `document_post_break=true; max-age=${breakTime}`;
          setTimeout(() => {
            document.cookie = "document_post_break=true; max-age=0";
            this.postNumberError = false;
            this.postNumber = 0;
            }, breakTime/1);
        } else {
          if (!this.$v.documentForm.$error) {
            console.log('Валидация прошла успешно')
            this.$emit('document-post', this.documentForm)//отправляем телефон на элимент выше
          }
        }*/
        if (!this.timeBreakErrorGet) {

          //this.$emit('document-post', this.documentForm)//отправляем телефон на элимент выше
          this.checkDocument()
        }
      }
    }
  }
}
</script>

<style scoped>
  .is-invalid {
    @apply border-red-600 focus:border-red-600;
    /*border-color: #dc3545;*/
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%23dc3545' viewBox='0 0 12 12'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right calc(.375em + .1875rem) center;
    background-size: calc(.75em + .375rem) calc(.75em + .375rem);
  }
</style>