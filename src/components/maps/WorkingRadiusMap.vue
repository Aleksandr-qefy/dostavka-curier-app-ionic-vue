<template>
  <div class="h-96">
    <div id="style-selector-control" class="map-control">
      <select v-model="mapStyle" @change.capture="changeStyle($event)" id="style-selector" class="selector-control">
        <!--option value="default" selected="selected">Стандартная</option-->
        <option value="default" >Стандартная</option>
        <option value="silver" >Белая</option>
        <option value="night" >Ночная</option>
        <option value="retro" >Ретро</option>
        <option value="hiding" >Без значков мест</option>
      </select>
    </div>
    <div
      class="google-map"
      ref="googleMap"
    ></div>
  </div>
</template>

<script>
//import {defaultMapObject /*, getLocation*/} from '../../scripts/mapScripts';
import GoogleMapsApiLoader from "google-maps-api-loader";
import {styles} from "@/constants/mapSettings";
import {getItem, setItem} from "@/scripts/Storage";
export default {
  props: {
    center: {
      type: Object,
      default: function () {
        return {lat: 55.753786, lng: 37.620870}
      }
    },
    radius: {
      type: Number,
      default: function () {
        return 1000
      }
    }
  },
  data() {
    return {
      styles,
      map: null,
      google: null,
      locationObj: null,
      location: null,
      circle: null,

      mapStyle: null,
    }
  },
  async mounted() {
    this.mapStyle = await getItem('mapStyle');
    console.log(this.mapStyle);
    if (this.mapStyle == null) {
      await setItem('mapStyle', 'default');
      this.mapStyle = 'default';
    }
    this.$store.commit('SET_RADIUS', this.radius);
    this.google = await GoogleMapsApiLoader({
      apiKey: "AIzaSyAaSVn4aYqSKJ1b40iX-yl1sZrcMrzzZmE", //!!!!!!!!!!
      region: 'RU',//'EG'
      language: 'ru',//'ar'
      mapTypeControlOptions: {
        mapTypeIds: ["roadmap", "terrain"],
      },
    });
    //this.$store.dispatch('addMemory', memoryData);
    await this.initializeMap();
    await this.drawCircle();
  },
  methods: {
    async changeStyle(newStyle) {
      console.log(newStyle.target.value);
      await setItem('mapStyle', newStyle.target.value);
    },
    initializeMap() {
      const mapContainer = this.$refs.googleMap;
      this.map = new this.google.maps.Map(mapContainer, {
        //center: this.mapCenter,
        clickableIcons: false,
        streetViewControl: false,
        panControlOptions: false,
        gestureHandling: "cooperative",
        backgroundColor: "#f5f5f5",//#FFAD00
        //mapTypeControl: false,
        zoomControl: false,
        scaleControl: false,
        draggable: false,
        zoom: 12,
        center: this.getCenter,
      });

      console.log(this.google);
      const styleControl = document.getElementById("style-selector-control");
      this.map.controls[this.google.maps.ControlPosition.LEFT_TOP].push(styleControl);
      // Set the map's style to the initial value of the selector.
      const styleSelector = document.getElementById("style-selector");
      styleSelector.value = this.mapStyle;
      this.map.setOptions({ styles: this.styles[styleSelector.value] });
      // Apply new JSON when the user selects a different style.
      styleSelector.addEventListener("change", () => {
        this.map.setOptions({ styles: this.styles[styleSelector.value] });
      });
    },
    drawCircle() {
      //const { Polyline } = this.google.maps;
      //const DirectionsService = new this.google.maps.DirectionsService();
      if (this.circle != null) {
        this.circle.setMap(null);
      }
      this.circle = new this.google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map: this.map,
        center: this.getCenter,
        radius: this.radius//Math.sqrt(citymap[city].population) * 100,
      });
    }
  },
  watch: {
    radius: function () {
      //this.$store.commit('SET_RADIUS', this.radius)
      //console.log(this.$store.getters.GET_LAST_LOCATION)
      this.drawCircle();
    }
  },
  computed: {
    getCenter() {
       if (this.$store.getters.GET_FORMATTED_ADDRESS == null) {
         console.log(this.$store.getters.GET_FORMATTED_ADDRESS);
         return this.center;
      } else {
         return this.$store.getters.GET_FORMATTED_ADDRESS.location;
      }
    },
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