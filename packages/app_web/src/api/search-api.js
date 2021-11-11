import {searchServices} from "./api-handler";

export const generateItinerary = (data) => searchServices.postRequest(`create/`, data);
