

import * as axios from "axios";

const url = process.env.REACT_APP_BASE_URL;

const instance = (lang, token) => axios.create({
    baseURL: url, headers: {
        "X-locale": `${lang}`, Authorization: `Bearer ${token}`,
    },
});
const instance1 = (lang, token) => axios.create({
    baseURL: url, headers: {
        "X-locale": `${lang}`
    },
});


export const emailAPI = {
    postEmail(data, lang) {
        return instance1(lang)
            .post(`/api/send-email`, data)
            .then((response) => {
                return response.data.data;
            });
    },
};

export const shoppingHistoryAPI = {

    getShoppingHistory(lang, token) {
        return instance(lang, token)
            .get(`user-api/purchase-history`)
            .then((response) => {
                return response.data.data;
            });
    },

    getSearchShoppingHistory(data, lang, token) {
        return instance(lang, token)
            .get(`user-api/purchase-history/?${`start_date=${data.start_data}&finish_date=${data.end_data}`}`)
            .then((response) => {
                return response.data.data;
            });
    },
};