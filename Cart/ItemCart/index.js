import React, { useState, useEffect, useCallback } from "react";
import s from "./index.module.css";
import x from "../../../assets/x.png";
import { useParams } from "react-router-dom";
import check from "../../../assets/check.png";
import { useDispatch} from "react-redux";
import { setDeletedCartItemsPlus, updateProductQtyInCart, setDeletedCartItemsMinus, deleteProductFromCart, getProductsFromCart } from "../../../redux/usersReducer";
import { useTranslation } from 'react-i18next';


function ItemCart({
  url,
  price,
  prevPrice,
  title,
  qty,
  meas,
  id,
  handleCheck,
  checked,
  qtyInWareHouse

}) {
  const [qty1, setQty1] = useState(qty);
  const [check1, setCheck1]= useState(false)
  const dispatch = useDispatch();
  const { filtertype } = useParams();
  const {t} = useTranslation();

  const handleClickMinus = (e) => {
    e.stopPropagation()
   
    if (qty1 > 1) {
      dispatch(updateProductQtyInCart(id, `${qty1 - 1}`, filtertype));
      setQty1(qty1 - 1);
    }
   
  };

  const handleClickPlus = (e) => {
    e.stopPropagation()
    if(qty1 < qtyInWareHouse){
      setQty1(qty1 + 1);
    dispatch(updateProductQtyInCart(id, `${qty + 1}`, filtertype));
    
    }
  };


useEffect(()=> {
checked && setCheck1(false)

},[checked])

useEffect(()=> {
  !checked && check1 && dispatch(setDeletedCartItemsPlus(id))
  !checked && !check1 && dispatch(setDeletedCartItemsMinus(id))
  
  },[check1, checked])

  const handleClick = () => {
  !checked && setCheck1(!check1) 
  
  }
  const handleClickDelete = (e) => {
    e.stopPropagation()

  if (!filtertype) {
    dispatch(deleteProductFromCart([{id: id}], "supermarket"));
    
  } else {
    dispatch(deleteProductFromCart([{id: id}], filtertype));

   }
   if (!filtertype) {
    dispatch(getProductsFromCart());
  } else {
    dispatch(getProductsFromCart(filtertype));
  }

};

const priceQty = price* qty1

  return (
    <div className={s.contentDesktop} onClick={handleClick}>
      <div className={s.box1}>
        <img alt="pic" src={url} className={s.pic} />
        <div className={s.boxPrice}>
          <div className={s.header}> {title}</div>
          <div className={s.price}>
            {meas}/
            {prevPrice && (
              <span className={s.pricespanline}>{prevPrice}{t("currency")} </span>
            )}
            <span className={s.pricespan}>{price}{t("currency")}</span>
          </div>
        </div>
      </div>
      <div className={s.boxqtyAll}>
        {qtyInWareHouse < 1 && <span className={s.karmirtext}>{t("WareIsNot")} </span>} 
        {qtyInWareHouse > 0 && (
          <>
            <button className={s.buttonqty} onClick={handleClickMinus}>
              -
            </button>
            <span className={s.tooltiptext}>{t("WareIs")}{" "}{qtyInWareHouse}</span>

            <div className={s.qty}>{qty1}</div>

            <button className={s.buttonqty} onClick={handleClickPlus}>
              +
            </button>
          </>
       )}
      </div>

      <div className={s.priceqty}>{priceQty}{t("currency")}</div>

      <div className={s.boxclose}>
        <img
          src={x}
          className={s.close}
          alt="pic"
          onClick={handleClickDelete}
        />

        {(checked || check1) && (
          <img src={check} className={s.check} onClick={handleCheck} />
        )}
      
      </div>
    </div>
  );
}

export default ItemCart;
