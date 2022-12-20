import React, {useState, useEffect} from "react";
import s from "./index.module.css";
import {useDispatch, useSelector} from "react-redux";
import {
    phoneVerify,
    setSignup,
    setSignuporSignin,
} from "../../../redux/usersReducer";
import {setSignin} from "../../../redux/usersReducer";
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-dom';

function SignUporSignIn_Mobile({desktop}) {
    const navigate = useNavigate()
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const [tel, setTel] = useState("");
    const {phone_verify, errors} = useSelector((state) => state.UsersPage);

    useEffect(() => {
        if (tel.length === 8) {
            dispatch(phoneVerify(`+374${tel}`));
        }
    }, [tel]);
    console.log(111,phone_verify)
    useEffect(() => {

        if (phone_verify?.exists === "no" || phone_verify?.is_verified === "no") {
            dispatch(setSignup(true));
            dispatch(setSignin(false));
            dispatch(setSignuporSignin(false));
            localStorage.setItem('tel', tel)

        }
        if (phone_verify?.is_registered === "yes") {

            dispatch(setSignup(false));
            dispatch(setSignuporSignin(false));
            localStorage.setItem('tel', tel)
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
            localStorage.setItem('tel', tel)
            navigate('/selfinfo')

        }

    }, [phone_verify]);

    return (
        <div className={s.main}>

            <p className={s.header} style={desktop ? {fontSize: "24px"} : null}>
                {t("signIn")}/{t("register")}
            </p>

            <p className={s.text} style={desktop ? {fontSize: "16px"} : null}>
                {t("signText")}
            </p>

            <p className={s.textpoqr} style={desktop ? {fontSize: "14px"} : null}>
                {t("tel")}
            </p>
            <div className={s.inputs}>
                <div
                    className={s.country_code}
                    style={
                        desktop
                            ? {width: "200px", height: "49px", fontSize: "16px"}
                            : null
                    }
                >
                    +374
                </div>

                <input
                    className={s.tel_code}
                    style={
                        desktop
                            ? {
                                width: "264px",
                                height: "48px",
                                marginLeft: "25px",
                                fontSize: "16px",
                            }
                            : null
                    }
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="(XX)-XX-XX-XX"
                    pattern="([0-9]{2}) [0-9]{2} [0-9]{2} [0-9]{2}"
                    required
                    onChange={(e) => setTel(e.target.value)}
                />
            </div>
            {errors?.phone_number && (
                <p className={s.error1}> {errors?.phone_number} </p>
            )}
        </div>
    );
}

export default SignUporSignIn_Mobile;
