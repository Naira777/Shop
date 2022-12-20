export function getNameAndCategory(arr) {

    const array = [];

    for (let i = 0; i < arr.length; i++) {
        if(i == 0){
        for (let key in arr[i]) {            
            if (key === "children") {             
                for (let key1 in arr[i][key]) {                    
                    array.push({
                        title: arr[i][key][key1].translation?.title,
                        url: arr[i][key][key1]?.media_path || "",
                        id: arr[i][key][key1].translation?.product_category_id,
                        par_id: arr[i].id,                        
                    });
                }
            }

        }
    }
  if(i !== 0){            
                array.push({
                    title: arr[i]?.translation?.title,
                    url: arr[i]?.media_path || "",
                    id: arr[i]?.translation?.product_category_id,
                    par_id: arr[i].id,                        
                });            
        }
  }
         return array;
}

export function getCategoryTitle(arr, id) {
    let title;

    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].children?.length; j++) {
            if (arr[i].children[j].translation.product_category_id === id) {
                title = arr[i].children[j].translation.title;
            }

            for (let l = 0; l < arr[i].children[j].children?.length; l++) {
                if (arr[i].children[j].children[l].translation.product_category_id === id) {
                    title = arr[i].children[j].children[l].translation.title;
                }
            }
        }
    }

    return title;
}

export function getCategoriesByid(arr, id) {
    const title = [];
    const array = [];
    const cat_id = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i].parent_id == id) {
            title.push(arr[i].translation?.title);
            cat_id.push(arr[i].translation?.product_category_id);
        }
    }

    for (let i = 0; i < title.length; i++) {
        array.push({title: title[i], cat_id: cat_id[i]});
    }
    return array;
}

export function getBrandsUrl(arr) {
    const array = [];

    for (let i = 0; i < arr.length; i++) {

        array.push({
            url: arr[i].media?.big_image,
            title: arr[i].translation?.title,
            desc: arr[i].translation?.description,
            id: arr[i].id

        });
    }
    return array;
}

export function getProductsByBrand(arr) {
    let name;
    let image;
    let desc;
    const network = {};
    const products = [];

    for (let k in arr) {
        if (k === "media") {
            image = arr[k].medium_image;
        }

        if (k === "translation") {
            for (let key in arr[k]) {
                if (key === "title") {
                    name = arr[k][key];
                }

                if (key === "description") {
                    desc = arr[k][key];
                }
            }
        }
        if (k === "social_networks") {
            for (let j = 0; j < arr[k].length; j++) {
                if (arr[k][j].social_network_code === "instagram") {
                    network.instagram = arr[k][j].link;
                }

                if (arr[k][j].social_network_code === "facebook") {
                    network.facebook = arr[k][j].link;
                }

                if (arr[k][j].social_network_code === "website") {
                    network.website = arr[k][j].link;
                }
            }
        }

        if (k === "products") {

            let ishit = {}, isnew = {}, isexc = {};

            for (let j = 0; j < arr[k].length; j++) {
                for (let m = 0; m < arr[k][j].product_types.length; m++) {
                    if (arr[k][j].product_types[m].code === "new") {
                        isnew.title = arr[k][j].product_types[m].translation.title;
                    }

                    if (arr[k][j].product_types[m].code === "bestseller") {
                        ishit.title = arr[k][j].product_types[m].translation.title;
                    }

                    if (arr[k][j].product_types[m].code === "exclusive") {
                        isexc.title = arr[k][j].product_types[m].translation.title;
                    }
                }
                products.push({
                    id: arr[k][j].id,
                    isexp: arr[k][j].is_express,
                    image: arr[k][j].media.big_image,
                    price: arr[k][j].price,
                    rate: arr[k][j].rate,
                    name: arr[k][j].translation.title,
                    isdiscount: arr[k][j].discount,
                    percent: arr[k][j].discount?.percent,
                    prevPrice: arr[k][j].discount?.discounted_price,
                    measur: arr[k][j].measurement.translation?.title,
                    ishit: ishit,
                    isnew: isnew,
                    isexc: isexc,
                });
            }
        }
    }


    const brandandproducts = {
        name: name, desc: desc, image: image, network: network, products: products,
    };
    return brandandproducts;
}

