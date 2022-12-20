import React, {useState, useEffect} from "react";
import s from "./index.module.css";
import {vector} from "../images";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {password_Reset} from "../../redux/usersReducer";
import PopupComponent from "./../PopupComponent/PopupComponent";
import eye from "../../assets/eye.png";
import {phoneVerify} from "./../../redux/usersReducer";
import {useTranslation} from "react-i18next";

function PasswordReset({mobile}) {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {errors, passwordReset, phone_verify} = useSelector(
        (state) => state.UsersPage
    );
    const [tel, setTel] = useState(localStorage.getItem("tel"));
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [mode1, setMode1] = useState(false);
    const [mode2, setMode2] = useState(false);
    const [mode, setMode] = useState(true);
    const [mode3, setMode3] = useState(false);


    const handleClick = () => {
        dispatch(phoneVerify(tel));

        if (
            errors &&
            Object.keys(errors).length === 0 &&
            phone_verify.is_verified === "yes"
        ) {
            setMode(false);
            setMode1(true);
        }
    };

    const handleClickReset = () => {
        dispatch(password_Reset(tel, password, passwordRepeat));
        if (
            Object.keys(errors).length === 0 &&
            phone_verify.is_verified === "yes"
        ) {
            setMode1(false);
            setMode2(false);
            setMode3(true);
            setMode(false);
        }
    };

    useEffect(() => {
    }, [passwordReset]);

    const handleClickConfirm = () => {
        setMode(false);
        setMode1(false);
        setMode2(true);
    };

    function passwordShow(num) {
        if (num == 1) {
            var x = document.getElementById("passwordInput1");
        }
        if (num == 2) {
            var x = document.getElementById("passwordInput2");
        }

        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    return (
        <div className={s.main}>
            {mode && (
                <>

                    {mobile && (
                        <img
                            src={vector}
                            className={s.vector}
                            onClick={() => {
                                navigate(-1);
                            }}
                        />
                    )}
                    <p className={s.header}>{t("recover_pass")}</p>
                    <p className={s.text}>{t("recover_Text")}</p>
                    <p className={s.textpoqr}>{t("tel")}</p>
                    <div className={s.inputs}>
                        <input className={s.country_code} value={`+374`} readOnly/>

                        <input
                            className={s.tel_code}
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="(XX)-XX-XX-XX"
                            pattern="([0-9]{2}) [0-9]{2} [0-9]{2} [0-9]{2}"
                            required
                            value={tel}
                            onChange={(e) => setTel(e.target.value)}
                        />
                    </div>
                    {errors.error?.phone_number && (
                        <p className={s.error1}> {errors?.error?.phone_number} </p>
                    )}
                    {/* <p className={s.textpoqr}>Կոդ</p>
      <input className={s.code}     />
      <p className={s.text_kapuyt} onClick={handleClick}>
        Ստանալ նոր կոդ
      </p> */}
                    <button className={s.button} onClick={handleClick}>

                        {t("recover")}
                    </button>
                </>
            )}
            {mode1 && (
                <>

                    <p className={s.header}>

                        {t("confirm")} {t("tel1")}
                    </p>
                    <p className={s.text}>{t("signupText")}</p>
                    <p className={s.textpoqr}>{t("tel")}</p>
                    <div className={s.inputs}>
                        <input className={s.country_code} value={`+374`} readOnly/>

                        <input
                            className={s.tel_code}
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="(XX)-XX-XX-XX"
                            pattern="([0-9]{2}) [0-9]{2} [0-9]{2} [0-9]{2}"
                            required
                            value={tel}
                            onChange={(e) => setTel(e.target.value)}
                        />
                    </div>
                    <p className={s.textpoqr}>{t("code")}</p>
                    <input className={s.code}/>
                    <p className={s.text_kapuyt} onClick={handleClick}>
                        {t("new_code")}
                    </p>
                    <button className={s.button} onClick={handleClickConfirm}>

                        {t("confirm")}
                    </button>
                </>
            )}

            {mode2 && (
                <>

                    <p className={s.header}>{t("change_pass")} </p>
                    <p className={s.text}>{t("enter_pass")}</p>
                    <p className={s.textpoqr}>{t("password")}</p>
                    <div className={s.inputs}>
                        <input
                            className={s.tel_code}
                            style={mobile ? {width: "80vw", minWidth: "180px"} : null}
                            type="password"
                            required
                            id="passwordInput1"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <img src={eye} className={s.eye} onClick={() => passwordShow(1)}/>
                    </div>
                    <p className={s.textpoqr}>{t("repeat_pass")}</p>
                    <div className={s.inputs}>
                        <input
                            className={s.tel_code}
                            style={mobile ? {width: "80vw", minWidth: "180px"} : null}
                            type="password"
                            id="passwordInput2"
                            value={passwordRepeat}
                            onChange={(e) => setPasswordRepeat(e.target.value)}
                        />
                        <img src={eye} className={s.eye} onClick={() => passwordShow(2)}/>
                    </div>
                    <button className={s.button} onClick={handleClickReset}>

                        {t("confirm")}
                    </button>
                </>
            )}

            {mode3 && <PopupComponent text={`${t("pass_ok")}`} url={"/home"}/>}
        </div>
    );
}

export default PasswordReset;
