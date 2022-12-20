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

const axiosNext = (lang) => axios.create({
     headers: {
        "X-locale": `${lang}`
    },
});



export const productsAPI = {
    getNextPageData(url, lang) {
        return axiosNext(lang)
            .get(`${url}` )
            .then((response) => {                          
                return response.data;
            });
    },

    getCategories(lang) {
        return instance1(lang)
            .get(`api/product/category/tree`)

            .then((response) => {                
                return response.data.data;
            });
    },

    getCategoriesById(lang) {
        return instance1(lang)
            .get(`api/product/category/list`)
            .then((response) => {
                return response.data.data;
            });
    },

    getProduct(id, delivery_type, lang, token) {
        if(token){
        return instance(lang, token)
            .get(`user-api/product/${id}?filter_by_delivery_type=${delivery_type}`)
            .then((response) => {
                return response.data.data;
            });
        }else {
            return instance1(lang)
            .get(`api/product/${id}?filter_by_delivery_type=${delivery_type}`)
            .then((response) => {
                return response.data.data;
            });

        }
    },

    getProductsByPar_Id(id, filter = "all", delivery_type, lang, token) {
        if(token){
        return instance(lang, token)
            .get(`user-api/product?category=${id}&filter_by_main_filter=${filter}&filter_by_is_express=${delivery_type}&filter_by_product_type=all`)
            .then((response) => {
                return response.data;
            });
        }else {

            return instance1(lang)
            .get(`api/product?category=${id}&filter_by_main_filter=${filter}&filter_by_is_express=${delivery_type}&filter_by_product_type=all`)
            .then((response) => {
                return response.data;
            });


        }
    },

    getDiscountedProducts(id = "all", filter = "all", delivery_type, lang, token) {
      if(token){
        return instance(lang, token)
            .get(`user-api/discounted-product?filter_by_is_express=${delivery_type}&filter_by_product_type=all&filter_by_main_filter=${filter}&category=${id}`)
            .then((response) => {
                return response.data;
            });

        }else {

            return instance1(lang)
            .get(`api/discounted-product?filter_by_is_express=${delivery_type}&filter_by_product_type=all&filter_by_main_filter=${filter}&category=${id}`)
            .then((response) => {
                return response.data;
            });


        }
    },

    getProductsByType(id = "all", filter = "all", filterproducttype, delivery_type, lang, token) {
        if(token){
        return instance(lang, token)
            .get(`user-api/product?filter_by_is_express=${delivery_type}&filter_by_product_type=${filterproducttype}&filter_by_main_filter=${filter}&category=${id}`)
            .then((response) => {
                return response.data;
            })

        }
        else {
            return instance1(lang)
            .get(`api/product?filter_by_is_express=${delivery_type}&filter_by_product_type=${filterproducttype}&filter_by_main_filter=${filter}&category=${id}`)
            .then((response) => {
                return response.data;
            })

        }
    },
};