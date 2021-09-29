/**
 * Returns a Date object to the given time string
 *
 * @param {string} timeString - should be of the format 'HH:MM'
 *
 * @return {string} - formatted date string
 */
export const formatTime = timeString => {
    const [hours, mins] = timeString.split(':');
    const dateObj = new Date(1970,0,0, parseInt(hours.trim()), parseInt(mins.trim()));
    const timeOptions = { hour12: true, hour: "2-digit", minute: "2-digit"}

    return dateObj.toLocaleTimeString('en-us',timeOptions);
}

export const formatDate = (dateString, isShortDate = false) => {
    const longOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    const shortOptions = { year: 'numeric', month: 'long', day: 'numeric' }

    return new Date(dateString).toLocaleDateString("en-US", shortOptions)
}