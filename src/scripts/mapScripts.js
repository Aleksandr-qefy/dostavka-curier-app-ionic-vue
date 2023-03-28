//import {POINT_MARKER_ICON_CONFIG} from "@/constants/mapSettings";

async function getLocation () {
  let position = {};
  let options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  };
  function success(pos) {
    let crd = pos.coords;
    //console.log(crd);
        //console.log('Ваше текущее метоположение:');
    //console.log(`Широта: ${crd.latitude}`);
    //console.log(`Долгота: ${crd.longitude}`);
    //console.log(`Плюс-минус ${crd.accuracy} метров.`);
    position = Object.assign(position,{lat: crd.latitude, lng: crd.longitude});
        //that.$store.commit('SET_LAST_LOCATION', {lat: crd.latitude, lng: crd.longitude});
        /*that.map.setCenter({lat: crd.latitude, lng: crd.longitude});
        new that.google.maps.Marker({
          map: that.map,
          position: {lat: crd.latitude, lng: crd.longitude},
          icon: POINT_MARKER_ICON_CONFIG
        })*/
  }
  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    position = null;
        //alert(`ERROR(${err.code}): ${err.message}`);
  }
  await navigator.geolocation.getCurrentPosition(success, error, options);
  return position;
}

let defaultMapObject = {
  //center: this.mapCenter,
  clickableIcons: false,
  streetViewControl: false,
  panControlOptions: false,
  gestureHandling: "cooperative",
  backgroundColor: "#f5f5f5",//#FFAD00
  //mapTypeControl: false,
  zoomControlOptions: {
    style: "SMALL"
  },
  zoom: 13,
  minZoom: 10,
  maxZoom: 19,
}

export {getLocation, defaultMapObject};