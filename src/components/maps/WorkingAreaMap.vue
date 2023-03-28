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
    <GoogleMapGeolocationBounds v-if="google && map"
    :google="google"
    :map="map"
    />
   <div id="address" class="address">
     <input v-model.trim="inputAddress" type="text" placeholder="Введите город" id="input" class="input">
     <button @click="adressComparison()" :disabled="inputAddress.length < 4" class="button">Найти</button>
   </div>
  </div>
</template>

<script>
import {defaultMapObject /*, getLocation*/} from '@/scripts/mapScripts';
import GoogleMapsApiLoader from "google-maps-api-loader";
import GoogleMapGeolocationBounds from "@/components/maps/GoogleMapGeolocationBounds.vue";
import { POINT_MARKER_ICON_CONFIG } from "@/constants/mapSettings";
import {styles} from "@/constants/mapSettings";
import { Plugins } from '@capacitor/core'
import { setItem, getItem} from '@/scripts/Storage';
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
    GoogleMapGeolocationBounds
  },
  data() {
    return {
      styles,
      map: null,
      google: null,
      locationObj: null,
      location: null,

      geocoder: null,
      inputAddress: '',
      lastMarker: null,
      lastPoint: null,
      addressesChecked: {},
      lastAddress: "",

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
    this.google = await GoogleMapsApiLoader({
      apiKey: this.$googleMapsKey,//"AIzaSyAaSVn4aYqSKJ1b40iX-yl1sZrcMrzzZmE", //!!!!!!!!!!
      region: 'RU',//'EG'
      language: 'ru',//'ar'
      mapTypeControlOptions: {
        mapTypeIds: ["roadmap", "terrain"],
      },
    });
    //this.$store.dispatch('addMemory', memoryData);
    await this.initializeMap();
    await this.getCurrentPosition();

  },
  computed: {
    /*mapStyle: {
      get: async function () {
        let mapStyle;
        try {
          mapStyle = getItem('mapStyle')
        } catch (e) {
          console.log(e)
        } finally {
          if (mapStyle) {
            return mapStyle;
          } else {
            setItem('mapStyle', 'default');
            return 'default';
          }
        }
        //const mapStyle = await getItem('mapStyle')
      },
      set: function (newStyle) {
        setItem('mapStyle', newStyle);
      }
    }*/
  },
  methods: {
    async changeStyle(newStyle) {
      console.log(newStyle.target.value);
      await setItem('mapStyle', newStyle.target.value);
    },
    async getCurrentPosition()  {
      const { Geolocation } = Plugins;
      const loc = await Geolocation.getCurrentPosition();
      this.location = {
        lat: loc.coords.latitude,
        lng: loc.coords.longitude
      };
      //console.log(this.location);
      //this.location = JSON.parse(JSON.stringify(this.location));
      //console.log(this.location);
      //const loc2 = Object.assign({}, this.location);
      //console.log(JSON.stringify(this.location));
      this.$store.commit('SET_LAST_LOCATION', this.location);
      //this.$store.dispatch('SET_LAST_LOCATION', this.location);
      console.log(this.$store.getters.GET_LAST_LOCATION);
      new this.google.maps.Marker({
        map: this.map,
        position: this.location,
        icon: POINT_MARKER_ICON_CONFIG
      })
    },
    initializeMap() {
      const mapContainer = this.$refs.googleMap;
      this.map = new this.google.maps.Map(mapContainer, {
        ...defaultMapObject,
        center: this.center,
      });

      this.map.setOptions({ zoomControl: false});
      this.geocoder = new this.google.maps.Geocoder();
      //this.inputAddress = 'Москва';
      const inputForm = document.getElementById("address");
      this.map.controls[this.google.maps.ControlPosition.BOTTOM_CENTER].push(inputForm);

      console.log(this.google);
      const styleControl = document.getElementById("style-selector-control");
      this.map.controls[this.google.maps.ControlPosition.LEFT_TOP].push(styleControl);
      // Set the map's style to the initial value of the selector.
      const styleSelector = document.getElementById("style-selector");
      //styleSelector.value = this.mapStyle;
      styleSelector.value = this.mapStyle;
      this.map.setOptions({ styles: this.styles[styleSelector.value] });
      // Apply new JSON when the user selects a different style.
      styleSelector.addEventListener("change", () => {
        this.map.setOptions({ styles: this.styles[styleSelector.value] });
      });
    },
    adressComparison() {
      if (this.lastMarker !== null) {
        console.log(this.lastMarker);
        this.lastMarker.setMap(null);
      }
      let lowerCaseAddress = this.inputAddress.toLowerCase();
      if (this.addressesChecked[lowerCaseAddress] != undefined) { //Есди такой элимент есть, то выполняем следующее...
        this.$store.commit('SET_LAST_GEOCODING', this.addressesChecked[lowerCaseAddress]);
        this.lastAddress = this.addressesChecked[lowerCaseAddress].formatted_address
        let position = {lat: this.addressesChecked[lowerCaseAddress].geometry.location.lat(), lng: this.addressesChecked[lowerCaseAddress].geometry.location.lng()}
        console.log(position)
        this.lastMarker = new this.google.maps.Marker({
          map: this.map,
          position //: results[0].geometry.location,
        })
        this.map.setCenter(position);
        console.log('*');
        console.log(this.addressesChecked[lowerCaseAddress]);
      } else {
        this.codeAddress();
      }
    },
    codeAddress() {
      let that = this;
      //console.log(typeof this.lastMarker)
      //this.lastMarker.setVisible(false)
      //let address = document.getElementById('address').value;
      console.log(this.inputAddress);
      this.geocoder.geocode( {
        'address': this.inputAddress,
        'country': 'RU'

      }, function (results, status) {
        if (status == 'OK') {
          //console.log(results[0].geometry.location.lat());
          //const lat = results[0].geometry.location.lat(); const lng = results[0].geometry.location.lng(); console.log('lat: '+lat+' '+'lng: '+lng);
          //console.log(results[0]);
          //this.lastPoint = JSON.parse(JSON.stringify(results[0]));
          /*that.addressesChecked.push({
            [that.inputAddress.toLowerCase()]: results[0]
          });*/
          that.addressesChecked[that.inputAddress.toLowerCase()] = results[0];
          console.log(that.addressesChecked);
          that.$store.commit('SET_LAST_GEOCODING', results[0]);
          //that.map.setOptions({ center: results[0].geometry.location });
          that.lastAddress = results[0].formatted_address
          //this.map.setCenter(results[0].geometry.location);
          that.lastMarker = new this.google.maps.Marker({
            map: that.map,
            position: results[0].geometry.location,
          })
          that.map.setCenter(results[0].geometry.location);
          //this.map.setCenter(results[0].geometry.location);
          /*this.map.setCenter(results[0].geometry.location);
          let marker = new this.google.maps.Marker({
              map: map,
              position: results[0].geometry.location
          });*/
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
        //console.log(this.lastPoint);
      });
    }
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
.input {
  flex: 1 1 auto;
  font-size: 20px;
  line-height: 25px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  outline: 2px solid transparent;
  opacity: 0.9;

  background-color: #fff;
  border: 2px solid #fff;
  /*border-radius: 3px;*/
  box-shadow: 0 2px 6px rgba(0,0,0,.3);
  width: 75%;
}
.address {
  /*padding-left: 5px;
  padding-right: 5px;*/
  margin-right: 20px;
  margin-left: 20px;
  margin-bottom: 24px;
  height: auto;
  display: inline-flex;
}
.button {
  flex: 1 1 auto;
  font-size: 20px;
  line-height: 25px;
  padding-left: 2px;
  padding-right: 2px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  outline: 2px solid transparent;

  background-color: #fff;
  border: 2px solid #fff;
  /*border-radius: 3px;*/
  box-shadow: 0 2px 6px rgba(0,0,0,.3);
}
</style>