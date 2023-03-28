<template>
  <base-layout page-title="Регистрация" page-default-back-link="/">
    <template v-slot:actions-start>
      <ion-button size="large" @click="goToLogin">
        <ion-icon slot="icon-only" :icon="personCircleOutline"></ion-icon>
      </ion-button>
    </template>
    <template v-if="phoneAndDocumentNotNull" v-slot:actions-end>
      <ion-button size="large" @click="goToCustomization">
        <ion-icon slot="icon-only" :icon="chevronForwardOutline"></ion-icon>
      </ion-button>
    </template>
    <ion-fab v-if="phoneAndDocumentNotNull" vertical="center" horizontal="end" slot="fixed">
      <ion-fab-button @click="goToCustomization">
        <ion-icon :icon="chevronForwardOutline"></ion-icon>
      </ion-fab-button>
    </ion-fab>
    <!--template v-slot:actions-end>
      <ion-button router-link="/">
        <ion-icon slot="icon-only" :icon="add"></ion-icon>
      </ion-button>
    </template>
    <template v-slot:actions-start>
      <ion-button router-link="/">
        <ion-icon slot="icon-only" :icon="add"></ion-icon>
      </ion-button>
    </template-->
    <!--ion-card>
      <ion-card-header>
        <div>
          <img class="mx-auto h-12 w-auto fill-current text-green-600" src="../assets/svg/phone.svg" alt="Workflow">
          <h2 class="mt-6 text-center text-gray-600">
            Телефон
          </h2>
        </div>
      </ion-card-header>

      <ion-card-content>

      </ion-card-content>
    </ion-card-->
    <div class="h-full w-screen background-image p-4 overflow-y-auto space-y-4">
      <phone-registration v-on:phone-checked="phoneWasChecked = true"
                          ref="phoneRegistration" />
      <passport-registration v-if="phoneWasChecked" />
    </div>
  </base-layout>
</template>

<script>
/*import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  //IonContent,
  //IonBackButton,
  IonButtons
} from '@ionic/vue'; */
import axios from '@/scripts/axios'
import BaseLayout from "../components/base/BaseLayout.vue";
import PhoneRegistration from "../components/registration/PhoneRegistration.vue";
import PassportRegistration from "../components/registration/PassportRegistration.vue";
import {
  IonFabButton,
  IonFab,

  IonButton,
  IonIcon,
  alertController
} from "@ionic/vue";
import { personCircleOutline, chevronForwardOutline } from "ionicons/icons";

export default {
  props: ['pageTitle'],
  components: {
    IonFabButton,
    IonFab,

    BaseLayout,
    PhoneRegistration,
    PassportRegistration,
    IonButton,
    IonIcon,
    //IonCard,
    //IonCardHeader,
    //IonCardSubtitle,
    //IonCardTitle,
    //IonCardContent
  },
  data() {
    return {
      personCircleOutline,
      chevronForwardOutline,

      phoneWasChecked: false,
    }
  },
  computed: {
    phone() {
      return this.$store.getters.GET_PHONE
    },
    document() {
      return this.$store.getters.GET_DOCUMENT
    },
    phoneAndDocumentNotNull() {
      return (this.phone !== null) && (this.document !== null)
    }
  },
  methods: {
    async goToCustomization() {
      const that = this;
      console.log('goToCustomization');
      /*const message =
          `Телефон: ${this.phone},
          ${this.document.fullName},
          ${this.document.birthdate},
          ${this.document.number}`*/
      const message =
          `Данные для входа в приложение<br>
            телефон: ${this.phone}, <br>
          серия и номер (слитно): ${this.document}`
      const alert = await alertController
        .create({
          //cssClass: 'ion-margin',//ion-text-center
          header: 'Регистрация',
          message: message,//'Message <strong>text</strong>!!!',
          buttons: [
            {
              text: 'Остаться на странице',
              role: 'cancel',
              //cssClass: 'ion-float-left',
              handler: () => {
                console.log('Confirm Cancel')
              },
            },
            {
              text: 'Зарегистрироваться',
              handler: async () => {
                console.log('Confirm Okay')
                const result = await axios.register({
                  phone: this.$store.getters.GET_PHONE,
                  document: this.$store.getters.GET_DOCUMENT,
                  surname: this.$store.getters.GET_SURNAME,
                  name: this.$store.getters.GET_NAME,
                  patronymic: this.$store.getters.GET_PATRONYMIC
                });
                console.log(result);
                if (typeof result.error == "undefined") {

                  that.$refs.phoneRegistration.stopInterval();
                  await that.$router.push('/login');

                } else if (result.error === "invalid unique violation") {
                  await this.validationError();
                }
                else console.log(result)
              },
            },
          ],
        });
      await alert.present();

      const { role } = await alert.onDidDismiss();
      console.log('onDidDismiss resolved with role', role);
    },
    async goToLogin() {
      const that = this;
      const alert = await alertController
        .create({
          //cssClass: 'ion-margin',//ion-text-center
          header: 'Вернуться к странице входа',
          message: 'При переходе данные не сохранятся',//'Message <strong>text</strong>!!!',
          buttons: [
            {
              text: 'Остаться',
              role: 'cancel',
              //cssClass: 'ion-float-left',
              handler: () => {
                console.log('Confirm Cancel')
              },
            },
            {
              text: 'Перейти',
              handler: () => {
                that.$refs.phoneRegistration.stopInterval();
                this.$router.push('/login');
              },
            },
          ],
        });
      await alert.present();

      const { role } = await alert.onDidDismiss();
      console.log('onDidDismiss resolved with role', role);
    },
    async validationError() {
      const alert = await alertController
        .create({
          //cssClass: 'ion-margin',//ion-text-center
          header: 'Пользователь с подобными данными уже существует',
          //message: 'При переходе данные не сохранятся',//'Message <strong>text</strong>!!!',
          buttons: [
            {
              text: 'Ok',
              role: 'cancel',
              //cssClass: 'ion-float-left',
              handler: () => {
                console.log('Cancel')
              },
            },
          ],
        });
      await alert.present();

      const { role } = await alert.onDidDismiss();
      console.log('onDidDismiss resolved with role', role);
    }
  }
};
</script>

<style scoped>

</style>