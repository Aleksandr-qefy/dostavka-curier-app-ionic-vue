<!-- important to add this lines into <head> in public/index/html -->
<!--head>
  < . . . . . . >
    <meta name="google-signin-scope" content="profile email">
    <meta name="google-signin-client_id" content="765987205515-4fua48qm6l61iv0vjlg34mmjt0bqnog2.apps.googleusercontent.com">
    <script src="https://apis.google.com/js/platform.js" async defer></script>
 </head-->

<template>
  <div v-bind:class="classObj">
    <div id="google-signin-button" :data-onsuccess="onSignIn" data-theme="dark"></div>
    <button v-if="isSignedIn" @click="signOut"> Выйти </button>
    <!--button @click="signIn"> Войти </button-->
  </div>
</template>
<script>

import axios from "@/scripts/axios";

export default {
  props: {
    class: String
  },
  /*components: {

  },*/
  data () {
    return {
      isSignedIn: false
    }
  },
  mounted() {
    window.gapi.signin2.render('google-signin-button', {
      onsuccess: this.onSignIn,
      scope: 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      //'onsuccess': onSuccess,
    })
  },
  computed: {
    classObj: function () {
      return {
        [this.class] : true
      }
    },
  },
  methods: {
    signOut () {
      const GoogleAuth = window.gapi.auth2.getAuthInstance();
      GoogleAuth.signOut();
      this.isSignedIn = false;
    },
    /*signIn () {
      const GoogleAuth = window.gapi.auth2.getAuthInstance();
      GoogleAuth.signIn();
    },*/
    async onSignIn (googleUser) {
      this.isSignedIn = true;
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
  }
}
</script>

<style scoped>

</style>