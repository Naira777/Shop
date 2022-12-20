import React from "react";
import s from "./index.module.css";
import {v_right} from "./../images";
import clsx from "clsx";

function PageTitle({title1, title2, title3, className}) {
    return (
        <p className={clsx(s.text_small, className)}>
            {title1}
            {title2 && <img src={v_right} className={s.vector}/>}
            {title2} {title3 && <img src={v_right} className={s.vector}/>} {title3}
        </p>
    );
}

export default PageTitle;
