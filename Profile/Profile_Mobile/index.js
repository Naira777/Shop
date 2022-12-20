import React, {useState, useEffect} from "react";
import s from "./index.module.css";
import {useNavigate} from "react-router-dom";
import {
    buy,
    slaq1,
    tag,
    help,
    logout,
    map,
    cart,
    editpic,
    vectorwhite,
} from "../../images";
import SelfInfo from "../Profile_Desktop/SelfInfo";
import {useDispatch, useSelector} from "react-redux";
import {
    getProductsFromCart,
    setAddressMode,
    setPhoneVarify,
    setTel,
    setToken,
    setUserInfo,
    setVerify,
} from "../../../redux/usersReducer";
import {setPasswordInStore} from "./../../../redux/usersReducer";
import {useTranslation} from "react-i18next";

function Profile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {t} = useTranslation();

    const [mode, setMode] = useState(false);
    const {cartItems, token} = useSelector((state) => state.UsersPage);
    const [count1, setCount1] = useState(0);

    useEffect(() => {
        if (!token) {
            dispatch(setToken(localStorage.getItem("user")));
        }
    }, [token]);

    useEffect(() => {
        let count = 0;
        cartItems.map((element, index) => {
            count = count + 1
        });
        setCount1(count);
    }, [cartItems]);

    const filter = localStorage.getItem("delivery_type");

    useEffect(() => {
        if (filter === "all") {
            dispatch(getProductsFromCart());
        } else {
            dispatch(getProductsFromCart(filter));
        }
    }, [filter]);
    const handleClick = () => {
        setMode(!mode);
    };

    const handleLogout = () => {
        const lan= localStorage.getItem('userLanguage')
        localStorage.clear();
        localStorage.setItem('userLanguage', lan)
        dispatch(setTel(""));
        dispatch(setPasswordInStore(""));
        dispatch(setVerify(false));
        dispatch(setPhoneVarify({}));
        navigate("/home");
        dispatch(setToken(""));
        dispatch(setUserInfo({}))
    };

    const handleNavigate = (text) => {
        text === "offers" && navigate("/specialoffers");
        text === "myCart" && navigate("/mycart");
        text === "address" && dispatch(setAddressMode(true));
    };

    return (
        <div className={s.main}>
            {!mode && (
                <>
                    <div className={s.content}>
                        <img
                            src={vectorwhite}
                            className={s.vector}
                            onClick={() => {
                                navigate(-1);
                            }}
                        />
                        <img src={editpic} className={s.edit} onClick={handleClick}/>

                        <p className={s.header}>{t("personal_page")} </p>
                        <div>
                            <p className={s.text}>
                                {" "}
                                {localStorage.getItem("user_name")}{" "}
                                {localStorage.getItem("user_surname")}
                            </p>
                            <p className={s.text}> +374 XX XX XX </p>
                            <p className={s.text}> {localStorage.getItem("user_email")} </p>
                        </div>
                    </div>

                    <div className={s.box} onClick={() => handleNavigate("address")}>
                        <div className={s.boxIcon}>
                            <img className={s.icon} src={map}/>
                        </div>
                        <div className={s.boxtext}>
                            <p className={s.text_icon}>{t("address")}</p>
                        </div>
                        <div className={s.boxslaq}>
                            <img className={s.slaq} src={slaq1}/>
                        </div>
                    </div>

                    <div className={s.box} onClick={() => handleNavigate("myCart")}>
                        <div className={s.boxIcon}>
                            <div className={s.cartqty}>{count1}</div>
                            <img className={s.icon} src={cart}/>
                        </div>

                        <div className={s.boxtext}>
                            <p className={s.text_icon}> {t("cart")} </p>
                        </div>
                        <div className={s.boxslaq}>
                            <img className={s.slaq} src={slaq1}/>
                        </div>
                    </div>

                    <div className={s.box} onClick={() => navigate("/shoppingHistory")}>
                        <div className={s.boxIcon}>
                            <img className={s.icon} src={buy}/>
                        </div>
                        <div className={s.boxtext}>
                            <p className={s.text_icon}> {t("shopping_history")} </p>
                        </div>
                        <div className={s.boxslaq}>
                            <img className={s.slaq} src={slaq1}/>
                        </div>
                    </div>

                    <div className={s.box} onClick={() => handleNavigate("offers")}>
                        <div className={s.boxIcon}>
                            {/* <div className={s.akciaqty}>1</div> */}
                            <img className={s.icon} src={tag}/>
                        </div>
                        <div className={s.boxtext}>
                            <p className={s.text_icon}> {t("promotion")}</p>
                        </div>
                        <div className={s.boxslaq}>
                            <img className={s.slaq} src={slaq1}/>
                        </div>
                    </div>

                    <div
                        className={s.box}
                        onClick={() => navigate("/frequentlyQuestions")}
                    >
                        <div className={s.boxIcon}>
                            <img className={s.icon} src={help}/>
                        </div>
                        <div className={s.boxtext}>
                            <p className={s.text_icon}>{t("support")}</p>
                        </div>
                        <div className={s.boxslaq}>
                            <img className={s.slaq} src={slaq1}/>
                        </div>
                    </div>

                    <div className={s.box} onClick={handleLogout}>
                        <div className={s.boxIcon}>
                            <img className={s.icon} src={logout}/>
                        </div>
                        <div className={s.boxtext}>
                            <p className={s.text_icon}> {t("sign_out")} </p>
                        </div>
                    </div>
                </>
            )}
            {mode && <SelfInfo mobile/>}
        </div>
    );
}

export default Profile;
