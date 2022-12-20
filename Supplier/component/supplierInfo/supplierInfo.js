import React from "react";
import clsx from "clsx";
import CollNumber from "../../../CollNumber";
import Title from "../../../Title"

import styles from "./supplierInfo.module.css"
import {useTranslation} from 'react-i18next';

const SupplierInfo = ({className}) => {
    const {t} = useTranslation();
    const number = `374 00 01 02 03`;
    return (
        <div className={clsx(className, styles.supplierInfo)}>
            <Title variant="p" className={styles.supplierInfo__text}>{t("sup_text")}</Title>
            <div className={styles.supplierInfo__number}>
                {t("tel")} <CollNumber className={styles.number} number={number}/>
            </div>
        </div>
    )
}
export default SupplierInfo;