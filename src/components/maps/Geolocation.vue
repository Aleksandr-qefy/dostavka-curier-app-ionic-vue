<template>
<div>
  <h1>Geolocation</h1>
  <p>Your location is:</p>
  <p>Latitude: {{loc?.coords.latitude}}</p>
  <p>Longitude: {{loc?.coords.longitude}}</p>

  <button @click="getCurrentPosition">
    Get Current Location
  </button>
</div>
</template>

<script>
import { Plugins } from '@capacitor/core'
export default {
  data() {
    return{ loc: null }
  },
  methods: {
    async getCurrentPosition(){
      const { Geolocation } = Plugins;
      const loc = await Geolocation.getCurrentPosition()
      this.loc = loc
    }
  }
}
</script>
