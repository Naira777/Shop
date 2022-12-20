import * as axios from "axios";
const url = process.env.REACT_APP_BASE_URL;

const instance = (lang, token) => axios.create({
    baseURL: url, headers: {
        "X-locale": `${lang}`
    },
});


export const brandsAPI = {
    getBrands(lang) {
        return instance(lang)
            .get(`/api/brand`)
            .then((response) => {
                return response.data.data;
            });
    },

    getBrandsByCategory(id, lang) {
        return instance(lang)
            .get(`/api/brand/category/${id}/`)
            .then((response) => {
                return response.data.data;
            });
    },

    getProductsByBrand(id, filter = "all", delivery_type, lang) {
        return instance(lang)
            .get(`api/brand/${id}?filter_by_is_express=${delivery_type}&filter_by_main_filter=${filter}`)
            .then((response) => {
               
                return response.data.data[0];
            });
    },
};
