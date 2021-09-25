//General constants
const BASE_API = "http://localhost:5000/";

//Account Types enum
const StateEnum = {
    INACTIVE: 1,
    INCOMPATIBLE: 2,
    ACTIVE: 3,
    TO_BE_REVIEWED: 4,
    REVIEWED: 5
}

Object.freeze(StateEnum);

module.exports = {
    StateEnum,
    BASE_API
}
