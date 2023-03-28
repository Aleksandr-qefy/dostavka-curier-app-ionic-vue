<script>
//import { LINE_PATH_CONFIG } from "@/constants/mapSettings";
import { POINT_MARKER_ICON_CONFIG } from "@/constants/mapSettings";
import store from "@/store/index"
import {mapMutations} from 'vuex'
export default {
  store: store,
  props: {
    google: {
      type: Object,
      required: true
    },
    map: {
      type: Object,
      required: true
    },
    repeat: {
      type: Boolean,
      required: true
    },
     /*getLocation: {
      type: Function,
      required: true
    },*/
  },
  data() {
    return {
      lastMarker: null,
    }
  },
  mounted() {
    let that = this;
    //this.getLocation()
    if (this.repeat === false) {
       this.getLocation();
    } else if (this.repeat === true) {
      setInterval(function() {
        that.getLocation();
      }, 1000);
    }

  },
  methods: {
    ...mapMutations(['SET_LAST_LOCATION']),
    getLocation() {
      let that = this;
      //this.getLocation()
      let options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }

      function success(pos) {
        let crd = pos.coords;
        console.log(crd);
        //console.log('Ваше текущее метоположение:');
        console.log(`Широта: ${crd.latitude}`);
        console.log(`Долгота: ${crd.longitude}`);
        console.log(`Плюс-минус ${crd.accuracy} метров.`);
        that.$store.commit('SET_LAST_LOCATION', {lat: crd.latitude, lng: crd.longitude});
        that.map.setCenter({lat: crd.latitude, lng: crd.longitude});
        new that.google.maps.Marker({
          map: that.map,
          position: {lat: crd.latitude, lng: crd.longitude},
          icon: POINT_MARKER_ICON_CONFIG
        })
      }

      function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        //alert(`ERROR(${err.code}): ${err.message}`);
      }

      navigator.geolocation.getCurrentPosition(success, error, options);
    }
  }
}
</script>