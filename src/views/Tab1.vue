<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 1</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tab 1</ion-title>
        </ion-toolbar>


      </ion-header>
      <ion-fab vertical="center" horizontal="end" slot="fixed">
        <ion-fab-button @click="takePhoto">
          <ion-icon :icon="cameraOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      <!--p v-if="!photo">Размеры фото: {{photos[photos.length-1].size}}</p-->
      <!--ion-grid>
        <ion-row>
          <ion-col size="6" :key="photo" v-for="photo in photos">
            <ion-img :src="photo.webviewPath"></ion-img>
          </ion-col>
        </ion-row>
      </ion-grid-->
      <!--div :key="index" v-for="(photo, index) in photos">
        <img class="w-64 h-64 rounded-full" :src="photo.webviewPath" alt="">
      </div-->
    <div class="w-full bg-white p-4 space-y-3">
      <!--div>
        <h2 class="mt-6 text-center text-gray-600">
          Выбор рабочей зоны
        </h2>
      </div-->
      <!--form class="mt-8 space-y-6" action="#" method="POST"-->
      <div class="mt-8 space-y-3">
        <!--input type="hidden" name="remember" value="true"-->
        <!--p>class="flex flex-col -space-y-px w-auto h-auto mb-3"</p-->
        <div class="flex flex-col border-dashed border-2 rounded-xl px-2 border-gray-100 -space-y-px w-auto h-auto mb-3">
          <div class="flex justify-center">
            <button @click="showAnnotation" type="button" class="transition duration-300 h-7 w-auto group bg-white rounded-md text-gray-500 inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none">
              <span class="text-xl">Описание</span>
              <!--
                Heroicon name: solid/chevron-down

                Item active: "text-gray-600", Item inactive: "text-gray-400"
              -->
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
                  <!--
                    Heroicon name: solid/chevron-down

                    Item active: "text-gray-600", Item inactive: "text-gray-400"
                  -->
                  <svg class="transform duration-500 ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                       v-bind:class="{ '-rotate-90': ( showText === false)  }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M14.7071 12.7071C14.3166 13.0976 13.6834 13.0976 13.2929 12.7071L10 9.41421L6.70711 12.7071C6.31658 13.0976 5.68342 13.0976 5.29289 12.7071C4.90237 12.3166 4.90237 11.6834 5.29289 11.2929L9.29289 7.29289C9.68342 6.90237 10.3166 6.90237 10.7071 7.29289L14.7071 11.2929C15.0976 11.6834 15.0976 12.3166 14.7071 12.7071Z" clip-rule="evenodd" />
                  </svg>
                </button>
            </div>
        </div>
      <div v-if="croppedPhoto != null" class="w-full relative">
        <img :src="croppedPhoto/*.webviewPath*/" alt="">
        <button class="img-btn2" @click="reShoot">
            <span class="p-1">
              <!--svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white group-hover:text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg-->

              <!--svg xmlns='http://www.w3.org/2000/svg' class='h-8 w-8 text-white group-hover:text-secondary-400' viewBox='0 0 512 512'>
                <path d='M380.93 57.37A32 32 0 00358.3 48H94.22A46.21 46.21 0 0048 94.22v323.56A46.21 46.21 0 0094.22 464h323.56A46.36 46.36 0 00464 417.78V153.7a32 32 0 00-9.37-22.63zM256 416a64 64 0 1164-64 63.92 63.92 0 01-64 64zm48-224H112a16 16 0 01-16-16v-64a16 16 0 0116-16h192a16 16 0 0116 16v64a16 16 0 01-16 16z' fill='currentColor' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'/>
              </svg-->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </span>
          Перефотографировать
        </button>
      </div>
      <div v-else-if="photo != null" class="w-full relative">
        <cropper
          class="cropper mx-auto"
          :src="photo.webviewPath"
          :stencil-props="{
            handlers: {},
            movable: false,
            scalable: false,
          }"
          :stencil-size="{
            width: 250,
            height: 250
          }"
          image-restriction="stencil"
          @change="change"
        />
        <!--preview
          :width="120"
          :height="120"
          :image="result.image"
          :coordinates="result.coordinates"
        /-->
        <button class="img-btn1" @click="cropPhoto">
            <span class="p-1">
              <!--svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white group-hover:text-secondary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg-->

              <svg xmlns='http://www.w3.org/2000/svg' class='h-8 w-8 text-white group-hover:text-secondary-400' viewBox='0 0 512 512'>
                <path d='M380.93 57.37A32 32 0 00358.3 48H94.22A46.21 46.21 0 0048 94.22v323.56A46.21 46.21 0 0094.22 464h323.56A46.36 46.36 0 00464 417.78V153.7a32 32 0 00-9.37-22.63zM256 416a64 64 0 1164-64 63.92 63.92 0 01-64 64zm48-224H112a16 16 0 01-16-16v-64a16 16 0 0116-16h192a16 16 0 0116 16v64a16 16 0 01-16 16z' fill='currentColor' stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2'/>
              </svg>
            </span>
          Обрезать
        </button>
      </div>
      </div>
    </div>
      <!--ExploreContainer name="Tab 1 page" /-->
    </ion-content>
  </ion-page>
</template>

<script>
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
    IonFabButton, IonFab, IonIcon,
    /*IonGrid, IonRow, IonCol, IonImg*/} from '@ionic/vue';
//import ExploreContainer from '@/components/ExploreContainer.vue';
import {  cameraOutline } from "ionicons/icons";
import { takePhoto /*takePhotoBase64*/ } from '@/scripts/usePhotoGallery'

import { Cropper/*, Preview*/ } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

export default  {
  name: 'Tab1',
  components: { /*ExploreContainer,*/ IonHeader, IonToolbar, IonTitle, IonContent, IonPage,
    IonFabButton, IonFab, IonIcon,
    Cropper,
    //Preview
    /*IonGrid, IonRow, IonCol, IonImg*/
  },
  data() {
    return {
      showText: false,
      showButton: false,

      cameraOutline,
      //photos: [],
      photo: null,
      image: null,
      //croppedPhoto: null,

      phoneWasChecked: false,
    }
  },
  computed: {
    croppedPhoto: {
      get: function () {
          return this.$store.getters.GET_SELFIE
      },
      set: function (image) {
        this.$store.dispatch('SET_SELFIE', image);
      }
    }
  },
  methods: {
    change({ coordinates, canvas }) {
      console.log(coordinates, canvas);
      this.image = canvas.toDataURL();
    },
    reShoot() {
      this.takePhoto();
    },
    async takePhoto() {
      this.photo = await takePhoto(); //takePhotoBase64();

      this.croppedPhoto = null;
      this.image = null;
      //this.photos.push(photo);
    },
    cropPhoto() {
      //this.croppedPhoto = { filepath: this.photo.filepath };
      //this.croppedPhoto.webviewPath = this.image;
      this.croppedPhoto = this.image;
    },
    showAnnotation() {
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
    }
  }
}
</script>

<style scoped>
  .cropper {
    @apply w-screen /*w-11/12*/;
    background: #DDD;
  }
  .img-btn1 {
    @apply focus:outline-none text-white;
    position: absolute;
    top: 80%;
    left: 20%;
  }
  .img-btn2 {
    @apply focus:outline-none text-white;
    position: absolute;
    top: 70%;
    left: 20%;
  }
</style>