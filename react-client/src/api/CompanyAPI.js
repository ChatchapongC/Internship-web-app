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


export function getCompany() {
    return request({
        url: API_BASE_URL + "/company/profile",
        method: 'GET'
    });
}

export function updateCompany(updateRequest) {
    return request({
        url: API_BASE_URL + "/company/profile/update",
        method: 'PUT',
        body: JSON.stringify(updateRequest)
    });
}
export function getCompanyById(companyId) {
    return request({
        url: API_BASE_URL + "/company/"+companyId,
        method: 'GET'
    });
}

export function getCompanyJobs() {
    return request({
        url: API_BASE_URL + "/company/jobs",
        method: 'GET'
    });
}

export function getApplyCandidate(jobId) {
    return request({
        url: API_BASE_URL + "/company/job/" + jobId + "/candidates",
        method: 'GET'
    });
}

export function updateViewd(candidateId, jobId) {
    return request({
        url: API_BASE_URL + "/company/update-status/viewed/candidate/"+ candidateId + "/" + jobId,
        method: 'PUT'
    });
}

export function updatePass(candidateId, jobId) {
    return request({
        url: API_BASE_URL + "/company/update-status/pass/candidate/"+ candidateId + "/" + jobId,
        method: 'PUT'
    });
}

export function updateDecline(candidateId, jobId) {
    return request({
        url: API_BASE_URL + "/company/update-status/decline/candidate/"+ candidateId + "/" + jobId,
        method: 'PUT'
    });
}

