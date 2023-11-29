
const SERVER_URL = 'http://ilptldvmuse14:8010/api'
export const LOGIN_URL = SERVER_URL + "/login"

export const loginRequest = (value, url) => {
    return ({
        url: url,
        init: {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }
    })
}