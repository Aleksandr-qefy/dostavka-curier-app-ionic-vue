<!--template>
  <GoogleMapLoader
    :mapCenter="mapCenter"
    apiKey="AIzaSyAaSVn4aYqSKJ1b40iX-yl1sZrcMrzzZmE"
  >
  // insert your google maps api key to render styled map
    <template slot-scope="{ google, map }">
      <GoogleMapGeocoder
        :google="google"
        :map="map"
      />
      <GoogleMapGeolocationBounds
        :google="google"
        :map="map"
      />
      <GoogleMapGeolocation
        :repeat="false"
        :google="google"
        :map="map"
      />
    </template>
  </GoogleMapLoader>
</template-->
<template>
  <div>
    <div id="style-selector-control" class="map-control">
      <select id="style-selector" class="selector-control">
        <option value="default" selected="selected">Стандартная</option>
        <option value="silver">Белая</option>
        <option value="night">Ночная</option>
        <option value="retro">Ретро</option>
        <option value="hiding">Без значков мест</option>
      </select>
    </div>
    <div
      class="google-map"
      ref="googleMap"
    ></div>
  </div>
</template>

<script>
import {defaultMapObject} from '../../scripts/mapScripts';
import GoogleMapsApiLoader from "google-maps-api-loader";
import {styles} from "../../constants/mapSettings";
export default {
  props: {
    center: {
      type: Object,
      default: function () {
        return {lat: 55.753786, lng: 37.620870}
      }
    }
  },
  components: {

  },
  data() {
    return {
      styles,
      map: null
    }
  },
  async mounted() {
    this.google = await GoogleMapsApiLoader({
      apiKey: "AIzaSyAaSVn4aYqSKJ1b40iX-yl1sZrcMrzzZmE", //!!!!!!!!!!
      region: 'RU',//'EG'
      language: 'ru',//'ar'
      mapTypeControlOptions: {
        mapTypeIds: ["roadmap", "terrain"],
      },
    });
    //this.google = googleMapApi;
    await this.initializeMap();
  },
  methods: {
    initializeMap() {
      const mapContainer = this.$refs.googleMap;
      this.map = new this.google.maps.Map(mapContainer, {
        ...defaultMapObject,
        center: this.center,
      });
      console.log(this.google);
      const styleControl = document.getElementById("style-selector-control");
      this.map.controls[this.google.maps.ControlPosition.LEFT_TOP].push(styleControl);
      // Set the map's style to the initial value of the selector.
      const styleSelector = document.getElementById("style-selector");
      this.map.setOptions({ styles: this.styles[styleSelector.value] });
      // Apply new JSON when the user selects a different style.
      styleSelector.addEventListener("change", () => {
        this.map.setOptions({ styles: this.styles[styleSelector.value] });
      });
    }
  },
  computed: {
    /*mapCenter() {
      return this.$store.getters.GET_LAST_LOCATION;
    }*/
  }
}
</script>

<style scoped>
.google-map {
  width: 100%;
  min-height: 100%;
}

.selector-control {
  background-color: #fff;
  border: 2px solid #fff;
  border-radius: 3px;
  box-shadow: 0 2px 6px rgba(0,0,0,.3);
  cursor: pointer;
  margin-top: 0px;
  margin-left: 10px;
  margin-right: 10px;

  outline: 2px solid transparent;

  text-align: center;

  font-size: 20px;
  line-height: 30px;
  padding-left: 5px;
  padding-right: 5px;
}
</style>
