
<script>
//import { mapSettings } from "@/constants/mapSettings";
//import store from "@/store/index"
//import {mapGetters, mapMutations} from "vuex";

export default {
  //store: store,
  props: {
    google: {
      type: Object,
      required: true
    },
    map: {
      type: Object,
      required: true
    },
     /*'update-geocoder': {
      type: Function,
      required: true
    },*/
  },
  data() {
    return {}
  },
  mounted() {
    if (this.$store.getters.GET_FORMATTED_ADDRESS == null) {
      let that = this;
      setTimeout(function () {
        if (that.$store.getters.GET_LAST_LOCATION != null ) {
          that.getGeocod()
        } else {
          that.map.setCenter({ lat: 55.753978, lng: 37.620113 });
          console.log('Geocode was not successful for the following reason: NO LAST_LOCATION' );
        }
      }, 2500);
    }
  },
  computed: {
   // ...mapGetters(['GET_LAST_LOCATION']),
  },
  methods: {
    //...mapMutations(['SET_LAST_GEOCODING']),
    getGeocod() {
      let that = this;
      let geocoder = new that.google.maps.Geocoder();
      console.log(that.$store.getters.GET_LAST_LOCATION);
      geocoder.geocode({
        'latLng': that.$store.getters.GET_LAST_LOCATION,
        'country': 'RU',

      }, function (results, status) {
        if (status == 'OK') {
          that.$store.commit('SET_LAST_GEOCODING', results[0]);
          //that.map.setOptions({ center: results[0].geometry.location });
          /*that.lastMarker = new that.google.maps.Marker({
            map: that.map,
            position: results[0].geometry.location,
          })*/
          that.map.setCenter(results[0].geometry.location);
        } else {
          console.log('Geocode was not successful for the following reason: ' + status);
        }
      })
    }
  }
}
</script>