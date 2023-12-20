/* // return the user data from the session storage
export const getUser = () => {
    const userStr = sessionStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    else return null;
} */

// return the user data from the session storage
export const getUserDtl = () => {
    const udtl = sessionStorage.getItem('userdtl');
    if (udtl) return JSON.parse(udtl);
    else return null;
} 

/* // return the token from the session storage
export const getToken = () => {
    return sessionStorage.getItem('token') || null;
} */


/* // remove the token and user from the session storage
export const removeUserSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
} */

// set the token and user from the session storage
/* export const setUserSession = (token, user) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('user', JSON.stringify(user)); 
    
   
}*/

// set the user deails to the session storage
export const setUserSession = (sessJson) => {
    sessionStorage.setItem("userdtl", sessJson);
    
}


// remove the token and user deails from the session storage
export const removeUserSession = () => {
    sessionStorage.removeItem("userdtl");
}

// is auth
export const isAuthenticated = () => {
    let udtl= sessionStorage.getItem("userdtl");
    if (udtl==null) {
        return false;
    }
    let obj = JSON.parse(udtl);
    return obj.isAutenticated;
}

/* // return stored methods
export const getMethod = () => {
    const mStr = localStorage.getItem('method');
    if (mStr) return JSON.parse(mStr);
    else return null;
}

// return stored frequency
export const getFreq = () => {
    const fStr = localStorage.getItem('freq');
    if (fStr) return JSON.parse(fStr);
    else return null;
}
   */