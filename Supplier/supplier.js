import React from "react";
import {useTranslation} from "react-i18next";
import { useWindowSize } from "../../CustomHooks/getWindowWidth";
import PageTitle from "../PageTitle";
import SupplierForm from "./component/supplierForm";
import SupplierImg from "./component/supplierImg";
import SupplierInfo from "./component/supplierInfo";
import styles from "./supplier.module.css";

const Supplier = () => {
    const {t} = useTranslation();
    const [height, width] = useWindowSize();
    return (
        <div>
           {width> 500 && <PageTitle title1={t("be_supplier")} className={styles.page_title}/>}
            <div className={styles.supplier__form_img}>
                <SupplierForm className={styles.supplier__form}/>
                <SupplierImg className={styles.supplier__img}/>
            </div>
            <SupplierInfo/>
        </div>
    );
};

export default Supplier;
