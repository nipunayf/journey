import * as configJSON from './google_maps_config.json';
import {mapsServices, wikiServices} from "./api-handler";
import {BaseURLEnum} from "../utils/constants";

const API_KEY = configJSON.API_KEY

export const getPlacePhoto = photoReference => `${BaseURLEnum.GOOGLE_MAPS}place/photo?maxwidth=400&photo_reference=${photoReference}&key=${API_KEY}`

export const getPlaceDetails = id => mapsServices.getRequest(`place/details/json?place_id=${id}&key=${API_KEY}`,false,'result');

export const getNearbyPlaces = data => {
    let location = data.location;
    let radius = data.radius?data.radius:6000;
    console.log(`place/nearbysearch/json?location=${location.lat},${location.lng}&radius=${radius}&type=tourist_attraction`);
    return mapsServices.getRequest(`place/nearbysearch/json?location=${location.lat},${location.lng}&radius=${radius}&type=tourist_attraction&key=${API_KEY}`)
}

export const getPlaceDescription = name => wikiServices.getRequest(`page/summary/${name}`,false, 'extract');
