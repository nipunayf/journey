const axios = require('axios');
require('dotenv').config();


export const getPlaceDescription = async (name) => {
    console.log('name is',name)
    console.log("getPlaceDescription start executing")
    const config = {
        method: 'get',
        url: `https://en.wikipedia.org/api/rest_v1/page/summary/${name}`
    };

    // axios(config)
    //     .then(function (response) {
    //         des = response.data.extract;
    //         console.log(des);
    //     })
    //     .catch(function (error) {
    //         console.log('ERROR:',error);
    //     });
    try {

        let response = await axios(config);
        console.log('description is ',response.data.extract);
            return response.data.extract;

    } catch (e) {
        console.log('error in getPlaceDescription')
        console.log(e);
        return 'No Description'

    }

}
export const getPlaceDetails= async (id) => {
    const config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&key=AIzaSyATku-yiZOrGTDU50boXfuwX14EH88S1b0`
    };

    try {
        let response = await axios(config);
        //console.log(response.data.results)
        return response.data.result;

    } catch (e) {
        console.log('error in getPlaceDetails')
        console.log(e);
        return 'No Details'

    }
}

export const getNearbyPlaces = async(data) => {
    console.log("getNearbyPlaces started")
    let location = data.location;
    let radius = data.radius?data.radius:6000;
    // let APIKEY = process.env.GOOGLE_API_KEY ;
    // console.log("APIKEY:",APIKEY)
    console.log('location is:',location);
    const config = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat},${location.lng}&radius=${radius}&type=tourist_attraction&key=AIzaSyATku-yiZOrGTDU50boXfuwX14EH88S1b0`,
    };
    // axios(config)
    //     .then(function (response) {
    //         console.log(JSON.stringify(response.data));
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });
    try {
        console.log(config.url)
        let response = await axios(config);
        //console.log(response.data.results)
        return response.data.results;

    } catch (e) {
        console.log('error in getNearbyPlaces')
        console.log(e);
        return 'No Nearby Places'

    }
}




