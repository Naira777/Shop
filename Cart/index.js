import React, {useEffect, useState} from "react";
import s from "./index.module.css";
import mycart from "../../assets/mycart.png";
import check from "../../assets/check.png";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import ItemCart from "./ItemCart";
import cart from "../../assets/cart.png";
import vector from "../../assets/vector.png";
import {
    deleteProductFromCart,
    getProductsFromCart,
    setDeletedCartItemsPlus,
    setIsBuy,
} from "../../redux/usersReducer";
import {useDispatch, useSelector} from "react-redux";
import {useWindowSize} from "./../../CustomHooks/getWindowWidth";
import ItemCart_Mobile from "./ItemCart_Mobile";
import Popup from "../Popup";
import {setDeletedCartItemsAll1} from "./../../redux/usersReducer";
import {getDeliveryPrices} from "../../redux/reducer";
import {useTranslation} from "react-i18next";
import PopupComponent from "./../PopupComponent/PopupComponent";

function Cart() {
    const navigate = useNavigate();
    const {t} = useTranslation();
    const {lang, deliveryPrices} = useSelector((state) => state.CategoryPage);
    const {cartItems, deletedCartItems} = useSelector(
        (state) => state.UsersPage
    );
    const dispatch = useDispatch();
    const {filtertype} = useParams();
    const [modeCheck, setModeCheck] = useState(false);
    const [height, width] = useWindowSize();
    const [price, setPrice] = useState();
    const [showModal, setShowModal] = useState(false);
    const [isCartFull, setIsCartFull] = useState(false)


    useEffect(() => {
       if(cartItems.length>10){
        setIsCartFull(true)
       }
      if(cartItems.length<=10){
        setIsCartFull(false)
       }      

    }, [cartItems.length, filtertype]);


    useEffect(() => {
        setPrice(cartItems.priceAll);
    }, [cartItems.priceAll]);

    useEffect(() => {
        dispatch(getDeliveryPrices());
    }, []);

    useEffect(() => {
        if (!filtertype) {
            dispatch(getProductsFromCart());
        } else {
            dispatch(getProductsFromCart(filtertype));
        }
    }, [lang, filtertype]);

    const handleClick = () => {
        dispatch(setIsBuy(false))
        let filter;
        let count = 0;                
        if (deletedCartItems.length == 0) {
            filter = cartItems.filter((item) => item.qtyInWareHouse == 0 || null);
        } else {
            for (let i = 0; i < cartItems.length; i++) {
                for (let j = 0; j < deletedCartItems.length; j++) {
                    if (deletedCartItems[j].id == cartItems[i].id) {
                        if (cartItems[i].qtyInWareHouse == 0 || null) {
                            count = count + 1;
                        }
                    }
                }
            }

        }

        if (filter?.length == 0 || count == 0) {
            if (!filtertype) {
                navigate(`/confirm/supermarket`);
            } else {
                navigate(`/confirm/${filtertype}`);
            }
        }

        if (filter?.length > 0 || count > 0) {
            setShowModal(true);
        }
    };

    const handleClick1 = () => {
        navigate(`/categories`);
    };

    const name = localStorage.getItem("user_name");
    const surname = localStorage.getItem("user_surname");

    const handleClickDeleteAll = () => {
        if (!filtertype) {
            deletedCartItems.length != 0 &&
            dispatch(deleteProductFromCart(deletedCartItems, "supermarket"));
            deletedCartItems.length != 0 && dispatch(setDeletedCartItemsAll1([]));
        } else {
            deletedCartItems.length != 0 &&
            dispatch(deleteProductFromCart(deletedCartItems, filtertype));
            deletedCartItems.length != 0 && dispatch(setDeletedCartItemsAll1([]));
        }
    };

    const handleClickVector = () => {
        navigate(-1);
    };

    useEffect(() => {
        if (modeCheck) {
            for (let key in cartItems) {
                if (cartItems[key].id) {
                    dispatch(setDeletedCartItemsPlus(cartItems[key].id));
                }
            }
        }
    }, [modeCheck]);

    const checkAll = () => {
        dispatch(setDeletedCartItemsAll1([]));
        setModeCheck(!modeCheck);
    };

    if (width > 500) {
        return (
            <div className={s.contentDesktop}>
                <p className={s.text_small}> {t("my_cart")} </p>
                <img src={vector} className={s.vector} onClick={handleClickVector}/>
                <p className={s.header}> {t("my_cart")} </p>

                {cartItems?.length === 0 && (
                    <div>
                        <div className={s.links}>
                            {filtertype && (
                                <NavLink
                                    to={`/mycart/supermarket`}
                                    className={s.link}
                                    style={({isActive}) => ({
                                        color: isActive ? "#fff" : "#545e6f",
                                        background: isActive ? "#3D9A85" : "#f0f0f0",
                                    })}
                                >
                                    {t("supermarket")}
                                </NavLink>
                            )}

                            {!filtertype && (
                                <NavLink
                                    to={`/mycart`}
                                    className={s.link}
                                    style={({isActive}) => ({
                                        color: isActive ? "#fff" : "#545e6f",
                                        background: isActive ? "#3D9A85" : "#f0f0f0",
                                    })}
                                >
                                    {t("supermarket")}
                                </NavLink>
                            )}

                            <NavLink
                                to="/mycart/express"
                                className={s.link}
                                style={({isActive}) => ({
                                    color: isActive ? "#fff" : "#545e6f",
                                    background: isActive ? "#3D9A85" : "#f0f0f0",
                                })}
                            >
                                {t("express")}
                            </NavLink>
                        </div>
                        <div className={s.box}>
                            <img src={mycart} className={s.mycart}/>

                            <p className={s.text}>
                                {t("dear")}
                                {localStorage.getItem("user")
                                    ? `${" "}${name} ${surname}`
                                    : ` ${t("customer")}`}
                                , {t("cartText")}
                            </p>

                            <button className={s.button} onClick={handleClick1}>
                                {t("doShopping")}
                            </button>
                        </div>
                    </div>
                )}

                {cartItems?.length > 0 && (
                    <div>
                        <div className={s.links}>
                            {filtertype && (
                                <NavLink
                                    to={`/mycart/supermarket`}
                                    className={s.link}
                                    style={({isActive}) => ({
                                        color: isActive ? "#fff" : "#545e6f",
                                        background: isActive ? "#3D9A85" : "#f0f0f0",
                                    })}
                                >
                                    {t("supermarket")}
                                </NavLink>
                            )}

                            {!filtertype && (
                                <NavLink
                                    to={`/mycart`}
                                    className={s.link}
                                    style={({isActive}) => ({
                                        color: isActive ? "#fff" : "#545e6f",
                                        background: isActive ? "#3D9A85" : "#f0f0f0",
                                    })}
                                >
                                    {t("supermarket")}
                                </NavLink>
                            )}

                            <NavLink
                                to="/mycart/express"
                                className={s.link}
                                style={({isActive}) => ({
                                    color: isActive ? "#fff" : "#545e6f",
                                    background: isActive ? "#3D9A85" : "#f0f0f0",
                                })}
                            >
                                {t("express")}
                            </NavLink>
                        </div>
                        <div className={s.content}>
                            <div className={s.boxpro1}>
                                <div className={s.boxprodcount}>
                                    <p className={s.prod_count}>
                                        {cartItems?.length} {t("product")}{" "}
                                    </p>
                                    <div className={s.boxcheck}>
                                        <p className={s.prod_count} onClick={checkAll}>
                                            {t("all")}
                                        </p>
                                        <div>
                                            {modeCheck && (
                                                <img
                                                    src={check}
                                                    className={s.check}
                                                    onClick={checkAll}
                                                />
                                            )}
                                            {!modeCheck && (
                                                <div className={s.checkBox} onClick={checkAll}/>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {cartItems?.map((item, index) => {
                                    return (
                                        <ItemCart
                                            key={item.id}
                                            url={item.url}
                                            price={item.price}
                                            id={item.id}
                                            prevPrice={item.prevPrice}
                                            meas={item.meas}
                                            title={item.title}
                                            qty={item.qty}
                                            checked={modeCheck}
                                            qtyInWareHouse={item.qtyInWareHouse}
                                        />
                                    );
                                })}
                            </div>

                            <div className={s.confirmbox}>
                                <div className={s.line1}>
                                    <img src={cart} className={s.cart}/>
                                    <p className={s.text2}> {t("my_cart")}</p>
                                </div>
                                <div className={s.boxprice}>
                                    <div className={s.box1}>
                                        <p className={s.prod_count}>{t("price1")}</p>
                                        {filtertype === "express" ? (
                                            <p className={s.price}>
                                                {price - deliveryPrices[1]?.price} {t("currency")}{" "}
                                            </p>
                                        ) : (
                                            <p className={s.price}>
                                                {price - deliveryPrices[0]?.price} {t("currency")}{" "}
                                            </p>
                                        )}
                                    </div>

                                    <div className={s.box1}>
                                        {filtertype === "express" && (
                                            <>
                                                <p className={s.prod_count}>
                                                    {t("delivery")}/
                                                    {deliveryPrices[1]?.translation?.title}/
                                                </p>

                                                <p className={s.price}>
                                                    {deliveryPrices[1]?.price} {t("currency")}
                                                </p>
                                            </>
                                        )}

                                        {(filtertype === "" ||
                                            filtertype === "supermarket" ||
                                            filtertype == undefined) && (
                                            <>
                                                <p className={s.prod_count}>
                                                    {t("delivery")} /
                                                    {deliveryPrices[0]?.translation?.title}/
                                                </p>

                                                <p className={s.price}>
                                                    {deliveryPrices[0]?.price} {t("currency")}
                                                </p>
                                            </>
                                        )}
                                    </div>

                                    <div className={s.line2}></div>
                                </div>
                                <div className={s.box12}>
                                    <p className={s.text1}>{t("togather")} </p>
                                    <p className={s.text12}>
                                        {price} {t("currency")}
                                    </p>
                                </div>

                                <div className={s.box12}>
                                    <p className={s.textkanach} onClick={handleClickDeleteAll}>
                                        {t("remove")}
                                    </p>
                                    <button className={s.button1} onClick={handleClick}>
                                        {t("confirm")}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {showModal && (
                    <Popup mode1={true}>
                        <PopupComponent
                            text={`${t("CartQtyNull")}`}
                            buttonText={`${t("doShopping")}`}
                            url={`/categories`}
                            image
                        />
                    </Popup>
                )}

              {isCartFull && (
                    <Popup mode1={true}>
                        <PopupComponent
                            text={`${t("cart_full")}`}
                            buttonText={`${t("doShopping")}`}
                            url={`/categories`}
                            image
                        />
                    </Popup>
            )}

                
            </div>
        );
    } else {
        return (
            <div className={s.contentDesktop}>
                <img
                    src={vector}
                    className={s.vector}
                    onClick={() => navigate(-1)}
                    alt="pic"
                />
                <p className={s.header}>{t("my_cart")} </p>

                {cartItems?.length == 0 && (
                    <>
                        <div>
                            <div className={s.links}>
                                {filtertype && (
                                    <NavLink
                                        to={`/mycart/supermarket`}
                                        className={s.link}
                                        style={({isActive}) => ({
                                            color: isActive ? "#fff" : "#545e6f",
                                            background: isActive ? "#3D9A85" : "#f0f0f0",
                                        })}
                                    >
                                        {t("supermarket")}
                                    </NavLink>
                                )}

                                {!filtertype && (
                                    <NavLink
                                        to={`/mycart`}
                                        className={s.link}
                                        style={({isActive}) => ({
                                            color: isActive ? "#fff" : "#545e6f",
                                            background: isActive ? "#3D9A85" : "#f0f0f0",
                                        })}
                                    >
                                        {t("supermarket")}
                                    </NavLink>
                                )}

                                <NavLink
                                    to="/mycart/express"
                                    className={s.link}
                                    style={({isActive}) => ({
                                        color: isActive ? "#fff" : "#545e6f",
                                        background: isActive ? "#3D9A85" : "#f0f0f0",
                                    })}
                                >
                                    {t("express")}
                                </NavLink>
                            </div>
                        </div>
                        <div className={s.box}>
                            <img src={mycart} className={s.mycart} alt="pic"/>

                            <p className={s.text}>
                                {t("dear")}
                                {localStorage.getItem("user")
                                    ? `${" "}${name} ${surname}`
                                    : ` ${t("customer")}`}
                                , {t("cartText")}
                            </p>

                            <button className={s.button} onClick={handleClick1}>
                                {t("doShopping")}
                            </button>
                        </div>
                    </>
                )}

                {cartItems?.length > 0 && (
                    <div>
                        <div className={s.links}>
                            {filtertype && (
                                <NavLink
                                    to={`/mycart/supermarket`}
                                    className={s.link}
                                    style={({isActive}) => ({
                                        color: isActive ? "#fff" : "#545e6f",
                                        background: isActive ? "#3D9A85" : "#f0f0f0",
                                    })}
                                >
                                    {t("supermarket")}
                                </NavLink>
                            )}

                            {!filtertype && (
                                <NavLink
                                    to={`/mycart`}
                                    className={s.link}
                                    style={({isActive}) => ({
                                        color: isActive ? "#fff" : "#545e6f",
                                        background: isActive ? "#3D9A85" : "#f0f0f0",
                                    })}
                                >
                                    {t("supermarket")}
                                </NavLink>
                            )}

                            <NavLink
                                to="/mycart/express"
                                className={s.link}
                                style={({isActive}) => ({
                                    color: isActive ? "#fff" : "#545e6f",
                                    background: isActive ? "#3D9A85" : "#f0f0f0",
                                })}
                            >
                                {t("express")}
                            </NavLink>
                        </div>
                        <div className={s.content}>
                            <div className={s.boxpro1}>
                                <div className={s.boxprodcount}>
                                    <p className={s.prod_count}>
                                        {cartItems?.length} {t("product")}{" "}
                                    </p>
                                    <div className={s.boxcheck}>
                                        <p className={s.prod_count} onClick={checkAll}>
                                            {t("all")}
                                        </p>
                                        {modeCheck && (
                                            <img
                                                src={check}
                                                className={s.check}
                                                alt="pic"
                                                onClick={checkAll}
                                            />
                                        )}
                                        {!modeCheck && (
                                            <div className={s.checkBox} onClick={checkAll}/>
                                        )}
                                    </div>
                                </div>

                                {cartItems?.map((item) => {
                                    return (
                                        <ItemCart_Mobile
                                            key={item.id}
                                            url={item.url}
                                            price={item.price}
                                            id={item.id}
                                            prevPrice={item.prevPrice}
                                            meas={item.meas}
                                            title={item.title}
                                            qty={item.qty}
                                            qtyInWareHouse={item.qtyInWareHouse}
                                            checked={modeCheck}
                                        />
                                    );
                                })}
                            </div>

                            <div className={s.confirmbox1}>
                                <div className={s.boxprice1}>
                                    <div className={s.box11}>
                                        <p className={s.prod_count1}>{t("price1")} </p>
                                        {filtertype === "express" ? (
                                            <p className={s.price}>
                                                {price - deliveryPrices[1]?.price} {t("currency")}{" "}
                                            </p>
                                        ) : (
                                            <p className={s.price}>
                                                {price - deliveryPrices[0]?.price} {t("currency")}{" "}
                                            </p>
                                        )}
                                    </div>

                                    <div className={s.box11}>
                                        {filtertype === "express" && (
                                            <>
                                                <p className={s.prod_count1}>
                                                    {t("delivery")} /
                                                    {deliveryPrices[1]?.translation?.title}/
                                                </p>

                                                <p className={s.price}>
                                                    {deliveryPrices[1]?.price}
                                                    {t("currency")}{" "}
                                                </p>
                                            </>
                                        )}

                                        {(filtertype === "" ||
                                            filtertype === "supermarket" ||
                                            filtertype == undefined) && (
                                            <>
                                                <p className={s.prod_count1}>
                                                    {t("delivery")} /
                                                    {deliveryPrices[0]?.translation?.title}/{" "}
                                                </p>

                                                <p className={s.price}>
                                                    {deliveryPrices[0]?.price}
                                                    {t("currency")}{" "}
                                                </p>
                                            </>
                                        )}
                                    </div>

                                    <div className={s.line21}></div>
                                </div>
                                <div className={s.box11}>
                                    <p className={s.text11}>{t("togather")} </p>
                                    <p className={s.price1}>
                                        {cartItems.priceAll} {t("currency")}{" "}
                                    </p>
                                </div>

                                <div className={s.box11}>
                                    <p className={s.textkanach} onClick={handleClickDeleteAll}>
                                        {t("remove")}
                                    </p>
                                    <button className={s.button1} onClick={handleClick}>
                                        {t("confirm")}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {showModal && (
                    <Popup mode1={true}>
                        <PopupComponent
                            mobile
                            text={`${t("CartQtyNull")}`}
                            buttonText={`${t("doShopping")}`}
                            url={`/categories`}
                            image
                        />
                    </Popup>
                )}
                {isCartFull && (
                    <Popup mode1={true}>
                        <PopupComponent
                            text={`${t("cart_full")}`}
                            buttonText={`${t("doShopping")}`}
                            url={`/categories`}
                            image
                        />
                    </Popup>
               )}
            </div>
        );
    }
}

export default Cart;
