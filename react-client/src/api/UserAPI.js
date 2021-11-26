import { API_BASE_URL, ACCESS_TOKEN } from '../constants/index.js';

const request = async (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })
    
    if(localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    const response = await fetch(options.url, options);
    const json = await response.json();
    if (!response.ok) {
        return Promise.reject(json);
    }
    return json;
};

export function getCurrentUser() {
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/login",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function sendResetPasswordURL(emailRequest) {
    return request({
        url: API_BASE_URL + "/forgotpassword",
        method: 'POST',
        body: JSON.stringify(emailRequest)
    });
}

export function resetpassword(resetPasswordRequest, token) {
    return request({
        url: API_BASE_URL + "/resetpassword?token=" + token,
        method: 'PUT',
        body: JSON.stringify(resetPasswordRequest)
    });
}

export function verifyEmail(verificationCode) {
    return request({
        url: API_BASE_URL + "/auth/verify?code=" + verificationCode,
        method: 'GET',
    });
}

export function getUserRoles() {
    return request({
        url: API_BASE_URL + "/user/me/roles",
        method: 'GET',
    });
}

export function updateAccount(updateDeatailRequest) {
    return request({
        url: API_BASE_URL + "/user/me/update",
        method: 'PUT',
        body: JSON.stringify(updateDeatailRequest)
    });
}