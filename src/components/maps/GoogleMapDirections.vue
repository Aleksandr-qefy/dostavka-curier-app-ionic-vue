<script>
//import { LINE_PATH_CONFIG } from "@/constants/mapSettings";
//let travelMode = null;
export default {
  props: {
    google: {
      type: Object,
      required: true
    },
    map: {
      type: Object,
      required: true
    },
    waypoints: {
      type: Array,
      required: true
    }
  },
  mounted() {
    let travelMode = 'TRANSIT';
    //const { Polyline } = this.google.maps;
    const DirectionsService = new this.google.maps.DirectionsService();
    //console.log(DirectionsService)
    //const { DirectionsService } = this.google.maps;
    const directionsDisplay = new this.google.maps.DirectionsRenderer({ polylineOptions: { strokeColor: "#ed5929" } });
    directionsDisplay.setOptions({ suppressMarkers: true });
    //console.log(DirectionsRenderer)
    /*new Polyline({
      path: this.path,
      map: this.map,
      ...LINE_PATH_CONFIG
    });*/
    directionsDisplay.setMap(this.map);
    //const start = {lat: 55.847321, lng: 37.639786};
    //const end = new this.google.maps.LatLng(55.855497, 38.548864);
    //this.waypoints.push({lat: 55.737034, lng: 38.017519});
    //this.waypoints.push(end);
    /*new DirectionsService({
      origin: start,
      destination: end,
      travelMode: 'DRIVING',
    });*/
    /*let waypts = [
      {location: {lat: 50.747796, lng: 25.323531}, stopover: true},
      {location: {lat: 50.745726, lng: 25.319925}, stopover: true},
      {location: {lat: 50.743555, lng: 25.325369}, stopover: true},
      {location: {lat: 50.741620, lng: 25.322099}, stopover: true},
      {location: {lat: 50.742370, lng: 25.317764}, stopover: true},
      {location: {lat: 50.740230, lng: 25.317296}, stopover: true},
    ];*/
    let request = {
      origin: this.waypoints[0].position,
      destination: this.waypoints[1].position,
      //waypoints: waypts,
      travelMode, //'DRIVING'

      /*transitOptions: {
        //arrivalTime: Date,
        //departureTime: Date,
        routingPreference: 'LESS_WALKING'
      }*/
    };
    DirectionsService.route(request, function(result, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(result);
    }
  });

  },

  //render() {},
};
</script>