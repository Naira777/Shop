import React from "react";
import s from "./index.module.css";
import {NavLink, useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {useEffect} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Brand_Item from "./Brand_Item/index";
import {getBrands} from '../../../redux/reducer';
import {useWindowSize} from '../../../CustomHooks/getWindowWidth';
import {useTranslation} from 'react-i18next';



function BrandItems() {
    const {t} = useTranslation();
    const [height, width] = useWindowSize()
    const {brands, loading} = useSelector((state) => state.CategoryPage);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getBrands());
    }, []);

    const settings = {
        navigation: {
            nextEl: `.${s.swiper_button_next3}`,
            prevEl: `.${s.swiper_button_prev3}`,
        },
        modules: [Navigation],

    };

    return (
        <div className={s.content_outer1}>
            <div className={s.texts}>
                <p className={s.header}> {t("brands")} </p>
                <p
                    className={s.text_small}
                    onClick={() => {
                        navigate("/brands");
                    }}
                >
                    {t("seeAll")}
                </p>
            </div>
            <div className={s.content1_wrapper}>
                <div className={s.swiper_button_prev3}/>
                <div className={s.content1}>
                    <Swiper {...settings} spaceBetween={0} slidesPerView={width / 350}>
                        {brands.map((item, id) => {
                            return (
                                <SwiperSlide key={item.id}>
                                    <NavLink
                                        key={item.id}
                                        className={s.link}
                                        to={`/product/${item.id}`}
                                    >
                                        <Brand_Item url={item.url} id={item.id}/>
                                    </NavLink>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
                <div className={s.swiper_button_next3}/>
            </div>
        </div>
    );
}

export default BrandItems;
