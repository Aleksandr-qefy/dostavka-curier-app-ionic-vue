<template>
  <ion-page>
    <div class="h-screen w-screen p-10 background-image">
      <!--ion-spinner size="large" name="crescent" color="light"></ion-spinner-->
      <svg v-if="!coordinatesShouldBeChosen" xmlns="http://www.w3.org/2000/svg" class="animate-spin-slow h-20 w-20 mx-auto my-auto mt-24 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <div v-if="error === 'can\'t get location'" class="w-full grid justify-items-stretch">
        <div class="shadow-md p-3 pb-0 rounded-3xl text-center bg-gray-50 font-medium">
          <h3>Не удалось получить координаты местоположения</h3>
          <p>Для работы приложения необходим доступ к координатам местоположения</p>
        </div>
        <button class="form-button button justify-self-center"
                v-on:click="getAndCheckCountry"
        ><span>Попробовать получить координаты</span></button>
      </div>
      <div v-if="error === 'unapproved country'" class="w-full grid justify-items-stretch">
        <div class="shadow-md p-3 pb-0 rounded-3xl text-center bg-gray-50 font-medium">
          <p>Приложение не работает в стране вашего местоположения ({{country}})</p>
        </div>
        <button class="form-button button justify-self-center"
                v-on:click="getAndCheckCountry"
        ><span>Повторить поиск страны вашего местоположения</span></button>
      </div>

    </div>
  </ion-page>
</template>

<script>
import getCoordinates from "@/scripts/getCoordinates";
import geocodeCoordinates from "@/scripts/geocodeCoordinates";
import { IonPage/*, IonSpinner*/ }from '@ionic/vue';
import * as Storage from "@/scripts/Storage";
//import BaseLayout from "../components/base/BaseLayout.vue";
//import { add } from "ionicons/icons";

export default {
  //props: ['pageTitle'],
  components: {
    IonPage,
    //IonSpinner,
  },
  data() {
    return{
      coordinates: null,
      error: null,
      coordinatesShouldBeChosen: false,
      countryObj: null,
      country: null,
    }
  },
  async mounted() {
    this.coordinatesShouldBeChosen = false;
    this.country = await Storage.getItem('userCountry');
    //this.countryObj.formatted_address = userCountry;
    if (typeof this.country === 'string') {
      await this.checkCountry(this.country)
    }
    else {
      await this.getAndCheckCountry();
    }
  },
  methods: {
    async getAndCheckCountry() {
      this.coordinatesShouldBeChosen = false;
      await this.getCountry();
      if (this.countryObj) {
        this.country = this.countryObj.formatted_address;
        await this.checkCountry(this.country)
      }
    },
    async checkCountry(country) {
      if (this.$approvedCountries.indexOf(country) !== -1) {
        await Storage.setItem('userCountry', country)
        await this.$router.push({ path: '/login' })
        this.coordinatesShouldBeChosen = true;
      }
      else {
        await Storage.setItem('userCountry', country);
        this.coordinatesShouldBeChosen = true;
        this.error = 'unapproved country';
      }
    },
    async getCountry() {
      await this.retryGeolocation()
      if (this.coordinates) {
        const geocodeObj = await geocodeCoordinates(this.coordinates);
        this.countryObj = geocodeObj.results.filter((item) => {
          return item.types.some( (item1) => item1 === "country")
        })[0]
      }
    },
    async retryGeolocation() {
      //this.error = null;
      //this.coordinatesShouldBeChosen = false;
      try {
        this.coordinates = await getCoordinates();
      } catch (err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        this.coordinatesShouldBeChosen = true;
        if (err) this.error = 'can\'t get location'
      }
      //this.coordinatesShouldBeChosen = true;
      console.log(this.coordinates)
      console.log(this.error)
    }
  },
  /*watch: {
    coordinates: async function (cord) {
      this.geocodeObj = await geocodeCoordinates(cord);
      console.log(this.geocodeObj)
      this.countryObj = this.geocodeObj.results.filter((item) => {
        return item.types.some( (item1) => item1 === "country")
      })[0]
      console.log(this.countryObj.formatted_address); //'Россия'
      await Storage.setItem('userCountry', this.countryObj.formatted_address)
    },
  }*/
};
</script>

<style scoped>
  .gradient {
    @apply bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500;
  }
  .button {
    @apply mt-4 w-10/12 py-2 px-1 rounded-full shadow-md text-base;
  }
</style>