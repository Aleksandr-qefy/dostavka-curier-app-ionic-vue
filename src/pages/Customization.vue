<template>
  <ion-page>
    <!--ion-header>
      <ion-toolbar>
        <ion-title type="large">
          <h2 class="font-medium">
            {{ title }}
          </h2>
        </ion-title>
      </ion-toolbar>
    </ion-header-->
    <ion-content :fullscreen="true">
      <!--div class="absolute inset-x-0 top-0 w-full">
        <h2 class="font-medium text-center">
          {{ title }}
        </h2>
      </div-->
      <router-view></router-view>
    </ion-content>
    <IonFooter className="ion-no-border">
      <ion-progress-bar color="secondary" :value="proportion*urlNumber" :buffer="proportion*(urlNumber+1)"></ion-progress-bar>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button @click="goBack" v-if="!(urlNumber == 0)">
            <ion-icon slot="icon-only" :icon="arrowBackOutline"></ion-icon>
            <!--slot name="actions-start"></slot-->
          </ion-button>
          <ion-button v-else></ion-button>
          <ion-button></ion-button>
          <!--ion-button>
            <ion-icon slot="icon-only" :icon="search"></ion-icon>
          </ion-button-->
        </ion-buttons>
        <!--ion-title type="large"-->
        <ion-title type="">
          <h2 class="font-bold text-center">
            Настройки
          </h2>
        </ion-title>
        <!--ion-buttons slot="secondary">
          <ion-button>
            <ion-icon slot="icon-only" :icon="personCircle"></ion-icon>
          </ion-button>
        </ion-buttons-->
        <ion-buttons slot="primary">
          <ion-button @click="showExtraInformation">
            <!--slot name="actions-end"></slot-->
            <ion-icon slot="icon-only" :icon="informationCircleOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
        <ion-buttons slot="end">
          <ion-button @click="goForward" v-if="!(urlNumber == componentsUrl.length-1)">
            <!--slot name="actions-end"></slot-->
            <ion-icon slot="icon-only" :icon="arrowForwardOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </IonFooter>
  </ion-page>
</template>

<script>
//import BaseLayout from "../components/base/BaseLayout.vue";
import {
    alertController,
    IonPage,
    //IonHeader,
    IonFooter,
    IonToolbar,
    IonTitle,
    IonContent,
    IonProgressBar,
  //IonBackButton,
    IonButtons,
    IonButton,
    IonIcon
} from '@ionic/vue';
import { arrowBackOutline, arrowForwardOutline, informationCircleOutline } from "ionicons/icons";
export default {
  components: {
    //BaseLayout,
    IonPage,
    //IonHeader,
    IonFooter,
    IonToolbar,
    IonTitle,
    IonContent,
    IonProgressBar,
    //IonBackButton,
    IonButtons,
    IonButton,
    IonIcon,
  },
  data() {
    return {
      arrowBackOutline,
      arrowForwardOutline,
      informationCircleOutline,
      //urlNumber: 0,
      componentsUrl: [
        '/customization/profile_picture',
        '/customization/working_area',
        '/customization/working_radius',
        '/customization/travel_mode',
        '/customization/all_settings'
      ],
      urlTitles: [
        `Выбор аватарки`,
        `Здесь вы можете выбрать свою рабочую зону. Во время работы мы
        не будем предлагать вам заказы, в которых точки выходят за эту зону.
        Но при выборе вы должны учитывать, часто ли в вашем населённом
        пункте заказывают доставку, не выходящую за границы выбранной вами
        рабочей зоны. Вы можете выбрать несколько населённых пунктов.`,
        'Выбор максимального расстояния до первого адреса',
        'Выбор способа передвижения',
        'Список настроек'
      ],
      //tau: 170,
      //ticks: 0,
      //titleLength: 18,
      proportion: 0
    }
  },
  computed: {
    extraInformation() {
     return this.urlTitles[this.urlNumber];
    },
    /*title() {
      let string = this.urlTitles[this.urlNumber];
      if(string.length > this.titleLength) string += '    ';
      return string;
    },
    titleSubstring() {
      const string = this.title;
      return string.substring(this.ticks, this.ticks + this.titleLength);
    },*/
    urlNumber() {
      return this.componentsUrl.indexOf(this.$route.path);
    }
  },
  mounted() {
    this.proportion = 1 / ( this.componentsUrl.length - 1 );
    /*const that = this;
    setInterval(() =>{
      if (that.title.length <= that.ticks) {
        that.ticks = 0;
      } else {
        that.ticks++;
      }
    }, that.tau)*/
  },
  methods: {
    async showExtraInformation() {
      const alert = await alertController
        .create({
          cssClass: '',
          header: 'Дополнительная информация',
          //subHeader: 'Subtitle',
          message: this.extraInformation,
        });
      return alert.present();
    },
    goForward() {
      this.$router.push(this.componentsUrl[this.urlNumber + 1]);
    },
    goBack() {
      this.$router.push(this.componentsUrl[this.urlNumber - 1]);
    }
  }
};
</script>

<style scoped>

</style>