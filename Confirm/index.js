import React, {useCallback, useEffect, useState} from "react";
import s from "./index.module.css";
import {useNavigate, useParams} from "react-router-dom";
import v_right from "../../assets/slaq.png";
import ItemProduct from "./ItemProduct";
import Address from "./Address/index";
import {useSelector, useDispatch} from "react-redux";
import {
    buyProducts,
    getAllAddresses,
    getProductsFromCart,
} from "../../redux/usersReducer";
import Popup from "./../Popup/index";
import {updateAddress} from "./../../redux/usersReducer";
import {useWindowSize} from "./../../CustomHooks/getWindowWidth";
import vector from "../../assets/vector.png";
import NewAddress from "./../UserAddress/NewAddress/index";
import {getDeliveryPrices} from "../../redux/reducer";
import {useTranslation} from "react-i18next";
import PopupComponent from './../PopupComponent/PopupComponent';


function Confirm() {
    const navigate = useNavigate();
    const {cartItems, addresses, deletedCartItems,isBuy} = useSelector(
        (state) => state.UsersPage
    );
    const {t} = useTranslation();
    const {lang, deliveryPrices, delivery_type} = useSelector((state) => state.CategoryPage);
    const dispatch = useDispatch();
    const [selectedAddressId, setSelectedAddressId] = useState("");
    const [addressId, setAddressId] = useState("");
    const [mode, setMode] = useState(false);
    const [height, width] = useWindowSize();
    const [price, setPrice] = useState();
    const {filtertype} = useParams();
    const [items, setItems] = useState(deletedCartItems);
    const [itemsCart, setItemsCart] = useState(cartItems);
    const items1 = deletedCartItems;


const calcPrice = useCallback((item1,cart,item, itemCart, price) => {

    if (item1.length !== 0) {
        let p = 0;
        for (let j = 0; j < cart.length; j++) {
            for (let i = 0; i < item.length; i++) {
                if (item[i].id == cart[j].id) {
                    p = p + cart[j].price * cart[j].qty;
                }
            }
        }
        price(p);
    }
    if (item1.length === 0) {
        let p = 0;
        for (let j = 0; j < cart.length; j++) {
            for (let i = 0; i < itemCart.length; i++) {
                if (itemCart[i].id == cart[j].id) {
                    p = p + cart[j].price * cart[j].qty;
                }
            }
        }
       price(p);
    }
}, [])


    useEffect(() => {
        calcPrice(items1, cartItems, items, itemsCart, setPrice)
        // if (items1.length !== 0) {
        //     let p = 0;
        //     for (let j = 0; j < cartItems.length; j++) {
        //         for (let i = 0; i < items.length; i++) {
        //             if (items[i].id == cartItems[j].id) {
        //                 p = p + cartItems[j].price * cartItems[j].qty;
        //             }
        //         }
        //     }
        //     setPrice(p);
        // }
        // if (items1.length === 0) {
        //     let p = 0;
        //     for (let j = 0; j < cartItems.length; j++) {
        //         for (let i = 0; i < itemsCart.length; i++) {
        //             if (itemsCart[i].id == cartItems[j].id) {
        //                 p = p + cartItems[j].price * cartItems[j].qty;
        //             }
        //         }
        //     }
        //     setPrice(p);
        // }
    }, [items, itemsCart, calcPrice]);


    useEffect(() => {
        setSelectedAddressId("");
        dispatch(getDeliveryPrices());
    }, []);

    useEffect(() => {
        dispatch(getAllAddresses());
    }, [lang]);

    useEffect(() => {
        dispatch(getProductsFromCart(filtertype));
    }, [lang, filtertype]);

    const handleClick = () => {
        navigate(`/mycart/${filtertype}`);
    };

    useEffect(() => {
        setSelectedAddressId(addresses?.find(item => item.selected === 'yes')?.address_id)
        // setAddressId(addresses?.find(item => item.selected === 'yes')?.id)

    }, [lang]);

    const handleClickAddressItem = (item) => {
        setSelectedAddressId(item.address_id);
        setAddressId(item.id);
        const data = {
            selected: "yes",
            address_id: item.address_id,
            floor: item.floor,
            flat: item.flat,
            entrance: item.entrance,
        };

        dispatch(updateAddress(data, item.id));
    };

    const handleClickVector = () => {
        navigate(-1);
    };

    const handleClickDelete = (itemId) => {
        if (items1.length !== 0) {
            setItems(items.filter((item) => item.id != itemId));
        } else {
            setItemsCart(itemsCart.filter((item) => item.id != itemId));
        }
    };

    const buyProductsInCart = () => {

        const baskets = []
        if (items1.length !== 0) {
            for (let j = 0; j < cartItems.length; j++) {
                for (let i = 0; i < items.length; i++) {
                    if (items[i].id == cartItems[j].id) {
                        baskets.push({id: cartItems[j].id})
                    }
                }
            }

        }
        if (items1.length === 0) {
            for (let j = 0; j < cartItems.length; j++) {
                for (let i = 0; i < itemsCart.length; i++) {
                    if (itemsCart[i].id == cartItems[j].id) {
                        baskets.push({id: cartItems[j].id})

                    }
                }
            }
        }

        const data = {
            delivery_address_id: addressId != '' ? addressId : addresses?.find(item => item.selected === 'yes')?.id,
            delivery_type: delivery_type == 'all' ? 'supermarket' : delivery_type,
            baskets: baskets,

        }
        dispatch(buyProducts(data))
      

    }

    if (width > 500) {
        return (
            <>
                <div className={s.contentDesktop}>
                    <div className={s.left_side}>
                        <p className={s.text_small}>
                            {t("my_cart")} <img src={v_right} className={s.vector}/>{" "}
                            {t("confirm")}
                        </p>
                        <p className={s.header}>{t("confirm_shop")} </p>
                        <p className={s.text1}> {t("shipp_address")}</p>

                        {addresses?.map((item) => {
                            return (
                                <Address
                                    key={item.id}
                                    address={item.address}
                                    entrance={item.entrance}
                                    floor={item.floor}
                                    flat={item.flat}
                                    handleClick={() => handleClickAddressItem(item)}
                                    selectedAddress={item.selected === "yes"}
                                />
                            );
                        })}

                        {/* <div className={s.boxline}>
                    <div className={s.line1}></div>
                    <p className={s.text_small}> կամ </p>
                    <div className={s.line1}></div>
                </div>

                <p className={s.textkapuyt} onClick={handleClickAddress}>
                    Ավելացնել մեկանգամյա հասցե
                </p> */}
                        <div className={s.boxline1}>
                            <p className={s.text_green} onClick={handleClick}>
                                {t("cart")}
                            </p>
                            <button className={s.button} onClick={buyProductsInCart}>{t("confirm")}</button>
                        </div>
                    </div>
                    <div className={s.right_side}>
                        {items1.length === 0 &&
                            itemsCart?.map((item, id) => {
                                return (
                                    <ItemProduct
                                        url={item.url}
                                        key={id}
                                        title={item.title}
                                        qty={item.qty}
                                        price={item.price}
                                        id={item.id}
                                        handleDelete={() => handleClickDelete(item.id)}
                                        confirm
                                    />
                                );
                            })}

                        {items1.length !== 0 &&
                            itemsCart?.map((item, id) => {
                                for (let i = 0; i < items.length; i++) {
                                    if (items[i].id == item.id) {
                                        return (
                                            <ItemProduct
                                                url={item.url}
                                                key={id}
                                                title={item.title}
                                                qty={item.qty}
                                                price={item.price}
                                                id={item.id}
                                                handleDelete={() => handleClickDelete(item.id)}
                                                confirm
                                            />
                                        );
                                    }
                                }
                            })}

                        <div className={s.boxgin}>
                            <div className={s.boxgin1}>
                                <p className={s.textbox}>{t("price1")}</p>
                                {filtertype === "express" ? (
                                    <p className={s.textbox} style={{fontWeight: "600"}}>
                                        {price ? price : 0} {t("currency")}
                                    </p>
                                ) : (
                                    <p className={s.textbox} style={{fontWeight: "600"}}>
                                        {price ? price : 0} {t("currency")}
                                    </p>
                                )}
                            </div>

                            <div className={s.boxgin1}>
                                {filtertype === "express" && (
                                    <>
                                        <p className={s.textbox}>
                                            {t("delivery")}/{deliveryPrices[1]?.translation?.title}/
                                        </p>

                                        <p className={s.textbox} style={{fontWeight: "600"}}>
                                            {deliveryPrices[1]?.price}{t("currency")}{" "}
                                        </p>
                                    </>
                                )}

                                {(filtertype === "" ||
                                    filtertype === "supermarket" ||
                                    filtertype == undefined) && (
                                    <>
                                        <p className={s.textbox}>
                                            {t("delivery")}/{deliveryPrices[0]?.translation?.title}/
                                        </p>

                                        <p className={s.textbox} style={{fontWeight: "600"}}>
                                            {deliveryPrices[0]?.price}{t("currency")}
                                        </p>
                                    </>
                                )}
                            </div>

                            <div className={s.line}></div>

                            <div className={s.boxgin1}>
                                <p
                                    className={s.textbox}
                                    style={{fontSize: "20px", fontWeight: "600"}}
                                >
                                    {t("togather")}
                                </p>
                                <p
                                    className={s.textbox}
                                    style={{fontSize: "20px", fontWeight: "600"}}
                                >
                                    {filtertype === "express"
                                        ? price + deliveryPrices[1]?.price
                                        : price + deliveryPrices[0]?.price}
                                    {t("currency")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {mode && (
                    <Popup mode1={true}>
                        <NewAddress/>
                    </Popup>
                )}
                {isBuy &&
                 <Popup mode1={true}>
                    <PopupComponent
                 url={'/categories'}
                 buttonText={`${t("doShopping")}`} 
                 text={`${t("buy_ok")}`}
                 image                 
                 >    
                 </PopupComponent> 
                  </Popup>}
            </>
        );
    } else {
        return (
            <>

                <div className={s.contentMobile}>
                    <img src={vector} className={s.vector} onClick={handleClickVector}/>
                    <p className={s.header}>{t("confirm_shop")} </p>
                    <div className={s.content}>
                        {items1.length === 0 &&
                            itemsCart?.map((item, id) => {
                                return (
                                    <ItemProduct
                                        url={item.url}
                                        key={item.id}
                                        title={item.title}
                                        qty={item.qty}
                                        price={item.price}
                                        id={item.id}
                                        handleDelete={() => handleClickDelete(item.id)}
                                        confirm
                                    />
                                );
                            })}

                        {items1.length != 0 &&
                            itemsCart?.map((item, id) => {
                                for (let i = 0; i < items.length; i++) {
                                    if (items[i].id == item.id) {
                                        return (
                                            <ItemProduct
                                                url={item.url}
                                                key={id}
                                                title={item.title}
                                                qty={item.qty}
                                                price={item.price}
                                                id={item.id}
                                                handleDelete={() => handleClickDelete(item.id)}
                                                confirm
                                            />
                                        );
                                    }
                                }
                            })}
                    </div>

                    <p className={s.text1}>{t("shipp_address")}</p>
                    {addresses?.map((item) => {
                        return (
                            <Address
                                key={item.id}
                                address={item.address}
                                entrance={item.entrance}
                                floor={item.floor}
                                flat={item.flat}
                                handleClick={() => handleClickAddressItem(item)}
                                selectedAddress={item.selected === "yes"}
                            />
                        );
                    })}
                    {/*
                    <div className={s.boxline}>
                        <div className={s.line1}></div>
                        <p className={s.text_small}> կամ </p>
                        <div className={s.line1}></div>
                    </div>
    
                    <p className={s.textkapuyt} onClick={handleClickAddress}>
                        Ավելացնել մեկանգամյա հասցե
                    </p> */}

                    <div className={s.boxgin}>
                        <div className={s.boxgin1}>
                            <p className={s.textbox}>{t("price1")}</p>
                            {filtertype === "express" ? (
                                <p className={s.textbox} style={{fontWeight: "600"}}>
                                    {price ? price : 0} {t("currency")}
                                </p>
                            ) : (
                                <p className={s.textbox} style={{fontWeight: "600"}}>
                                    {price ? price : 0} {t("currency")}
                                </p>
                            )}
                        </div>

                        <div className={s.boxgin1}>
                            {filtertype === "express" && (
                                <>
                                    <p className={s.textbox}>
                                        {t("delivery")}/{deliveryPrices[1]?.translation?.title}/
                                    </p>

                                    <p className={s.textbox} style={{fontWeight: "600"}}>
                                        {deliveryPrices[1]?.price}{t("currency")}{" "}
                                    </p>
                                </>
                            )}

                            {(filtertype === "" ||
                                filtertype === "supermarket" ||
                                filtertype == undefined) && (
                                <>
                                    <p className={s.textbox}>
                                        {t("delivery")}/{deliveryPrices[0]?.translation?.title}/
                                    </p>

                                    <p className={s.textbox} style={{fontWeight: "600"}}>
                                        {deliveryPrices[0]?.price}{t("currency")}{" "}
                                    </p>
                                </>
                            )}
                        </div>

                        <div className={s.line}></div>

                        <div className={s.boxgin1}>
                            <p
                                className={s.textbox}
                                style={{fontSize: "20px", fontWeight: "600"}}
                            >
                                {t("togather")}
                            </p>
                            <p
                                className={s.textbox}
                                style={{fontSize: "20px", fontWeight: "600"}}
                            >
                                {filtertype === "express"
                                    ? price + deliveryPrices[1]?.price
                                    : price + deliveryPrices[0]?.price}
                                {t("currency")}
                            </p>
                        </div>
                    </div>

                    <div className={s.boxline}>
                        <p className={s.text_green} onClick={handleClick}>
                            {t("cart")}
                        </p>
                        <button className={s.button} onClick={buyProductsInCart}>{t("confirm")}</button>
                    </div>
                </div>
                {mode && (
                    <Popup mode1={true} mobile>
                        <NewAddress mobile/>
                    </Popup>
                )}
                {isBuy &&
                 <Popup mode1={true}>
                    <PopupComponent
                 url={'/categories'}
                 buttonText={`${t("doShopping")}`} 
                 text={`${t("buy_ok")}`}
                 image 
                 mobile                
                 >    
                 </PopupComponent> 
                  </Popup>}
            </>
        );
    }
}

export default Confirm;
