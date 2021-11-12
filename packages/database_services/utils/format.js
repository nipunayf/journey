/**
 * Retrieves an object that contains destinations and format the firestore timestamp to a standard date time.
 * @param id
 * @param object - must contain destinations as an attribute
 * @returns {*&{destinations: (*|[{arrival: *, departure: *, place_id: string}]|[{arrival: *, departure: *, place_id: string}]|[{arrival: *, departure: *, place_id: string}]), id}}
 */
const formatDestinationDates = (id, object) => {
    const destinations = object.destinations;
    let dates;
    if (object.destinations)
        dates = Object.keys(destinations);
    else return {
        ...object,
        id
    }

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

/**
 * Moves the date by the given diff number
 * @param date date string
 * @param diff different in number of days
 * @return {string}
 */
const shiftDate = (date, diff) => {
    date = date.seconds ? formatFirestoreTimestamp(date) : date;
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + diff);
    return currentDate.toLocaleString("en-US", {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});
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

module.exports = {
    formatDestinationDates,
    formatFirestoreTimestamp,
    shiftDate,
    formatUserDates
}
