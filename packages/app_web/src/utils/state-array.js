/**
 * Adds an item to a state array
 * @param item - object needed to be add
 * @param stateArray - array of the useState
 * @param setMethod - set method of the useState
 */
export const addItemToArray = (item, stateArray, setMethod) => {
    const tempSkills = [...stateArray];
    tempSkills.push(item);
    setMethod(tempSkills);
}
