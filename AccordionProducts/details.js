import React from "react";
import {useTranslation} from "react-i18next";
import Title from "../Title";
import {ReactComponent as Product} from "../../assets/svg/product.svg";
import {ReactComponent as Count} from "../../assets/svg/X.svg";
import {ReactComponent as Download} from "../../assets/svg/download.svg";

import styles from "./accordionProducts.module.css";

const Details = ({info}) => {
    const {t} = useTranslation();
    return (
        <>
            <div className={styles.details}>
                <div className={styles.details__title_download}>
                    <Title variant="h3" children={styles.details__title}>
                        {t("order_type")}
                    </Title>
                    <div className={styles.details__download}>
                        {t("download")} <Download/>
                    </div>
                </div>
                <div className={styles.details__box}>
                    <div className={styles.details__box_info}>
                        {info?.products?.map((item) => {
                            let isDiscounted = item?.product?.is_discounted;
                            let discountPrice = item?.product?.discount?.discounted_price;
                            let price = item.product?.price;
                            let title = item.product?.translation?.title;
                            let salePrice = price - discountPrice;

                            return (
                                <div className={styles.details__product_box} key={item.id}>
                                    <div className={styles.details__price_box}>
                                        <img className={styles.pic}
                                             src={item.product?.media?.big_image}
                                             alt={item.product?.translation?.title}/>
                                        <div className={styles.details__price_title}>
                                            <div className={styles.details__price_title}>{title}</div>
                                            {isDiscounted && isDiscounted === "yes" ? (
                                                <div>
                          <span className={styles.details__price}>
                            {price} {t("currency")}
                          </span>
                                                    <span className={styles.details__salePrice}>
                            {salePrice} {t("currency")}
                          </span>
                                                </div>
                                            ) : (
                                                <div> {price} </div>
                                            )}
                                        </div>

                                        <div className={styles.details__count_price}>
                                            <div>
                                                <Count/> {item.quantity}
                                            </div>
                                            <div>{isDiscounted === "yes" ? salePrice : price} {t("currency")}</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className={styles.details__shopping_box}>
                        <div className={styles.details__shopping_info}>
                            <div>{t("order_location")}</div>
                            <div className={styles.details__address}>
                                {info?.address?.address_id}
                            </div>
                        </div>

                        <div className={styles.details__shopping_info}>
                            <div>{t("price_order")}</div>
                            <div>{info?.delivery_price} {t("currency")}</div>
                        </div>

                        <div className={styles.details__shopping_info}>
                            <div> {t("del_price")} </div>
                            <div> {info?.price - info?.delivery_price} {t("currency")}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Details;
