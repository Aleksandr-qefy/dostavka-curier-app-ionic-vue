import { Plugins } from '@capacitor/core'
const { Geolocation } = Plugins;

export default async function () {
  /*return new Promise(function(resolve, reject) {
    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    }
    function success(pos) {
      const crd = pos.coords;
      console.log(crd);
      //console.log('Ваше текущее метоположение:');
      console.log(`Широта: ${crd.latitude}`);
      console.log(`Долгота: ${crd.longitude}`);
      console.log(`Плюс-минус ${crd.accuracy} метров.`);
      //that.$store.commit('SET_LAST_LOCATION', {lat: crd.latitude, lng: crd.longitude});
      const coordinates = {lat: crd.latitude, lng: crd.longitude};
      resolve(coordinates);
    }
    function error(err) {
      console.log(err);
      //console.warn(`ERROR(${err.code}): ${err.message}`);
      //alert(`ERROR(${err.code}): ${err.message}`);
      reject(err);
      //resolve(null);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
  })*/
  const loc = await Geolocation.getCurrentPosition();
  console.log(loc);
  const location = {
    lat: loc.coords.latitude,
    lng: loc.coords.longitude
  };
  return location
}

