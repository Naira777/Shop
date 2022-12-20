import React, {useEffect} from "react";
import s from "./index.module.css";
import Item from "./Item/index";
import v_right from "../../assets/slaq.png";
import offer from "../../assets/offer_pic.png";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {getOffers} from "../../redux/offersReducer";
import Item_Mobile from "./Item_Mobile";
import {useWindowSize} from "../../CustomHooks/getWindowWidth";
import vector from "../../assets/vector.png";
import Preloader from './../Preloader/index';
import {getAllLikes} from './../../redux/offersReducer';
import {useTranslation} from 'react-i18next';
import { WithPreloaderHOC } from "../Hoc/withPreloader";

function Promotions() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {lang} = useSelector((state) => state.CategoryPage);
    const {offers, loading} = useSelector((state) => state.OffersPage);
    const [height, width] = useWindowSize()
    const {filtertype} = useParams()
    const {t} = useTranslation();

    const handleClick = () => {
        navigate("/categories");
    };

    useEffect(() => {

        (filtertype == undefined || filtertype === 'all') && dispatch(getOffers());
        filtertype === 'likes' && dispatch(getAllLikes())

    }, [filtertype, lang]);

    const handleClick1 = () => {
        navigate(-1);
    };
console.log(offers)
    if (width > 500) {
        return (
            <div className={s.content}>


                {localStorage.getItem('user') && <p className={s.textpoqr}>
                    {t("personal_page")}<img src={v_right} className={s.vector}/> {t("promotion")}
                </p>}

                <p className={s.header}> {t("promotion")} </p>
                {localStorage.getItem('user') && (
                    <div className={s.Box}>

                        {(typeof (filtertype) == 'undefined') &&
                            <NavLink
                                to=''
                                className={s.link}
                                style={({isActive}) => ({
                                    color: isActive ? "#fff" : "#545e6f",
                                    background: isActive ? "#3D9A85" : "#f0f0f0",
                                })}
                            >
                                {t("all")}
                            </NavLink>}

                        {(typeof (filtertype) != 'undefined') && <NavLink
                            to='all'
                            className={s.link}
                            style={({isActive}) => ({
                                color: isActive ? "#fff" : "#545e6f",
                                background: isActive ? "#3D9A85" : "#f0f0f0",
                            })}
                        >
                            {t("all")}
                        </NavLink>}

                        <NavLink
                            to="likes"
                            className={s.link}
                            style={({isActive}) => ({
                                color: isActive ? "#fff" : "#545e6f",
                                background: isActive ? "#3D9A85" : "#f0f0f0",
                            })}
                        >
                            {t("preffer")}
                        </NavLink>
                    </div>
                )}
                <div className={s.items_box}>

                    {offers?.map((item, id) => {
                        const time = item?.time;
                        const year = time?.slice(0, 4);
                        const month = time?.slice(5, 7);
                        const day = time?.slice(8, 10);

                        return (
                            <div key={item.id}>
                                <Item
                                    header={item.title}
                                    url={item.url}
                                    time={`${day}.${month}.${year}`}
                                    text={item.desc}
                                    id={item.id}
                                    green={filtertype == 'likes' ? true : false}
                                />
                            </div>
                        );
                    })}
                </div>
                {offers?.length == 0 && !loading && filtertype != 'likes' && (
                    <div className={s.box}>
                        <img src={offer} className={s.offer}/>
                        <div className={s.text1}>

                            {t("dear")}{" "}{localStorage.getItem("user_name")}{localStorage.getItem("user_surname")} ,

                            {t("promotionText")}
                        </div>
                        <button className={s.button} onClick={handleClick}>
                            {t("doShopping")}
                        </button>
                    </div>
                )}
                {offers?.length == 0 && !loading && filtertype === 'likes' && (
                    <div className={s.box}>
                        <img src={offer} className={s.offer}/>
                        <div className={s.text1}>

                            {t("dear")}{" "}{localStorage.getItem("user_name")}{" "}{localStorage.getItem("user_surname")} ,
                            {t("promotionText1")}
                        </div>
                        <button className={s.button} onClick={handleClick}>
                            {t("doShopping")}
                        </button>
                    </div>
                )}


            </div>
        );
    } else {
        return (
            <div className={s.content_M}>
                <img src={vector} className={s.vector_M} onClick={handleClick1}/>
                <p className={s.header_M}>  {t("promotion")} </p>

                {localStorage.getItem('user') && <div className={s.Box_Mobile}>

                    {(typeof (filtertype) == 'undefined') &&
                        <NavLink
                            to=''
                            className={s.link_M}
                            style={({isActive}) => ({
                                color: isActive ? "#fff" : "#545e6f",
                                background: isActive ? "#3D9A85" : "#f0f0f0",
                            })}
                        >
                            {t("all")}
                        </NavLink>}

                    {(typeof (filtertype) != 'undefined') && <NavLink
                        to='all'
                        className={s.link_M}
                        style={({isActive}) => ({
                            color: isActive ? "#fff" : "#545e6f",
                            background: isActive ? "#3D9A85" : "#f0f0f0",
                        })}
                    >
                        {t("all")}
                    </NavLink>}
                    <NavLink
                        to="likes"
                        className={s.link_M}
                        style={({isActive}) => ({
                            color: isActive ? "#fff" : "#545e6f",
                            background: isActive ? "#3D9A85" : "#f0f0f0",
                        })}
                    >
                        {t("preffer")}
                    </NavLink>
                </div>}
                <div className={s.box_Mobile_Likes}>
                   <WithPreloaderHOC loading={loading} mobile > 
                    {offers?.map((item, id) => {
                        const time = item.time;
                        const year = time?.slice(0, 4);
                        const month = time?.slice(5, 7);
                        const day = time?.slice(8, 10);
                          console.log(item)
                        return (
                            <div key={item.id}>
                                <Item_Mobile
                                    header={item.title}
                                    url={item.url}
                                    id={item.id}
                                    text={item.desc}
                                    time={`${day}.${month}.${year}`}
                                    green={filtertype == 'likes' ? true : false}
                                />
                            </div>
                        );
                    })}
                   </WithPreloaderHOC>
                </div>
              
                {offers?.length == 0 && !loading && filtertype != 'likes' && (
                    <div className={s.box_Mobile}>
                        <div>
                        <img src={offer} className={s.offer_M}/>
                        </div>
                        <div className={s.text1_M}>
                            {t("dear")}{" "}{localStorage.getItem("user_name")}{" "}{localStorage.getItem("user_surname")},
                            {t("promotionText")}
                        </div>
                        <div>
                        <button className={s.button_M} onClick={handleClick}>
                            {t("doShopping")}
                        </button>
                        </div>
                    </div>
                )}
                {offers?.length == 0 && !loading && filtertype === 'likes' && (
                    <div className={s.box_Mobile}>
                        <img src={offer} className={s.offer_M}/>
                        <div className={s.text1_M}>

                            {t("dear")}{" "}{localStorage.getItem("user_name")}{" "}{localStorage.getItem("user_surname")},
                            {t("promotionText1")}
                        </div>
                        <div>
                        <button className={s.button_M} onClick={handleClick}>
                            {t("doShopping")}
                        </button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default Promotions;
