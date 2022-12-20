import React, {useState} from "react";
import clsx from "clsx";
import Title from "../Title";
import Details from "./details";
import AccordionProductMobile from "./AccordionProductMobile";
import {useWindowSize} from "../../CustomHooks/getWindowWidth";
import {ReactComponent as Down} from "../../assets/svg/drop-down.svg";
import {ReactComponent as Up} from "../../assets/svg/drop-up.svg";
import {useTranslation} from "react-i18next";
import styles from "./accordionProducts.module.css";


const AccordionProducts = ({className, list}) => {
    const [open, setOpen] = useState("");
    const windowSize = useWindowSize();
    const {t} = useTranslation();

    return (
        <div>
            {windowSize[1] < 1300 ? (
                <AccordionProductMobile list={list}/>
            ) : (
                <div>
                    {list?.map((item) => {
                        let date = item?.created_at?.split("", 10).join("");
                        return (
                            <div
                                onClick={() => setOpen(item.id === open ? "" : item.id)}
                                className={clsx(className)}
                                key={item.id}
                            >
                                <div className={styles.dropDown__children} key={item.id}>
                                    <div className={styles.dropDown__box_info}>
                                        <div className={styles.dropDown}>
                                            <div>
                                                <div className={styles.dropDown_box}>
                                                    <div>
                                                        <span className={styles.dot}/>
                                                        {t("order")}
                                                        <Title variant="span">N - {item.id}</Title>
                                                    </div>
                                                    <div>
                                                        {t("status")}
                                                        <Title variant="span">
                                                            {item?.order_status?.translation?.title}
                                                        </Title>
                                                    </div>
                                                    <div>
                                                        {t("data")}
                                                        <Title variant="span">{date}</Title>
                                                    </div>
                                                    <div>
                                                        {t("price")}
                                                        <Title variant="span">{item?.price}</Title>
                                                    </div>
                                                </div>
                                            </div>
                                            {open === item.id ? <Up/> : <Down/>}
                                        </div>
                                    </div>
                                    {open === item.id ? <Details info={item}/> : null}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default AccordionProducts;
