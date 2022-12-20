import React from 'react'
import s from './index.module.css'
import qtyPic from '../../../assets/qty.png'
import close from '../../../assets/x.png'
import {useParams} from 'react-router-dom'
import {deleteProductFromCart} from '../../../redux/usersReducer'
import {useDispatch} from 'react-redux'
import { useTranslation } from 'react-i18next';

function ItemProduct({url, title, qty, price, id, handleDelete, confirm}) {
    const {t} = useTranslation();
    const {filtertype} = useParams()
    const dispatch = useDispatch()

    const handleClickDelete = () => {
        !confirm && dispatch(deleteProductFromCart(id, filtertype))
        confirm && handleDelete()
    }


    return (
        <div className={s.itembox} onClick={handleDelete}>
            <img src={url} className={s.pic}/>
            <div className={s.titlebox}>
                <p className={s.title}>{title}</p>
            </div>
            <div className={s.qtyboxall}>
                <div className={s.qtybox}>
                    <img src={qtyPic} className={s.qty}/>
                    <p className={s.title}>{qty}</p>
                </div>
                <div className={s.qtyboxall1}>
                    <p className={s.title}>{price}{t("currency")}</p>
                </div>
            </div>
            <img src={close} className={s.close} onClick={handleClickDelete}/>
        </div>
    )
}

export default ItemProduct
