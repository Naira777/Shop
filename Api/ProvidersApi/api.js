


import * as axios from "axios";

const url = process.env.REACT_APP_BASE_URL;

const instance = (lang) => axios.create({
    baseURL: url, headers: {
        "X-locale": `${lang}`
    },
});

export const providersAPI = {
    getProviders(lang) {
        return instance(lang)
            .get(`/api/provider/product-category`)
            .then((response) => {
                return response.data.data;
            });
    }, postProvidersCreate(data, lang) {
        return instance(lang)
            .post(`/api/provider`, data)
            .then((response) => {
                return response.data.data;
            });
    },
};

export const questionsAPI = {
    getQuestions(lang) {
        return instance(lang)
            .get(`api/question`)
            .then((response) => {
                return response.data.data;
            });
    },
};