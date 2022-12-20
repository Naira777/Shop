import * as axios from "axios";
const url = process.env.REACT_APP_BASE_URL;

const instance = (lang, token) => axios.create({
    baseURL: url, headers: {
        "X-locale": `${lang}`, Authorization: `Bearer ${token}`,
    },
});

const instance1 = (lang) => axios.create({
    baseURL: url, headers: {
        "X-locale": `${lang}`
    },
});
export const offersAPI = {
    getOffers(lang) {
        return instance1(lang)
            .get(`api/promotion`)
            .then((response) => {

                return response.data.data;
            });
    },

    createPromotionLike(id, lang, token) {
        return instance(lang, token)
            .post(`user-api/promotion/${id}`)
            .then((response) => {

                return response.data.data;
            });
    },

    deletePromotionLike(likeId, lang, token) {
        return instance(lang, token)
            .delete(`user-api/promotion/like/${likeId}`)
            .then((response) => {

                return response.data.data;
            });
    },

    getPromotionOneLike(likeId, lang, token) {
        return instance(lang, token)
            .get(`user-api/promotion/${likeId}`)
            .then((response) => {

                return response.data.data;
            });
    },

    getPromotionAllLikes(lang, token) {
        return instance(lang, token)
            .get(`user-api/promotion-likes`)
            .then((response) => {

                return response.data.data;
            });
    },
};