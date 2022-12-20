import React from "react";
import clsx from "clsx";
import {ReactComponent as SupplierSvg} from "../../../../assets/svg/supplierSvg.svg";
import styles from "./supplierImg.module.css";
import { useTranslation } from 'react-i18next';


const SupplierImg = ({className}) => {
   const {t} = useTranslation(); 
    return (
        <div className={clsx(className, styles.supplierImg)}>
            <div className={styles.supplierImg__img_text}>
                <p className={styles.supplierImg__text}>
                {t("sup_text1")}
                </p>
            </div>
            <div className={styles.supplierImg__img}>
                <SupplierSvg className={styles.supplierImg__svg}/>
            </div>
        </div>
    );
};
export default SupplierImg;
