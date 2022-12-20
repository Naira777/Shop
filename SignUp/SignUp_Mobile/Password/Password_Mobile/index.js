import React, {useState, useEffect} from "react";
import s from "./index.module.css";
import vector from "../../../../../assets/vector.png";
import check from "../../../../../assets/check.png";
import {useNavigate, NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setPasswordInStore, setPassword} from "../../../../../redux/usersReducer";
import {useSelector} from "react-redux";
import { useTranslation } from 'react-i18next';

function Password_Mobile({mobile}) {

    const navigate = useNavigate();
    const { t } = useTranslation();
    const [password1, setPassword1] = useState("");
    const [tel, setTel] = useState(localStorage.getItem('tel'));
    const [disable, setDisable] = useState(true)

    const verify = useSelector((state) => state.UsersPage.verify);

    const password_store = useSelector((state) => state.UsersPage.userPassword);

    const dispatch = useDispatch();

   
// useEffect(()=> {

//     setTel()
// },[])


    const handleChange = (e) => {
        setTel(e.target.value);
    };

    const handleChange_password = (e) => {

        setPassword1(e.target.value);

        if (e.target.value.length >= 8) {
            setDisable(false)
            document.getElementById("button").style.opacity = '1';
        }

        if (e.target.value.length < 8) {
            setDisable(true)
            document.getElementById("button").style.opacity = '0.4';
        }

    };

    const handleClick = () => {
        if (password1.length >= 8) {
            setDisable(false)
            document.getElementById("button").style.opacity = '1';
            localStorage.setItem("password", password1)
            localStorage.setItem("tel", tel)
            // dispatch(setPasswordInStore(password1));
            dispatch(setPassword(false))
            navigate("/selfinfo");
        }
    };

    

    return (
        <div className={s.main}>
            {!mobile && (
                <img
                    src={vector}
                    className={s.vector}
                    onClick={() => {
                        navigate(-1);
                    }}
                />
            )}

            <p className={s.header}>   {t("choose_password")}vxxcvcxv</p>

            <p className={s.textpoqr}>  {t("tel")} </p>
            <div className={s.inputs}>
                <input
                    readOnly                  
                    className={s.country_code}
                    value={`+374`}
                />

                <input
              
                    className={s.tel_code}
                    type="tel"
                    id="phone"
                    name="phone"
                    value={tel}
                    // placeholder="(XX)-XX-XX-XX"
                    pattern="([0-9]{2}) [0-9]{2} [0-9]{2} [0-9]{2}"
                    onChange={handleChange}
                    required
                />
            </div>

            <p className={s.textpoqr}>  {t("password")}</p>

            <input
                className={s.code}
                type="password"
                value={password1}
                onChange={handleChange_password}
            />

            <div className={s.checkbox}>
                <img
                    src={check}
                    className={s.check}
                    onClick={() => {

                    }}
                />
                <p className={s.rem} style={{color: "#212121"}}>
                {t("rem_me")}
                </p>
            </div>
            <button
                className={s.button}
                style={{background: "#3D9A85"}}
                onClick={handleClick}
                disabled={disable}
                id="button"
            >

{t("register")}
            </button>

            <div className={s.checkbox}>

                <img
                    src={check}
                    className={s.check}
                    onClick={() => {

                    }}
                />
                <p className={s.rem}>
                {t("agree")}
                    <NavLink to="/"  className={s.link}>
                    {t("privacyText")},  {t("ruleText")}
                    </NavLink>
                    {t("with")}:
                </p>
            </div>
        </div>
    );
}

export default Password_Mobile;
