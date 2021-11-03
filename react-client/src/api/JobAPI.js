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

export function getAllJobs() {
    return request({
        url: API_BASE_URL + "/job/all",
        method: 'GET'
    });
}

export function getJobDetailById(jobId) {
    return request({
        url: API_BASE_URL + "/job/" + jobId,
        method: 'GET'
    });
}

export function getRecommendedJob() {
    return request({
        url: API_BASE_URL + "/job/recommended",
        method: 'GET'
    });
}

export function createJob(jobDetails) {
    return request({
        url: API_BASE_URL + "/company/create-job",
        method: 'POST',
        body: JSON.stringify(jobDetails)
    });
}

export function updateJob(id,jobDetails) {
    return request({
        url: API_BASE_URL + "/company/job/"+id+"/edit",
        method: 'PUT',
        body: JSON.stringify(jobDetails)
    });
}

export function deleteJob(id) {
    return request({
        url: API_BASE_URL + "/company/job/"+id+"/delete",
        method: 'DELETE',
    });
}

export function filterJob(word) {
    return request({
        url: API_BASE_URL + "/job-filter/title/" + word,
        method: 'GET',
    });
}

export function getJobFilter(filterRequest) {
    return request({
        url: API_BASE_URL + "/job-filter",
        method: 'POST',
        body: JSON.stringify(filterRequest)
    });
}

export function getJobLocation() {
    return request({
        url: API_BASE_URL + "/job/location",
        method: 'GET',
    });
}

export function getJobCategory() {
    return request({
        url: API_BASE_URL + "/job/category",
        method: 'GET',
    });
}