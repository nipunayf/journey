/**
 * Stores an object to the local storage
 * @param item - item name
 * @param object - storing object
 */
export const storeObject = (item, object) => {
    localStorage.setItem(item, JSON.stringify(object));
}

/**
 * Retrieves a stored object from the local storage
 * @param item - item name
 * @returns {any} - object
 */
export const getObject = (item) =>
    JSON.parse(localStorage.getItem("names"));

/**
 * Updates an existing object
 * @param oldObject
 * @param updatedProperties
 * @returns {*}
 */
export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};



