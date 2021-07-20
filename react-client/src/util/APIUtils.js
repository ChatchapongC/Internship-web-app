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

//Just for smaple data for job
export function getCurrentJob() {
    return request({
        url: API_BASE_URL + "/api/job/all",
        method: 'GET'
    });
}

//Just for smaple data for job
export function getRecommedJob() {
    return request({
        url: API_BASE_URL + "/api/job/recommended",
        method: 'GET'
    });
}

//Just for smaple data for job
export function getJobDetail(id) {
    return request({
        url: API_BASE_URL + "/api/job/" + id,
        method: 'GET'
    });
}

//Post job 
export function postJob(jobdetail) {
    return request({
        url: API_BASE_URL + "/api/job/post",
        method: 'POST',
        body: JSON.stringify(jobdetail)
    });
}


export function getCurrentbusiness(){
    if(!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/api/business/all",
        method: 'GET'
    });
}

export function forgotpassword(forgotPassword) {
    return request({
        url: API_BASE_URL + "/forgotpassword",
        method: 'POST',
        body: JSON.stringify(forgotPassword)
    });
}

export function resetpassword(resetPasswordRequest, token) {
    return request({
        url: API_BASE_URL + "/resetpassword?token=" + token,
        method: 'PUT',
        body: JSON.stringify(resetPasswordRequest)
    });
}

export function getAllUsers() {
    return request({
        url: API_BASE_URL + "/admin/users",
        method: 'GET',
    });
}
