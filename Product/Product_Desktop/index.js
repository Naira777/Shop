import s from "./index.module.css";
import {useState, useEffect} from "react";
import {red_m, star1, star2, orange, green, v_right, I} from "../../images";
import {useDispatch, useSelector} from "react-redux";
import {getProduct, setClickProduct} from "../../../redux/reducer";
import {useParams} from "react-router-dom";
import {WithPreloaderHOC} from "./../../Hoc/withPreloader";
import {addToCart, setSignuporSignin} from "./../../../redux/usersReducer";
import {getCategories} from './../../../redux/reducer';
import {useTranslation} from 'react-i18next';
import Popup from './../../Popup/index';
import PopupComponent from './../../PopupComponent/PopupComponent';



function Product({}) {
    const {product, loading, lang, delivery_type, not_allowed, click_product} = useSelector(
        (state) => state.CategoryPage
    );
    const {t} = useTranslation();
    const [yellow, setYellow] = useState([]);
    const [gray, setGray] = useState([]);
    const [count, setCount] = useState(1); 
    const dispatch = useDispatch();
    const {filtertype} = useParams();
    const token = localStorage.getItem("user");

    useEffect(() => {
        dispatch(getProduct(filtertype));
    }, [filtertype, lang]);

    useEffect(() => {
        dispatch(getCategories())
    }, [lang]);


    useEffect(() => {
        product.rate && setYellow(Array.from(Array(product.rate).keys()));
        product.rate && setGray(Array.from(Array(5 - product.rate).keys()));
    }, [product.rate]);

    const handleClick = () => {
        document.getElementById("text").style.height = "auto";
        document.getElementById("avelin").style.display = "none";
    };

    const handleIncrement = () => {

        if (!token) {
            dispatch(setSignuporSignin(true));
        }
        if (product.qtyWare > count) {
            setCount((count) => count + 1);
        }
      
    };

    const handleDecrement = () => {
        if (!token) {
            dispatch(setSignuporSignin(true));
        }
        if (count > 1) {
            setCount((count) => count - 1);
        }
    };
        const handleAdd = () => {
        if (!token) {
            dispatch(setSignuporSignin(true));
        } else {
            if (product.qtyWare == 0) {
               
                dispatch(setClickProduct(!click_product))
            }
            if (delivery_type === 'all') {
                dispatch(addToCart(filtertype, "supermarket", count));
            } else {
                dispatch(addToCart(filtertype, delivery_type, count));
            }
        }
    };

    return (
        <WithPreloaderHOC loading={loading}>
            {!not_allowed && <div>
                
                {/* <p className={s.textpoqr}> */}
                    {/* {categories.find(item=>item.id =={len>2  {`${product.cat_id}`}.charAt(0)  ?.title} */}
                    {/* <img src={v_right} className={s.vector}/> {product.name}
                </p> */}

                <div className={s.content}>

                    <div className={s.boxLeft}>
                        <img src={product.image} className={s.pic}/>

                        <div className={s.flags}>

                            {product.isdiscount && (
                                <div className={s.flagsbox}>
                                    <img src={red_m} className={s.pic1}/>
                                    <p className={s.dexintext}> {`-${product.percent}%`}</p>
                                </div>
                            )}

                            {product.isnew && (
                                <div className={s.flagsbox}>
                                    <img src={green} className={s.pic2}/>
                                    <p className={s.karmirtext}> {`${product.isnew?.title}`} </p>
                                </div>
                            )}

                            {product.ishit && (
                                <div className={s.flagsbox}>
                                    <img src={orange} className={s.pic3}/>
                                    <p className={s.karmirtexthit}> {`${product.ishit?.title}`} </p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={s.boxRight}>
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
                        <p className={s.text} id="text">
                            {product.desc}
                        </p>
                        <p className={s.avelin} id="avelin" onClick={handleClick}>
                            ...{t("read_more")}
                        </p>
                        <div className={s.boxprice}>
                            <div className={s.boxp}>
                                {product.isdiscount && (
                                    <p className={s.Priceline}> {`${product.prevPrice}`}{t("currency")} </p>
                                )}
                                <p className={s.Price}>{`${product.price}`}{t("currency")} </p>
                            </div>
                            <p className={s.Pricefor1}>
                                {`${product.meas}/${product.price}`}{t("currency")}
                            </p>
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
                    </div>
                </div>
            </div>}
            {not_allowed && <div className={s.box1}>  {t("not_allow")} </div>}
            {click_product && <Popup mode1={true} url={`/product/${filtertype}`}>
                <PopupComponent text={`${t("not_ware")}`} nothing></PopupComponent> </Popup>}
        </WithPreloaderHOC>
    );
}

export default Product;
