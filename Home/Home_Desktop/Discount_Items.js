import React from "react";
import s from "./index.module.css";
import {NavLink, useNavigate} from "react-router-dom";
import Item_Product from "../../ProductsByType/ProductsByType_Desktop/Item_Product/index";
import {useSelector, useDispatch} from "react-redux";
import {useEffect} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import {getDiscountedProducts} from './../../../redux/reducer';
import {WithPreloaderHOC} from './../../Hoc/withPreloader';
import { useWindowSize } from './../../../CustomHooks/getWindowWidth';
import { useTranslation } from 'react-i18next';


function Discount_Items() {
    const [height, width] = useWindowSize()
    const { t } = useTranslation();
    const {sale_products, loading, lang, delivery_type} = useSelector((state) => state.CategoryPage);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token} = useSelector((state) => state.UsersPage);

    useEffect(() => {
        dispatch(getDiscountedProducts());
    }, [lang, token, delivery_type]);


    const settings = {
        navigation: {
            nextEl: `.${s.swiper_button_next1}`,
            prevEl: `.${s.swiper_button_prev1}`,
        },
        modules: [Navigation],
    
    };

    return (
        <WithPreloaderHOC loading={loading}>
        <div className={s.content_outer1}>
            <div className={s.texts}>
                <p className={s.header}>  {t("sale")} </p>
                <p
                    className={s.text_small}
                    onClick={() => {
                        navigate("/products/discountproducts");
                    }}
                >
                    {t("seeAll")} 
                </p>
            </div>

            <div className={s.content1_wrapper}>
                <div className={s.swiper_button_prev1}/>

                <div className={s.content1}>
                    <WithPreloaderHOC loading={loading}>
                        <Swiper {...settings} spaceBetween={0} slidesPerView={width/340} >
                            {sale_products?.map((item, id) => {
                                return (
                                    <SwiperSlide key={item.id}>
                                        <NavLink
                                            key={item.id}
                                            className={s.link}
                                            to={`/product/${item.id}`}  key={item.id}
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
                <div className={s.swiper_button_next1}/>
            </div>
        </div>
        </WithPreloaderHOC>
    );
}
export default Discount_Items;
