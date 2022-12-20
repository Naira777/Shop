import React, {useState, useEffect} from "react";
import s from "./index.module.css";
import vector from "../../../assets/vector.png";
import {useNavigate, NavLink} from "react-router-dom";
import check from "../../../assets/check.png";
import eye from "../../../assets/eye.png";
import {useSelector, useDispatch} from "react-redux";
import {
    searchAddresses,
    setToken,
    userRegister,
} from "../../../redux/usersReducer";
import Popup from "./../../Popup/index";
import PopupComponent from "./../../PopupComponent/PopupComponent";
import {useTranslation} from "react-i18next";
import {useDebounce} from "./../../../CustomHooks/useDebounce";

function InfoInput() {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const {lang} = useSelector((state) => state.CategoryPage);
    const {errors, register, userInfo, searchAddressesArray} = useSelector(
        (state) => state.UsersPage
    );
    const [name, setName] = useState("");
    const [surname, setSurName] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [cityId, setCityId] = useState("");
    const [entrance, setEntrance] = useState("");
    const [floor, setFloor] = useState("");
    const [apt, setApt] = useState("");
    const [password, setPassword] = useState("");
    const [mode, setMode] = useState(false);
    const [mode1, setMode1] = useState(false);
    const [phone, setPhone] = useState(localStorage.getItem("tel"));
    const dispatch = useDispatch();

    const handleClick = () => {
        mode1 &&
        dispatch(
            userRegister(
                name,
                surname,
                email,
                password,
                cityId,
                entrance,
                floor,
                apt,
                phone
            )
        );

        mode1 && setMode(true);
    };
    const handleClickDesktop = useDebounce(handleClick, 300);

    useEffect(() => {
        if (Object.keys(userInfo).length != 0) {
            dispatch(setToken(userInfo.token));
            localStorage.setItem("password", password);
            localStorage.setItem("user", userInfo.token);
            localStorage.setItem("user_name", userInfo.name);
            localStorage.setItem("user_surname", userInfo.surname);
            localStorage.setItem("user_email", userInfo.email);
            localStorage.setItem("user_tel", userInfo.tel);
        }
        mode && localStorage.setItem("password", password);

    }, [userInfo, mode]);


    useEffect(() => {

        if (localStorage.getItem('user')) {

            !mode && navigate('/profile')

        }
    }, [mode]);


    const checkClick = () => {
        setMode1(!mode1);
    };


    useEffect(() => {
        if(city.length === 0){
            document.getElementById('search').style.display= 'none'
        }    
    }, [city]);

    useEffect(() => {
        if (mode1) {
            document.getElementById("button").style.opacity = "1";
        } else {
            document.getElementById("button").style.opacity = "0.6";
        }
    }, [mode1]);

    const handleClickSearchAddress = (e) => {
        dispatch(searchAddresses(city));
        setCity(e.target.value);
        document.getElementById("search").style.display = "block";
    };
    const handlClickSearch = (e) => {
        document.getElementById("search").style.display = "none";
        setCity(e.currentTarget.textContent);
        setCityId(e.currentTarget.id);
    };

    function passwordShow() {
        const x = document.getElementById("passwordInput");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    return (
        <div className={s.main}>
            <img
                src={vector}
                className={s.vector}
                onClick={() => {
                    navigate(-1);
                }}
            />
            <p className={s.header}>{t("welcome")} </p>
            <p className={s.text}>{t("info_inputText")}</p>
            <div className={s.item}>
                <p className={s.textpoqr}>{t("name")}</p>
                <input
                    className={s.code}
                    placeholder={`${t("name")}`}
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
                {errors?.name && <p className={s.error}>{errors?.name}</p>}
            </div>

            <div className={s.item}>
                <p className={s.textpoqr}>{t("lastName")} </p>
                <input
                    className={s.code}
                    placeholder={`${t("lastName")}`}
                    value={surname}
                    onChange={(e) => {
                        setSurName(e.target.value);
                    }}
                />
                {errors?.last_name && <p className={s.error}>{errors?.last_name}</p>}
            </div>

            <div className={s.item}>
                <p className={s.textpoqr}>{t("email")}</p>
                <input
                    className={s.code}
                    placeholder={`${t("email")}`}
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                {errors?.email && <p className={s.error}>{errors?.email}</p>}
            </div>

            <p className={s.text}>{t("shipp_address")}</p>

            <div className={s.item}>
                <p className={s.textpoqr}>{t("city")}</p>
                <input
                    className={s.code}
                    placeholder={`${t("city")}`}
                    value={city}
                    onChange={handleClickSearchAddress}
                />
                <div className={s.dropdown} id="search">
                    {searchAddressesArray?.map((item, index) => {
                        return (
                            <div
                                key={index}
                                id={item.address_id}
                                className={s.dropdownItem}
                                onClick={handlClickSearch}
                            >
                                {item.address}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className={s.item}>
                <p className={s.textpoqr}>{t("entrance")}</p>
                <input
                    className={s.code}
                    placeholder={`${t("entrance")}`}
                    value={entrance}
                    onChange={(e) => setEntrance(e.target.value)}
                />
                {errors?.entrance && <p className={s.error}>{errors?.entrance}</p>}
            </div>

            <div className={s.item}>
                <p className={s.textpoqr}>{t("floor")}</p>
                <input
                    className={s.code}
                    placeholder={`${t("floor")}`}
                    value={floor}
                    onChange={(e) => {
                        setFloor(e.target.value);
                    }}
                />
                {errors?.floor && <p className={s.error}>{errors?.floor}</p>}
            </div>
            <div className={s.item}>
                <p className={s.textpoqr}>{t("apt")}</p>
                <input
                    className={s.code}
                    placeholder={`${t("apt")}`}
                    value={apt}
                    onChange={(e) => {
                        setApt(e.target.value);
                    }}
                />
                {errors?.flat && <p className={s.error}>{errors?.flat}</p>}
            </div>

            <div className={s.item}>
                <p className={s.textpoqr}>{t("password")}</p>

                <input
                    id="passwordInput"
                    className={s.code}
                    type="password"
                    required
                    placeholder={`${t("password")}`}
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <img src={eye} className={s.eye} onClick={passwordShow}/>
                {errors?.password && <p className={s.error}>{errors?.password}</p>}
            </div>

            <div className={s.checkBox}>
                <div>
                    {!mode1 && <div className={s.checkInput} onClick={checkClick}></div>}

                    {mode1 && (
                        <img src={check} className={s.check} onClick={checkClick}/>
                    )}
                </div>
                {lang === "am" && (
                    <p className={s.rem}>
                        Գրանցվելով Դուք ընդունում եք մեր{" "}
                        <NavLink to="/privacy" className={s.link}>
                            Գաղտնիության քաղաքականության,{" "}
                        </NavLink>
                        <NavLink to="/rules" className={s.link}>
                            Օգտագործման կանոնների և անձնական տվյալների մշակման
                        </NavLink>{" "}
                        հետ:
                    </p>
                )}

                {lang === "ru" && (
                    <p className={s.rem}>
                        Регистрируясь, вы соглашаетесь с нашей{" "}
                        <NavLink to="/privacy" className={s.link}>
                            Политикой конфиденциальности,{" "}
                        </NavLink>
                        <NavLink to="/rules" className={s.link}>
                            Условиями использования и обработки персональных данных․
                        </NavLink>
                    </p>
                )}

                {lang === "en" && (
                    <p className={s.rem}>
                        By registering you agree to our{" "}
                        <NavLink to="/privacy" className={s.link}>
                            Privacy Policy,
                        </NavLink>{" "}
                        <NavLink to="/rules" className={s.link}>
                            Terms of Use and Personal Data Processing․
                        </NavLink>
                    </p>
                )}
            </div>
            <button className={s.button} id="button" onClick={handleClickDesktop}>
                {t("register")}
            </button>

            {register && mode && (
                <Popup mode1={true} close>
                    <PopupComponent
                        mobile
                        url={"/home"}
                        buttonText={`${t("doShopping")}`}
                        text={`${t("welcome_zambi")}`}
                    />
                </Popup>
            )}
        </div>
    );
}

export default InfoInput;