export function getProductDesc(arr) {
    let name, qtyWare, desc, meas, rate, price, prevPrice, isdiscount, image, isnew, ishit, percent, isexpress, type,
        id, cat_id,
        isexc;

    for (let key in arr) {
        if (key === "rate") {
            rate = arr[key];
        }

        if (key === "category_id") {
            cat_id = arr[key];
        }

        if (key === "media") {
            image = arr[key]?.big_image || "";
        }
        if (key === "id") {
            id = arr[key];
        }

        if (key === "product_types") {
            for (let k = 0; k < arr[key].length; k++) {
                // for (let j in arr[key][k]) {
                //  console.log(arr[key][k].translation?.product_type_code)
                //   if(
                //   arr[key][k].translation?.product_type_code ==='new'){
                //     isnew.title = arr[key][k].translation?.title;
                //   }
                // if (arr[key][k][j] == "translation") {
                //   console.log(arr[key][k][j])
                //   if (arr[key][k][j].product_type_code == "new") {
                //     isnew.title = arr[key][k][j].title;
                //   }
                //   if (arr[key][k][j].product_type_code == "bestseller") {
                //     ishit.title = arr[key][k][j].title;
                //   }
                // if (arr[key][k][j].product_type_code == "exclusive") {
                //     isexc.title = arr[key][k][j].title;
                //   }
                // }
                // }
            }
        }

        if (key == "is_express") {
            isexpress = arr[key];
        }

        if (key == "translation") {
            for (let k in arr[key]) {
                if (k === "title") {
                    name = arr[key][k];
                }

                if (k === "description") {
                    desc = arr[key][k];
                }
            }
        }

        if (key === "measurement") {
            for (let k in arr[key]) {
                if (k === "translation") {
                    for (let i in arr[key][k]) {
                        if (i === "title") {
                            meas = arr[key][k][i];
                        }
                    }
                }
            }
        }

        if (key === "discount") {
            isdiscount = arr[key];
            for (let k in arr[key]) {
                if (k === "percent") {
                    percent = arr[key][k];
                }

                if (k === "discounted_price") {
                    prevPrice = arr[key][k];
                }
            }
        }

        if (key === "price") {
            price = arr[key];
        }
        if (key === "product_warehouses") {
            qtyWare = arr[key];
        }


    }
    if (arr?.product_warehouses) {
        qtyWare = arr?.product_warehouses[0]?.pivot?.quantity
    }
    return {
        name,
        desc,
        meas,
        rate,
        price,
        prevPrice,
        isdiscount,
        image,
        isnew,
        ishit,
        percent,
        isexpress,
        type,
        id,
        cat_id,
        isexc,
        qtyWare,
    };
}

