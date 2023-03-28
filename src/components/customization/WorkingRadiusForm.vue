<template>
    <!--div class="max-w-md w-auto rounded-3xl shadow bg-white p-4 space-y-3"-->
    <div class="w-full bg-white p-4 space-y-3">
      <div>
        <!--img class="mx-auto h-12 w-auto fill-current text-green-600" src="../assets/svg/document-text.svg" alt="Workflow"-->
        <h2 class="mt-6 text-center text-gray-600">
          Выбор максимального расстояния до первого адреса
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
          <WorkingRadiusMap :radius="radius" class="travel-map"/>
        </div>
        <div class="flex flex-col border-dashed border-2 rounded-3xl py-2 px-4 border-primary w-auto h-auto mb-3">
          <div class="grid grid-flow-row auto-rows-max gap-2">
            <ion-label>Расстояние: {{ radius }} метров </ion-label>
            <ion-range :min="minRadius" :max="maxRadius" step="100"
              v-model="radius"
              :value="radius"
              v-on:ionInput="radius=$event.target.value"
            >
              <ion-icon size="small" slot="start" :icon="radioButtonOffOutline"></ion-icon>
              <ion-icon slot="end" :icon="radioButtonOffOutline"></ion-icon>
            </ion-range>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import WorkingRadiusMap from '../maps/WorkingRadiusMap.vue';
import { IonRange, IonIcon, IonLabel } from '@ionic/vue';
import { radioButtonOffOutline } from "ionicons/icons";
export default {
  components: {
    WorkingRadiusMap,
    IonRange,
    IonIcon,
    IonLabel
  },
  //name: 'WorkingAreaForm',
  props: {
  },
  data () {
    return {
      radioButtonOffOutline,

      maxRadius: 2500,
      minRadius: 300,
      showText: false,
      showButton: false,
      //mapIsOpen: false,//true,
      defaultRadius: 800,
      //value: 0,
      //value1: 0
    }
  },
  mounted() {
    if (this.$store.getters.GET_RADIUS != null) this.radius = this.$store.getters.GET_RADIUS;
  },
  computed: {
    radius: {
      get: function () {
        if (this.$store.getters.GET_RADIUS) {
          return this.$store.getters.GET_RADIUS
        } else {
          return this.defaultRadius
        }
      },
      set: function (newRadius) {
        this.$store.commit('SET_RADIUS', newRadius);
      }
    }
  },
  methods: {
    //...mapMutations(['SET_FORMATTED_ADDRESS']),
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
  }
}
</script>

<style>
.travel-map {
  height: 400px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
/*
input[type='range'] {
  overflow: hidden;
  width: 80px;
  -webkit-appearance: none;
  background-color: #9a905d;
}

input[type='range']::-webkit-slider-runnable-track {
  height: 10px;
  -webkit-appearance: none;
  color: #13bba4;
  margin-top: -1px;
}

input[type='range']::-webkit-slider-thumb {
  width: 10px;
  -webkit-appearance: none;
  height: 10px;
  cursor: ew-resize;
  background: #434343;
  box-shadow: -80px 0 0 80px #43e5f7;
}

input[type="range"]::-moz-range-progress {
  background-color: #43e5f7;
}

input[type="range"]::-moz-range-track {
  background-color: #9a905d;
}

input[type="range"]::-ms-fill-lower {
  background-color: #43e5f7;
}

input[type="range"]::-ms-fill-upper {
  background-color: #9a905d;
} */
</style>