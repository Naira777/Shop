import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Footer from "../components/Footer";
import styles from "./MainLayout.module.css";
import Popup from "./../components/Popup/index";
import SignUporSignIn_Mobile from "./../components/SignUporSignIn/Mobile/index";
import SignUp_Mobile from "./../components/SignUp/SignUp_Mobile/index";
import {useSelector, useDispatch} from "react-redux";
import {useWindowSize} from "./../CustomHooks/getWindowWidth";
import SignIn from "./../components/SignIn/index";
import PasswordReset from "../components/PasswordReset";
import UserAddress from "../components/UserAddress/userAddress";
import {
    setSignuporSignin,
    setSignin,
    setSignup,
    setPassword,
    setPasswordReset,
    setAddressMode,
    setToken,
    setUpdate,
} from "./../redux/usersReducer";
import arrow from "./../assets/Arrow1.png";
import { getCategoriesById, changeCategoryIdes } from './../redux/reducer';
import { getCategoriesByid } from './../utils';

const MainLayout = (props) => {
    const [height, width] = useWindowSize();
    const [show, setShow] = useState(false);

    const dispatch = useDispatch();
    const {
        signup,
        signuporsignin,
        signin,
        password,
        passwordReset,
        address_mode,
        token,
    } = useSelector((state) => state.UsersPage);

    const {lang, categoriesById, categoryList} = useSelector((state) => state.CategoryPage);
    useEffect(() => {
        dispatch(getCategoriesById())
    }, [lang])

    useEffect(() => {
        dispatch(changeCategoryIdes(getCategoriesByid(categoryList, null )))
    }, [categoryList])
    
    useEffect(() => {
        if (lang == 'ru') {
            document.body.style.fontFamily = 'Rus_font'

        } else if (lang == 'am' || 'en') {
            document.body.style.fontFamily = 'Mardoto'
        }
    }, [lang])


    useEffect(() => {
        document.body.style.overflow = "visible";
    }, [window.location.href, window.location.pathname]);

    useEffect(() => {
        if (!token) {
            dispatch(setToken(localStorage.getItem("user")));
        }
    }, [token]);

    useEffect(() => {
        dispatch(setSignuporSignin(false));
        dispatch(setSignin(false));
        dispatch(setSignup(false));
        dispatch(setPassword(false));
        dispatch(setPasswordReset(false));
        dispatch(setAddressMode(false));
        dispatch(setUpdate(false));
    }, [window.location]);

    const moveUp = () => {
        window.scrollTo({top: 0, behavior: "smooth"});
    };
    useEffect(() => {
        window.onscroll = function () {
            changeScroll();
        };
    }, []);

    const changeScroll = () => {
        if (window.pageYOffset > 300) {
            setShow(true);
        } else {
            setShow(false);
        }
    };

    return (
        <div className={styles.main}>
            <Header/>
            <Menu categoriesById1={categoriesById}/>
            <div className={styles.children}>
                {width < 500 &&
                    !signuporsignin &&
                    !password &&
                    !signin &&
                    !signup &&
                    !passwordReset &&
                    !address_mode &&
                    props.children}

                {width > 500 && props.children}

                {signuporsignin &&
                    (width > 500 ? (
                        <Popup>
                            <SignUporSignIn_Mobile desktop/>
                        </Popup>
                    ) : (
                        <SignUporSignIn_Mobile/>
                    ))}

                {signin &&
                    (width > 500 ? (
                        <Popup>
                            <SignIn desktop/>
                        </Popup>
                    ) : (
                        <SignIn/>
                    ))}

                {signup &&
                    (width > 500 ? (
                        <Popup>
                            <SignUp_Mobile/>
                        </Popup>
                    ) : (
                        <SignUp_Mobile/>
                    ))}

                {passwordReset &&
                    (width > 500 ? (
                        <Popup>
                            <PasswordReset/>
                        </Popup>
                    ) : (
                        <PasswordReset mobile/>
                    ))}

                {address_mode && (
                    <Popup>
                        <UserAddress/>
                    </Popup>
                )}
                {show && width < 500 && (
                    <div className={styles.arrowUp}>
                        <div className={styles.cycle} onClick={moveUp}></div>
                        <img onClick={moveUp} src={arrow} className={styles.arrow}/>
                    </div>
                )}
            </div>

            <Footer/>
        </div>
    );
};

export default MainLayout;
