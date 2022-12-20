import React from "react";
import s from "./index.module.css";
import {NavLink, useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {useEffect} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation} from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Item_Category from "./../../ProductsByType/ProductsByType_Desktop/Item_Category/index";
import {getCategories} from "../../../redux/reducer";
import {useWindowSize} from './../../../CustomHooks/getWindowWidth';
import {useTranslation} from 'react-i18next';
import {WithPreloaderHOC} from './../../Hoc/withPreloader';



function Category_Items() {
    const [height, width] = useWindowSize()
    const {t} = useTranslation();
    const {categories, loading, lang} = useSelector((state) => state.CategoryPage);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getCategories());
    }, [lang]);

    const settings = {
        navigation: {
            nextEl: `.${s.swiper_button_next5}`,
            prevEl: `.${s.swiper_button_prev5}`,
        },
        modules: [Navigation],

    };

    return (
        <div className={s.content_outer1}>
            <div className={s.texts}>
                <p className={s.header}> {t("sections")} </p>
                <p
                    className={s.text_small}
                    onClick={() => {
                        navigate("/categories");
                    }}
                >
                    {t("seeAll")}
                </p>
            </div>
            <WithPreloaderHOC loading={loading}>
                <div className={s.content1_wrapper}>
                    <div className={s.swiper_button_prev5}/>
                    <div className={s.content1}>
                        <Swiper {...settings} spaceBetween={0} slidesPerView={width / 260}>
                            {categories?.map((item, id) => {
                                return (
                                    <SwiperSlide key={item.id}>
                                        <NavLink
                                            key={item.id}
                                            className={s.link}
                                            to={`/categories/${item.id}`}
                                        >
                                            <Item_Category title={item.title} url={item.url}/>
                                        </NavLink>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>
                    <div className={s.swiper_button_next5}/>
                </div>
            </WithPreloaderHOC>
        </div>
    );
}

export default Category_Items;
