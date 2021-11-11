import {searchServices} from "./api-handler";

export const generateItinerary = (data) => searchServices.postRequest(`create/`, data);

export const getPlaceInfo = (id) => searchServices.postRequest(`search/`, {id});