export function getProductsAll(arr) {
    const array = [];

    let name = [], meas = [], rate = [], price = [], prevPrice = [], isdiscount = [], image = [], isnew = [],
        percent = [], isexpress = [], ishit = [], id = [], isexc = [], next_page_url;

    next_page_url = arr?.next_page_url;

    for (let i = 0; i < arr?.length; i++) {
        for (let key in arr[i]) {
            if (key === "is_express") {
                isexpress.push(arr[i][key]);
            }

            if (key === "media") {
                image.push(arr[i][key].big_image || '');
            }

            if (key === "id") {
                id.push(arr[i][key]);
            }

            if (key === "rate") {
                rate.push(arr[i][key]);
            }

            if (key === "price") {
                price.push(arr[i][key]);
            }

            if (key === "translation") {
                for (let k in arr[i][key]) {
                    if (k === "title") {
                        name.push(arr[i][key][k]);
                    }
                }
            }

            if (key === "measurement") {
                for (let k in arr[i][key]) {
                    if (k === "translation") {
                        for (let j in arr[i][key][k]) {
                            if (j === "title") {
                                meas.push(arr[i][key][k][j]);
                            }
                        }
                    }
                }
            }

            if (key === "discount") {
                if (arr[i][key] != null) {
                    for (let k in arr[i][key]) {
                        if (k === "discounted_price") {
                            prevPrice.push(arr[i][key][k]);
                        }
                        if (k === "percent") {
                            percent.push(arr[i][key][k]);
                        }
                    }
                }
                isdiscount.push(arr[i][key]);
            }
            if (key === "product_types") {
                for (let k = 0; k < arr[i][key].length; k++) {
                    for (let j in arr[i][key][k]) {
                        if (j === "translation") {
                            for (let p in arr[i][key][k][j]) {
                                if (p === "product_type_code" && arr[i][key][k][j][p] === "new") {
                                    isnew.push({isnew: true, title: arr[i][key][k][j].title});
                                }

                                if (p === "product_type_code" && arr[i][key][k][j][p] === "bestseller") {
                                    ishit.push({ishit: true, title: arr[i][key][k][j].title});
                                }

                                if (p === "product_type_code" && arr[i][key][k][j][p] === "exclusive") {
                                    isexc.push({isexc: true, title: arr[i][key][k][j].title});
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    for (let i = 0; i < arr?.length; i++) {
        array.push({
            name: name[i],
            meas: meas[i],
            rate: rate[i],
            price: price[i],
            prevPrice: prevPrice[i],
            image: image[i],
            isdiscount: isdiscount[i],
            isnew: isnew[i],
            percent: percent[i],
            isexpress: isexpress[i],
            ishit: ishit[i],
            id: id[i],
            isexc: isexc[i],
            next_page_url: next_page_url,
        });
    }

    return array;
}

export function getRecipeItems(arr) {
    const name = [];
    const desc = [];
    const image = [];
    const rate = [];
    const time = [];
    const array = [];

    for (let i = 0; i < arr.length; i++) {
        for (let key in arr[i]) {
            if (key === "rate") {
                rate.push(arr[i][key]);
            }

            if (key === "time") {
                time.push(arr[i][key]);
            }

            if (key === "media") {
                image.push(arr[i][key].media?.big_image);
            }

            if (key === "translation") {
                image.push(arr[i][key]);

                for (let k in arr[i][key]) {
                    if (k === "title") {
                        name.push(arr[i][key][k]);
                    }

                    if (k === "description") {
                        desc.push(arr[i][key][k]);
                    }
                }
            }
        }
    }

    for (let i = 0; i < arr.length; i++) {
        array.push({
            name: name[i], image: image[i], desc: desc[i], rate: rate[i], time: time[i],
        });
    }


    return array;
}

export function setUserInformation(arr) {
    let user = {};

    user.id = arr.user.id;
    user.name = arr.user.name;
    user.surname = arr.user.last_name;
    user.email = arr.user.email;
    user.token = arr.token;
    user.tel = arr.user.phone_number

    return user;
}

export function getoffers(arr) {
    let array = [];

    for (let i = 0; i < arr.length; i++) {
        array.push({
            url: arr[i].media?.big_image,
            title: arr[i].translation?.title,
            desc: arr[i].translation?.description,
            time: arr[i].translation?.created_at,
            id: arr[i].id,
        });
    }

    return array;
}

export function getLikedOffers(arr) {
    let array = [];

    for (let i = 0; i < arr.length; i++) {
        array.push({
            url: arr[i].promotion?.media?.small_image,
            title: arr[i].promotion?.translation?.title,
            desc: arr[i].promotion?.translation?.description,
            time: arr[i].promotion?.translation?.created_at,
            id: arr[i].id,
        });
    }

    return array;
}


export function getCategoriesRecipe(arr) {
    let array = [];

    for (let i = 0; i < arr.length; i++) {
        array.push({
            cat_id: arr[i].translation.recipe_category_id, title: arr[i].translation.title,
        });
    }

    return array;
}

export function getRecipesById(arr) {

    return arr.map(item => ({
        url: item.media?.big_image || "",
        title: item.translation?.title,
        desc: item.translation?.description,
        recipe_type: item.recipe_type.translation?.title,
        time: item.time,
        rate: item.rate,
        id: item.id,
    }));
}

export function getRecipe(arr) {
    const item = {};
    item.ingredients = []

    item.url = arr?.media?.big_image || "";
    item.title = arr?.translation.title;
    item.desc = arr?.translation.description;
    item.recipe_type = arr?.recipe_type?.translation.title;
    item.time = arr?.time;
    item.rate = arr?.rate;
    item.id = arr.id;
    item.process = arr.recipe_process?.translation?.process;

    for (let i = 0; i < arr.recipe_ingredient?.length; i++) {

        item.ingredients.push(arr.recipe_ingredient[i]?.translation?.ingredient);
    }

    item.products = getProductsAll(arr.recipe_products)
    return item;
}

export function getTermsAndRules(arr) {
    const obj = {};
    obj.title = arr.translation?.title;
    obj.desc = arr.translation?.description;

    return obj;
}

export function getBasketProducts(arr) {
    const array = [];

    for (let i = 0; i < arr?.real_products.length; i++) {
        array.push({
            qty: arr?.real_products[i].quantity,
            id: arr?.real_products[i].id,
            user_id: arr?.real_products[i].user_id,
            title: arr?.real_products[i].product.translation?.title,
            meas: arr?.real_products[i].product.measurement?.translation?.title,
            price: arr?.real_products[i].product.price,
            prevPrice: arr?.real_products[i].product.discount?.translation?.discounted_price,
            url: arr?.real_products[i].product?.media?.medium_image,
            qtyInWareHouse: arr?.real_products[i]?.product.warehouses[0]?.quantity
        });


    }
    array.priceAll = arr?.price;

    return array;
}

export function getAddresses(arr) {
    const array = [];

    for (let i = 0; i < arr.length; i++) {
        array.push({
            id: arr[i].id,
            user_id: arr[i].user_id,
            entrance: arr[i].entrance,
            flat: arr[i].flat,
            floor: arr[i].floor,
            selected: arr[i].selected,
            address: arr[i].address?.translation?.address,
            address_id: arr[i].address_id,
        });
    }

    return array;
}
