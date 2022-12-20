import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    getBrands,
    getBrandsByCategory,
    getCategories,
} from "../../../redux/reducer";
import s from "./index.module.css";
import Item from "../Brands_Desktop/Item";
import {useParams} from "react-router-dom";
import {Swiper, SwiperSlide} from "swiper/react";
import Item_Category from "../Brands_Desktop/Item_Category";
import {WithPreloaderHOC} from "../../Hoc/withPreloader";
import {useWindowSize} from "../../../CustomHooks/getWindowWidth";
import {useTranslation} from 'react-i18next';


function Brands() {
    const {brands, loading, categories, lang} = useSelector((state) => state.CategoryPage);
    const [height, width] = useWindowSize()
    const dispatch = useDispatch();
    const {filtertype} = useParams();
    const {t} = useTranslation();

    useEffect(() => {
        dispatch(getCategories());
    }, [lang]);


    useEffect(() => {
        if (filtertype) {
            dispatch(getBrandsByCategory(filtertype));
        }
        if (filtertype === 'all') {
            dispatch(getBrands());
        }
        if (!filtertype) {
            dispatch(getBrands());
        }
    }, [filtertype, lang]);

    return (<>
            <div className={s.box}>
                <p className={s.textpoqr}> {t("brands")} </p>
                <p className={s.text}> {t("brands")}  </p>
            </div>
            <div className={s.category_items}>
                <Swiper slidesPerView={0} slidesPerView={width / 200}>
                    <SwiperSlide>
                        <Item_Category title={`${t("all")}`}
                                       url={`https://c8.alamy.com/comp/JABKGC/wet-market-in-hong-kong-JABKGC.jpg`}
                                       id={`${'all'}`}/>
                    </SwiperSlide>
                    {categories.map((item, id) => {
                        return (

                            <SwiperSlide key={id}>
                                <div>
                                    <Item_Category title={item.title} url={item.url} id={item.id}/>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>

            <div className={s.content}>
                <WithPreloaderHOC loading={loading}>

                    {brands?.map((item, id) => {
                        return (
                            <div key={id}>
                                <Item
                                    url={item.url}
                                    id={item.id}
                                />
                            </div>
                        );
                    })}

                </WithPreloaderHOC>
            </div>


        </>
    );
}

export default Brands;
