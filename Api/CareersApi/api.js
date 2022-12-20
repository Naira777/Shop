

import * as axios from "axios";

const url = process.env.REACT_APP_BASE_URL;

const instance = (lang) => axios.create({
    baseURL: url, headers: {
        "X-locale": `${lang}`
    },
});

const instance1 = (lang) => axios.create({
    baseURL: url, headers: {
        'Content-Type': `multipart/form-data`, "X-locale": `${lang}`
    },
});

export const careersAPI = {
    getFeedback(lang) {
        return instance(lang)
            .get(`/api/co_worker`)
            .then((response) => {
                return response.data.data;
            });
    }, getVacancy(lang) {
        return instance(lang)
            .get(`/api/announcement`)
            .then((response) => {
                return response.data.data;
            });
    }, postVacancy(data, lang) {
        return instance1(lang)
            .post(`/api/apply`, data)
            .then((response) => {
                return response.data.data;
            });
    }, getVacancyOne(id, lang) {
        return instance(lang)
            .get(`/api/announcement/${id}`)
            .then((response) => {
                return response.data.data;
            });
    },
};