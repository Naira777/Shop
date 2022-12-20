

import * as axios from "axios";
const url = process.env.REACT_APP_BASE_URL;

const instance1 = (lang) => axios.create({
    baseURL: url, headers: {
        "X-locale": `${lang}`
    },
});



export const searchAPI = {
    search(text, lang) {
        return instance1(lang)
            .post(`/api/search`, {text: text})
            .then((response) => {
                return response.data.data;
            });
    },
    sendEmail(email, lang) {
        return instance1(lang)
            .post(`/api/send-email?filter_by_type=for_discount`, {email: email})
            .then((response) => {
                return response.data.data;
            })
    },

    announcements(lang) {
        return instance1(lang)
            .get(`/api/announcement`)
            .then((response) => {

                return response.data.data;
            });

    },

    deliveryTypes(lang) {
        return instance1(lang)
            .get(`/api/delivery-type`)
            .then((response) => {
                return response.data.data;
            });

    },

    reviews(lang) {
        return instance1(lang)
            .get(`/api/announcement`)
            .then((response) => {
                return response.data.data;
            });
    },
};