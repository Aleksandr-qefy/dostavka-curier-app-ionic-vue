import axios from 'axios';
const googleMapsKey = require('../constants/mapSettings').GOOGLE_MAPS_KEY
export default async function (coordinates) {
  //https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY
  const json = await axios({
    method: 'get',
    url:
`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.lat},${coordinates.lng}&key=${googleMapsKey}`,
    });
    return json.data
}