/**
 * Adds an item to a state array
 * @param item - object needed to be add
 * @param stateArray - array of the useState
 * @param setMethod - set method of the useState
 */
export const addItemToArray = (item, stateArray, setMethod) => {
    const tempArray = [...stateArray];
    tempArray.push(item);
    setMethod(tempArray);
}

/**
 * Removes an item from a state array
 * @param index - object needed to be removed
 * @param stateArray - array of the useState
 * @param setMethod - set method of the useState
 */
export const removeItemFromArray = (index, stateArray, setMethod) => {
    const tempArray = [...stateArray];
    if (index > -1) tempArray.splice(index, 1);
    setMethod(tempArray);
}
