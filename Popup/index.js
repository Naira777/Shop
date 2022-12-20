import React, {useEffect, useState} from "react";
import s from "./index.module.css";
import {x} from '../images'
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {setAddressMode, setPasswordReset, setSignup, setSignuporSignin} from "../../redux/usersReducer";
import {setSignin, setPassword, setUpdate} from './../../redux/usersReducer';
import {setModalShow} from "../../redux/shoppingHistoryReducer";
import {setClickProduct, setClickSerach} from "../../redux/reducer";


const Popup = ({children, mode1, close, url}) => {

    const {
        signup,
        signuporsignin,
        signin,
        password,
        passwordReset,
        address_mode,
        isBuy,

    } = useSelector(state => state.UsersPage)
    const {
        modalShow

    } = useSelector(state => state.shoppingHistoryPage)


    const mode = signup || signuporsignin || signin || password || mode1 || passwordReset || address_mode
    const [modeInner, setModeInner] = useState(mode);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = () => {

        dispatch(setSignuporSignin(false))
        dispatch(setSignin(false))
        dispatch(setSignup(false))
        dispatch(setPassword(false))
        dispatch(setAddressMode(false))
        dispatch(setPasswordReset(false))
        dispatch(setUpdate(false))
        dispatch(setClickProduct(false))
        setModeInner(false);
        dispatch(setModalShow(false))

        {
            mode1 && url && navigate(`${url}`)
            mode1 && !url && navigate("/home")

        }


    };

    useEffect(() => {
        if (modeInner) {

            document.getElementById("overlay").style.visibility = "visible";
            document.getElementById("popup").style.visibility = "visible";

        }
    }, [modeInner]);


    const handleClick1 = () => {

        dispatch(setSignuporSignin(false))
        dispatch(setSignin(false))
        dispatch(setSignup(false))
        dispatch(setPassword(false))
        dispatch(setPasswordReset(false))
        setModeInner(false)
        close && navigate('/home')
        dispatch(setUpdate(false))
        dispatch(setAddressMode(false))
        dispatch(setModalShow(false))
        dispatch(setClickSerach(false))
        dispatch(setClickProduct(false))
        isBuy && navigate('/home')
       

    }

    return (
        <>
            {modeInner && (
                <div className={s.main}>
                    <div className={s.popup} id="popup"
                         style={mode1 ? {height: 'min-content', width: 'max-content'} : null}>
                        <img src={x} className={s.close} onClick={handleClick}/>

                        <div className={s.content}>{children}</div>
                    </div>

                    <div id="overlay" className={s.overlay} onClick={handleClick1}></div>
                </div>
            )}
        </>
    );
};
export default Popup;
