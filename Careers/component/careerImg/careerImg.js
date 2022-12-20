import {t} from "i18next";
import React from "react";
import {useTranslation} from "react-i18next";
import CareerPicture from "../../../../assets/group.png";

import styles from "./careerImg.module.css";

const CareerImage = () => {
    const {t} = useTranslation();

    return (
        <div className={styles.careerImage}>
            <div className={styles.careerImage__img_text}>
                <p className={styles.careerImage__text}>{t("banner_careers")}</p>
            </div>
            <img
                className={styles.careerImage__image}
                src={CareerPicture}
                alt={CareerPicture}
            />
        </div>
    );
};
export default CareerImage;
