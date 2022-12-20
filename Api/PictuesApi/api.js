
import * as axios from "axios";

const url = process.env.REACT_APP_BASE_URL;
const instance = (lang) => axios.create({
    baseURL: url, headers: {
        "X-locale": `${lang}`
    },
});

export const picturesAPI = {

    getPictures() {
        return instance()
            .get(`api/slide/show`)
            .then((response) => {

                return response.data.data;
            });
    },


};
