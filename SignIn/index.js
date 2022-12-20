import React, {useState, useEffect} from "react";
import s from "./index.module.css";
import {useNavigate, NavLink} from "react-router-dom";
import {login, phoneVerify, setSignup, setSignuporSignin, setToken} from "../../redux/usersReducer";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import eye from "../../assets/eye.png";
import check from "../../assets/check.png";
import sign from "../../assets/about4.png";
import {
    setSignin,
    setPasswordReset,
    setPasswordInStore,
    setTel,
} from "./../../redux/usersReducer";

function SignIn() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {t} = useTranslation();

    const {userInfo, phone_verify, errors, token, signin} = useSelector(
        (state) => state.UsersPage
    );
    const {lang} = useSelector((state) => state.CategoryPage);
    const [tel1, setTel1] = useState(localStorage.getItem("tel"));
    const [checked, setChecked] = useState(false);
    const [disable, setDisable] = useState(true)
    const [checked1, setChecked1] = useState(false);
    const [password, setPassword] = useState("");

    const handleClick = () => {
        dispatch(login(`+374${tel1}`, password));
        dispatch(setPasswordInStore(password));
        dispatch(setTel(`+374${tel1}`));
    };

    useEffect(() => {
    }, [lang])

    useEffect(() => {
        const a = tel1.slice(0, 1);
        if (tel1.length === 8 && a != 0) {
            setChecked(true);
        } else {
            setChecked(false);
        }
    }, [tel1.length]);

    useEffect(() => {
        if (token) {
            localStorage.setItem("password", password);
            dispatch(setSignin(false));
            navigate("/home");
        }
        if (
            phone_verify.is_registered != "yes" &&
            Object.keys(errors).length === 0
        ) {
            dispatch(setSignin(false));
            navigate("/selfinfo");
        }
    }, [phone_verify, errors, token]);

    useEffect(() => {
        if (tel1.length === 8) {
            dispatch(phoneVerify(`+374${tel1}`));
        }
    }, [tel1]);

    useEffect(() => {
        if (tel1.length === 8 && password.length>0) {           
            setDisable(false)
        }
    }, [tel1, password]);
    
    useEffect(() => {
        if (phone_verify?.exists === "no" || phone_verify?.is_verified === "no") {
            dispatch(setSignup(true));
            dispatch(setSignin(false));
            dispatch(setSignuporSignin(false));
            localStorage.setItem('tel', tel1)
        }
        if (phone_verify?.is_registered === "yes") {
            dispatch(setSignup(false));
            dispatch(setSignuporSignin(false));
            localStorage.setItem('tel', tel1)
            dispatch(setSignin(true));
        }
        if (
            phone_verify?.is_verified === "yes" &&
            phone_verify?.exists === "yes" &&
            phone_verify?.is_registered === "no"
        ) {
            dispatch(setSignin(false));
            dispatch(setSignup(false));
            dispatch(setSignuporSignin(false));
            localStorage.setItem('tel', tel1)
            navigate('/selfinfo')

        }
    }, [phone_verify]);


    useEffect(() => {

        if (token) {
            localStorage.setItem("user", token);
            localStorage.setItem("user_name", userInfo.name);
            localStorage.setItem("user_surname", userInfo.surname);
            localStorage.setItem("user_email", userInfo.email);
            localStorage.setItem("password", password);
        } else {
            dispatch(setToken(localStorage.getItem("user")));
            localStorage.setItem("password", password);
        }
    }, [token]);


    function passwordShow() {
        const x = document.getElementById("passwordInput");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    const handlePasswordReset = () => {
        dispatch(setPasswordReset(true));
        dispatch(setSignin(false));
    };

    return (
        <div className={s.main}>
            <p className={s.header}> {t("signIn")} </p>
            <p className={s.text}> {t("signinText")}</p>
            <p className={s.textpoqr}> {t("tel")} </p>
            <div className={s.inputs}>
                <input className={s.country_code} value={`+374`} readOnly/>

                <input
                    className={s.tel_code}
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="(XX)-XX-XX-XX"
                    value={tel1}
                    onChange={(e) => setTel1(e.target.value)}
                    pattern="([0-9]{2}) [0-9]{2} [0-9]{2} [0-9]{2}"
                    required
                />
                {checked && <img src={sign} className={s.sign}/>}
            </div>
            {errors?.phone_number && (
                <p className={s.error1}> {errors?.phone_number} </p>
            )}
            <p className={s.textpoqr}> {t("password")}</p>
            <input
                id="passwordInput"
                className={s.code}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <img src={eye} className={s.eye} onClick={passwordShow}/>
            {errors?.password && <p className={s.error2}> {errors?.password} </p>}
            {!errors?.password && <p className={s.error2}> {""}</p>}
            <div className={s.boxForget}>
                <div className={s.checkbox}>
                    {checked1 && (
                        <img
                            src={check}
                            className={s.check}
                            onClick={() => {
                                setChecked1(false);
                            }}
                        />
                    )}

                    {!checked1 && (
                        <div
                            className={s.boxcheck}
                            onClick={() => {
                                setChecked1(true);
                            }}
                        />
                    )}

                    <p className={s.rem} style={{color: "#212121"}}>
                        {t("rem_me")}
                    </p>
                </div>
                <div className={s.passwordforgetbox}>
                    <p className={s.passwordforget} onClick={handlePasswordReset}>
                        {t("pass_forget")}
                    </p>
                </div>
            </div>

            <button className={s.button} onClick={handleClick}  disabled={disable} >
                {t("signIn")}
            </button>
            <div className={s.rem1}>
                {lang == "am" && (
                    <p className={s.rem2}>
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

                {lang == "ru" && (
                    <p className={s.rem2}>
                        Регистрируясь, вы соглашаетесь с нашей{" "}
                        <NavLink to="/privacy" className={s.link}>
                            Политикой конфиденциальности,{" "}
                        </NavLink>
                        <NavLink to="/rules" className={s.link}>
                            Условиями использования и обработки персональных данных․
                        </NavLink>
                    </p>
                )}

                {lang == "en" && (
                    <p className={s.rem2}>
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
        </div>
    );
}

export default SignIn;
