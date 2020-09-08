/* this component stores a cookie in document.cookie
 * the cookie lasts 1 year and is grabbed during page load using useEffect in APIGrid.js
 *
 * alternative to cookies is localStorage. 
 *
 * to make the cookie readable in other directories like localhost:3000/someOtherDir
 * the path should be set in the cookie i.e. table=cl-advance;path=\;
 */

export const setCookieByValue = (value, name) => { // Stores a cookie called filter using the value of the input. Cookie expires in 1 year
    document.cookie = `${name}=${value};max-age=31536000;SameSite=Strict;`
}

export const getCookieByName = (name) => { // returns cookie value stored even if multiple cookies
    const cookieArr = document.cookie.split(";")
    for(var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=")
        if(name === cookiePair[0].trim()) { // remove whitespace and compare 
            return decodeURIComponent(cookiePair[1]) // decode and return
        }
    }
    return null; // Return null if not found
}

export const deleteCookie = name => { // seting an expiration in the past deletes the cookie
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}