/**
 * Retrieves an object that contains destinations and format the firestore timestamp to a standard date time.
 * @param id
 * @param object - must contain destinations as an attribute
 * @returns {*&{destinations: (*|[{arrival: *, departure: *, place_id: string}]|[{arrival: *, departure: *, place_id: string}]|[{arrival: *, departure: *, place_id: string}]), id}}
 */
const formatDestinationDates = (id, object) => {
    const destinations = object.destinations;
    const dates = Object.keys(destinations);

    //Format the date for each destination
    dates.forEach(date => {
        const item = destinations[date];
        item.departure = formatFirestoreTimestamp(item.departure);
        item.arrival = formatFirestoreTimestamp(item.arrival);
    });

    return {
        ...object,
        id,
        destinations
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
