
import * as axios from "axios";

const url = process.env.REACT_APP_BASE_URL;

const instance = (lang, token) => axios.create({
    baseURL: url, headers: {
        "X-locale": `${lang}`, Authorization: `Bearer ${token}`,
    },
});


export const userCartAPI = {
    getProductsFromCart(delivery_type = "supermarket", lang, token) {
        if (token) {
            return instance(lang, token)
                .get(`/user-api/basket?filter_by_delivery_type=${delivery_type}`)
                .then((response) => {

                    return response.data.data;
                });
        }
    },

    createAddress(data, lang, token) {
        return instance(lang, token)
            .post(`/user-api/address`, data)
            .then((response) => {
                return response.data.data;
            });
    }, updateAddress(data, id, lang, token) {
        return instance(lang, token)
            .post(`/user-api/address/${id}`, data)
            .then((response) => {
                return response.data.data;
            });
    },

    deleteAddress(id, lang, token) {
        return instance(lang, token)
            .delete(`/user-api/address/${id}`)
            .then((response) => {
                return response.data.data;
            });
    },

    getOneAddress(id, lang, token) {
        return instance(lang, token)
            .get(`/user-api/address/${id}`)
            .then((response) => {
                return response.data.data;
            });
    },

    getAllAddresses(lang, token) {
        return instance(lang, token)
            .get(`/user-api/address`)
            .then((response) => {
                return response.data.data;
            });
    },

    addToCart(id, delivery_type, quantity = "1", lang, token) {
        return instance(lang, token)
            .post(`/user-api/basket/${id}?filter_by_delivery_type=${delivery_type}`, {
                quantity: quantity,
            })
            .then((response) => {
                return response.data.data;
            });
    },


    deleteProductFromCart(products, delivery_type, lang, token) {
        return instance(lang, token)
            .post(`/user-api/basket`, {products: products})
            .then((response) => {
                return response.data.data;
            });
    },

    updateProductQtyInCart(id, qty, lang, token) {
        return instance(lang, token)
            .put(`/user-api/basket/${id}`, {quantity: qty})
            .then((response) => {
                return response.data.data;
            });
    },

    buyProducts(data, lang, token) {

        return instance(lang, token)
            .post(`/user-api/buy`, data)
            .then((response) => {
                return response.data.data;
            });
    },

};