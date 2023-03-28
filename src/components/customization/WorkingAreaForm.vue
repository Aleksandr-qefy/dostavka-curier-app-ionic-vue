<template>
    <!--div class="/* max-w-md shadow w-auto rounded-3xl */ bg-white p-4 space-y-3"-->
    <div class="w-full bg-white p-4 space-y-3">
      <div>
        <!--img class="mx-auto h-12 w-auto fill-current text-green-600" src="../assets/svg/document-text.svg" alt="Workflow"-->
        <h2 class="mt-6 text-center text-gray-600">
          Выбор рабочей зоны
        </h2>
      </div>
      <!--form class="mt-8 space-y-6" action="#" method="POST"-->
      <div class="mt-8 space-y-3">
        <!--input type="hidden" name="remember" value="true"-->
        <!--p>class="flex flex-col -space-y-px w-auto h-auto mb-3"</p-->
        <!--div class="flex flex-col border-dashed border-2 rounded-xl px-2 border-gray-100 -space-y-px w-auto h-auto mb-3">
          <div class="flex justify-center">
            <button @click="showAnnotation" type="button" class="transition duration-300 h-7 w-auto group bg-white rounded-md text-gray-500 inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none">
              <span class="text-xl">Описание</span>
              <svg class="transform duration-500 ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                   v-bind:class="{ '-rotate-90': showText }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M12.7071 5.29289C13.0976 5.68342 13.0976 6.31658 12.7071 6.70711L9.41421 10L12.7071 13.2929C13.0976 13.6834 13.0976 14.3166 12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L7.29289 10.7071C6.90237 10.3166 6.90237 9.68342 7.29289 9.29289L11.2929 5.29289C11.6834 4.90237 12.3166 4.90237 12.7071 5.29289Z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          <transition name="fade">
            <p v-show="showText">
              Здесь вы можете выбрать свою рабочую зону. Во время работы мы
              не будем предлагать вам заказы, в которых точки выходят за эту зону.
              Но при выборе вы должны учитывать, часто ли в вашем населённом
              пункте заказывают доставку, не выходящую за границы выбранной вами
              рабочей зоны. Вы можете выбрать несколько населённых пунктов.
            </p>
          </transition>
          <div v-show="showButton" class="flex justify-center">
              <button @click="closeAnnotation" type="button" class="transition duration-300 h-7 w-auto group bg-white rounded-md text-gray-500 inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none">
                  <span class="text-xl">Скрыть описание</span>
                  <svg class="transform duration-500 ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                       v-bind:class="{ '-rotate-90': ( showText === false)  }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M14.7071 12.7071C14.3166 13.0976 13.6834 13.0976 13.2929 12.7071L10 9.41421L6.70711 12.7071C6.31658 13.0976 5.68342 13.0976 5.29289 12.7071C4.90237 12.3166 4.90237 11.6834 5.29289 11.2929L9.29289 7.29289C9.68342 6.90237 10.3166 6.90237 10.7071 7.29289L14.7071 11.2929C15.0976 11.6834 15.0976 12.3166 14.7071 12.7071Z" clip-rule="evenodd" />
                  </svg>
                </button>
            </div>
        </div-->
        <div>
          <!--TravelMap :markers="markers" :routeNumber="routeNumber" class="travel-map"/-->
          <WorkingAreaMap v-if="true" :center="center" />
        </div>
        <!--div class="w-9/12 mx-auto form-button">
            <button @click="showAlert" class="group relative w-full flex justify-center py-2 px-4 form-button">
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg class="h-5 w-5 text-secondary-500 group-hover:text-secondary-400" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" fill="currentColor"/>
                </svg>

              </span>
              Использовать геолокацию
            </button>
        </div-->
        <div class="w-9/12 mx-auto form-button">
            <button @click="addToList" class="group relative w-full flex justify-center py-2 px-4 form-button">
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <!--svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                </svg-->
                <svg class="h-5 w-5 text-secondary-500 group-hover:text-secondary-400" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z" fill="currentColor"/>
                </svg>

              </span>
              Использовать найденный адрес
            </button>
          </div>
        <div class="flex flex-col border-dashed border-2 rounded-xl py-2 px-4 border-primary -space-y-px w-auto h-auto mb-3">
          <div class="grid grid-flow-row auto-rows-max gap-2">
            <h4>{{ title }}</h4>
            <!--button type="button" class="transition duration-300 h-7 w-auto group bg-white rounded-md text-gray-500 inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none">
              <span class="text-lg"></span>
              <svg class="transform duration-500 ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button-->

            <!--button v-for="(item, index) in title" :key="index" @click="titles.splice(index, 1); placesArray.splice(index, 1)" type="button" class="transition duration-300 h-7 w-auto group bg-white rounded-md text-gray-500 inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none">
              <span class="text-lg">{{ item }}-{{index}}</span>
              <svg class="transform duration-500 ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button-->

          </div>
        </div>
        <!--div>
            <button class="group relative w-full flex justify-center py-2 px-4 form-button">
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg class="h-5 w-5 text-secondary-500 group-hover:text-secondary-400" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M4 4C4 2.89543 4.89543 2 6 2H10.5858C11.1162 2 11.6249 2.21071 12 2.58579L15.4142 6C15.7893 6.37507 16 6.88378 16 7.41421V16C16 17.1046 15.1046 18 14 18H12.4722C13.4223 16.9385 14 15.5367 14 14C14 10.6863 11.3137 8 8 8C6.46329 8 5.06151 8.57771 4 9.52779V4Z" fill="currentColor"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M8 10C5.79086 10 4 11.7909 4 14C4 14.7414 4.20229 15.4364 4.55397 16.0318L3.29289 17.2929C2.90237 17.6834 2.90237 18.3166 3.29289 18.7071C3.68342 19.0976 4.31658 19.0976 4.70711 18.7071L5.96818 17.446C6.56362 17.7977 7.25862 18 8 18C10.2091 18 12 16.2091 12 14C12 11.7909 10.2091 10 8 10ZM6 14C6 12.8954 6.89543 12 8 12C9.10457 12 10 12.8954 10 14C10 15.1046 9.10457 16 8 16C7.44744 16 6.94881 15.7772 6.58579 15.4142C6.22276 15.0512 6 14.5526 6 14Z" fill="currentColor"/>
                </svg>
              </span>
              Проверить паспортные данные
            </button>
        </div-->
      </div>
    </div>
