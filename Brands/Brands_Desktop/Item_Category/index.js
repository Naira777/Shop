import React, {useEffect} from "react";
import {NavLink} from "react-router-dom";
import s from "./index.module.css";


function Item_Category({url, title, id}) {


    return (
        <NavLink to={`/brands/${id}`} className={s.link}>
            <div className={s.box}>
                <img src={url} className={s.pic}/>
                <p className={s.title}>{title}</p>
            </div>
        </NavLink>
    );
}

export default Item_Category;
