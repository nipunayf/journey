import * as configJSON from './google_maps_config.json';
import {wikiServices} from "./api-handler";
import {BaseURLEnum} from "../utils/constants";

const API_KEY = configJSON.API_KEY

export const getPlacePhoto = photoReference => `${BaseURLEnum.GOOGLE_MAPS}place/photo?maxwidth=400&photo_reference=${photoReference}&key=${API_KEY}`

export const getDescription = name => wikiServices.getRequest(`page/summary/${name}`, 'extract');
