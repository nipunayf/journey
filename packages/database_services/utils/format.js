/**
 * Retrieves an object that contains destinations and format the firestore timestamp to a standard date time.
 * @param id
 * @param object - must contain destinations as an attribute
 * @returns {*&{destinations: (*|[{arrival: *, departure: *, place_id: string}]|[{arrival: *, departure: *, place_id: string}]|[{arrival: *, departure: *, place_id: string}]), id}}
 */
const formatDestinationDates = (id, object) => {
    console.log(object);
    const destinations = object.destinations;
    const dates = Object.keys(destinations);

    dates.sort((a,b) => {
        return new Date(a) - new Date(b);
    })

    const orderedDestinations = {};
    dates.forEach(date => {
        orderedDestinations[date] = destinations[date]
    })


    return {
        ...object,
        id,
        destinations: orderedDestinations
    }
}

const formatUserDates = (object) => {
    const itineraries = object.itineraries;
    const ids = Object.keys(itineraries);

    //Skips if there is no itineraries under the user document
    if (Object.keys(itineraries).length === 0)
        return object;

    //Format the date for each itinerary
    ids.forEach(id => {
        const itinerary = itineraries[id]
        itinerary.startDate = formatFirestoreTimestamp(itinerary.startDate);
        itinerary.endDate = formatFirestoreTimestamp(itinerary.endDate);
    })

    return {
        ...object,
        itineraries
    }
}

/**
 * Formats the given firestore timestamp into a Date object
 * @param timestamp - firestore timestamp
 * @return {Date}
 */
const formatFirestoreTimestamp = timestamp => new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);

module.exports = {
    formatDestinationDates,
    formatUserDates
}