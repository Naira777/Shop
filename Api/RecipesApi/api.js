import * as axios from "axios";

const url = process.env.REACT_APP_BASE_URL;

const instance = (lang) => axios.create({
    baseURL: url, headers: {
        "X-locale": `${lang}`
    },
});


export const recipesAPI = {
    getRecipes(lang) {
        return instance(lang)
            .get(`/api/recipe`)
            .then((response) => {
                return response.data.data;
            });
    },

    getRecipesByCategory(id = "1", lang) {
        return instance(lang)
            .get(`/api/recipe/category/${id}`)
            .then((response) => {

                return response.data.data;
            });
    },

    getRecipesCategories(lang) {
        return instance(lang)
            .get(`api/recipe/category`)
            .then((response) => {
                return response.data.data;
            });
    }, 
    
    getRecipeProductsByCategory(id, cat_id, filter = "all", lang) {
     
       if(cat_id ==='all' || cat_id === undefined){
        return instance(lang)
            .get(`api/recipe-products/${id}?filter_by_main_filter=${filter}`)
            .then((response) => {   
              
                return response?.data;
            });
        } if(cat_id !='all' && cat_id != undefined){           
             return instance(lang)
            .get(`api/recipe-products/${id}?category=${cat_id}&filter_by_main_filter=${filter}`)
            .then((response) => {     
                
                return response?.data;
            });
        }
        
        },
    
    getRecipeDesc(id, lang) {
        return instance(lang)
            .get(`/api/recipe/${id}`)
            .then((response) => {
                return response.data.data;
            });
    },
};
