import React, { useEffect } from "react";
import s from "./index.module.css";
import orange from "../../../../assets/orange.png";
import red from "../../../../assets/red_m.png";
import star1 from "../../../../assets/star1.png";
import star2 from "../../../../assets/star2.png";
import basket from "../../../../assets/cart_green.png";
import green from "../../../../assets/green.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../../redux/usersReducer";
import { useTranslation } from "react-i18next";

function Item_Product({
  url,
  price,
  prevPrice,
  name,
  rate,
  isdiscount,
  isnew,
  id,
  percent,
  meas,
  ishit,
}) {
  const [yellow, setYellow] = useState([]);
  const [gray, setGray] = useState([]);
  const dispatch = useDispatch();
  const token = localStorage.getItem("user");

  const { delivery_type } = useSelector((state) => state.CategoryPage);

  useEffect(() => {
    setYellow(Array.from(Array(rate).keys()));
    setGray(Array.from(Array(5 - rate).keys()));
  }, [rate]);
  const { t } = useTranslation();

  const handleClick = (e) => {
    if (!token) {
      return;
    }
    e.preventDefault();
    if (delivery_type === "all") {
      dispatch(addToCart(id, "supermarket"));
    } else {
      dispatch(addToCart(id, delivery_type));
    }
  };

  return (
    <div className={s.boxAll}>
      <div className={s.flags}>
        {isdiscount && (
          <div>
            <img src={red} className={s.pic1} />
            <p className={s.dexintext}> -{`${percent}%`}</p>
          </div>
        )}

        {isnew?.title && (
          <div>
            <img src={green} className={s.pic2} />
            <p className={s.karmirtext}> {`${isnew.title}`} </p>
          </div>
        )}

        {ishit?.title && (
          <div>
            <img src={orange} className={s.pic3} />
            <p className={s.karmirtexthit}> {`${ishit.title}`} </p>
          </div>
        )}
      </div>
      <div className={s.picBox}>
        <img src={url} className={s.pic} />
      </div>
      <div className={s.box1}>
        <p className={s.title}>{name}</p>
        <div className={s.box3}>
          <div className={s.boxstars}>
            {yellow.map((item, id) => {
              return <img key={id} src={star1} className={s.star} />;
            })}

            {gray.map((item, id) => {
              return <img key={id} src={star2} className={s.star} />;
            })}
          </div>
          <p className={s.rate}> {rate}</p>
        </div>
      </div>

      <div className={s.box2}>
        <div className={s.boxPrice}>
          {isdiscount && (
            <p className={s.prevPrice}>
              {prevPrice}
              {t("currency")}
            </p>
          )}
          <p className={s.price}>
            {price}
            {t("currency")}
          </p>
          <p className={s.price_meas}>
            {" "}
            {meas}/{price}
            {t("currency")}
          </p>
        </div>
        <div className={s.boxcart} onClick={handleClick}>
          <img src={basket} className={s.cart} />
        </div>
      </div>
    </div>
  );
}

export default Item_Product;
