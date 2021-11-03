/**
 * Retrieves an object that contains destinations and format the firestore timestamp to a standard date time.
 * @param id
 * @param object - must contain destinations as an attribute
 * @returns {*&{destinations: (*|[{arrival: *, departure: *, place_id: string}]|[{arrival: *, departure: *, place_id: string}]|[{arrival: *, departure: *, place_id: string}]), id}}
 */
const formatDestinationDates = (id, object) => {
    const destinations = object.destinations;
    const dates = Object.keys(destinations);

    dates.sort((a, b) => {
        return new Date(a) - new Date(b);
    })

    const orderedDestinations = {};
    dates.forEach(date => {
        if (typeof destinations[date].arrival == 'object') {
            destinations[date].arrival = formatFirestoreTimestamp(destinations[date].arrival);
            destinations[date].departure = formatFirestoreTimestamp(destinations[date].departure);
        }
        orderedDestinations[date] = destinations[date]
    })

    return {
        ...object,
        id,
        destinations: orderedDestinations
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
    formatFirestoreTimestamp
}
