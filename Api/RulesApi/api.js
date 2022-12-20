

import * as axios from "axios";

const url = process.env.REACT_APP_BASE_URL;

const instance = (lang) => axios.create({
    baseURL: url, headers: {
        "X-locale": `${lang}`
    },
});

export const rulesandprivacyAPI = {
    getTerms(lang) {
        return instance(lang)
            .get(`/api/privacy/2`)
            .then((response) => {
                return response.data.data;
            });
    },

    getRules(lang) {
        return instance(lang)
            .get(`/api/privacy/1`)
            .then((response) => {
                return response.data.data;
            });
    },
};