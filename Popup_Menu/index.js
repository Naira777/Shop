import React, {useEffect, useState} from "react";
import s from "./index.module.css";
import {setClickMenu, setClickMenuDesktop} from "../../redux/reducer";
import {useDispatch} from 'react-redux';

const Popup_Menu = ({children, mode, mobile}) => {
    const [modeInner, setModeInner] = useState(mode);
    const dispatch = useDispatch()
    useEffect(() => {
        document.body.style.overflow = "visible";
    }, [window.location.href, window.location.pathname]);

    useEffect(() => {
        if (modeInner) {
            document.getElementById("overlay").style.visibility = "visible";
            document.getElementById("popup").style.visibility = "visible";
            document.body.style.overflow = "hidden";
        }
    }, [modeInner]);

    const handleClick = () => {
        setModeInner(false);
        mobile && dispatch(setClickMenu(false));
        dispatch(setClickMenuDesktop(true));
        document.body.style.overflow = "visible";
    };

    return (
        <>
            {modeInner && (
                <div className={s.main}>
                    <div
                        className={s.popup}
                        id="popup"
                        style={mobile ? {left: "0", marginLeft: "10px"} : null}
                    >
                        {children}
                    </div>

                    <div
                        id="overlay"
                        className={s.overlay}
                        style={mobile ? {marginLeft: "0px", marginTop: "88px"} : null}
                        onClick={handleClick}
                    ></div>
                </div>
            )}
        </>
    );
};
export default Popup_Menu;
