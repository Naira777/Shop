import React from "react";
import Title from "../../../Title";
import {useTranslation} from "react-i18next";
import {ReactComponent as Facebook} from "../../../../assets/svg/fb.svg";
import {ReactComponent as Instagram} from "../../../../assets/svg/instagram.svg";
import {ReactComponent as Linkedin} from "../../../../assets/svg/linkedin.svg";
import {ReactComponent as Ok} from "../../../../assets/svg/ok.svg";
import {ReactComponent as WK} from "../../../../assets/svg/wk.svg";

import styles from "./Social.module.css";

const Social = () => {
    const {t} = useTranslation();
    return (
        <div className={styles.social}>
            <div className={styles.social_desc}>
                <Title variant="p">{t("share_job")}</Title>
            </div>
            <div className={styles.social_list}>
                <a href="https://www.facebook.com/">
                    <Facebook className={styles.social_svg}/>
                </a>
                <a href="https://www.instagram.com/">
                    <Instagram className={styles.social_svg}/>
                </a>
                <a href="https://www.linkedin.com/">
                    <Linkedin className={styles.social_svg}/>
                </a>
                <a href="https://ok.ru/">
                    <Ok className={styles.social_svg}/>
                </a>
                <a href="https://vk.com/">
                    <WK className={styles.social_svg}/>
                </a>
            </div>
        </div>
    );
};

export default Social;
