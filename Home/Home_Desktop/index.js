import React, {useState, useEffect} from "react";
import s from "./index.module.css";
import Discount_Items from "./Discount_Items";
import New_Items from "./NewItems";
import Brand_Items from "./BrandItems";
import Recipe_Items from "./RecipeItems";
import Hit_Items from "./Hit_Items";
import Category_Items from "./Category_Items";
import {useSelector, useDispatch} from "react-redux";
import {getPictures, setDeliveryType} from "../../../redux/reducer";
import {useTranslation} from 'react-i18next';
import {WithPreloaderHOC} from './../../Hoc/withPreloader';
import {ReactComponent as Delivery} from "../../../assets/delivery.svg";
import {ReactComponent as Delivery_all} from "../../../assets/delivery_all.svg";

function Home_Desktop() {
    const {t} = useTranslation();

    const [market_type, setMarket_Type] =
        useState(localStorage.getItem("delivery_type") ? localStorage.getItem("delivery_type") : 'all');
    const {pictures, loading} = useSelector(
        (state) => state.CategoryPage
    );
    const dispatch = useDispatch();


    useEffect(() => {
        localStorage.setItem('delivery_type', market_type ? market_type : 'all')
        dispatch(setDeliveryType(market_type ? market_type : 'all'))
    }, [market_type]);

    useEffect(() => {
        dispatch(getPictures())
    }, []);

    const handleClick1 = () => {
        setMarket_Type("all");
        document.getElementById("express").style.background = "#F6F6F6";
        document.getElementById("super").style.background = "white";
    };

    const handleClick2 = () => {
        setMarket_Type("express");
        document.getElementById("express").style.background = "white";
        document.getElementById("super").style.background = "#F6F6F6";
    };

    return (
        <div className={s.mail}>
            <div className={s.araqum}>
                <div className={s.araqum_item} onClick={handleClick1} id="super" style={
                    market_type === "all" ? {background: "#fff", border: '1px solid #3D9A85'} : null
                }>

                    {market_type === "all" ? <Delivery_all fill='#3D9A85'/> :
                        <Delivery_all fill='rgba(33, 33, 33, 0.3)'/>}
                    <div className={s.araqum_text1}>{t("supermarket")} </div>
                    <div className={s.araqum_text2}>
                        {t("still")} <span style={{color: "#3D9A85"}}> 3 </span>{t("hour")}
                    </div>
                </div>

                <div
                    onClick={handleClick2}
                    className={s.araqum_item}
                    id="express"
                    style={
                        market_type === "express" ? {background: "#fff", border: '1px solid #3D9A85'} : null
                    }
                >

                    {market_type === "express" ? <Delivery fill='#3D9A85'/> : <Delivery fill='rgba(33, 33, 33, 0.3)'/>}
                    <div className={s.araqum_text1}>{t("express")} </div>
                    <div className={s.araqum_text2}>
                        <span style={{color: "#3D9A85"}}> 25 </span> {t("minute")}
                    </div>
                </div>
            </div>
            <WithPreloaderHOC loading={loading}>
                <div className={s.slides}>
                    <div className={s.box1}>
                        <img src={pictures[0]?.media?.big_image}
                             className={s.pic_big}/>
                    </div>
                    <div className={s.box2}>
                        <div className={s.box3}>
                            <img src={pictures[1]?.media?.big_image}
                                 className={s.pic_small}/>
                            <img src={pictures[2]?.media?.big_image}
                                 className={s.pic_small}/>
                        </div>
                        <div className={s.box4}>
                            <img src={pictures[3]?.media?.big_image}
                                 className={s.pic_long}/>
                        </div>
                    </div>
                </div>
            </WithPreloaderHOC>
            <Discount_Items/>
            <New_Items/>
            <Brand_Items/>
            <Recipe_Items/>
            <Category_Items/>
            <Hit_Items/>
        </div>
    );
}

export default Home_Desktop;
