import React, {useEffect, useState} from "react";
import s from "./index.module.css";
import {useNavigate, useParams} from "react-router-dom";
import {cart, map, logout, help, tag, slaq1, buy} from "../../images";
import SelfInfo from "./SelfInfo/index";
import Popup from "./../../Popup/index";
import PopupComponent from "./../../PopupComponent/PopupComponent";
import {useDispatch, useSelector} from "react-redux";
import {
    setTel,
    setVerify,
    setPhoneVarify,
    setAddressMode,
    setToken,
    setUserInfo,
    getProductsFromCart
} from "../../../redux/usersReducer";
import {setPasswordInStore} from "./../../../redux/usersReducer";
import {NavLink} from "react-router-dom";
import {useTranslation} from 'react-i18next';

function Profile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {filtertype} = useParams();
    const {t} = useTranslation();
    const {cartItems, token} = useSelector(
        (state) => state.UsersPage
    );
    const [count1, setCount1] = useState(0)
    const filter = localStorage.getItem('delivery_type')

    useEffect(() => {

        if (!token) {
            dispatch(setToken(localStorage.getItem("user")))
        }
    }, [token]);


    const handleLogout = () => {
        const lan= localStorage.getItem('userLanguage')
        localStorage.clear();
        localStorage.setItem('userLanguage', lan)
        dispatch(setToken(''))
        dispatch(setTel(""));
        dispatch(setPasswordInStore(""));
        dispatch(setVerify(false));
        dispatch(setPhoneVarify({}));
        dispatch(setUserInfo({}))
        navigate("/home");
    };


    useEffect(() => {
        let count = 0;
        cartItems.map((element, index) => {
            count = count + 1
        });
        setCount1(count)
    }, [cartItems]);


    useEffect(() => {
        if (filter === 'all') {
            dispatch(getProductsFromCart());
        } else {
            dispatch(getProductsFromCart(filter));
        }
    }, [filter]);


    return (
        <div className={s.main}>
            {localStorage.getItem('user') && (
                <>

                    <p className={s.textpoqr}>{t("personal_page")}</p>
                    <div className={s.boxAll}>
                        <div className={s.box1}>
                            <p className={s.headerbox1}> {t("personal_page")}</p>

                            <div className={s.box}>
                                <div className={s.boxline} onClick={() => dispatch(setAddressMode(true))}>
                                    <div className={s.innerbox}>
                                        <div>
                                            <img src={map} className={s.icon}/>
                                        </div>

                                        <p className={s.textbox1}> {t("address")}</p>
                                    </div>

                                    <img src={slaq1} className={s.slaq}/>
                                </div>
                                <div className={s.line}></div>

                                <div className={s.boxline} onClick={() => navigate("/mycart")}>
                                    <div className={s.innerbox}>
                                        <div>
                                            <div className={s.cartqty}>{count1}</div>
                                            <img src={cart} className={s.icon}/>
                                        </div>

                                        <p className={s.textbox1}>{t("cart")} </p>
                                    </div>

                                    <img src={slaq1} className={s.slaq}/>
                                </div>
                                <div className={s.line}></div>
                                <div className={s.boxline} onClick={() => navigate("/shoppingHistory")}>
                                    <div className={s.innerbox}>
                                        <div>
                                            <img src={buy} className={s.icon}/>
                                        </div>

                                        <p className={s.textbox1}> {t("shopping_history")}</p>
                                    </div>

                                    <img src={slaq1} className={s.slaq}/>
                                </div>
                                <div className={s.line}></div>

                                <div className={s.boxline} onClick={() => navigate("/specialoffers")}>
                                    <div className={s.innerbox}>
                                        <div>
                                            {/* <div className={s.akciaqty}>1</div> */}
                                            <img src={tag} className={s.icon}/>
                                        </div>

                                        <p className={s.textbox1}>{t("promotion")} </p>
                                    </div>

                                    <img src={slaq1} className={s.slaq}/>
                                </div>
                                <div className={s.line}></div>

                                <div className={s.boxline} onClick={() => navigate("/frequentlyQuestions")}>
                                    <div className={s.innerbox}>
                                        <div>
                                            <img src={help} className={s.icon}/>
                                        </div>

                                        <p className={s.textbox1}> {t("support")} </p>
                                    </div>

                                    <img src={slaq1} className={s.slaq}/>
                                </div>
                                <div className={s.line}></div>

                                <div className={s.boxline} onClick={handleLogout}>
                                    <div className={s.innerbox}>
                                        <div>
                                            <img src={logout} className={s.icon}/>
                                        </div>

                                        <p className={s.textbox1}> {t("sign_out")} </p>
                                    </div>

                                    <img src={slaq1} className={s.slaq}/>
                                </div>
                            </div>
                        </div>

                        <div className={s.box2}>
                            <SelfInfo/>
                        </div>
                    </div>
                    {filtertype == "logout" && (
                        <Popup mode1={true}>
                            <PopupComponent text={"Դուք դուրս եք եկել Զամբյուղ հարթակից"}/>
                        </Popup>
                    )}
                </>
            )}

            {!localStorage.getItem('user') && (
                <div className={s.box5}>
                    <p className={s.header1}> Խնդրում ենք գրանցվել Զամբյուղ հարթակում </p>

                    <NavLink to={"/selfinfo"} className={s.navlink}>

                        Գրանցվել
                    </NavLink>

                    <button className={s.button} onClick={handleLogout}>

                        Ելք

                    </button>


                </div>
            )}
        </div>
    );
}

export default Profile;
