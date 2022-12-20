import React from "react";
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
import {WithPreloaderHOC} from '../../Hoc/withPreloader';
import {useWindowSize} from '../../../CustomHooks/getWindowWidth';
import {useTranslation} from 'react-i18next';


function New_Items() {
    const [height, width] = useWindowSize();
    const {t} = useTranslation();
    const {loading, lang, new_products, delivery_type} = useSelector((state) => state.CategoryPage);
    const {token} = useSelector(
        (state) => state.UsersPage
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();


    useEffect(() => {

        dispatch(getProductsByType(undefined, undefined, 'new'))

    }, [lang, token, delivery_type])


    const settings = {
        navigation: {
            nextEl: `.${s.swiper_button_next2}`,
            prevEl: `.${s.swiper_button_prev2}`,
        },
        modules: [Navigation],

    };

    return (
        <div className={s.content_outer2}>
            <div className={s.texts}>
                <p className={s.header}>  {t("new_arrivals")} </p>
                <p
                    className={s.text_small1}
                    onClick={() => {
                        navigate("/products/newproducts");
                    }}
                >

                    {t("seeAll")}
                </p>
            </div>

            <div className={s.content1_wrapper}>
                <div className={s.swiper_button_prev2}/>
                <div className={s.content1}>
                    <WithPreloaderHOC loading={loading}>
                        <Swiper {...settings} spaceBetween={0} slidesPerView={width / 330}>

                            {new_products.map((item, id) => {
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
                            })}
                        </Swiper></WithPreloaderHOC>
                </div>
                <div className={s.swiper_button_next2}/>
            </div>
        </div>
    );
}

export default New_Items;
