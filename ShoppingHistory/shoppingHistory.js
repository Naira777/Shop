import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch, useSelector} from "react-redux";
import {getShoppingHistory} from "../../redux/shoppingHistoryReducer";
import Title from "../Title";
import PageTitle from "../PageTitle";
import NotShopping from "./component/notShopping";
import ShoppingDate from "./component/shoppingDate";
import ShoppingInfo from "./component/shoppingInfo";
import styles from "./shoppingHistory.module.css";
import {useWindowSize} from "../../CustomHooks/getWindowWidth";

const ShoppingHistory = () => {
    const {shoppingHistoryData} = useSelector(
        (store) => store.shoppingHistoryPage
    );
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const [height, width] = useWindowSize();

    useEffect(() => {
        dispatch(getShoppingHistory());
    }, []);

    return (
        <>
            {width > 500 && <PageTitle title1={t("personal_page")} title2={t("shop_history")}/>}
            <div className={styles.shopping_history}>
                <Title className={styles.title}>{t("shop_history")}</Title>
                {shoppingHistoryData.length ? (
                    <div className={styles.date_info}>
                        <ShoppingDate className={styles.date}/>
                        <ShoppingInfo
                            className={styles.info}
                            shoppingHistoryData={shoppingHistoryData}
                        />
                    </div>
                ) : (
                    <NotShopping/>
                )}
            </div>
        </>
    );
};

export default ShoppingHistory;
