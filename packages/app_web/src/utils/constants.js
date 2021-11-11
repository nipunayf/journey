/**
 * Enumerator for itinerary states
 * @type {{TO_BE_REVIEWED: number, REVIEWED: number, ACTIVE: number, INACTIVE: number, INCOMPATIBLE: number}}
 */
const StateEnum = {
    INACTIVE: 1,
    INCOMPATIBLE: 2,
    ACTIVE: 3,
    TO_BE_REVIEWED: 4,
    REVIEWED: 5,
    ANY: 0
}
Object.freeze(StateEnum);

/**
 * Enumerator for BASE URLs
 * @type {{DATABASE_SERVICE: string}}
 */
const BaseURLEnum = {
    // DATABASE_SERVICE: 'http://143.198.169.68/',
    DATABASE_SERVICE: 'http://localhost:5000',
    GOOGLE_MAPS: 'https://maps.googleapis.com/maps/api/',
    WIKIPEDIA: 'https://en.wikipedia.org/api/rest_v1/'
}
Object.freeze(BaseURLEnum);

module.exports = {
    StateEnum,
    BaseURLEnum
}
