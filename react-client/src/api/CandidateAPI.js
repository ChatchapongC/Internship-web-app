import { API_BASE_URL, ACCESS_TOKEN } from '../constants/index.js';

const request = async (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = { headers: headers };
    options = Object.assign({}, defaults, options);

    const response = await fetch(options.url, options);
    const json = await response.json();
    if (!response.ok) {
        return Promise.reject(json);
    }
    return json;
};

export function applyJob(id) {
    return request({
        url: API_BASE_URL + "/candidate/apply-job/" + id,
        method: 'POST',
    });
}

export function getJobHistory() {
    return request({
        url: API_BASE_URL + "/candidate/job-history",
        method: 'GET',
    });
}

export function getJobApplyStatus(cId, jId) {
    return request({
        url: API_BASE_URL + "/candidate/job-history/status/" + cId + "/" + jId,
        method: 'GET',
    });
}

export function updateProfile(updateRequest) {
    return request({
        url: API_BASE_URL + "/candidate/profile/update",
        method: 'PUT',
        body: JSON.stringify(updateRequest)
    });
}

export function getProfile() {
    return request({
        url: API_BASE_URL + "/candidate/profile",
        method: 'GET',
    });
}

export function updateResume(resume) {
    return request({
        url: API_BASE_URL + "/candidate/resume/update",
        method: 'PUT',
        body: JSON.stringify(resume)
    });
}

export function getResume() {
    return request({
        url: API_BASE_URL + "/candidate/resume",
        method: 'GET',
    });
}

export function getResumeById(id) {
    return request({
        url: API_BASE_URL + "/candidate/resume/" + id,
        method: 'GET',
    });
}

export function getEducation() {
    return request({
        url: API_BASE_URL + "/candidate/resume/education",
        method: 'GET',
    });
}

export function getEducationById(educationId) {
    return request({
        url: API_BASE_URL + "/candidate/resume/education/" + educationId,
        method: 'GET',
    });
}

export function createEducation(education) {
    return request({
        url: API_BASE_URL + "/candidate/resume/education/create",
        method: 'POST',
        body: JSON.stringify(education)
    });
}

export function updateEducation(education, id) {
    return request({
        url: API_BASE_URL + "/candidate/resume/education/" + id + "/update",
        method: 'PUT',
        body: JSON.stringify(education)
    });
}

export function deleteEducation(educationId) {
    return request({
        url: API_BASE_URL + "/candidate/resume/education/" + educationId + "/delete",
        method: 'DELETE',
    });
}

export function createSkill(skill) {
    return request({
        url: API_BASE_URL + "/candidate/resume/skill/create",
        method: 'POST',
        body: JSON.stringify(skill)
    });
}

export function getSkill() {
    return request({
        url: API_BASE_URL + "/candidate/resume/skill",
        method: 'GET',
    });
}

export function updateSkill(skill, id) {
    return request({
        url: API_BASE_URL + "/candidate/resume/skill/" + id + "/update",
        method: 'PUT',
        body: JSON.stringify(skill)
    });
}

export function deleteSkill(skillId) {
    return request({
        url: API_BASE_URL + "/candidate/resume/skill/" + skillId + "/delete",
        method: 'DELETE',
    });
}

export function createExperience(experience) {
    return request({
        url: API_BASE_URL + "/candidate/resume/experience/create",
        method: 'POST',
        body: JSON.stringify(experience)
    });
}

export function getExperience() {
    return request({
        url: API_BASE_URL + "/candidate/resume/experience",
        method: 'GET',
    });
}

export function updateExperience(experience, id) {
    return request({
        url: API_BASE_URL + "/candidate/resume/experience/" + id + "/update",
        method: 'PUT',
        body: JSON.stringify(experience)
    });
}

export function deleteExperience(experienceId) {
    return request({
        url: API_BASE_URL + "/candidate/resume/experience/" + experienceId + "/delete",
        method: 'DELETE',
    });
}

export function createLanguage(language) {
    return request({
        url: API_BASE_URL + "/candidate/resume/language/create",
        method: 'POST',
        body: JSON.stringify(language)
    });
}

export function getLanguage() {
    return request({
        url: API_BASE_URL + "/candidate/resume/language",
        method: 'GET',
    });
}

export function updateLanguage(language, id) {
    return request({
        url: API_BASE_URL + "/candidate/resume/language/" + id + "/update",
        method: 'PUT',
        body: JSON.stringify(language)
    });
}

export function deleteLanguage(languageId) {
    return request({
        url: API_BASE_URL + "/candidate/resume/language/" + languageId + "/delete",
        method: 'DELETE',
    });
}


