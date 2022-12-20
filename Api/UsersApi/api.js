import * as axios from "axios";

const url = process.env.REACT_APP_BASE_URL;

const instance1 = (lang) => axios.create({
    baseURL: url, headers: {
        "X-locale": `${lang}`
    },
});

const instance = (lang, token) => axios.create({
    baseURL: url, headers: {
        "X-locale": `${lang}`, Authorization: `Bearer ${token}`,
    },
});

export const usersAPI = {
    userRegister(name, surname, email, password, cityId, entrance, floor, apt, phone, lang) {
        return instance1(lang)
            .post(`/user-api/auth/register`, {
                name: name,
                last_name: surname,
                email: email,
                phone_number: `+374${phone}`,
                password: password,
                password_confirm: password,
                address_id: cityId,
                entrance: entrance,
                floor: floor,
                flat: apt,
            })
            .then((response) => {
                return response.data.data;
            });
    }, 
    checkPhone(tel, lang) {
        return instance1(lang)
            .post(`/user-api/auth/check`, {phone_number: tel})

            .then((response) => {

                return response.data.data;
            });
    },
     verifyMessage(tel, lang) {
        return instance1(lang)
            .post(`/user-api/auth/verify/message`, {phone_number: tel})

            .then((response) => {

                return response.data;
            });
    },
    verification(tel, code, lang) {
        return instance1(lang).post(`/user-api/auth/verify`, {
            phone_number: tel, verification_code: code,
        }).then((response) => {
            return response.data;
        });
    },

    login(tel, password, lang) {
        return instance1(lang)
            .post(`/user-api/auth/login`, {
                phone_number: tel, password: password,
            })

            .then((response) => {
                return response.data.data;
            });
    },

    updateInfo(name, surname, email, password, lang, token) {
        return instance(lang, token).post(`/user-api/auth/update`, {
            name: name, password: password, last_name: surname, email: email,
        })
            .then((response) => {
                return response.data.data;
            });
    },

    passwordReset(tel, password, passwordRepeat, lang, token) {

        return instance(lang, token)
            .post(`/user-api/auth/restore/password`, {
                password: password, password_confirm: passwordRepeat, phone_number: `+374${tel}`,
            })

            .then((response) => {
                return response.data;
            });
    },

    searchAddress(text, lang) {
        return instance1(lang)
            .post(`/api/search-address`, {
                title: text,
            })
            .then((response) => {
                return response.data.data.data;
            });
    },
};