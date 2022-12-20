import React from 'react'
import s from './index.module.css'

const url_loc = process.env.REACT_APP_BASE_URL;

function Item_Category({url, title, all}) {
    return (
        <div className={s.box}>
            {!all ? <img src={url} className={s.pic}/> : <img src={url} className={s.pic}/>}
            <div className={s.title}>{title}</div>
        </div>
    )
}

export default Item_Category
