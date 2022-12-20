import React from "react";
import s from "./index.module.css";
import loader from "./../../assets/Spin.svg";

const Preloader = ({mobile}) => {
    return (
        <div className={s.All} style={mobile ? {width: '95vw'} : null}>
            <img src={loader} className={s.loader} style={mobile ? {width: '150px', height: '150px'} : null}/>
        </div>
    );
};
export default Preloader;
