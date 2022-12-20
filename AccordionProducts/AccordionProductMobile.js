import React, {useState} from "react";
import clsx from "clsx";
import {useTranslation} from "react-i18next";
import Title from "../Title";
import Details from "./details";
import {ReactComponent as Down} from "../../assets/svg/drop-down.svg";
import {ReactComponent as Up} from "../../assets/svg/drop-up.svg";

import styles from "./accordionProducts.module.css";

const AccordionProductMobile = ({list, className}) => {
    const [open, setOpen] = useState("");
    const {t} = useTranslation();

    return (
        <div className={styles.accordionProductMobile}>
            {list?.map((item) => {
                let date = item?.created_at?.split("", 10).join("");
                return (
                    <div
                        onClick={() => setOpen(item.id === open ? "" : item.id)}
                        className={clsx(className, styles.mobile_dropDown__children)}
                        key={item.id}
                    >
                        <div className={styles.mobile_dropDown}>
                            <div className={styles.mobile_dropDown_box}>
                                <div className={styles.mobile_box}>
                                    <div>
                                        {t("order")}
                                        <Title
                                            className={styles.mobile_title_number}
                                            variant="span"
                                        >
                                            N - {item.id}
                                        </Title>
                                    </div>
                                    <div>{open === item.id ? <Up/> : <Down/>}</div>
                                </div>
                                <div className={styles.mobile_box}>
                                    <div>{t("status")}</div>
                                    <Title className={styles.mobile_title_number} variant="span">
                                        {item?.order_status?.translation?.title}
                                    </Title>
                                </div>
                                <div className={styles.mobile_box}>
                                    <div>{t("data")}</div>
                                    <Title className={styles.mobile_title_date} variant="span">
                                        {date}
                                    </Title>
                                </div>
                                <div className={styles.mobile_box}>
                                    <div>{t("price1")}</div>
                                    <Title variant="span">{item?.price}</Title>
                                </div>
                            </div>
                            {open === item.id ? <Details info={item}/> : null}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default AccordionProductMobile;
