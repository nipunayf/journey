/**
 * Format the firestore timestamp to a standard date time.
 * @param id
 * @param object
 * @returns {*&{destinations: (*|[{arrivalDatetime: *, departureDatetime: *, place_id: string}]|[{arrivalDatetime: *, departureDatetime: *, place_id: string}]|[{arrivalDatetime: *, departureDatetime: *, place_id: string}]), id}}
 */
const formatDatetime = (id, object) => {
    const destinations = object.destinations;
    destinations.forEach(item => {
        item.departureDatetime = new Date(item.departureDatetime.seconds * 1000 + item.departureDatetime.nanoseconds / 1000000)
        item.arrivalDatetime = new Date(item.arrivalDatetime.seconds * 1000 + item.arrivalDatetime.nanoseconds / 1000000)
    });

    return {
        ...object,
        id,
        destinations
    }
}

module.exports = {
    formatDatetime
}
