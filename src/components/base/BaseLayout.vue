<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <!--ion-buttons slot="start">
          <ion-back-button default-href="pageDefaultBackLink"></ion-back-button>
        </ion-buttons-->
        <ion-buttons slot="start">
          <slot name="actions-start"></slot>
        </ion-buttons>
        <ion-title type="large">{{ pageTitle }}</ion-title>
        <ion-buttons slot="end">
          <slot name="actions-end"></slot>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content scroll-y="false">
      <slot />
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  //IonBackButton,
  IonButtons
} from '@ionic/vue';
export default {
  props: ['pageTitle', 'pageDefaultBackLink'],
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    //IonBackButton,
    IonButtons
  }
};
</script>