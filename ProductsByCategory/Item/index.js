import s from "./index.module.css";
import { star1, star2, basket} from "../../images";
import { useEffect } from "react";
import { useState } from "react";
import { addToCart, setSignuporSignin } from "./../../../redux/usersReducer";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import orange from "./../../../assets/orange.png";
import red from "./../../../assets/red_m.png";
import green from "./../../../assets/green.png";

function Item({
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
  const { t } = useTranslation();
  useEffect(() => {
    setYellow(Array.from(Array(rate).keys()));
    setGray(Array.from(Array(5 - rate).keys()));
  }, [rate]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!token) {
      dispatch(setSignuporSignin(true));
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    } else {
      if (delivery_type === "all") {
        dispatch(addToCart(id, "supermarket"));
      } else {
        dispatch(addToCart(id, delivery_type));
      }
    }
  };
  return (
    <div className={s.content}>
      <div className={s.b}>
        <div className={s.box1}>
          <img
            src={url}
            className={s.picBig}
          />
        </div>

        <div className={s.flags}>
          {isdiscount && (
            <>
              <img src={red} className={s.pic1} />
              <p className={s.dexintext}> -{`${percent}%`}</p>
            </>
          )}

          {isnew?.title && (
            <>
              <img src={green} className={s.pic2} />
              <p className={s.karmirtext}> {`${isnew.title}`} </p>
            </>
          )}

          {ishit?.title && (
            <>
              <img src={orange} className={s.pic3} />
              <p className={s.karmirtexthit}> {`${ishit.title}`} </p>
            </>
          )}
        </div>
      </div>
      <div className={s.box2}>
        <p className={s.text}> {name} </p>
        <div className={s.boxstars}>
          {yellow.map((item, id) => {
            return <img key={id} src={star1} className={s.star} />;
          })}

          {gray.map((item, id) => {
            return <img key={id} src={star2} className={s.star} />;
          })}
        </div>
        <p className={s.rate}>{rate}</p>
        <div className={s.all}>
          <div className={s.boxprice}>
            {!isdiscount && <p className={s.PricelineNull}> </p>}
            {isdiscount && <p className={s.Priceline}> {`${prevPrice}`}{t("currency")} </p>}

            <p className={s.Price}>{`${price}`}{t("currency")}</p>
            <p className={s.Pricefor1}> {`${meas}/${price}`}{t("currency")} </p>
          </div>
          <div className={s.box3} onClick={handleAdd}>
            <div className={s.basket}>
              <img src={basket} className={s.picbasket} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;