</template>
<script>
import WorkingAreaMap from '../maps/WorkingAreaMap.vue';
//import {mapGetters, mapMutations} from 'vuex';
import {loadingController} from "@ionic/vue";
//import {mapMutations} from 'vuex'
export default {
  components: {
    WorkingAreaMap,
  },
  //name: 'WorkingAreaForm',
  props: {
    msg: String
  },
  data () {
    return {
      showText: false,
      showButton: false,
      placeArray: [],
      title: 'Адрес ещё не выбран'
    }
  },
  mounted() {
    if (this.$store.getters.GET_FORMATTED_ADDRESS != null) {
      this.title = this.$store.getters.GET_FORMATTED_ADDRESS.address_string;
    } else {
      this.showAlert();
    }

  },
  computed: {
    center() {
      if (this.$store.getters.GET_FORMATTED_ADDRESS == null) {
        return {lat: 55.753786, lng: 37.620870};
      } else {
        console.log(this.$store.getters.GET_FORMATTED_ADDRESS);
        return this.$store.getters.GET_FORMATTED_ADDRESS.location;
      }
    }
    //...mapGetters(['GET_LAST_LOCATION']),
    //this.$store.getters.GET_LAST_GEOCODING.address_components;
    /*title() {
      return this.placeArray[0].long_name + ' ' + this.placeArray[1].long_name + ' ' + this.placeArray[2].long_name
    }*/
  },
  methods: {
    //...mapMutations(['SET_FORMATTED_ADDRESS']),
    showAlert() {
      let that = this;

      setTimeout( function () {
        if (that.$store.getters.GET_LAST_GEOCODING == null) {
          setTimeout( function () {that.addToList()}, 2000)
        } else {
          that.addToList()
        }
      }, 3000);
      this.presentLoading(3000);
    },
    addToList() {
      function itemIsUnnecessary(item) {
        return item == "postal_code" || item == "floor"
            || item == "post_box" || item == "postal_town"
            || item == "room" //|| item == "street_number"
      }
      if (this.$store.getters.GET_LAST_GEOCODING != null) {
        let lastGeocoding = this.$store.getters.GET_LAST_GEOCODING.address_components;
        console.log(this.$store.getters.GET_LAST_GEOCODING);

        let processedLastGeocoding = lastGeocoding.filter(function(item) {
          return !item.types.some(itemIsUnnecessary);
        });
        this.placeArray = processedLastGeocoding;
        this.title = this.placeArray[0].long_name + ', ' + this.placeArray[1].long_name + ', ' + this.placeArray[2].long_name;
        this.$store.commit('SET_FORMATTED_ADDRESS',  {
          address_components: this.placeArray,
          location: this.$store.getters.GET_LAST_GEOCODING.geometry.location,
          address_string: this.title
        });
        console.log(this.$store.getters.GET_FORMATTED_ADDRESS);
      }
    },
    /*showAnnotation() {
      if (this.showText === false) {
        this.showText = true;
        this.showButton = true;
      } else {
        this.closeAnnotation()
      }

    },
    closeAnnotation() {
      this.showText = false;
      setTimeout(() => {
        this.showButton = false;
        }, 500)
    },*/
    async presentLoading(timeout) {
      const loading = await loadingController
        .create({
          //cssClass: 'my-custom-class',
          message: 'Пожалуйста подождите',
          duration: timeout,
        });

      await loading.present();

      setTimeout(function() {
        loading.dismiss()
      }, timeout);
    },
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>