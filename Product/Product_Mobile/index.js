import s from "./index.module.css";
import {useState, useEffect} from "react";
import {star1, star2, vector} from "../../images";
import {useDispatch, useSelector} from "react-redux";
import {getProduct, setClickProduct} from "../../../redux/reducer";
import {useParams} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {WithPreloaderHOC} from "./../../Hoc/withPreloader";
import {addToCart, setSignuporSignin} from "./../../../redux/usersReducer";
import {useTranslation} from "react-i18next";
import Popup from './../../Popup/index';
import PopupComponent from './../../PopupComponent/PopupComponent';
import red from "../../../assets/red_m.png";



function Product_Mobile() {
    const {product, loading, lang, delivery_type, not_allowed, click_product} = useSelector(
        (state) => state.CategoryPage
    );

    const [yellow, setYellow] = useState([]);
    const [gray, setGray] = useState([]);
    const [count, setCount] = useState(1);
    const dispatch = useDispatch();  
    const {filtertype} = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem("user");
    const {t} = useTranslation();

    useEffect(() => {
        dispatch(getProduct(filtertype));
    }, [filtertype, lang]);

    useEffect(() => {
        product.rate && setYellow(Array.from(Array(product.rate).keys()));
        product.rate && setGray(Array.from(Array(5 - product.rate).keys()));
    }, [product.rate]);

    const handleClick = () => {
        document.getElementById("text").style.height = "auto";
        document.getElementById("avelin").style.display = "none";
    };

    const handleClickV = () => {
        navigate(-1);
    };
    const handleDecrement = () => {
        if (!token) {
            dispatch(setSignuporSignin(true));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        if (count > 1) {
            setCount((count) => count - 1);
        }
    };
    const handleIncrement = () => {
        if (!token) {
            dispatch(setSignuporSignin(true));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        if (product.qtyWare > count) {
            setCount((count) => count + 1);
        }
    };

    const handleAdd = () => {
        if (!token) {
            dispatch(setSignuporSignin(true));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            if (product.qtyWare == 0) {
                dispatch(setClickProduct(!click_product))
            }
            if (delivery_type === "all") {
                dispatch(addToCart(filtertype, "supermarket", count));
            } else {
                dispatch(addToCart(filtertype, delivery_type, count));
            }
        }
    };
    return (
        <WithPreloaderHOC loading={loading} mobile>
            {!not_allowed && <div className={s.content}>
                <img src={vector} className={s.vector} onClick={handleClickV}/>
                <div className={s.picbox}>
                    <div className={s.flags}>
                        {product.isdiscount && (
                            <>
                                <img src={red} className={s.pic1}/>
                                <p className={s.dexintext}> {`-${product.percent}%`}</p>
                            </>
                        )}
                        {/*
          {product.isnew === 'yes' && <img src={karmir} className={s.pic2}/>} */}
                    </div>
                    <img src={product.image} className={s.pic}/>
                </div>
                <div className={s.box2}>
                    <p className={s.header}> {product.name} </p>
                    <div className={s.boxstars}>
                        {yellow.map((item, id) => {
                            return <img key={id} src={star1} className={s.star}/>;
                        })}

                        {gray.map((item, id) => {
                            return <img key={id} src={star2} className={s.star}/>;
                        })}
                    </div>
                    <p className={s.rate}>{product.rate}</p>
                </div>
                <p className={s.text} id="text">
                    {product.desc}
                </p>
                <p className={s.avelin} id="avelin" onClick={handleClick}>
                    ...{t("read_more")}
                </p>
                <div className={s.boxprice}>
                    <p className={s.Pricefor1}>{`${product.meas}/${product.price}`}{t("currency")}</p>
                    <div className={s.boxp}>
                        {product.isdiscount && (
                            <p className={s.Priceline}> {`${product.prevPrice}`}{t("currency")} </p>
                        )}
                         {!product.isdiscount && (
                            <p className={s.Priceline}>  </p>
                        )}
                        
                        <p className={s.Price}>{`${product.price}`}{t("currency")} </p>
                    </div>
                </div>
                <div className={s.boxc}>
                    <div className={s.boxcount} onClick={handleDecrement}>
                        -
                    </div>
                    <div className={s.count}> {count} </div>
                    <div className={s.boxcount} onClick={handleIncrement}>
                        +
                    </div>
                    <div className={s.button} onClick={handleAdd}>
                        {t("cart")}
                    </div>
                </div>
            </div>}
            {not_allowed && <div className={s.box1}> {t("not_allow")} </div>}
            {click_product && <Popup mode1={true} url={`/product/${filtertype}`}>
                <PopupComponent text={`${t("not_ware")}`} nothing></PopupComponent> </Popup>}
        </WithPreloaderHOC>
    );
}

export default Product_Mobile;
