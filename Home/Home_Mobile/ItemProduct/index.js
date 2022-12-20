import s from "./index.module.css";
import {useEffect} from "react";
import {useState} from "react";
import { addToCart, setSignuporSignin } from './../../../../redux/usersReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import orange from "../../../../assets/orange.png";
import red from "../../../../assets/red_m.png";
import star1 from "../../../../assets/star1.png";
import star2 from "../../../../assets/star2.png";
import basket from "../../../../assets/cart_green.png";
import green from "../../../../assets/green.png";

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
    const { t } = useTranslation();

    const dispatch = useDispatch()
    const { delivery_type} = useSelector(
        (state) => state.CategoryPage
    );

    useEffect(() => {
        setYellow(Array.from(Array(rate).keys()));
        setGray(Array.from(Array(5 - rate).keys()));
    }, [rate]);


    const handleClick = (e) => {
         e.preventDefault()
        if(localStorage.getItem('user')){
       
            if (delivery_type === "all") {
                dispatch(addToCart(id, "supermarket"));
            } else {
                dispatch(addToCart(id, delivery_type));
            }
        }
        else {
            dispatch(setSignuporSignin(true))
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
              })
        }
    }


    return (

        <div className={s.content}>
            <div className={s.b}>

                <img src={url} className={s.picBig}/>


                <div className={s.flags}>
                    {isdiscount && (
                        <>
                            <img src={red} className={s.pic1}/>
                            <p className={s.yellow_text}> -{`${percent}%`}</p>
                        </>
                    )}

                    {isnew && (
                        <>
                            
                            <img src={green} className={s.pic2}/>
                            <p className={s.red_text}> {`${isnew.title}`} </p>{" "}
                        </>
                    )}

                    {ishit && (
                        <>
                           
                            <img src={orange} className={s.pic3}/>
                            <p className={s.red_text_hit}> {`${ishit.title}`} </p>{" "}
                        </>
                    )}
                </div>
                <p className={s.text}> {name} </p>
                <div className={s.boxstars}>

                    {yellow.map((item, id) => {
                        return <img key={id} src={star1} className={s.star}/>;
                    })}

                    {gray.map((item, id) => {
                        return <img key={id} src={star2} className={s.star}/>;
                    })}
                </div>
                <p className={s.rate}>{rate}</p>
            </div>


            <div className={s.all}>
                <div className={s.boxprice}>
                {isdiscount && <p className={s.Priceline}> {`${prevPrice}${t("currency")}`} </p>}
                {!isdiscount && <p className={s.PricelineNull}> </p>}
                    <p className={s.Price}>{`${price}${t("currency")}`} </p>
                    <p className={s.Pricefor1}> {`1${meas}/${price}${t("currency")}`} </p>

                </div>
                <div className={s.box3} onClick={handleClick}>
                    <div className={s.basket} >
                        <img src={basket} className={s.picbasket}/>
                    </div>
                </div>
            </div>

        </div>


    );
}

export default Item;
