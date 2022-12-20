import React from "react";
import s from "./PopupComponent.module.css";
import {checked} from "../images";
import {useNavigate} from "react-router-dom";
import cartPopup from "../../assets/CartPopup.png";

const PopupComponent = ({buttonText, text, mobile, url, image, nothing}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`${url}`);
    };

    return (
        <div className={s.content} style={mobile ? {width: "30vw"} : null}>
            {!image && !nothing && (
                <img
                    src={checked}
                    className={s.checked}
                    style={mobile ? {width: "35px", height: "35px"} : null}
                />
            )}
            {image && !nothing && <img src={cartPopup} className={s.cart1} alt="pic"/>}
            {text && (
                <p
                    className={s.text}
                    style={mobile ? {width: "60vw", fontSize: "16px"} : null}
                >
                    {text}
                </p>
            )}

            {buttonText && (
                <button
                    className={s.button}
                    onClick={handleClick}
                    style={mobile ? {width: "155px"} : null}
                >
                    {buttonText}
                </button>
            )}
        </div>
    );
};
export default PopupComponent;
