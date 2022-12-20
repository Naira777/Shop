import React, {useState} from "react";
import s from "./index.module.css";
import {NavLink, useNavigate} from "react-router-dom";
import Item_Product from "../../ProductsByType/ProductsByType_Desktop/Item_Product/index";
import {useSelector, useDispatch} from "react-redux";
import {useEffect} from "react";
import {getProductsByType} from "../../../redux/reducer";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import {useWindowSize} from "../../../CustomHooks/getWindowWidth";
import {useTranslation} from 'react-i18next';

function Hit_Items() {
    const [height, width] = useWindowSize();
    const {t} = useTranslation();
    const {lang, hit_products, delivery_type} = useSelector((state) => state.CategoryPage);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token} = useSelector((state) => state.UsersPage);


    useEffect(() => {

        dispatch(getProductsByType(undefined, undefined, 'bestseller'))

    }, [lang, token, delivery_type])


    const settings = {
        navigation: {
            nextEl: `.${s.swiper_button_next6}`,
            prevEl: `.${s.swiper_button_prev6}`,
        },
        modules: [Navigation],

    };

    return (
        <div className={s.content_outer1}>
            <div className={s.texts}>
                <p className={s.header}>  {t("bestseller")}  </p>
                <p
                    className={s.text_small}
                    onClick={() => {
                        navigate("/products/bestsellerproducts");
                    }}
                >
                    {t("seeAll")}
                </p>
            </div>
            <div className={s.content1_wrapper}>
                <div className={s.swiper_button_prev6}/>
                <div className={s.content1}>
                    <Swiper {...settings} spaceBetween={0} slidesPerView={width / 340}>
                        {hit_products?.map((item, id) => {
                            if (item.ishit) {
                                return (
                                    <SwiperSlide key={item.id}>
                                        <NavLink
                                            key={item.id}
                                            className={s.link}
                                            to={`/product/${item.id}`}
                                        >
                                            <Item_Product
                                                name={item.name}
                                                url={item.image}
                                                rate={item.rate}
                                                percent={item.percent}
                                                isnew={item.isnew}
                                                isdiscount={item.isdiscount}
                                                ishit={item.ishit}
                                                price={item.price}
                                                prevPrice={item.prevPrice}
                                                meas={item.meas}
                                                id={item.id}
                                            />
                                        </NavLink>
                                    </SwiperSlide>
                                );
                            }
                        })}
                    </Swiper>
                </div>
                <div className={s.swiper_button_next6}/>
            </div>
        </div>
    );
}

export default Hit_Items;
